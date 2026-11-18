import { meta } from '@/levels/2d-11/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Xe đạp', exact: true }).tap(),
      feedback: meta.wrong.bike,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Cặp sách', exact: true }).tap(),
      feedback: meta.wrong.bag,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Nón', exact: true }).tap(),
      feedback: meta.wrong.hat,
    },
  ],
  solve: (page) =>
    page.getByRole('button', { name: 'Bảng tên trên áo', exact: true }).tap(),
};
