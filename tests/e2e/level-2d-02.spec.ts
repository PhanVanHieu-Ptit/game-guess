import { test, expect } from './fixtures';
import { expectLayoutOk } from './helpers/layout';
import { openCampaignLevel } from './helpers/campaign';
import { solution } from './solutions/2d-02';

test('2D-02: cá, tôm và mặt nước phản hồi riêng; chạm cua thì thắng', async ({
  page,
  events,
  guard,
}, testInfo) => {
  // Next dev nạp trước CSS của hộp kết quả khi hộp chưa mở.
  if (process.env.E2E_DEV === '1')
    guard.allow(
      /The resource http:\/\/localhost:3100\/_next\/static\/chunks\/src_features_ui_[\w.-]+\.css was preloaded using link preload but not used/,
    );
  await openCampaignLevel(page, '2d-02');
  await expect(page.getByRole('textbox')).toBeHidden();
  await expect(
    page.getByRole('button', { name: 'Con cua', exact: true }),
  ).toBeVisible();
  await expectLayoutOk(page, '2D-02');
  await page.screenshot({
    path: testInfo.outputPath('2d-02.png'),
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
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toMatchObject([{ result: 'solved', wrongCount: 3 }]);
});

for (const accepted of [' CON CUA ', 'CUA BE', 'cua đồng']) {
  test(`2D-02: chấp nhận "${accepted}" bằng ô nhập dùng bàn phím ảo`, async ({
    page,
  }) => {
    await openCampaignLevel(page, '2d-02');
    await page.getByText('Mình muốn gõ đáp án', { exact: true }).tap();
    await page.getByRole('textbox').tap();
    await page.getByRole('textbox').fill(accepted);
    await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
    await expect(page.getByRole('dialog')).toContainText(
      solution.meta.explanation,
    );
  });
}
