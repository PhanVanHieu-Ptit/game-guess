import { meta } from '@/levels/2d-10/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: async (page) => {
        await page.getByRole('textbox').fill('6');
        await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
      },
      feedback: meta.wrong.six,
    },
    {
      tap: async (page) => {
        await page.getByRole('textbox').fill('8');
        await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
      },
      feedback: meta.wrong.other,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Đàn vịt', exact: true }).tap(),
      feedback: meta.wrong.duck,
    },
  ],
  solve: async (page) => {
    await page.getByRole('textbox').fill('4');
    await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
  },
};
