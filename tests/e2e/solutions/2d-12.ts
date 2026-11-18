import { expect } from '@playwright/test';
import { meta } from '@/levels/2d-12/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Bấm còi · Bíp bíp!' }).tap(),
      feedback: meta.wrong.horn,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Xe đỏ', exact: true }).tap(),
      feedback: meta.wrong.car,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Xe xanh', exact: true }).tap(),
      feedback: meta.wrong.car,
    },
  ],
  solve: async (page) => {
    await expect(page.getByRole('dialog')).toContainText(meta.explanation, {
      timeout: 7500,
    });
  },
};
