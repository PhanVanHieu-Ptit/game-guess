import { meta } from '@/levels/2d-32/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: async (page) => {
        await page.getByText('Nhập số ngày bằng chạm', { exact: true }).tap();
        await page.getByRole('button', { name: '5', exact: true }).tap();
        await page.getByRole('button', { name: 'Gửi', exact: true }).tap();
        await page.getByRole('button', { name: 'Xóa', exact: true }).tap();
      },
      feedback: meta.wrong.five,
    },
    {
      tap: async (page) => {
        await page.getByRole('button', { name: '2', exact: true }).tap();
        await page.getByRole('button', { name: 'Gửi', exact: true }).tap();
        await page.getByRole('button', { name: 'Xóa', exact: true }).tap();
      },
      feedback: meta.wrong.other,
    },
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Bức tường cao 5 m', exact: true })
          .tap(),
      feedback: meta.wrong.wall,
    },
  ],
  solve: async (page) => {
    const summary = page.getByText('Nhập số ngày bằng chạm', { exact: true });
    if (
      !(await summary.evaluate((element) =>
        element.parentElement?.hasAttribute('open'),
      ))
    )
      await summary.tap();
    await page.getByRole('button', { name: '3', exact: true }).tap();
    await page.getByRole('button', { name: 'Gửi', exact: true }).tap();
  },
};
