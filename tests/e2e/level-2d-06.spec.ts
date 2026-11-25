import { meta } from '@/levels/2d-06/meta';
import { test, expect } from './fixtures';
import { expectLayoutOk } from './helpers/layout';
import { openCampaignLevel } from './helpers/campaign';
import { solution } from './solutions/2d-06';

test('2D-06: tìm cá trong lời nhắn chưa thắng; đưa cá vào giỏ mới hoàn tất chặng', async ({
  page,
  events,
}, testInfo) => {
  await openCampaignLevel(page, '2d-06');
  const word = page
    .getByTestId('prompt')
    .getByRole('button', { name: 'cá', exact: true });
  const fish = page.getByRole('button', {
    name: 'Cá vừa tìm thấy',
    exact: true,
  });
  await expect(word).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Cần câu', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Giỏ của ngoại', exact: true }),
  ).toBeInViewport({ ratio: 1 });
  await expect(fish).toHaveCount(0);
  await expectLayoutOk(page, '2D-06');
  await page.screenshot({
    path: testInfo.outputPath('2d-06.png'),
    animations: 'disabled',
  });
  for (const mistake of solution.mistakes.slice(0, 3)) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  await word.tap();
  await expect(fish).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await word.tap();
  await expect(fish).toHaveCount(1);
  await expectLayoutOk(page, '2D-06 tìm được cá');
  await expect(page.getByTestId('feedback')).toBeHidden({ timeout: 6000 });
  await page.screenshot({
    path: testInfo.outputPath('2d-06-found.png'),
    animations: 'disabled',
  });
  await fish.tap();
  await page.getByRole('button', { name: 'Giỏ của ngoại', exact: true }).tap();
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  await expect(page.getByTestId('tet-finale')).toContainText(
    'Tết vui vì có bạn!',
  );
  await expect(page.getByTestId('earned-stamp')).toBeVisible();
  await expectLayoutOk(page, '2D-06 kết chặng');
  await page.screenshot({
    path: testInfo.outputPath('2d-06-finale.png'),
    animations: 'disabled',
  });
  expect(events.filter((e) => e.type === 'level_complete')).toMatchObject([
    { result: 'solved', wrongCount: 3 },
  ]);
});

test('2D-06: giỏ rỗng không thắng; cá kéo trượt trở lại ao, chơi lại giấu cá', async ({
  page,
}) => {
  await openCampaignLevel(page, '2d-06');
  await page.getByRole('button', { name: 'Giỏ của ngoại', exact: true }).tap();
  await expect(page.getByTestId('feedback')).toContainText(meta.wrong.empty);
  const word = page
    .getByTestId('prompt')
    .getByRole('button', { name: 'cá', exact: true });
  await word.tap();
  const fish = page.getByRole('button', {
    name: 'Cá vừa tìm thấy',
    exact: true,
  });
  // Lượt chạm giỏ rỗng vừa làm cảnh rung; đo vị trí sau khi hoạt ảnh kết thúc.
  await page.getByTestId('puzzle-art').evaluate(async (element) => {
    await Promise.all(
      element
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished),
    );
  });
  const before = await fish.boundingBox();
  if (!before) throw new Error('Chưa tìm thấy cá');
  const start = {
    x: before.x + before.width / 2,
    y: before.y + before.height / 2,
  };
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(start.x + 50, start.y, { steps: 6 });
  await page.mouse.up();
  await expect(page.getByTestId('feedback')).toContainText(meta.wrong.miss);
  await expect
    .poll(async () => (await fish.boundingBox())?.x)
    .toBeCloseTo(before.x, 0);
  const basket = await page
    .getByRole('button', { name: 'Giỏ của ngoại', exact: true })
    .boundingBox();
  if (!basket) throw new Error('Thiếu giỏ');
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(
    basket.x + basket.width / 2,
    basket.y + basket.height / 2,
    { steps: 8 },
  );
  await page.mouse.up();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .tap();
  await expect(fish).toHaveCount(0);
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toBeVisible();
});
