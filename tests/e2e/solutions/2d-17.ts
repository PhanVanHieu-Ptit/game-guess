import { meta } from '@/levels/2d-17/meta';
import type { LevelSolution } from './types';
export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Đồng hồ trong gương', exact: true })
          .tap(),
      feedback: meta.wrong.clock,
    },
    {
      tap: async (page) => {
        await page.getByLabel('Giờ thật', { exact: true }).fill('3:40');
        await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
      },
      feedback: meta.wrong.mirror,
    },
    {
      tap: async (page) => {
        await page.getByLabel('Giờ thật', { exact: true }).fill('9:20');
        await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
      },
      feedback: meta.wrong.other,
    },
  ],
  solve: async (page) => {
    await page.getByText('Nhập giờ bằng chạm', { exact: true }).tap();
    for (const digit of ['8', '2', '0'])
      await page.getByRole('button', { name: digit, exact: true }).tap();
    await page.getByRole('button', { name: 'Gửi', exact: true }).tap();
  },
};
