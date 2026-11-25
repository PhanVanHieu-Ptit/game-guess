import { meta } from '@/levels/2d-03/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Bé qua đường', exact: true }).tap(),
      feedback: meta.wrong.child,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Xe màu vàng', exact: true }).tap(),
      feedback: meta.wrong.car,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Xe màu tím', exact: true }).tap(),
      feedback: meta.wrong.car,
    },
  ],
  solve: async (page) => {
    await page
      .getByRole('button', { name: 'Đèn giao thông', exact: true })
      .tap();
    await page.getByRole('button', { name: 'Bé qua đường', exact: true }).tap();
  },
};
