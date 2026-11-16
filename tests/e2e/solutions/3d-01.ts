import { expect, type Page } from '@playwright/test';
import { meta } from '@/levels/3d-01/meta';
import type { LevelSolution } from './types';

export async function enterHouseNumber(page: Page, value: string) {
  const pad = page.locator('details').filter({ hasText: 'Nhập số nhà' });
  if (!(await pad.evaluate((node) => (node as HTMLDetailsElement).open)))
    await pad.locator('summary').tap();
  const keys = page.getByRole('group', { name: 'Bàn phím số' });
  const erase = keys.getByRole('button', { name: 'Xóa', exact: true });
  while (await erase.isEnabled()) await erase.tap();
  for (const digit of value)
    await keys.getByRole('button', { name: digit, exact: true }).tap();
  await keys.getByRole('button', { name: 'Gửi', exact: true }).tap();
}

export const solution: LevelSolution = {
  meta,
  mistakes: [
    { tap: (page) => enterHouseNumber(page, '35'), feedback: meta.wrong.wrong },
    {
      tap: (page) => enterHouseNumber(page, '63'),
      feedback: meta.wrong.reversed,
    },
  ],
  solve: async (page) => {
    const reset = page.getByRole('button', { name: 'Về góc ban đầu' });
    await expect(reset).toBeEnabled();
    await reset.tap();
    for (let i = 0; i < 14; i++)
      await page.getByRole('button', { name: 'Phải', exact: true }).tap();
    await page.getByRole('button', { name: 'Lên', exact: true }).tap();
    await expect(page.locator('[data-number-readable]')).toHaveAttribute(
      'data-number-readable',
      'true',
    );
    await enterHouseNumber(page, '36');
  },
};
