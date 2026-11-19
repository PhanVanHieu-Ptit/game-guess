import { meta } from '@/levels/2d-15/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Xong', exact: true }).tap(),
      feedback: meta.wrong.split,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Bảng xanh', exact: true }).tap(),
      feedback: meta.wrong.board,
    },
    {
      tap: async (page) => {
        await page
          .getByRole('button', { name: 'Khe thứ 1', exact: true })
          .tap();
        await page.getByRole('button', { name: 'Xong', exact: true }).tap();
        await page
          .getByRole('button', { name: 'Khe thứ 1', exact: true })
          .tap();
      },
      feedback: meta.wrong.split,
    },
  ],
  solve: async (page) => {
    await page.getByRole('button', { name: 'Khe thứ 2', exact: true }).tap();
    await page.getByRole('button', { name: 'Khe thứ 3', exact: true }).tap();
    await page.getByRole('button', { name: 'Xong', exact: true }).tap();
  },
};
