import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  HIDDEN_ABANDON_MS,
  IDLE_NUDGE_MS,
  LevelRun,
} from '@/features/game-shell/level-run';
import { strings } from '@/features/strings';
import { makeMeta } from '../../fixtures/levels';

const meta = makeMeta({ id: '2d-test-01', wrong: { a: 'Sai kiểu A.' } });

let clock = 0;

function setup() {
  const track = vi.fn();
  const onOutcome = vi.fn();
  let attempts = 0;
  const run = new LevelRun({
    meta,
    mode: 'campaign',
    track,
    now: () => clock,
    nextAttemptNo: () => (attempts += 1),
    onOutcome,
  });
  return { run, track, onOutcome };
}

/** Thời gian trôi qua: đồng hồ giả và bộ hẹn giờ giả cùng chạy. */
const advance = (ms: number): void => {
  clock += ms;
  vi.advanceTimersByTime(ms);
};

const names = (track: ReturnType<typeof vi.fn>): string[] =>
  track.mock.calls.map(([name]) => String(name));

function setVisibility(state: 'visible' | 'hidden'): void {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => state,
  });
  document.dispatchEvent(new Event('visibilitychange'));
}

beforeEach(() => {
  clock = 1_000_000;
  vi.useFakeTimers();
});

afterEach(() => {
  Reflect.deleteProperty(document, 'visibilityState');
  vi.useRealTimers();
});

describe('LevelRun: bắt đầu và kết thúc', () => {
  it('chưa có cảnh sẵn sàng thì chưa phát sự kiện nào, và thao tác bị bỏ qua', () => {
    const { run, track } = setup();
    run.solve();
    run.wrong();
    expect(track).not.toHaveBeenCalled();
    expect(run.getSnapshot().status).toBe('idle');
  });

  it('sceneReady phát level_start đúng một lần', () => {
    const { run, track } = setup();
    run.sceneReady();
    run.sceneReady();
    expect(track).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith('level_start', {
      levelId: '2d-test-01',
      mode: 'campaign',
      attemptNo: 1,
      restart: false,
    });
    expect(run.getSnapshot().status).toBe('playing');
  });

  it('giải đúng: level_complete một lần, ghi tiến trình, gọi solve nhiều lần cũng chỉ tính một', () => {
    const { run, track, onOutcome } = setup();
    run.sceneReady();
    advance(12_345);
    run.session.solve();
    run.session.solve();
    run.solve();

    expect(names(track)).toEqual(['level_start', 'level_complete']);
    expect(track).toHaveBeenLastCalledWith('level_complete', {
      levelId: '2d-test-01',
      mode: 'campaign',
      durationMs: 12_345,
      hintsUsed: 0,
      result: 'solved',
      wrongCount: 0,
    });
    expect(onOutcome).toHaveBeenCalledTimes(1);
    expect(onOutcome).toHaveBeenCalledWith({
      status: 'solved',
      durationMs: 12_345,
      hintsUsed: 0,
      at: new Date(clock).toISOString(),
    });
    expect(run.getSnapshot()).toMatchObject({
      status: 'solved',
      durationMs: 12_345,
    });
  });

  it('sau khi xong, wrong bị bỏ qua và rời màn không ghi bỏ cuộc', () => {
    const { run, track } = setup();
    run.sceneReady();
    run.solve();
    run.wrong('a');
    run.dispose();
    expect(names(track)).toEqual(['level_start', 'level_complete']);
    expect(run.getSnapshot().wrongCount).toBe(0);
  });

  it('rời màn khi đang chơi dở: đúng một level_abandon kèm số sai và số gợi ý', () => {
    const { run, track } = setup();
    run.sceneReady();
    run.wrong('a');
    run.openHint(1);
    advance(7_000);
    run.dispose();
    run.dispose();

    expect(names(track)).toEqual(['level_start', 'hint_used', 'level_abandon']);
    expect(track).toHaveBeenLastCalledWith('level_abandon', {
      levelId: '2d-test-01',
      mode: 'campaign',
      durationMs: 7_000,
      hintsUsed: 1,
      wrongCount: 1,
    });
  });

  it('onOutcome ném lỗi: vẫn báo xong bình thường', () => {
    const { run, onOutcome } = setup();
    onOutcome.mockImplementation(() => {
      throw new Error('ghi tiến trình lỗi');
    });
    run.sceneReady();
    expect(() => run.solve()).not.toThrow();
    expect(run.getSnapshot().status).toBe('solved');
  });
});

