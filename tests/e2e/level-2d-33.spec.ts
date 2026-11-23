import { test, expect } from './fixtures';
import { verifyExtra2D } from './helpers/extra-2d';
import { expectLayoutOk } from './helpers/layout';
import { openCampaignLevel } from './helpers/campaign';
import { solution, solveBalance, weighBalls } from './solutions/2d-33';

verifyExtra2D(solution);

for (let light = 1; light <= 9; light++) {
  test(`2d-33: bi nhẹ ở vị trí ${light}, suy từ kết quả hai lần cân thì thắng`, async ({
    page,
  }) => {
    await page.addInitScript(
      (value) => {
        Math.random = () => value;
      },
      (light - 0.5) / 9,
    );
    await openCampaignLevel(page, solution.meta.id);
    await solveBalance(
      page,
      light % 2 ? [9, 8, 7, 6, 5, 4, 3, 2, 1] : undefined,
    );
    await expect(page.getByRole('dialog')).toContainText(
      solution.meta.explanation,
    );
    await expect(page.getByTestId('balance-state')).toHaveAttribute(
      'data-count',
      '2',
    );
  });
}

test('2d-33: chọn sai chưa thắng; lần cân thứ ba bị từ chối, thử lại giữ bi nhẹ', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0;
  });
  await openCampaignLevel(page, solution.meta.id);
  await page.getByRole('button', { name: 'Chọn viên nhẹ', exact: true }).tap();
  await page.getByRole('button', { name: 'Bi 9, khay', exact: true }).tap();
  await expect(page.getByTestId('feedback')).toContainText(
    solution.meta.wrong!.answer,
  );
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Tiếp tục cân', exact: true }).tap();
  await weighBalls(page, [1], [2]);
  await page.getByRole('button', { name: 'Cân', exact: true }).tap();
  await page.getByRole('button', { name: 'Cân', exact: true }).tap();
  await expect(page.getByTestId('feedback')).toContainText(
    solution.meta.wrong!.limit,
  );
  await expect(page.getByTestId('balance-state')).toHaveAttribute(
    'data-count',
    '2',
  );
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expectLayoutOk(page, '2d-33 lịch sử hai lần cân');
  await page.getByRole('button', { name: 'Thử lại', exact: true }).tap();
  await expect(page.getByTestId('balance-state')).toHaveAttribute(
    'data-count',
    '0',
  );
  await solveBalance(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
