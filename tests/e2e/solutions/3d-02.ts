import type { Page } from '@playwright/test';
import { meta } from '@/levels/3d-02/meta';
import { tapSceneTarget } from '../helpers/scene-3d';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: (['cushion', 'basket', 'table'] as const).map((id) => ({
    tap: async (page: Page) => {
      await page.getByRole('button', { name: 'Về góc ban đầu' }).tap();
      await tapSceneTarget(page, id);
    },
    feedback: meta.wrong[id],
  })),
  solve: async (page) => {
    await page.getByRole('button', { name: 'Về góc ban đầu' }).tap();
    for (let i = 0; i < 5; i++)
      await page.getByRole('button', { name: 'Phải', exact: true }).tap();
    await tapSceneTarget(page, 'slippers');
    await tapSceneTarget(page, 'key');
  },
};
