import { meta } from '@/levels/2d-05/meta';
import { test, expect } from './fixtures';
import { expectLayoutOk } from './helpers/layout';
import { openCampaignLevel } from './helpers/campaign';
import { solution } from './solutions/2d-05';

test('2D-05: gà còn ngủ khi mây che; dời mây rồi gọi gà mới thắng', async ({
  page,
  events,
}, testInfo) => {
  await openCampaignLevel(page, '2d-05');
  await expect(
    page.getByRole('button', { name: 'Gà trống', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Đám mây', exact: true }),
  ).toBeInViewport({ ratio: 1 });
  await expectLayoutOk(page, '2D-05');
  await page.screenshot({
    path: testInfo.outputPath('2d-05.png'),
    animations: 'disabled',
  });
  for (const mistake of solution.mistakes) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  await page.getByRole('button', { name: 'Đám mây', exact: true }).tap();
  await page
    .getByRole('button', { name: 'Khoảng trời bên trái', exact: true })
    .tap();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(
    page.getByRole('status').filter({ hasText: 'Nắng lên rồi!' }),
  ).toBeVisible();
  await expectLayoutOk(page, '2D-05 sau khi dời mây');
  await expect(page.getByTestId('feedback')).toBeHidden({ timeout: 6000 });
  await page.screenshot({
    path: testInfo.outputPath('2d-05-sun.png'),
    animations: 'disabled',
  });
  await page.getByRole('button', { name: 'Gà trống', exact: true }).tap();
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  expect(events.filter((e) => e.type === 'level_complete')).toMatchObject([
    { result: 'solved', wrongCount: 2 },
  ]);
});

test('2D-05: kéo mây sai trả về; kéo đúng rồi chơi lại khôi phục gà ngủ', async ({
  page,
}) => {
  await openCampaignLevel(page, '2d-05');
  const cloud = page.getByRole('button', { name: 'Đám mây', exact: true });
  const target = page.getByRole('button', {
    name: 'Khoảng trời bên trái',
    exact: true,
  });
  const before = await cloud.boundingBox();
  const destination = await target.boundingBox();
  if (!before || !destination) throw new Error('Thiếu mây hoặc khoảng trời');
  const start = {
    x: before.x + before.width / 2,
    y: before.y + before.height / 2,
  };
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(start.x, start.y + 60, { steps: 6 });
  await page.mouse.up();
  await expect(page.getByTestId('feedback')).toContainText(meta.wrong.miss);
  await expect
    .poll(async () => (await cloud.boundingBox())?.x)
    .toBeCloseTo(before.x, 0);
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(
    destination.x + destination.width / 2,
    destination.y + destination.height / 2,
    { steps: 8 },
  );
  await page.mouse.up();
  await expect(
    page.getByRole('status').filter({ hasText: 'Nắng lên rồi!' }),
  ).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page
    .locator('header')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .tap();
  await expect
    .poll(async () => (await cloud.boundingBox())?.x)
    .toBeCloseTo(before.x, 0);
  await page.getByRole('button', { name: 'Gà trống', exact: true }).tap();
  await expect(page.getByTestId('feedback')).toContainText(meta.wrong.sleep);
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toBeVisible();
});
