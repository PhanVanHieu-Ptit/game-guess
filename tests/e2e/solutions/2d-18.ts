import { meta } from '@/levels/2d-18/meta';
import type { LevelSolution } from './types';
export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Đàn trâu của ba anh em', exact: true })
          .tap(),
      feedback: meta.wrong.divide,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Hàng rào', exact: true }).tap(),
      feedback: meta.wrong.fence,
    },
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Trả về hàng xóm', exact: true })
          .tap({ position: { x: 12, y: 12 } }),
      feedback: meta.wrong.fence,
    },
  ],
  solve: async (page) => {
    await page
      .getByRole('button', { name: 'Trâu hàng xóm', exact: true })
      .tap();
    await page
      .getByRole('button', { name: 'Đàn trâu của ba anh em', exact: true })
      .tap();
    await page.getByRole('button', { name: 'Trâu còn dư', exact: true }).tap();
    await page
      .getByRole('button', { name: 'Trả về hàng xóm', exact: true })
      .tap();
  },
};
