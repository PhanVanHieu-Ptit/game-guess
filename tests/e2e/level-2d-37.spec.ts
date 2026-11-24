import { test, expect } from './fixtures';
import { verifyExtra2D } from './helpers/extra-2d';
import { openCampaignLevel } from './helpers/campaign';
import { solution } from './solutions/2d-37';

verifyExtra2D(solution);

test('2d-37: nhận đơn vị, chữ, không dấu/NFD; nhập rỗng không tính sai', async ({
  page,
  events,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  for (const value of [
    '500',
    '500 đồng',
    'năm trăm',
    '  NAM TRAM DONG  ',
    'năm trăm đồng'.normalize('NFD'),
    '0,5 nghìn',
    '0.5 nghìn',
  ]) {
    const input = page.getByRole('textbox', {
      name: 'Giá túi (đồng)',
      exact: true,
    });
    await expect(input).toHaveValue('');
    await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await input.fill(value);
    await page.getByRole('button', { name: 'Trả lời', exact: true }).tap();
    await expect(page.getByRole('dialog')).toContainText(
      solution.meta.explanation,
    );
    await page
      .getByRole('dialog')
      .getByRole('button', { name: 'Chơi lại', exact: true })
      .tap();
  }
  expect(
    events
      .filter((event) => event.type === 'level_complete')
      .map((event) => event.wrongCount),
  ).toEqual([0, 0, 0, 0, 0, 0, 0]);
});
