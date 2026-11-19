import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-15';

test('2D-15: thiếu hoặc thừa khe đều chưa thắng, sửa tại chỗ được', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  for (const index of [2, 3, 1]) {
    await page
      .getByRole('button', { name: `Khe thứ ${index}`, exact: true })
      .tap();
    if (index !== 3) {
      await page.getByRole('button', { name: 'Xong', exact: true }).tap();
      await expect(page.getByTestId('feedback')).toContainText(
        solution.meta.wrong?.split ?? '',
      );
      await expect(page.getByRole('dialog')).toHaveCount(0);
    }
  }
  await page.getByRole('button', { name: 'Khe thứ 1', exact: true }).tap();
  await page.getByRole('button', { name: 'Xong', exact: true }).tap();
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});

test('2D-15: tách sai chưa thắng; khe 2 và 3 mới tạo câu đúng', async ({
  page,
  events,
}, testInfo) => {
  await openCampaignLevel(page, solution.meta.id);
  await expect(
    page.getByRole('button', { name: 'Xong', exact: true }),
  ).toBeVisible();
  await expectLayoutOk(page, solution.meta.id);
  await page.screenshot({
    path: testInfo.outputPath('2d-15.png'),
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
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toMatchObject([{ result: 'solved', wrongCount: 3 }]);
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .tap();
  await expect(
    page.getByRole('button', { name: 'Khe thứ 2', exact: true }),
  ).toHaveAttribute('aria-pressed', 'false');
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
