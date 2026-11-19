import { meta } from '@/levels/2d-23/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Cốc trái', exact: true }).tap(),
      feedback: meta.wrong.left,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Bằng nhau', exact: true }).tap(),
      feedback: meta.wrong.equal,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Không thể biết', exact: true }).tap(),
      feedback: meta.wrong.unknown,
    },
  ],
  solve: async (page) => {
    for (const stone of ['Đá lớn ở cốc trái', 'Đá nhỏ ở cốc phải']) {
      await page.getByRole('button', { name: stone, exact: true }).tap();
      await page
        .getByRole('button', { name: 'Khay đựng đá', exact: true })
        .tap();
    }
    await page.getByRole('button', { name: 'Cốc phải', exact: true }).tap();
  },
};
