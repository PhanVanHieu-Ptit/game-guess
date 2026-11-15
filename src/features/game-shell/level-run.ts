import {
  INITIAL_HINT_STATE,
  openTier,
  type HintState,
  type HintTier,
  type OpenableTier,
} from '@/domain/hints/hint-machine';
import type { LevelMeta, LevelSession, PlayMode } from '@/domain/levels/types';
import type { RunOutcome } from '@/domain/progress/types';
import type { EventName, EventPayloads } from '@/services/analytics/events';
import { strings } from '@/features/strings';

// Một lượt chơi của một màn (docs/TECH.md mục 5.4 và 9.1). Khung chơi dùng lớp này để bảo đảm, bất kể màn viết thế nào:
//  - phát `level_start` khi cảnh sẵn sàng; mỗi lượt chơi có đúng một `level_complete` hoặc `level_abandon`;
//  - thời gian chỉ tính lúc tab đang hiện; `solve()` gọi nhiều lần cũng chỉ tính một, sau khi xong mọi `wrong()` bị bỏ qua;
//  - `level_abandon` khi cảnh bị gỡ mà chưa xong, khi `pagehide`, hoặc khi tab ẩn từ 5 phút trở lên.
// Màn không tự gọi đo lường. Lớp này không phụ thuộc React để test được mà không cần dựng giao diện.

export const IDLE_NUDGE_MS = 20_000;
export const HIDDEN_ABANDON_MS = 5 * 60_000;
const STUCK_WRONG_COUNT = 3;

export type RunStatus =
  'idle' | 'playing' | 'solved' | 'revealed' | 'abandoned';

export interface RunFeedback {
  /** Tăng mỗi lần có phản hồi mới, để giao diện biết đó là phản hồi mới dù chữ giống lần trước. */
  id: number;
  text: string;
}

export interface RunSnapshot {
  status: RunStatus;
  wrongCount: number;
  /** Cấp gợi ý cao nhất đã mở trong lượt này (0–3). */
  hintTier: HintTier;
  feedback: RunFeedback | null;
  /** Nút Gợi ý nên nhấp nháy: sai 3 lần liền hoặc 20 giây không có thao tác tiến triển. */
  nudge: boolean;
  /** Thời gian của lượt vừa xong (chỉ có nghĩa khi `status` là solved hoặc revealed). */
  durationMs: number;
  /** Tăng mỗi lần bấm Chơi lại; giao diện dùng làm khóa để dựng lại cảnh từ đầu. */
  epoch: number;
}

export type Tracker = <K extends EventName>(
  name: K,
  data: EventPayloads[K],
) => void;

export interface LevelRunOptions {
  meta: LevelMeta;
  mode: PlayMode;
  track: Tracker;
  /** Mili giây hiện tại (đồng hồ bọc để test đặt giờ giả). */
  now: () => number;
  /** Gọi mỗi khi bắt đầu một lượt; trả về số thứ tự lượt của màn này trên máy. */
  nextAttemptNo: () => number;
  /** Gọi khi lượt kết thúc bằng đã giải hoặc xem đáp án (để ghi tiến trình). */
  onOutcome: (outcome: RunOutcome) => void;
}

export class LevelRun {
  /** Cầu nối đưa cho cảnh của màn. Ổn định suốt vòng đời của đối tượng này. */
  readonly session: LevelSession;

  private readonly options: LevelRunOptions;
  private status: RunStatus = 'idle';
  private epoch = 0;
  private wrongCount = 0;
  private consecutiveWrong = 0;
  private hint: HintState = INITIAL_HINT_STATE;
  private feedback: RunFeedback | null = null;
  private feedbackSeq = 0;
  private nudge = false;
  private finishedMs = 0;

  // Đồng hồ chỉ chạy lúc tab hiện: `accumulatedMs` là phần đã tích lũy, `visibleSince` là mốc bắt đầu đoạn đang hiện.
  private accumulatedMs = 0;
  private visibleSince: number | null = null;
  private visible = true;
  private hiddenAt: number | null = null;

  private idleTimer: ReturnType<typeof setTimeout> | null = null;
  private hiddenTimer: ReturnType<typeof setTimeout> | null = null;
  private mountToken = 0;
  private readonly listeners = new Set<() => void>();
  private snapshot: RunSnapshot;

  constructor(options: LevelRunOptions) {
    this.options = options;
    this.session = {
      solve: () => this.solve(),
      wrong: (code) => this.wrong(code),
      progress: () => this.progress(),
    };
    this.snapshot = this.buildSnapshot();
  }

