import type { Page } from '@playwright/test';
import { meta } from '@/levels/2d-sample-02/meta';
import type { LevelSolution } from './types';

const option = (page: Page, label: string) =>
  page.getByRole('button', { name: label, exact: true });

// Đáp án: cả 12 tháng. Ba lựa chọn sai, mỗi lựa chọn có phản hồi riêng trong `meta.wrong`.
export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) => option(page, 'Chỉ tháng 2').tap(),
      feedback: meta.wrong.feb,
    },
    { tap: (page) => option(page, '6 tháng').tap(), feedback: meta.wrong.six },
    {
      tap: (page) => option(page, '11 tháng').tap(),
      feedback: meta.wrong.eleven,
    },
  ],
  solve: (page) => option(page, 'Cả 12 tháng').tap(),
};