describe('LevelRun: gợi ý', () => {
  it('hint_used chỉ ghi lần đầu mở mỗi cấp, kèm thời gian đã chơi', () => {
    const { run, track } = setup();
    run.sceneReady();
    advance(3_000);
    run.openHint(1);
    run.openHint(1);
    advance(2_000);
    run.openHint(2);

    expect(track.mock.calls.slice(1)).toEqual([
      [
        'hint_used',
        { levelId: '2d-test-01', mode: 'campaign', tier: 1, elapsedMs: 3_000 },
      ],
      [
        'hint_used',
        { levelId: '2d-test-01', mode: 'campaign', tier: 2, elapsedMs: 5_000 },
      ],
    ]);
    expect(run.getSnapshot().hintTier).toBe(2);
  });

  it('không nhảy cóc cấp gợi ý', () => {
    const { run, track } = setup();
    run.sceneReady();
    run.openHint(3);
    run.openHint(2);
    expect(names(track)).toEqual(['level_start']);
    expect(run.getSnapshot().hintTier).toBe(0);
  });

  it('xem đáp án (cấp 3): hint_used cấp 3 rồi level_complete revealed, màn kế vẫn mở nhờ onOutcome', () => {
    const { run, track, onOutcome } = setup();
    run.sceneReady();
    run.openHint(1);
    run.openHint(2);
    advance(9_000);
    run.reveal();
    run.solve(); // đã xong: bị bỏ qua

    expect(names(track)).toEqual([
      'level_start',
      'hint_used',
      'hint_used',
      'hint_used',
      'level_complete',
    ]);
    expect(track).toHaveBeenLastCalledWith('level_complete', {
      levelId: '2d-test-01',
      mode: 'campaign',
      durationMs: 9_000,
      hintsUsed: 3,
      result: 'revealed',
      wrongCount: 0,
    });
    expect(onOutcome).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'revealed', hintsUsed: 3 }),
    );
  });

  it('chưa mở cấp 2 thì không xem đáp án được', () => {
    const { run, track } = setup();
    run.sceneReady();
    run.openHint(1);
    run.reveal();
    expect(run.getSnapshot().status).toBe('playing');
    expect(names(track)).toEqual(['level_start', 'hint_used']);
  });

  it('giải đúng sau khi dùng gợi ý 1–2: hintsUsed là cấp cao nhất đã mở', () => {
    const { run, track } = setup();
    run.sceneReady();
    run.openHint(1);
    run.openHint(2);
    run.solve();
    expect(track).toHaveBeenLastCalledWith(
      'level_complete',
      expect.objectContaining({ hintsUsed: 2, result: 'solved' }),
    );
  });
});

