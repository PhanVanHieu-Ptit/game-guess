import type { Page } from '@playwright/test';
import type { LevelMeta } from '@/domain/levels/types';

// Kịch bản giải một màn bằng thao tác chạm (docs/TECH.md mục 5.6, bước 4 và mục 11). Mỗi màn có một file
// `tests/e2e/solutions/<mã màn>.ts` xuất `solution`. Chỉ dùng chạm (`locator.tap()`), không chuột, không phím tắt,
// không cảm biến, nên chính kịch bản này chứng minh màn giải được chỉ bằng chạm (Definition of Done mục 5).

export interface Mistake {
  /** Một thao tác sai điển hình, chỉ bằng chạm. */
  tap: (page: Page) => Promise<void>;
  /** Phản hồi riêng mà màn phải hiện cho thao tác đó (lấy từ `meta.wrong`). */
  feedback: string;
}

export interface LevelSolution {
  meta: LevelMeta;
  /** Các thao tác sai điển hình, mỗi cái dùng một lần cho mỗi lượt chơi. */
  mistakes: readonly Mistake[];
  /** Thao tác đúng. */
  solve: (page: Page) => Promise<void>;
}
