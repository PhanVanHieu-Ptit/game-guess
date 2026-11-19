import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-16';

test('2D-16: thúng và sai điểm tựa chưa thắng; chạm đặt vai ở 1/3 thì thắng', async ({
  page,
  events,
}, testInfo) => {
  await openCampaignLevel(page, solution.meta.id);
  await expect(
    page.getByRole('button', { name: 'Vai bà', exact: true }),
  ).toBeVisible();
  await expectLayoutOk(page, solution.meta.id);
  // Bên nặng ở trái phải thấp hơn bên phải khi vai còn ở giữa.
  await expect(page.getByTestId('carrying-pole')).toHaveAttribute(
    'transform',
    /^rotate\(-14 /,
  );
  await page.screenshot({
    path: testInfo.outputPath('2d-16.png'),
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
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});

test('2D-16: kéo ngoài dung sai trả vai về; trong ±3% thì cân bằng', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  const shoulder = page.getByRole('button', { name: 'Vai bà', exact: true });
  await expect(shoulder).toBeVisible();
  await shoulder.scrollIntoViewIfNeeded();
  const svg = page.getByRole('img', {
    name: 'Bà gánh thúng 6 ký bên trái và 3 ký bên phải',
  });
  const box = await svg.boundingBox();
  if (!box) throw new Error('Thiếu sân chơi');
  const point = (x: number, y: number) => ({
    x: box.x + (x * box.width) / 360,
    y: box.y + (y * box.height) / 340,
  });
  for (const x of [151, 129, 146]) {
    const start = point(180, 166),
      end = point(x, 166);
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(end.x, end.y, { steps: 8 });
    await page.mouse.up();
    if (x !== 146) {
      await expect(page.getByTestId('feedback')).toContainText(
        solution.meta.wrong?.miss ?? '',
      );
      await expect(page.getByRole('dialog')).toHaveCount(0);
    }
  }
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
