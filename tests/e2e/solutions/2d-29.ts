import { meta } from '@/levels/2d-29/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Cốc 6, rỗng', exact: true }).tap(),
      feedback: meta.wrong.empty,
    },
    {
      tap: async (page) => {
        await page
          .getByRole('button', { name: 'Cốc 1, đầy', exact: true })
          .tap();
        await page
          .getByRole('button', { name: 'Cốc 4, rỗng', exact: true })
          .tap();
        await page.getByRole('button', { name: 'Thử lại', exact: true }).tap();
      },
      feedback: meta.wrong.pour,
    },
    {
      tap: async (page) => {
        await page
          .getByRole('button', { name: 'Cốc 3, đầy', exact: true })
          .tap();
        await page
          .getByRole('button', { name: 'Cốc 6, rỗng', exact: true })
          .tap();
        await page.getByRole('button', { name: 'Thử lại', exact: true }).tap();
      },
      feedback: meta.wrong.pour,
    },
  ],
  solve: async (page) => {
    await page.getByRole('button', { name: 'Cốc 2, đầy', exact: true }).tap();
    await page.getByRole('button', { name: 'Cốc 5, rỗng', exact: true }).tap();
  },
};
