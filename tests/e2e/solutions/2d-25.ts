import { meta } from '@/levels/2d-25/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Ngôi nhà', exact: true }).tap(),
      feedback: meta.wrong.house,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Bụi cây', exact: true }).tap(),
      feedback: meta.wrong.bush,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Thân ốc sên', exact: true }).tap(),
      feedback: meta.wrong.body,
    },
  ],
  solve: (page) =>
    page.getByRole('button', { name: 'Vỏ ốc sên', exact: true }).tap(),
};
