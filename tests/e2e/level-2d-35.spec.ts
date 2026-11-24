import { test, expect } from './fixtures';
import { verifyExtra2D } from './helpers/extra-2d';
import { openCampaignLevel } from './helpers/campaign';
import { solution } from './solutions/2d-35';

verifyExtra2D(solution);

test('2d-35: nhận 2/hai/thứ hai, không dấu và khoảng trắng; rỗng không tính sai', async ({
  page,
  events,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  for (const value of ['2', 'hai', '  THỨ HAI  ', 'thu hai']) {
    const input = page.getByRole('textbox', {
      name: 'Vị trí của bé',
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
  ).toEqual([0, 0, 0, 0]);
});
