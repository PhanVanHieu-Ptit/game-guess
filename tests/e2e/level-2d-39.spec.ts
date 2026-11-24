import { test, expect } from './fixtures';
import { verifyExtra2D } from './helpers/extra-2d';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-39';

verifyExtra2D(solution);

test('2d-39: thử đủ 16 tập thẻ; chỉ A và 7 thắng sau khi chốt, sai giữ lựa chọn', async ({
  page,
  events,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  const cards = ['A', 'B', '4', '7'];
  for (let mask = 0; mask < 16; mask++) {
    await page.getByRole('button', { name: 'Bỏ chọn hết', exact: true }).tap();
    const selected = cards.filter((_, index) => mask & (1 << index));
    for (const card of selected)
      await page
        .getByRole('button', { name: `Thẻ ${card}`, exact: true })
        .tap();
    await expect(page.getByTestId('card-selection')).toHaveAttribute(
      'data-selected',
      selected.join(','),
    );
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await page.getByRole('button', { name: 'Kiểm tra', exact: true }).tap();
    if (mask === 9) {
      await expect(page.getByRole('dialog')).toContainText(
        solution.meta.explanation,
      );
      await page
        .getByRole('dialog')
        .getByRole('button', { name: 'Chơi lại', exact: true })
        .tap();
      await expect(page.getByTestId('card-selection')).toHaveAttribute(
        'data-selected',
        '',
      );
    } else {
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await expect(page.getByTestId('feedback')).not.toBeEmpty();
      await expect(page.getByTestId('card-selection')).toHaveAttribute(
        'data-selected',
        selected.join(','),
      );
    }
  }
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toHaveLength(1);
  await expectLayoutOk(page, '2d-39 chọn cả bốn');
});

test('2d-39: chọn sai A/4 rồi sửa tại chỗ thành 7/A vẫn thắng', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  for (const card of ['4', 'A'])
    await page.getByRole('button', { name: `Thẻ ${card}`, exact: true }).tap();
  await page.getByRole('button', { name: 'Kiểm tra', exact: true }).tap();
  await expect(page.getByTestId('feedback')).toContainText(
    solution.meta.wrong!.four,
  );
  for (const card of ['4', 'A', '7', 'A'])
    await page.getByRole('button', { name: `Thẻ ${card}`, exact: true }).tap();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Kiểm tra', exact: true }).tap();
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
