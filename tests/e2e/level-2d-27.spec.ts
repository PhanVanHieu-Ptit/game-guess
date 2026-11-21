import { test, expect } from './fixtures';
import { verifyExtra2D } from './helpers/extra-2d';
import { openCampaignLevel } from './helpers/campaign';
import { solution } from './solutions/2d-27';

verifyExtra2D(solution);

test('2d-27: nhận năm không dấu, hoa/thường và Unicode tổ hợp; chơi lại xóa ô nhập', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  for (const value of ['5', 'năm', 'nam', '  NĂM  ', 'năm'.normalize('NFD')]) {
    const input = page.getByRole('textbox', {
      name: 'Số góc còn lại',
      exact: true,
    });
    await expect(input).toHaveValue('');
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
});
