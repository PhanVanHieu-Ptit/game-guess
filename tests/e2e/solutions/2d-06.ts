import { meta } from '@/levels/2d-06/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Cần câu', exact: true }).tap(),
      feedback: meta.wrong.fishing_rod,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Lá sen', exact: true }).tap(),
      feedback: meta.wrong.lotus,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Hoa sen', exact: true }).tap(),
      feedback: meta.wrong.lotus,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Mặt nước', exact: true }).tap(),
      feedback: meta.wrong.water,
    },
  ],
  solve: async (page) => {
    await page
      .locator('[data-testid="prompt"]')
      .getByRole('button', { name: 'cá', exact: true })
      .tap();
    await page
      .getByRole('button', { name: 'Cá vừa tìm thấy', exact: true })
      .tap();
    await page
      .getByRole('button', { name: 'Giỏ của ngoại', exact: true })
      .tap();
  },
};