describe('LevelRun: phản hồi sai và nút Gợi ý nhấp nháy', () => {
  it('dùng phản hồi riêng của màn khi có, không thì phản hồi chung xoay vòng', () => {
    const { run } = setup();
    run.sceneReady();
    run.wrong('a');
    expect(run.getSnapshot().feedback?.text).toBe('Sai kiểu A.');
    run.wrong('khong-co');
    expect(run.getSnapshot().feedback?.text).toBe(strings.play.wrongGeneric[1]);
    expect(run.getSnapshot().wrongCount).toBe(2);
  });

  it('mỗi lần sai là một phản hồi mới (id tăng) dù chữ giống nhau', () => {
    const { run } = setup();
    run.sceneReady();
    run.wrong('a');
    const first = run.getSnapshot().feedback?.id;
    run.wrong('a');
    expect(run.getSnapshot().feedback?.id).toBe((first ?? 0) + 1);
  });

  it('sai 3 lần liền: nút Gợi ý nhấp nháy và phản hồi nhắc tới nút đó; progress() hết nhấp nháy', () => {
    const { run } = setup();
    run.sceneReady();
    run.wrong('a');
    run.wrong('a');
    expect(run.getSnapshot().nudge).toBe(false);
    run.wrong('a');
    expect(run.getSnapshot().nudge).toBe(true);
    expect(run.getSnapshot().feedback?.text).toContain(strings.play.wrongStuck);
    run.progress();
    expect(run.getSnapshot().nudge).toBe(false);
  });

  it('20 giây không có thao tác tiến triển thì nhấp nháy; mở gợi ý thì hết', () => {
    const { run } = setup();
    run.sceneReady();
    advance(IDLE_NUDGE_MS - 1);
    expect(run.getSnapshot().nudge).toBe(false);
    advance(1);
    expect(run.getSnapshot().nudge).toBe(true);
    run.openHint(1);
    expect(run.getSnapshot().nudge).toBe(false);
  });

  it('progress() đặt lại bộ đếm 20 giây', () => {
    const { run } = setup();
    run.sceneReady();
    advance(15_000);
    run.progress();
    advance(15_000);
    expect(run.getSnapshot().nudge).toBe(false);
    advance(5_000);
    expect(run.getSnapshot().nudge).toBe(true);
  });
});

describe('LevelRun: chơi lại', () => {
  it('đang chơi dở: ghi bỏ cuộc lượt cũ, bắt đầu lượt mới (restart = true), đếm lại từ đầu và dựng lại cảnh', () => {
    const { run, track } = setup();
    run.sceneReady();
    run.wrong('a');
    run.openHint(1);
    run.restart();

    expect(names(track)).toEqual([
      'level_start',
      'hint_used',
      'level_abandon',
      'level_start',
    ]);
    expect(track).toHaveBeenLastCalledWith('level_start', {
      levelId: '2d-test-01',
      mode: 'campaign',
      attemptNo: 2,
      restart: true,
    });
    expect(run.getSnapshot()).toMatchObject({
      status: 'playing',
      wrongCount: 0,
      hintTier: 0,
      epoch: 1,
      feedback: null,
    });
  });

  it('sau khi đã giải: chơi lại không ghi bỏ cuộc, bắt đầu lượt mới, gợi ý đếm lại từ 0', () => {
    const { run, track } = setup();
    run.sceneReady();
    run.openHint(1);
    run.solve();
    run.restart();
    expect(names(track)).toEqual([
      'level_start',
      'hint_used',
      'level_complete',
      'level_start',
    ]);
    expect(run.getSnapshot().hintTier).toBe(0);
    run.solve();
    expect(
      names(track).filter((name) => name === 'level_complete'),
    ).toHaveLength(2);
  });

  it('chưa có cảnh sẵn sàng thì Chơi lại không làm gì', () => {
    const { run, track } = setup();
    run.restart();
    expect(track).not.toHaveBeenCalled();
  });
});

