import { meta } from '@/levels/2d-39/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Kiểm tra', exact: true }).tap(),
      feedback: meta.wrong.empty,
    },
    {
      tap: async (page) => {
        await page.getByRole('button', { name: 'Thẻ A', exact: true }).tap();
        await page.getByRole('button', { name: 'Thẻ 4', exact: true }).tap();
        await page.getByRole('button', { name: 'Kiểm tra', exact: true }).tap();
      },
      feedback: meta.wrong.four,
    },
    {
      tap: async (page) => {
        await page.getByRole('button', { name: 'Thẻ 4', exact: true }).tap();
        await page.getByRole('button', { name: 'Kiểm tra', exact: true }).tap();
      },
      feedback: meta.wrong.missing,
    },
    {
      tap: async (page) => {
        await page.getByRole('button', { name: 'Thẻ B', exact: true }).tap();
        await page.getByRole('button', { name: 'Thẻ 7', exact: true }).tap();
        await page.getByRole('button', { name: 'Kiểm tra', exact: true }).tap();
      },
      feedback: meta.wrong.extra,
    },
  ],
  solve: async (page) => {
    await page.getByRole('button', { name: 'Bỏ chọn hết', exact: true }).tap();
    for (const card of ['A', '7'])
      await page
        .getByRole('button', { name: `Thẻ ${card}`, exact: true })
        .tap();
    await page.getByRole('button', { name: 'Kiểm tra', exact: true }).tap();
  },
};
