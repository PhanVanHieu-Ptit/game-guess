// Kiểu dữ liệu của màn chơi (thiết kế ở docs/TECH.md mục 5.1). Thuần TypeScript: không React, không DOM.
// Phần phụ thuộc React (SceneProps, LevelScene, Level = dữ liệu + component) nằm ở src/engine/scene.ts để domain/ giữ thuần.

import type { LevelPrompt } from './prompt';

/** Mã màn ổn định, viết thường (`2d-02`, `3d-01`). Là khóa của tiến trình, đo lường và tên thư mục. */
export type LevelId = `2d-${string}` | `3d-${string}`;

export type LevelKind = '2d' | '3d';

/** Kiểu tư duy (docs/LEVELS.md, cột Cơ chế). */
export type Thinking = 'wordplay' | 'read' | 'visual' | 'physics' | 'logic';

/** Thao tác chính của màn. */
export type Input =
  | 'type'
  | 'tap'
  | 'drag'
  | 'shake'
  | 'tilt'
  | 'hold'
  | 'wait'
  | 'choose'
  | 'rotate';

/** Thang độ khó 1–5 (docs/GDD.md mục 11). */
export type Difficulty = 1 | 2 | 3 | 4 | 5;

/** Chiến dịch (25 màn) hay câu đố mỗi ngày. */
export type PlayMode = 'campaign' | 'daily';

export interface LevelMeta {
  id: LevelId;
  /** Thứ tự chơi, bắt đầu từ 1. */
  ordinal: number;
  kind: LevelKind;
  /** Hiện ở chọn màn sau khi mở; không được lộ mẹo. */
  title: string;
  /**
   * Đề bài, chữ thật của trang, ≤ 120 ký tự (không tính phần đánh dấu). Là một câu chữ, hoặc danh sách đoạn khi có
   * chữ chạm được (`['Chạm vào ', word('các'), ' hình']`, xem `domain/levels/prompt.ts`).
   */
  prompt: LevelPrompt;
  thinking: Thinking;
  input: Input;
  difficulty: Difficulty;
  /** Mơ hồ → rõ → xem đáp án; mỗi gợi ý ≤ 120 ký tự. */
  hints: readonly [string, string, string];
  /** Câu giải thích hiện sau khi xong màn, ≤ 140 ký tự. */
  explanation: string;
  /** Phản hồi cho lỗi điển hình; khóa do màn đặt và truyền vào `onWrong(code)`, mỗi câu ≤ 60 ký tự. */
  wrong?: Readonly<Record<string, string>>;
  /** Bắt buộc với màn có thao tác lắc: mô tả cách thay bằng chạm. */
  sensors?: {
    shake?: { touchFallback: string };
    tilt?: { touchFallback: string };
  };
  /** Phục vụ rà nguyên bản (docs/GDD.md, giả định G15). */
  source: 'original' | 'folk' | 'classic';
}

/**
 * Cầu nối giữa lượt chơi (`LevelRun`) và cảnh của màn (docs/TECH.md mục 5.1, 5.4). Cảnh không dùng trực tiếp:
 * khung chơi chuyển nó thành ba prop `onSolved`, `onWrong`, `onProgress` của `SceneProps` (src/engine/scene.ts).
 */
export interface LevelSession {
  /** Báo đúng; chỉ có tác dụng một lần. */
  solve(): void;
  /** Báo sai; `code` tra trong `meta.wrong`, không có thì dùng câu chung. */
  wrong(code?: string): void;
  /** Có thao tác tiến triển: đặt lại bộ đếm "bí" 20 giây. */
  progress(): void;
}
