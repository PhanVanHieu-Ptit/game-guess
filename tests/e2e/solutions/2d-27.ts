import { meta } from '@/levels/2d-27/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: async (page) => {
        await page.getByText('Nhập số góc bằng chạm', { exact: true }).tap();
        await page.getByRole('button', { name: '3', exact: true }).tap();
        await page.getByRole('button', { name: 'Gửi', exact: true }).tap();
        await page.getByRole('button', { name: 'Xóa', exact: true }).tap();
      },
      feedback: meta.wrong.subtract,
    },
    {
      tap: async (page) => {
        await page.getByRole('button', { name: '4', exact: true }).tap();
        await page.getByRole('button', { name: 'Gửi', exact: true }).tap();
        await page.getByRole('button', { name: 'Xóa', exact: true }).tap();
      },
      feedback: meta.wrong.other,
    },
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Mảnh giấy đã cắt rời', exact: true })
          .tap(),
      feedback: meta.wrong.scrap,
    },
  ],
  solve: async (page) => {
    const summary = page.getByText('Nhập số góc bằng chạm', { exact: true });
    if (
      !(await summary.evaluate((element) =>
        element.parentElement?.hasAttribute('open'),
      ))
    )
      await summary.tap();
    await page.getByRole('button', { name: '5', exact: true }).tap();
    await page.getByRole('button', { name: 'Gửi', exact: true }).tap();
  },
};
