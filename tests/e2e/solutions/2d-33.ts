import { expect, type Page } from '@playwright/test';
import { meta } from '@/levels/2d-33/meta';
import type { LevelSolution } from './types';

export async function weighBalls(page: Page, left: number[], right: number[]) {
  await page.getByRole('button', { name: 'Dọn hai đĩa', exact: true }).tap();
  for (const [balls, side] of [
    [left, 'trái'],
    [right, 'phải'],
  ] as const) {
    for (const ball of balls) {
      await page
        .getByRole('button', { name: `Bi ${ball}, khay`, exact: true })
        .tap();
      await page
        .getByRole('button', { name: `Đặt bi lên đĩa ${side}`, exact: true })
        .tap();
    }
  }
  await page.getByRole('button', { name: 'Cân', exact: true }).tap();
}

export async function solveBalance(
  page: Page,
  order = [1, 2, 3, 4, 5, 6, 7, 8, 9],
) {
  await weighBalls(page, order.slice(0, 3), order.slice(3, 6));
  const history = page.getByTestId('weigh-history').locator('li');
  await expect(history).toHaveCount(1);
  const first = await history.last().getAttribute('data-result');
  const suspects =
    first === 'left'
      ? order.slice(0, 3)
      : first === 'right'
        ? order.slice(3, 6)
        : order.slice(6);
  await weighBalls(page, [suspects[0]], [suspects[1]]);
  await expect(history).toHaveCount(2);
  const second = await history.last().getAttribute('data-result');
  const chosen = suspects[second === 'left' ? 0 : second === 'right' ? 1 : 2];
  await page.getByRole('button', { name: 'Chọn viên nhẹ', exact: true }).tap();
  await page.getByRole('button', { name: new RegExp(`^Bi ${chosen}, `) }).tap();
}

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Cân', exact: true }).tap(),
      feedback: meta.wrong.empty,
    },
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Đặt bi lên đĩa trái', exact: true })
          .tap(),
      feedback: meta.wrong.choose,
    },
  ],
  solve: (page) => solveBalance(page),
};
