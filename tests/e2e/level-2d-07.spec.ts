import { test, expect } from './fixtures';
import { expectLayoutOk } from './helpers/layout';
import { openCampaignLevel } from './helpers/campaign';
import { solution } from './solutions/2d-07';

test('2D-07: chọn quả trái/phải/không biết chưa thắng; kéo chồng thử và chọn bằng nhau mới thắng', async ({
  page,
  events,
  guard,
}, testInfo) => {
  if (process.env.E2E_DEV === '1')
    guard.allow(
      /The resource http:\/\/localhost:3100\/_next\/static\/chunks\/src_features_ui_[\w.-]+\.css was preloaded using link preload but not used/,
    );
  await openCampaignLevel(page, '2d-07');
  await expect(
    page.getByRole('button', { name: 'Quả cam bên trái', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Bằng nhau', exact: true }),
  ).toBeVisible();
  await expectLayoutOk(page, '2D-07');
  await page.screenshot({
    path: testInfo.outputPath('2d-07.png'),
    animations: 'disabled',
  });

  // Chọn các đáp án sai: hiện câu đùa, gạch ngang lựa chọn
  for (const mistake of solution.mistakes) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  await expect(page.getByTestId('puzzle-art')).toHaveAttribute(
    'data-reaction',
    '3',
  );

  // Thử kéo / chạm chuyển quả cam bên trái sang quả cam bên phải
  await page
    .getByRole('button', { name: 'Quả cam bên trái', exact: true })
    .tap();
  await page
    .getByRole('button', { name: 'Quả cam bên phải', exact: true })
    .tap();
  await expect(page.getByText('Khít!', { exact: true })).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(0);

  // Chọn đáp án đúng: Bằng nhau
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toBeVisible({ timeout: 1000 });
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toMatchObject([{ result: 'solved', wrongCount: 3 }]);
});
