import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-11';

test('2D-11: đồ dùng chưa thắng; chạm bảng tên thắng, chơi lại được', async ({
  page,
  events,
}, testInfo) => {
  await openCampaignLevel(page, solution.meta.id);
  await expect(
    page.getByRole('button', { name: 'Bảng tên trên áo' }),
  ).toBeVisible();
  await expectLayoutOk(page, solution.meta.id);
  await page.screenshot({
    path: testInfo.outputPath('2d-11.png'),
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
    { timeout: 1000 },
  );
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toMatchObject([{ result: 'solved', wrongCount: 3 }]);
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .tap();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
