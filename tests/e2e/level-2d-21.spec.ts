import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-21';

test('2D-21: đèn, trăng và giường chưa thắng; chạm dời rèm che cửa sổ rồi chơi lại', async ({
  page,
  events,
}, testInfo) => {
  await openCampaignLevel(page, solution.meta.id);
  await expect(
    page.getByRole('button', { name: 'Rèm cửa', exact: true }),
  ).toBeVisible();
  await expectLayoutOk(page, solution.meta.id);
  await page.screenshot({
    path: testInfo.outputPath('2d-21.png'),
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
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .tap();
  await expect(
    page.getByRole('button', { name: 'Rèm cửa', exact: true }),
  ).toHaveAttribute('aria-disabled', 'false');
  await page.getByRole('button', { name: 'Cửa sổ', exact: true }).tap();
  await expect(page.getByTestId('feedback')).toContainText(
    solution.meta.wrong!.window,
  );
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});

test('2D-21: kéo rèm tới giường trả về, kéo vào cửa sổ mới thắng', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  const curtain = page.getByRole('button', { name: 'Rèm cửa', exact: true });
  await curtain.scrollIntoViewIfNeeded();
  const art = await page
    .getByRole('img', {
      name: 'Bé nằm trên giường, đèn đã tắt, ánh trăng lọt qua cửa sổ có rèm mở',
      exact: true,
    })
    .boundingBox();
  if (!art) throw new Error('Thiếu phòng ngủ');
  for (const [x, y] of [
    [220, 260],
    [190, 125],
  ]) {
    await page.mouse.move(
      art.x + (art.width * 63) / 360,
      art.y + (art.height * 119) / 370,
    );
    await page.mouse.down();
    await page.mouse.move(
      art.x + (art.width * x) / 360,
      art.y + (art.height * y) / 370,
      { steps: 8 },
    );
    await page.mouse.up();
    if (y === 260) {
      await expect(page.getByTestId('feedback')).toContainText(
        solution.meta.wrong!.miss,
      );
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await expect(curtain).toHaveAttribute('aria-pressed', 'false');
    }
  }
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
