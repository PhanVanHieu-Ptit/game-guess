import { meta } from '@/levels/2d-31/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Bé 1, chưa có bánh', exact: true })
          .tap(),
      feedback: meta.wrong.choose,
    },
    {
      tap: async (page) => {
        await page.getByRole('button', { name: 'Giỏ bánh', exact: true }).tap();
        await page
          .getByRole('button', { name: 'Bé 2, chưa có bánh', exact: true })
          .tap();
      },
      feedback: meta.wrong.many,
    },
    {
      tap: async (page) => {
        await page.getByRole('button', { name: 'Bánh 1', exact: true }).tap();
        await page
          .getByRole('button', { name: 'Bé 1, chưa có bánh', exact: true })
          .tap();
        await page.getByRole('button', { name: 'Bánh 2', exact: true }).tap();
        await page
          .getByRole('button', { name: 'Bé 1, đã có bánh', exact: true })
          .tap();
        await page.getByRole('button', { name: 'Thử lại', exact: true }).tap();
      },
      feedback: meta.wrong.occupied,
    },
  ],
  solve: async (page) => {
    for (const i of [1, 2]) {
      await page.getByRole('button', { name: `Bánh ${i}`, exact: true }).tap();
      await page
        .getByRole('button', { name: `Bé ${i}, chưa có bánh`, exact: true })
        .tap();
    }
    await page.getByRole('button', { name: 'Giỏ bánh', exact: true }).tap();
    await page
      .getByRole('button', { name: 'Bé 3, chưa có bánh', exact: true })
      .tap();
  },
};
