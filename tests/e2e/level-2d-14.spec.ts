import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-14';
import { meta } from '@/levels/2d-14/meta';

test('2D-14: tay trơn chưa bắt được; phủ tro rồi chạm lươn mới thắng', async ({
  page,
  events,
}, testInfo) => {
  await openCampaignLevel(page, solution.meta.id);
  await expect(
    page.getByRole('button', { name: 'Chén tro bếp' }),
  ).toBeVisible();
  await expectLayoutOk(page, solution.meta.id);
  await page.screenshot({
    path: testInfo.outputPath('2d-14.png'),
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
  await page.getByRole('button', { name: 'Chén tro bếp' }).tap();
  await page.getByRole('button', { name: 'Bàn tay' }).tap();
  await expect(page.getByText('Tay đã phủ tro, bớt trơn rồi!')).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Con lươn' }).tap();
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
  await solution.mistakes[0].tap(page);
  await expect(page.getByTestId('feedback')).toContainText(meta.wrong.eel);
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});

test('2D-14: kéo trượt trả chén về; kéo lên tay rồi chạm lươn thì thắng', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  const bowl = page.getByRole('button', { name: 'Chén tro bếp', exact: true });
  await expect(bowl).toBeVisible();
  await bowl.scrollIntoViewIfNeeded();
  const initial = await bowl.boundingBox();
  if (!initial) throw new Error('Thiếu chén tro');
  await page.mouse.move(
    initial.x + initial.width / 2,
    initial.y + initial.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(initial.x + 170, initial.y + 15, { steps: 6 });
  await page.mouse.up();
  await expect(page.getByTestId('feedback')).toContainText(meta.wrong.miss);
  await expect
    .poll(async () => (await bowl.boundingBox())?.x)
    .toBeCloseTo(initial.x, 0);
  const hand = await page
    .getByRole('button', { name: 'Bàn tay', exact: true })
    .boundingBox();
  if (!hand) throw new Error('Thiếu bàn tay');
  await page.mouse.move(
    initial.x + initial.width / 2,
    initial.y + initial.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(hand.x + hand.width / 2, hand.y + hand.height / 2, {
    steps: 8,
  });
  await page.mouse.up();
  await expect(page.getByText('Tay đã phủ tro, bớt trơn rồi!')).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Con lươn', exact: true }).tap();
  await expect(page.getByRole('dialog')).toContainText(meta.explanation);
});
