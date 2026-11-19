import { meta } from '@/levels/2d-22/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Bóng bên phải phía dưới', exact: true })
          .tap(),
      feedback: meta.wrong.right,
    },
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Bóng bên phải phía trên', exact: true })
          .tap(),
      feedback: meta.wrong.up,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Mặt trời', exact: true }).tap(),
      feedback: meta.wrong.sun,
    },
  ],
  solve: (page) =>
    page.getByRole('button', { name: 'Bóng bên trái', exact: true }).tap(),
};
