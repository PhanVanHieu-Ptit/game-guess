import { meta } from '@/levels/2d-21/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Đèn đã tắt', exact: true }).tap(),
      feedback: meta.wrong.lamp,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Mặt trăng', exact: true }).tap(),
      feedback: meta.wrong.moon,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Giường của bé', exact: true }).tap(),
      feedback: meta.wrong.bed,
    },
  ],
  solve: async (page) => {
    await page.getByRole('button', { name: 'Rèm cửa', exact: true }).tap();
    // Điểm giữa cửa sổ nằm trên thanh chia, không trùng mặt trăng.
    await page.getByRole('button', { name: 'Cửa sổ', exact: true }).tap();
  },
};
