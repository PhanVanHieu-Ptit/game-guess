import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-22';

test('2D-22: hai bóng sai hướng, mặt trời và bé chưa thắng; bóng trái thắng, chơi lại được', async ({
  page,
  events,
}, testInfo) => {
  await openCampaignLevel(page, solution.meta.id);
  await expect(
    page.getByRole('button', { name: 'Bóng bên trái', exact: true }),
  ).toBeVisible();
  await expectLayoutOk(page, solution.meta.id);
  await page.screenshot({
    path: testInfo.outputPath('2d-22.png'),
    fullPage: true,
  });
  for (const mistake of solution.mistakes) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  await page
    .getByRole('button', { name: 'Bé đứng giữa sân', exact: true })
    .tap();
  await expect(page.getByTestId('feedback')).toContainText(
    solution.meta.wrong!.kid,
  );
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByTestId('puzzle-art')).toHaveAttribute(
    'data-reaction',
    '4',
  );
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  expect(events.filter((e) => e.type === 'level_complete')).toMatchObject([
    { result: 'solved', wrongCount: 4 },
  ]);
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .tap();
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
