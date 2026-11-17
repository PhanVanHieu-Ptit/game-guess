import { expect, type Page } from '@playwright/test';
import { meta } from '@/levels/3d-03/meta';
import { tapSceneTarget } from '../helpers/scene-3d';
import type { LevelSolution } from './types';

export async function enterCakeCount(page: Page, value: string) {
  const pad = page.locator('details').filter({ hasText: 'Nhập số bánh' });
  if (!(await pad.evaluate((node) => (node as HTMLDetailsElement).open)))
    await pad.locator('summary').tap();
  const keys = page.getByRole('group', { name: 'Bàn phím số' });
  const erase = keys.getByRole('button', { name: 'Xóa', exact: true });
  while (await erase.isEnabled()) await erase.tap();
  await keys.getByRole('button', { name: value, exact: true }).tap();
  await keys.getByRole('button', { name: 'Gửi', exact: true }).tap();
}

export async function inspectPot(page: Page) {
  await expect(
    page.getByRole('button', { name: 'Về góc ban đầu' }),
  ).toBeEnabled();
  const puzzle = page.locator('[data-lid-open]');
  if ((await puzzle.getAttribute('data-lid-open')) === 'false')
    await tapSceneTarget(page, 'lid');
  await tapSceneTarget(page, 'pot-handle');
  const tilt = page.getByRole('button', { name: 'Nghiêng nồi', exact: true });
  while (await tilt.isEnabled()) await tilt.tap();
  await expect(page.locator('canvas')).toHaveAttribute(
    'data-bottom-visible',
    'true',
  );
}

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) => enterCakeCount(page, '4'),
      feedback: meta.wrong['top-layer'],
    },
    { tap: (page) => enterCakeCount(page, '6'), feedback: meta.wrong.wrong },
  ],
  solve: async (page) => {
    await inspectPot(page);
    await enterCakeCount(page, '5');
  },
};
