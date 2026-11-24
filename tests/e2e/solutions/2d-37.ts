import { meta } from '@/levels/2d-37/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: async (page) => {
        await page.getByText('Nhập giá túi bằng chạm', { exact: true }).tap();
        for (const digit of ['1', '0', '0', '0'])
          await page.getByRole('button', { name: digit, exact: true }).tap();
        await page.getByRole('button', { name: 'Gửi', exact: true }).tap();
        for (let i = 0; i < 4; i++)
          await page.getByRole('button', { name: 'Xóa', exact: true }).tap();
      },
      feedback: meta.wrong.thousand,
    },
    {
      tap: async (page) => {
        for (const digit of ['1', '0', '0', '0', '0'])
          await page.getByRole('button', { name: digit, exact: true }).tap();
        await page.getByRole('button', { name: 'Gửi', exact: true }).tap();
        for (let i = 0; i < 5; i++)
          await page.getByRole('button', { name: 'Xóa', exact: true }).tap();
      },
      feedback: meta.wrong.other,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Chiếc bánh', exact: true }).tap(),
      feedback: meta.wrong.cake,
    },
  ],
  solve: async (page) => {
    const summary = page.getByText('Nhập giá túi bằng chạm', { exact: true });
    if (
      !(await summary.evaluate((element) =>
        element.parentElement?.hasAttribute('open'),
      ))
    )
      await summary.tap();
    for (const digit of ['5', '0', '0'])
      await page.getByRole('button', { name: digit, exact: true }).tap();
    await page.getByRole('button', { name: 'Gửi', exact: true }).tap();
  },
};
