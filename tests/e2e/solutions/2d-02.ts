import { meta } from '@/levels/2d-02/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Con cá', exact: true }).tap(),
      feedback: meta.wrong.animal,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Con tôm', exact: true }).tap(),
      feedback: meta.wrong.shrimp,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Mặt nước', exact: true }).tap(),
      feedback: meta.wrong.water,
    },
  ],
  solve: (page) =>
    page.getByRole('button', { name: 'Con cua', exact: true }).tap(),
};
