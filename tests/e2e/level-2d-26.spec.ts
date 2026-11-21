import { test, expect } from './fixtures';
import { verifyExtra2D } from './helpers/extra-2d';
import { openCampaignLevel } from './helpers/campaign';
import { solution } from './solutions/2d-26';

verifyExtra2D(solution);

test('2d-26: ô nhập nhận hai có dấu/không dấu, hoa/thường; rỗng không tính sai', async ({
  page,
  events,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  for (const value of ['2', 'hai', '  HAI  ']) {
    const input = page.getByRole('textbox', { name: 'Số ký cam', exact: true });
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
    events.filter((e) => e.type === 'level_complete').map((e) => e.wrongCount),
  ).toEqual([0, 0, 0]);
});
