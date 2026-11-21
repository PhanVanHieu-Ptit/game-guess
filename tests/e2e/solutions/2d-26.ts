import { meta } from '@/levels/2d-26/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: async (page) => {
        await page.getByText('Nhập số ký bằng chạm', { exact: true }).tap();
        await page.getByRole('button', { name: '3', exact: true }).tap();
        await page.getByRole('button', { name: 'Gửi', exact: true }).tap();
        await page.getByRole('button', { name: 'Xóa', exact: true }).tap();
      },
      feedback: meta.wrong.total,
    },
    {
      tap: async (page) => {
        await page.getByRole('button', { name: '1', exact: true }).tap();
        await page.getByRole('button', { name: 'Gửi', exact: true }).tap();
        await page.getByRole('button', { name: 'Xóa', exact: true }).tap();
      },
      feedback: meta.wrong.other,
    },
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Rổ cam trên cân', exact: true })
          .tap(),
      feedback: meta.wrong.basket,
    },
  ],
  solve: async (page) => {
    const summary = page.getByText('Nhập số ký bằng chạm', { exact: true });
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
