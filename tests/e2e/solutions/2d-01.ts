import { meta } from '@/levels/2d-01/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [1, 2, 3, 4].map((index) => ({
    tap: (page) =>
      page.getByRole('button', { name: `Bé ${index}`, exact: true }).tap(),
    feedback: meta.wrong.child,
  })),
  solve: async (page) => {
    await page.getByRole('button', { name: 'Bao lì xì', exact: true }).tap();
    await page
      .getByRole('button', { name: 'Chỗ trống bên trái', exact: true })
      .tap();
    await page.getByRole('button', { name: 'Bé nhỏ nhất', exact: true }).tap();
  },
};
