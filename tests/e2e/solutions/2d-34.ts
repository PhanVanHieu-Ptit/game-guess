import type { Page } from '@playwright/test';
import { meta } from '@/levels/2d-34/meta';
import type { LevelSolution } from './types';

export async function sail(page: Page, passenger: string | null = null) {
  if (passenger)
    await page
      .getByRole('button', { name: new RegExp(`^${passenger}, bờ `) })
      .tap();
  await page.getByRole('button', { name: /^Chèo thuyền sang bờ / }).tap();
}

export const solution: LevelSolution = {
  meta,
  mistakes: [
    { tap: (page) => sail(page), feedback: meta.wrong.wolf },
    { tap: (page) => sail(page, 'Sói'), feedback: meta.wrong.cabbage },
    { tap: (page) => sail(page, 'Bắp cải'), feedback: meta.wrong.wolf },
    {
      tap: async (page) => {
        await sail(page, 'Dê');
        await page
          .getByRole('button', { name: 'Sói, bờ trái', exact: true })
          .tap();
        await page.getByRole('button', { name: 'Thử lại', exact: true }).tap();
      },
      feedback: meta.wrong.shore,
    },
  ],
  solve: async (page) => {
    for (const passenger of ['Dê', null, 'Sói', 'Dê', 'Bắp cải', null, 'Dê'])
      await sail(page, passenger);
  },
};
