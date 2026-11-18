import { meta } from '@/levels/2d-08/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: async (page) => {
        await page.getByRole('textbox').fill('bí mật');
        await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
      },
      feedback: meta.wrong.same,
    },
    {
      tap: async (page) => {
        await page.getByRole('textbox').fill('mật bí');
        await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
      },
      feedback: meta.wrong.reversed,
    },
    {
      tap: async (page) => {
        await page.getByRole('textbox').fill('thần bí');
        await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
      },
      feedback: meta.wrong.other,
    },
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Chiếc rương bí mật', exact: true })
          .tap(),
      feedback: meta.wrong.open_box,
    },
  ],
  solve: async (page) => {
    await page.getByRole('textbox').fill('bật mí');
    await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
  },
};
