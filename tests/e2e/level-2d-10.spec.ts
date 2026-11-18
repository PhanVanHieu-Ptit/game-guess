import { test, expect } from './fixtures';
import { expectLayoutOk } from './helpers/layout';
import { openCampaignLevel } from './helpers/campaign';
import { solution } from './solutions/2d-10';

test('2D-10: đếm trùng (6) hoặc gõ số khác chưa thắng; gõ 4 thì thắng', async ({
  page,
  events,
  guard,
}, testInfo) => {
  if (process.env.E2E_DEV === '1')
    guard.allow(
      /The resource http:\/\/localhost:3100\/_next\/static\/chunks\/src_features_ui_[\w.-]+\.css was preloaded using link preload but not used/,
    );
  await openCampaignLevel(page, '2d-10');
  await expect(page.getByRole('textbox')).toBeVisible();
  await expectLayoutOk(page, '2D-10');
  await page.screenshot({
    path: testInfo.outputPath('2d-10.png'),
    animations: 'disabled',
  });

  // Các thao tác sai: có câu đùa riêng, không mở hộp kết quả
  for (const mistake of solution.mistakes) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }

  // Đúng: gõ 4
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toBeVisible({ timeout: 1000 });
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toMatchObject([{ result: 'solved', wrongCount: 3 }]);
});

for (const accepted of ['bốn', 'bon', '4 con', ' BỐN ']) {
  test(`2D-10: chấp nhận "${accepted}" bằng chữ hoặc số`, async ({ page }) => {
    await openCampaignLevel(page, '2d-10');
    await page.getByRole('textbox').fill(accepted);
    await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
    await expect(page.getByRole('dialog')).toContainText(
      solution.meta.explanation,
    );
  });
}
