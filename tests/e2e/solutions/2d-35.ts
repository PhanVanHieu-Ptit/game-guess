import { meta } from '@/levels/2d-35/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: async (page) => {
        await page.getByText('Nhập vị trí bằng chạm', { exact: true }).tap();
        await page.getByRole('button', { name: '1', exact: true }).tap();
        await page.getByRole('button', { name: 'Gửi', exact: true }).tap();
        await page.getByRole('button', { name: 'Xóa', exact: true }).tap();
      },
      feedback: meta.wrong.first,
    },
    {
      tap: async (page) => {
        await page.getByRole('button', { name: '3', exact: true }).tap();
        await page.getByRole('button', { name: 'Gửi', exact: true }).tap();
        await page.getByRole('button', { name: 'Xóa', exact: true }).tap();
      },
      feedback: meta.wrong.other,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Bạn chạy 1', exact: true }).tap(),
      feedback: meta.wrong.runner,
    },
  ],
  solve: async (page) => {
    const summary = page.getByText('Nhập vị trí bằng chạm', { exact: true });
    if (
      !(await summary.evaluate((element) =>
        element.parentElement?.hasAttribute('open'),
      ))
    )
      await summary.tap();
    await page.getByRole('button', { name: '2', exact: true }).tap();
    await page.getByRole('button', { name: 'Gửi', exact: true }).tap();
  },
};
