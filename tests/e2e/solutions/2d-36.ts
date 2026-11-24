import { meta } from '@/levels/2d-36/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page
          .getByRole('button', {
            name: 'Chữ ĐỎ tô màu xanh dương',
            exact: true,
          })
          .tap(),
      feedback: meta.wrong.red,
    },
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Chữ VÀNG tô màu tím', exact: true })
          .tap(),
      feedback: meta.wrong.yellow,
    },
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Chữ TÍM tô màu vàng', exact: true })
          .tap(),
      feedback: meta.wrong.purple,
    },
  ],
  solve: (page) =>
    page.getByRole('button', { name: 'Chữ XANH tô màu đỏ', exact: true }).tap(),
};
