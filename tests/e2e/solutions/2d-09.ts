import { meta } from '@/levels/2d-09/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: async (page) => {
        await page
          .getByRole('button', { name: 'Điền họ tên', exact: true })
          .tap();
        await page.getByRole('button', { name: 'Nộp bài', exact: true }).tap();
      },
      feedback: meta.wrong.redundant,
    },
    {
      tap: async (page) => {
        await page
          .getByRole('button', { name: 'Tính câu 2', exact: true })
          .tap();
        await page.getByRole('button', { name: 'Nộp bài', exact: true }).tap();
      },
      feedback: meta.wrong.redundant,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Điền họ tên', exact: true }).tap(),
      feedback: meta.wrong.name,
    },
  ],
  solve: async (page) => {
    await page.getByRole('button', { name: 'Nộp bài', exact: true }).tap();
    if ((await page.getByRole('dialog').count()) === 0) {
      await page.getByRole('button', { name: 'Nộp bài', exact: true }).tap();
    }
  },
};
