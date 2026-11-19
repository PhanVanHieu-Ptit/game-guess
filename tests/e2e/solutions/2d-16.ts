import { meta } from '@/levels/2d-16/meta';
import type { LevelSolution } from './types';
export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Thúng 6 ký', exact: true }).tap(),
      feedback: meta.wrong.basket,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Thúng 3 ký', exact: true }).tap(),
      feedback: meta.wrong.basket,
    },
    {
      tap: async (page) => {
        await page.getByRole('button', { name: 'Vai bà', exact: true }).tap();
        await page
          .getByRole('button', { name: 'Đặt vai ở 2/3 đòn gánh', exact: true })
          .tap();
      },
      feedback: meta.wrong.miss,
    },
  ],
  solve: async (page) => {
    await page.getByRole('button', { name: 'Vai bà', exact: true }).tap();
    await page
      .getByRole('button', { name: 'Đặt vai ở 1/3 đòn gánh', exact: true })
      .tap();
  },
};