describe('LevelRun: chỉ tính thời gian lúc tab hiện', () => {
  it('tab ẩn thì tạm dừng đồng hồ', () => {
    const { run, track } = setup();
    run.mount();
    run.sceneReady();
    advance(10_000);
    setVisibility('hidden');
    advance(60_000);
    setVisibility('visible');
    advance(5_000);
    run.solve();
    expect(track).toHaveBeenLastCalledWith(
      'level_complete',
      expect.objectContaining({ durationMs: 15_000 }),
    );
  });

  it('tab ẩn từ 5 phút (hẹn giờ chạy được): ghi bỏ cuộc; người chơi làm tiếp thì là lượt mới', () => {
    const { run, track } = setup();
    run.mount();
    run.sceneReady();
    advance(4_000);
    setVisibility('hidden');
    advance(HIDDEN_ABANDON_MS);
    expect(names(track)).toEqual(['level_start', 'level_abandon']);
    expect(track).toHaveBeenLastCalledWith(
      'level_abandon',
      expect.objectContaining({ durationMs: 4_000 }),
    );

    setVisibility('visible');
    run.solve();
    expect(names(track)).toEqual([
      'level_start',
      'level_abandon',
      'level_start',
      'level_complete',
    ]);
    expect(track).toHaveBeenNthCalledWith(
      3,
      'level_start',
      expect.objectContaining({ attemptNo: 2, restart: false }),
    );
  });

  it('tab ẩn từ 5 phút nhưng hẹn giờ không chạy (điện thoại đóng băng tab nền): bỏ cuộc khi hiện lại', () => {
    const { run, track } = setup();
    run.mount();
    run.sceneReady();
    setVisibility('hidden');
    clock += HIDDEN_ABANDON_MS + 1_000; // chỉ đồng hồ trôi, bộ hẹn giờ không chạy
    setVisibility('visible');
    expect(names(track)).toEqual(['level_start', 'level_abandon']);
  });

  it('tab ẩn dưới 5 phút rồi hiện lại: không bỏ cuộc', () => {
    const { run, track } = setup();
    run.mount();
    run.sceneReady();
    setVisibility('hidden');
    advance(HIDDEN_ABANDON_MS - 1_000);
    setVisibility('visible');
    advance(HIDDEN_ABANDON_MS); // dù hẹn giờ cũ còn thì cũng đã bị hủy
    expect(names(track)).toEqual(['level_start']);
  });

  it('bộ đếm 20 giây không chạy khi tab ẩn', () => {
    const { run } = setup();
    run.mount();
    run.sceneReady();
    setVisibility('hidden');
    advance(IDLE_NUDGE_MS * 2);
    expect(run.getSnapshot().nudge).toBe(false);
  });

  it('pagehide (đóng tab, rời trang) ghi bỏ cuộc', () => {
    const { run, track } = setup();
    run.mount();
    run.sceneReady();
    window.dispatchEvent(new Event('pagehide'));
    expect(names(track)).toEqual(['level_start', 'level_abandon']);
  });
});

describe('LevelRun: gắn vào trang (StrictMode)', () => {
  it('StrictMode giả lập gỡ rồi gắn lại ngay: không bị tính là bỏ cuộc', async () => {
    const { run, track } = setup();
    const cleanup = run.mount();
    run.sceneReady();
    cleanup();
    run.mount();
    await Promise.resolve();
    expect(names(track)).toEqual(['level_start']);
    expect(run.getSnapshot().status).toBe('playing');
  });

  it('gỡ thật khi đang chơi dở: ghi bỏ cuộc đúng một lần', async () => {
    const { run, track } = setup();
    const cleanup = run.mount();
    run.sceneReady();
    cleanup();
    await Promise.resolve();
    expect(names(track)).toEqual(['level_start', 'level_abandon']);
  });

  it('gỡ thật sau khi đã giải: không ghi bỏ cuộc', async () => {
    const { run, track } = setup();
    const cleanup = run.mount();
    run.sceneReady();
    run.solve();
    cleanup();
    await Promise.resolve();
    expect(names(track)).toEqual(['level_start', 'level_complete']);
  });
});

describe('LevelRun: đăng ký nghe', () => {
  it('thông báo khi trạng thái đổi và giữ nguyên tham chiếu snapshot khi không đổi', () => {
    const { run } = setup();
    const listener = vi.fn();
    const unsubscribe = run.subscribe(listener);
    const before = run.getSnapshot();
    expect(run.getSnapshot()).toBe(before);

    run.sceneReady();
    expect(listener).toHaveBeenCalledTimes(1);
    expect(run.getSnapshot()).not.toBe(before);

    unsubscribe();
    run.wrong('a');
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
