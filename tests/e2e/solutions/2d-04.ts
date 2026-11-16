import { meta } from '@/levels/2d-04/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Quả xoài', exact: true }).tap(),
      feedback: meta.wrong.mango,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Giỏ hứng xoài', exact: true }).tap(),
      feedback: meta.wrong.basket,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Bé hái xoài', exact: true }).tap(),
      feedback: meta.wrong.child,
    },
  ],
  solve: async (page) => {
    for (let index = 0; index < 3; index++)
      await page.getByRole('button', { name: 'Thân cây', exact: true }).tap();
  },
};
