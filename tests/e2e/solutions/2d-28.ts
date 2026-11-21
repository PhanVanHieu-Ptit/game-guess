import { meta } from '@/levels/2d-28/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Thứ Năm', exact: true }).tap(),
      feedback: meta.wrong.thursday,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Thứ Bảy', exact: true }).tap(),
      feedback: meta.wrong.saturday,
    },
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Chủ nhật', exact: true }).tap(),
      feedback: meta.wrong.sunday,
    },
    {
      tap: (page) =>
        page
          .getByRole('button', {
            name: 'Cuốn lịch chưa điền ngày',
            exact: true,
          })
          .tap(),
      feedback: meta.wrong.calendar,
    },
  ],
  solve: (page) =>
    page.getByRole('button', { name: 'Thứ Sáu', exact: true }).tap(),
};
