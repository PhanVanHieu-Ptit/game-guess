import { meta } from '@/levels/2d-07/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Quả bên trái', exact: true }).tap(),
      feedback: meta.wrong.left,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Quả bên phải', exact: true }).tap(),
      feedback: meta.wrong.right,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Không thể biết', exact: true }).tap(),
      feedback: meta.wrong.unknown,
    },
  ],
  solve: (page) =>
    page.getByRole('button', { name: 'Bằng nhau', exact: true }).tap(),
};
