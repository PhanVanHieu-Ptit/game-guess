import type { Page } from '@playwright/test';
import { meta } from '@/levels/2d-38/meta';
import type { LevelSolution } from './types';

export async function jugStep(page: Page, label: string) {
  await page.getByRole('button', { name: label, exact: true }).tap();
}

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) => jugStep(page, 'Rót bình 5 sang bình 3'),
      feedback: meta.wrong.empty,
    },
    {
      tap: async (page) => {
        await jugStep(page, 'Lấy đầy bình 5 lít');
        await jugStep(page, 'Lấy đầy bình 5 lít');
      },
      feedback: meta.wrong.full,
    },
    {
      tap: async (page) => {
        await jugStep(page, 'Lấy đầy bình 3 lít');
        await jugStep(page, 'Rót bình 5 sang bình 3');
      },
      feedback: meta.wrong.blocked,
    },
  ],
  solve: async (page) => {
    await jugStep(page, 'Thử lại');
    for (const label of [
      'Lấy đầy bình 5 lít',
      'Rót bình 5 sang bình 3',
      'Đổ hết bình 3 lít',
      'Rót bình 5 sang bình 3',
      'Lấy đầy bình 5 lít',
      'Rót bình 5 sang bình 3',
    ])
      await jugStep(page, label);
  },
};
