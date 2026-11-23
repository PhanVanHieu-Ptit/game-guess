import { test, expect } from './fixtures';
import { verifyExtra2D } from './helpers/extra-2d';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution, sail } from './solutions/2d-34';

verifyExtra2D(solution);

test('2d-34: kiểm an toàn bờ bên kia, chuyến sai không đổi vị trí hoặc mất tiến triển', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  for (const passenger of ['Dê', null, 'Sói']) await sail(page, passenger);
  const state = page.getByTestId('river-state');
  await expect(state).toHaveAttribute('data-positions', '1110');
  await sail(page);
  await expect(page.getByTestId('feedback')).toContainText(
    solution.meta.wrong!.wolf,
  );
  await expect(state).toHaveAttribute('data-positions', '1110');
  await expect(state).toHaveAttribute('data-trips', '3');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expectLayoutOk(page, '2d-34 giữa đường');
  for (const passenger of ['Dê', 'Bắp cải', null, 'Dê'])
    await sail(page, passenger);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  await expect(state).toHaveAttribute('data-positions', '1111');
  await expect(state).toHaveAttribute('data-trips', '7');
});

test('2d-34: nhận thứ tự chở bắp cải trước sói và các chuyến an toàn dư', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  for (const passenger of ['Dê', 'Dê']) await sail(page, passenger);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByTestId('river-state')).toHaveAttribute(
    'data-positions',
    '0000',
  );
  for (const passenger of ['Dê', null, 'Bắp cải', 'Dê', 'Sói', null, 'Dê'])
    await sail(page, passenger);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  await expect(page.getByTestId('river-state')).toHaveAttribute(
    'data-trips',
    '9',
  );
});
