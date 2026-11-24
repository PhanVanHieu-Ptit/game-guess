import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-13';

test('2D-13: chạm sông/giữ ngắn chưa thắng; giữ liên tục bốn giây thì sang bờ', async ({
  page,
  events,
}, testInfo) => {
  await openCampaignLevel(page, solution.meta.id);
  await expect(
    page.getByRole('button', { name: 'Cây tre tay vịn' }),
  ).toBeVisible();
  await expectLayoutOk(page, solution.meta.id);
  await page.screenshot({
    path: testInfo.outputPath('2d-13.png'),
    animations: 'disabled',
  });
  for (const mistake of solution.mistakes) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  const rail = page.getByRole('button', { name: 'Cây tre tay vịn' });
  const pointer = {
    pointerId: 61,
    pointerType: 'touch',
    isPrimary: true,
    button: 0,
  };
  await rail.dispatchEvent('pointerdown', pointer);
  await page.waitForTimeout(2400);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await rail.dispatchEvent('pointerup', pointer);
  await expect(
    page.getByRole('progressbar', { name: 'Bé qua cầu' }),
  ).toHaveAttribute('value', '0');
  await page.waitForTimeout(1800);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
    { timeout: 1000 },
  );
  await expect(page.locator('[data-crossing]')).toHaveAttribute(
    'data-crossing',
    'across',
  );
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toMatchObject([{ result: 'solved', wrongCount: 3 }]);
});

test('2D-13: hủy con trỏ và chơi lại đều xóa thời gian giữ', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  const rail = page.getByRole('button', { name: 'Cây tre tay vịn' });
  const pointer = {
    pointerId: 62,
    pointerType: 'touch',
    isPrimary: true,
    button: 0,
  };
  await rail.dispatchEvent('pointerdown', pointer);
  await page.waitForTimeout(800);
  await rail.dispatchEvent('pointercancel', pointer);
  await expect(
    page.getByRole('progressbar', { name: 'Bé qua cầu' }),
  ).toHaveAttribute('value', '0');
  await page.waitForTimeout(3500);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .tap();
  await expect(
    page.getByRole('progressbar', { name: 'Bé qua cầu' }),
  ).toHaveAttribute('value', '0');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
