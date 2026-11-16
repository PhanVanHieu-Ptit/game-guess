import { meta } from '@/levels/2d-05/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Bên trái', exact: true }).tap(),
      feedback: meta.wrong.left,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Bên phải', exact: true }).tap(),
      feedback: meta.wrong.right,
    },
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Rơi thẳng xuống', exact: true })
          .tap(),
      feedback: meta.wrong.down,
    },
  ],
  solve: (page) =>
    page
      .getByRole('button', { name: 'Gà trống không đẻ trứng', exact: true })
      .tap(),
};
