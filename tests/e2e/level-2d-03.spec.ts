import { test, expect } from './fixtures';
import { expectLayoutOk } from './helpers/layout';
import { openCampaignLevel } from './helpers/campaign';
import { solution } from './solutions/2d-03';

test('2D-03: chạm bé và xe chưa thắng; đèn đỏ dừng xe rồi bé qua đường', async ({
  page,
  events,
  guard,
}, testInfo) => {
  if (process.env.E2E_DEV === '1')
    guard.allow(
      /The resource http:\/\/localhost:3100\/_next\/static\/chunks\/src_features_ui_[\w.-]+\.css was preloaded using link preload but not used/,
    );
  await openCampaignLevel(page, '2d-03');
  await expect(
    page.getByRole('button', { name: 'Đèn giao thông', exact: true }),
  ).toBeVisible();
  await expectLayoutOk(page, '2D-03');
  await page.screenshot({
    path: testInfo.outputPath('2d-03.png'),
    animations: 'disabled',
  });
  for (const mistake of solution.mistakes) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.locator('[data-traffic]')).toHaveAttribute(
      'data-traffic',
      'moving',
    );
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  await page.getByRole('button', { name: 'Đèn giao thông', exact: true }).tap();
  await expect(page.locator('[data-traffic]')).toHaveAttribute(
    'data-traffic',
    'stopped',
  );
  // Dừng xe mới là bước chuẩn bị, người chơi còn chủ động đưa bé qua.
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Bé qua đường', exact: true }).tap();
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
    { timeout: 1000 },
  );
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toMatchObject([{ result: 'solved', wrongCount: 3 }]);
});
