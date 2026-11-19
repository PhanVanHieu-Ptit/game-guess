import { meta } from '@/levels/2d-20/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Túi nhãn CAM ban đầu', exact: true })
          .tap(),
      feedback: meta.wrong.draw,
    },
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Túi nhãn BƯỞI ban đầu', exact: true })
          .tap(),
      feedback: meta.wrong.draw,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Nhãn CAM', exact: true }).tap(),
      feedback: meta.wrong.first,
    },
  ],
  solve: async (page) => {
    await page
      .getByRole('button', { name: 'Túi nhãn CAM + BƯỞI ban đầu', exact: true })
      .tap();
    const orange = await page
      .getByRole('img', { name: 'Quả đã lấy: cam', exact: true })
      .isVisible();
    for (const [label, bag] of orange
      ? [
          ['CAM', 'CAM + BƯỞI'],
          ['BƯỞI', 'CAM'],
          ['CAM + BƯỞI', 'BƯỞI'],
        ]
      : [
          ['CAM', 'BƯỞI'],
          ['BƯỞI', 'CAM + BƯỞI'],
          ['CAM + BƯỞI', 'CAM'],
        ]) {
      await page
        .getByRole('button', { name: `Nhãn ${label}`, exact: true })
        .tap();
      await page
        .getByRole('button', { name: `Túi nhãn ${bag} ban đầu`, exact: true })
        .tap();
    }
  },
};
