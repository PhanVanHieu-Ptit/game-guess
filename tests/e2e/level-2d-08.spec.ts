import { test, expect } from './fixtures';
import { expectLayoutOk } from './helpers/layout';
import { openCampaignLevel } from './helpers/campaign';
import { solution } from './solutions/2d-08';

test('2D-08: gõ bí mật, mật bí hoặc chạm rương chưa thắng; gõ bật mí thì thắng', async ({
  page,
  events,
  guard,
}, testInfo) => {
  if (process.env.E2E_DEV === '1')
    guard.allow(
      /The resource http:\/\/localhost:3100\/_next\/static\/chunks\/src_features_ui_[\w.-]+\.css was preloaded using link preload but not used/,
    );
  await openCampaignLevel(page, '2d-08');
  await expect(page.getByRole('textbox')).toBeVisible();
  await expectLayoutOk(page, '2D-08');
  await page.screenshot({
    path: testInfo.outputPath('2d-08.png'),
    animations: 'disabled',
  });

  // Các thao tác sai: có câu phản hồi đùa riêng, không mở hộp thoại kết quả
  for (const mistake of solution.mistakes.slice(0, 3)) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }

  // Đúng: gõ bật mí
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toBeVisible({ timeout: 1000 });
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toMatchObject([{ result: 'solved', wrongCount: 3 }]);
});

for (const accepted of ['BAT MI', 'bat mi', ' Bật Mí ']) {
  test(`2D-08: chấp nhận "${accepted}" không phân biệt hoa thường và dấu`, async ({
    page,
  }) => {
    await openCampaignLevel(page, '2d-08');
    await page.getByRole('textbox').fill(accepted);
    await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
    await expect(page.getByRole('dialog')).toContainText(
      solution.meta.explanation,
    );
  });
}
