import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-24';

test('2D-24: biển rõ chữ, B/C chưa thắng; chọn A rồi chơi lại bằng cổng trên hình', async ({
  page,
  events,
}, testInfo) => {
  await openCampaignLevel(page, solution.meta.id);
  await expect(page.getByTestId('puzzle-art')).toBeVisible();
  await expectLayoutOk(page, solution.meta.id);
  await page.screenshot({
    path: testInfo.outputPath('2d-24-cong.png'),
    fullPage: true,
  });
  for (const text of [
    'Biển A: Lối ra ở B.',
    'Biển B: Lối ra không ở B.',
    'Biển C: Lối ra không ở A.',
  ]) {
    await expect(page.getByText(text, { exact: true })).toBeVisible();
  }
  await expect(
    page.getByRole('button', { name: 'Cổng A', exact: true }),
  ).toHaveAccessibleDescription('Biển A: Lối ra ở B.');
  await page
    .getByRole('button', { name: 'Cổng C', exact: true })
    .scrollIntoViewIfNeeded();
  await page.screenshot({
    path: testInfo.outputPath('2d-24-bien.png'),
    fullPage: true,
  });
  for (const mistake of solution.mistakes) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  // Sai không khóa cổng hoặc lấy mất lượt: vẫn chạm thử cùng cổng được.
  await solution.mistakes[0].tap(page);
  await expect(page.getByTestId('feedback')).toContainText(
    solution.mistakes[0].feedback,
  );
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByTestId('puzzle-art')).toHaveAttribute(
    'data-reaction',
    '3',
  );
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  expect(events.filter((e) => e.type === 'level_complete')).toMatchObject([
    { result: 'solved', wrongCount: 3, hintsUsed: 0 },
  ]);
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .tap();
  await page
    .getByRole('button', { name: 'Cổng C trên hình', exact: true })
    .tap();
  await expect(page.getByTestId('feedback')).toContainText(
    solution.meta.wrong!.c,
  );
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page
    .getByRole('button', { name: 'Cổng A trên hình', exact: true })
    .tap();
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
