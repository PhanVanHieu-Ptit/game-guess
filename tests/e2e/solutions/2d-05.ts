import { meta } from '@/levels/2d-05/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Gà trống', exact: true }).tap(),
      feedback: meta.wrong.sleep,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Mái nhà', exact: true }).tap(),
      feedback: meta.wrong.roof,
    },
  ],
  solve: async (page) => {
    await page.getByRole('button', { name: 'Đám mây', exact: true }).tap();
    await page
      .getByRole('button', { name: 'Khoảng trời bên trái', exact: true })
      .tap();
    await page.getByRole('button', { name: 'Gà trống', exact: true }).tap();
  },
};
