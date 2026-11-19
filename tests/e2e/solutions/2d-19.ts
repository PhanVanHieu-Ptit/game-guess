import { meta } from '@/levels/2d-19/meta';
import type { LevelSolution } from './types';
export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Các que ở số 3', exact: true }).tap(),
      feedback: meta.wrong.number,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Dấu bằng', exact: true }).tap(),
      feedback: meta.wrong.equal,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Dấu trừ', exact: true }).tap(),
      feedback: meta.wrong.sign,
    },
  ],
  solve: async (page) => {
    await page
      .getByRole('button', { name: 'Que trên bên phải số 8', exact: true })
      .tap();
    await page.getByRole('button', { name: 'Dấu trừ', exact: true }).tap();
  },
};
