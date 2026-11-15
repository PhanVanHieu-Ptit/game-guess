import type { Page } from '@playwright/test';
import { meta } from '@/levels/2d-sample-01/meta';
import type { LevelSolution } from './types';

const option = (page: Page, label: string) =>
  page.getByRole('button', { name: label, exact: true });

// Đáp án: 2 quả. Ba lựa chọn sai, mỗi lựa chọn có phản hồi riêng trong `meta.wrong`.
export const solution: LevelSolution = {
  meta,
  mistakes: [
    { tap: (page) => option(page, '0 quả').tap(), feedback: meta.wrong['0'] },
    { tap: (page) => option(page, '1 quả').tap(), feedback: meta.wrong['1'] },
    { tap: (page) => option(page, '3 quả').tap(), feedback: meta.wrong['3'] },
  ],
  solve: (page) => option(page, '2 quả').tap(),
};
