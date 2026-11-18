import { meta } from '@/levels/2d-14/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Con lươn', exact: true }).tap(),
      feedback: meta.wrong.eel,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Bàn tay', exact: true }).tap(),
      feedback: meta.wrong.hand,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Rổ tre', exact: true }).tap(),
      feedback: meta.wrong.basket,
    },
  ],
  solve: async (page) => {
    await page.getByRole('button', { name: 'Chén tro bếp', exact: true }).tap();
    await page.getByRole('button', { name: 'Bàn tay', exact: true }).tap();
    await page.getByRole('button', { name: 'Con lươn', exact: true }).tap();
  },
};
