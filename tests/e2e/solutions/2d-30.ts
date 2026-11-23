import { meta } from '@/levels/2d-30/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Cây nến', exact: true }).tap(),
      feedback: meta.wrong.candle,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Đèn dầu', exact: true }).tap(),
      feedback: meta.wrong.lamp,
    },
  ],
  solve: (page) =>
    page.getByRole('button', { name: 'Que diêm chưa châm', exact: true }).tap(),
};
