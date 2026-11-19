import { meta } from '@/levels/2d-24/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Cổng B', exact: true }).tap(),
      feedback: meta.wrong.b,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Cổng C', exact: true }).tap(),
      feedback: meta.wrong.c,
    },
  ],
  solve: (page) =>
    page.getByRole('button', { name: 'Cổng A', exact: true }).tap(),
};
