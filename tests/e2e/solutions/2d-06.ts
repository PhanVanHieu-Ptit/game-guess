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
  solve: (page) =>
    page
      .locator('[data-testid="prompt"]')
      .getByRole('button', { name: 'các', exact: true })
      .tap(),
};
