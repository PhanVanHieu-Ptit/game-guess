import { meta } from '@/levels/2d-02/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: async (page) => {
        await page.getByRole('textbox', { name: 'Đáp án của bạn' }).fill('cá');
        await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
      },
      feedback: meta.wrong.animal,
    },
    {
      tap: async (page) => {
        await page.getByRole('textbox', { name: 'Đáp án của bạn' }).fill('tôm');
        await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
      },
      feedback: meta.wrong.shrimp,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Mặt nước', exact: true }).tap(),
      feedback: meta.wrong.water,
    },
  ],
  solve: async (page) => {
    await page.getByRole('textbox', { name: 'Đáp án của bạn' }).fill('cua');
    await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
  },
};
