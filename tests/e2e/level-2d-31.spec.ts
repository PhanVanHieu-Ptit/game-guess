import { test, expect } from './fixtures';
import { verifyExtra2D } from './helpers/extra-2d';
import { openCampaignLevel } from './helpers/campaign';
import { solution } from './solutions/2d-31';

verifyExtra2D(solution);

test('2d-31: chia cả ba bánh riêng chưa thắng; thử lại và chia thứ tự khác vẫn thắng', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  for (const i of [1, 2, 3]) {
    await page.getByRole('button', { name: `Bánh ${i}`, exact: true }).tap();
    await page
      .getByRole('button', { name: `Bé ${i}, chưa có bánh`, exact: true })
      .tap();
  }
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByTestId('feedback')).toContainText(
    solution.meta.wrong!.empty,
  );
  await page.getByRole('button', { name: 'Thử lại', exact: true }).tap();
  for (const [cake, kid] of [
    [3, 2],
    [1, 3],
  ]) {
    await page.getByRole('button', { name: `Bánh ${cake}`, exact: true }).tap();
    await page
      .getByRole('button', { name: `Bé ${kid}, chưa có bánh`, exact: true })
      .tap();
  }
  await page.getByRole('button', { name: 'Giỏ bánh', exact: true }).tap();
  await page
    .getByRole('button', { name: 'Bé 1, chưa có bánh', exact: true })
    .tap();
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  await expect(page.getByTestId('gift-state')).toHaveAttribute(
    'data-basket-kid',
    '0',
  );
});

test('2d-31: kéo bánh lệch trả về, kéo bánh và giỏ đúng đích thì thắng', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  const svg = page.getByTestId('puzzle-art').locator('..');
  await svg.scrollIntoViewIfNeeded();
  const box = await svg.boundingBox();
  if (!box) throw new Error('Thiếu sân SVG');
  const drag = async (
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
  ) => {
    await page.mouse.move(
      box.x + (box.width * fromX) / 360,
      box.y + (box.height * fromY) / 390,
    );
    await page.mouse.down();
    await page.mouse.move(
      box.x + (box.width * toX) / 360,
      box.y + (box.height * toY) / 390,
      { steps: 12 },
    );
    await page.mouse.up();
  };
  await drag(100, 65, 20, 20);
  await expect(page.getByTestId('feedback')).toContainText(
    solution.meta.wrong!.miss,
  );
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await drag(100, 65, 60, 290);
  await expect(
    page.getByRole('button', { name: 'Bé 1, đã có bánh', exact: true }),
  ).toBeVisible();
  await drag(180, 65, 180, 290);
  await expect(
    page.getByRole('button', { name: 'Bé 2, đã có bánh', exact: true }),
  ).toBeVisible();
  await drag(150, 150, 270, 290);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
