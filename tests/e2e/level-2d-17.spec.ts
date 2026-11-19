import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-17';

test('2D-17: giờ trong gương chưa thắng; nhập 820 chỉ bằng chạm thì thắng', async ({
  page,
  events,
}, testInfo) => {
  await openCampaignLevel(page, solution.meta.id);
  await expect(page.getByLabel('Giờ thật', { exact: true })).toBeVisible();
  await expectLayoutOk(page, solution.meta.id);
  await page.screenshot({
    path: testInfo.outputPath('2d-17.png'),
    fullPage: true,
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
  expect(events.filter((e) => e.type === 'level_complete')).toMatchObject([
    { result: 'solved', wrongCount: 3 },
  ]);
});

test('2D-17: nhận các cách viết giờ trong tài liệu, chơi lại xóa đáp án', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  for (const value of [
    '8:20',
    '8h20',
    '820',
    '08:20',
    '8 giờ 20',
    '  8 GIỜ 20  ',
  ]) {
    await expect(page.getByLabel('Giờ thật', { exact: true })).toHaveValue('');
    await page.getByLabel('Giờ thật', { exact: true }).fill(value);
    await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
    await expect(page.getByRole('dialog')).toContainText(
      solution.meta.explanation,
    );
    await page
      .getByRole('dialog')
      .getByRole('button', { name: 'Chơi lại', exact: true })
      .tap();
  }
});