  // ---- Đăng ký nghe cho useSyncExternalStore (là thuộc tính mũi tên để tham chiếu ổn định) ----

  readonly subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  readonly getSnapshot = (): RunSnapshot => this.snapshot;

  // ---- Vòng đời ----

  /**
   * Gắn vào trang: nghe `visibilitychange` và `pagehide`. Trả về hàm dọn dẹp. Việc "gỡ" được hoãn một vi tác vụ và
   * hủy nếu có `mount()` ngay sau đó, vì StrictMode (chạy dev) giả lập gỡ rồi gắn lại và không được tính là bỏ cuộc.
   */
  mount(): () => void {
    this.mountToken += 1;
    this.setVisible(document.visibilityState !== 'hidden');
    const onVisibility = (): void =>
      this.setVisible(document.visibilityState !== 'hidden');
    const onPageHide = (): void => this.abandon();
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      this.mountToken += 1;
      const token = this.mountToken;
      queueMicrotask(() => {
        if (token === this.mountToken) this.dispose();
      });
    };
  }

  /** Cảnh đã sẵn sàng cho thao tác: bắt đầu lượt đầu tiên. Gọi lại không có tác dụng. */
  sceneReady(): void {
    if (this.status === 'idle') this.startRun(false);
  }

  /** Rời màn: lượt đang chơi dở thì ghi bỏ cuộc. Gọi lại không có tác dụng. */
  dispose(): void {
    this.abandon();
    this.clearTimers();
  }

  // ---- Việc người chơi làm ----

  solve(): void {
    if (!this.ensurePlaying()) return;
    this.finish('solved');
  }

  wrong(code?: string): void {
    if (!this.ensurePlaying()) return;
    this.wrongCount += 1;
    this.consecutiveWrong += 1;

    const specific: string | undefined =
      code === undefined ? undefined : this.options.meta.wrong?.[code];
    const generic =
      strings.play.wrongGeneric[
        (this.wrongCount - 1) % strings.play.wrongGeneric.length
      ];
    const stuck = this.consecutiveWrong >= STUCK_WRONG_COUNT;
    this.feedbackSeq += 1;
    this.feedback = {
      id: this.feedbackSeq,
      text: stuck
        ? `${specific ?? generic} ${strings.play.wrongStuck}`
        : (specific ?? generic),
    };
    if (stuck) this.nudge = true;
    this.armIdleTimer();
    this.publish();
  }

  /** Có thao tác tiến triển: hết "bí", đếm lại 20 giây. */
  progress(): void {
    if (!this.ensurePlaying()) return;
    this.consecutiveWrong = 0;
    this.nudge = false;
    this.armIdleTimer();
    this.publish();
  }

  /** Mở một cấp gợi ý. Chỉ cấp kế tiếp hoặc cấp đã xem; `hint_used` chỉ ghi lần đầu mở cấp đó trong lượt. */
  openHint(tier: OpenableTier): void {
    if (!this.ensurePlaying()) return;
    const opened = openTier(this.hint, tier);
    if (!opened) return;
    this.applyHint(opened.state, opened.firstTime, tier);
    this.nudge = false;
    this.armIdleTimer();
    this.publish();
  }

  /** Người chơi đã xác nhận xem đáp án (cấp 3): kết thúc lượt với kết quả `revealed`. */
  reveal(): void {
    if (!this.ensurePlaying()) return;
    const opened = openTier(this.hint, 3);
    if (!opened) return; // chưa mở cấp 2 thì không được xem đáp án
    this.applyHint(opened.state, opened.firstTime, 3);
    this.finish('revealed');
  }

  /** Chơi lại: lượt đang dở bị ghi bỏ cuộc, rồi bắt đầu lượt mới và dựng lại cảnh. */
  restart(): void {
    if (this.status === 'idle') return;
    this.abandon();
    this.epoch += 1;
    this.startRun(true);
  }

  /** Ghi bỏ cuộc nếu lượt đang chơi dở. */
  abandon(): void {
    if (this.status !== 'playing') return;
    const durationMs = this.currentDuration();
    this.status = 'abandoned';
    this.clearTimers();
    const { meta, mode, track } = this.options;
    track('level_abandon', {
      levelId: meta.id,
      mode,
      durationMs,
      hintsUsed: this.hint.tier,
      wrongCount: this.wrongCount,
    });
    this.publish();
  }

  // ---- Bên trong ----

  /**
   * Sau khi lượt bị bỏ cuộc (tab ẩn lâu, hay trang được khôi phục từ bộ nhớ đệm) mà người chơi vẫn làm tiếp
   * thì coi là một lượt mới, thay vì nuốt thao tác của họ.
   */
  private ensurePlaying(): boolean {
    if (this.status === 'abandoned') this.startRun(false);
    return this.status === 'playing';
  }

  private startRun(restart: boolean): void {
    this.status = 'playing';
    this.wrongCount = 0;
    this.consecutiveWrong = 0;
    this.hint = INITIAL_HINT_STATE;
    this.feedback = null;
    this.nudge = false;
    this.finishedMs = 0;
    this.accumulatedMs = 0;
    this.visibleSince = this.visible ? this.options.now() : null;

    const { meta, mode, track, nextAttemptNo } = this.options;
    track('level_start', {
      levelId: meta.id,
      mode,
      attemptNo: nextAttemptNo(),
      restart,
    });
    this.armIdleTimer();
    this.publish();
  }

  private applyHint(
    next: HintState,
    firstTime: boolean,
    tier: OpenableTier,
  ): void {
    this.hint = next;
    if (!firstTime) return;
    const { meta, mode, track } = this.options;
    track('hint_used', {
      levelId: meta.id,
      mode,
      tier,
      elapsedMs: this.currentDuration(),
    });
  }

  private finish(status: 'solved' | 'revealed'): void {
    const durationMs = this.currentDuration();
    this.status = status;
    this.finishedMs = durationMs;
    this.nudge = false;
    this.feedback = null;
    this.clearTimers();

    const { meta, mode, track, onOutcome, now } = this.options;
    track('level_complete', {
      levelId: meta.id,
      mode,
      durationMs,
      hintsUsed: this.hint.tier,
      result: status,
      wrongCount: this.wrongCount,
    });
    try {
      onOutcome({
        status,
        durationMs,
        hintsUsed: this.hint.tier,
        at: new Date(now()).toISOString(),
      });
    } catch {
      // Ghi tiến trình lỗi không được chặn việc chơi (docs/GDD.md mục 6).
    }
    this.publish();
  }

  /** Tab hiện hay ẩn. Ẩn: dừng đồng hồ và hẹn bỏ cuộc sau 5 phút. Hiện lại: chạy tiếp, hoặc bỏ cuộc nếu đã ẩn từ 5 phút. */
  private setVisible(next: boolean): void {
    if (next === this.visible) return;
    const now = this.options.now();
    this.visible = next;

    if (!next) {
      if (this.visibleSince !== null) {
        this.accumulatedMs += Math.max(0, now - this.visibleSince);
        this.visibleSince = null;
      }
      this.hiddenAt = now;
      this.clearIdleTimer();
      if (this.status === 'playing') {
        this.hiddenTimer = setTimeout(() => this.abandon(), HIDDEN_ABANDON_MS);
      }
      return;
    }

    // Trên điện thoại, tab nền bị đóng băng nên hẹn giờ không chạy; vì vậy kiểm thêm bằng mốc thời gian.
    const hiddenFor = this.hiddenAt === null ? 0 : now - this.hiddenAt;
    this.hiddenAt = null;
    this.clearHiddenTimer();
    if (this.status !== 'playing') return;
    if (hiddenFor >= HIDDEN_ABANDON_MS) {
      this.abandon();
      return;
    }
    this.visibleSince = now;
    this.armIdleTimer();
  }

  private currentDuration(): number {
    const running =
      this.visibleSince === null
        ? 0
        : Math.max(0, this.options.now() - this.visibleSince);
    return Math.round(this.accumulatedMs + running);
  }

  private armIdleTimer(): void {
    this.clearIdleTimer();
    if (this.status !== 'playing' || !this.visible) return;
    this.idleTimer = setTimeout(() => {
      this.nudge = true;
      this.publish();
    }, IDLE_NUDGE_MS);
  }

  private clearIdleTimer(): void {
    if (this.idleTimer !== null) clearTimeout(this.idleTimer);
    this.idleTimer = null;
  }

  private clearHiddenTimer(): void {
    if (this.hiddenTimer !== null) clearTimeout(this.hiddenTimer);
    this.hiddenTimer = null;
  }

  private clearTimers(): void {
    this.clearIdleTimer();
    this.clearHiddenTimer();
  }

  private buildSnapshot(): RunSnapshot {
    return {
      status: this.status,
      wrongCount: this.wrongCount,
      hintTier: this.hint.tier,
      feedback: this.feedback,
      nudge: this.nudge,
      durationMs: this.finishedMs,
      epoch: this.epoch,
    };
  }

  private publish(): void {
    this.snapshot = this.buildSnapshot();
    this.listeners.forEach((listener) => listener());
  }
}
