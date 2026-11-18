import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-12';

test('2D-12: còi/xe chỉ tăng ồn; chạm lại phải chờ mới đủ sáu giây', async ({
  page,
  events,
}, testInfo) => {
  await openCampaignLevel(page, solution.meta.id);
  await expect(
    page.getByRole('button', { name: 'Xe đỏ', exact: true }),
  ).toBeVisible();
  await expectLayoutOk(page, solution.meta.id);
  await page.screenshot({
    path: testInfo.outputPath('2d-12.png'),
    animations: 'disabled',
  });
  for (const mistake of solution.mistakes) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  await expect(page.getByTestId('puzzle-art')).toHaveAttribute(
    'data-reaction',
    '3',
  );
  await expect(
    page.getByRole('status').filter({ hasText: 'Độ ồn:' }),
  ).toContainText('Độ ồn: 3');
  await page.waitForTimeout(3500);
  await solution.mistakes[0].tap(page);
  await page.waitForTimeout(3500);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await solution.solve(page);
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toMatchObject([{ result: 'solved', wrongCount: 4 }]);
  await expect(page.locator('[data-traffic]')).toHaveAttribute(
    'data-traffic',
    'moving',
  );
});

test('2D-12: đọc gợi ý không tự thắng; đóng gợi ý rồi chờ lại', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  await page.getByRole('button', { name: /Gợi ý \(0\/3\)/ }).tap();
  await expect(page.getByRole('dialog')).toContainText('Gợi ý');
  await page.waitForTimeout(6500);
  await expect(page.getByRole('dialog')).not.toContainText(
    solution.meta.explanation,
  );
  await page.getByRole('button', { name: 'Đóng', exact: true }).tap();
  await page.waitForTimeout(3500);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await solution.solve(page);
});
