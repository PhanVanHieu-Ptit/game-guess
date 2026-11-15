import type { HintTier } from '@/domain/hints/hint-machine';
import type { LevelId } from '@/domain/levels/types';

// Dữ liệu tiến trình lưu trên máy người chơi (docs/TECH.md mục 6). Thuần kiểu dữ liệu.

export type ResultStatus = 'solved' | 'revealed';

export interface LevelResult {
  status: ResultStatus;
  bestMs: number;
  bestHints: HintTier;
  /** Thời điểm ISO của lượt chơi gần nhất có kết quả. */
  lastSolvedAt: string;
}

export interface DailyResult {
  status: ResultStatus;
  ms: number;
  hints: HintTier;
}

export type LevelResults = Partial<Record<LevelId, LevelResult>>;

export interface DailyProgress {
  /** Khóa 'YYYY-MM-DD' theo giờ Việt Nam. */
  results: Record<string, DailyResult>;
  streak: number;
  bestStreak: number;
}

/** Phần dữ liệu được lưu lâu dài. Đổi hình dạng thì tăng `version` và viết bước nâng cấp ở migrate.ts. */
export interface ProgressData {
  version: 1;
  /** Mã ẩn danh sinh trên máy, chỉ để nối các sự kiện đo lường của cùng một máy. */
  installId: string;
  levels: LevelResults;
  /** Số lượt chơi của từng màn trên máy này (cho `attemptNo` của sự kiện `level_start`). */
  attempts: Partial<Record<LevelId, number>>;
  daily: DailyProgress;
}

/** Kết quả của một lượt chơi vừa xong (đã giải hoặc đã xem đáp án). */
export interface RunOutcome {
  status: ResultStatus;
  durationMs: number;
  hintsUsed: HintTier;
  /** Thời điểm ISO lúc xong. */
  at: string;
}
