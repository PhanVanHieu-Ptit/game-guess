import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { hints, play, result } from './helpers/ui';
import { solution as level06 } from './solutions/2d-06';
import { solution as finale } from './solutions/2d-39';

test('bảng chinh phục đủ bảy cấp, bảy màn chốt và mở rộng thang điểm trên điện thoại', async ({
  page,
}) => {
  await page.goto('/levels');
  await expect(page.getByTestId('campaign-score')).toHaveText('0 điểm');
  await expect(page.getByRole('heading', { name: /^Cấp / })).toHaveCount(7);
  await expect(page.getByText('Màn chốt ×2', { exact: true })).toHaveCount(7);
  const ladder = page.getByRole('region', { name: 'Thang chinh phục' });
  await ladder
    .getByText('Xem thang cấp bậc và mốc thưởng', { exact: true })
    .tap();
  await expect(ladder).toContainText('Cấp 7 · Nhà vô địch');
  await expect(ladder).toContainText('4.900 điểm');
  await expectLayoutOk(page, 'thang chinh phục mở rộng');
  await page.screenshot({
    path: test.info().outputPath('progression-ladder.png'),
    fullPage: true,
  });
});

test('màn chốt nhận điểm gấp đôi và danh hiệu; chơi lại có gợi ý không hạ điểm đã lưu', async ({
  page,
}) => {
  await openCampaignLevel(page, '2d-06');
  await expect(page.getByLabel('Điểm thử thách')).toContainText('200 điểm');
  await page.getByRole('button', { name: 'Thang điểm', exact: true }).tap();
  await expect(
    page.getByRole('dialog', { name: 'Luật chinh phục' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Tiếp tục chơi', exact: true }).tap();
  await level06.solve(page);
  await expect(result.dialog(page)).toBeVisible();
  await expect(result.next(page)).toBeInViewport();
  await expect(page.getByTestId('run-score')).toHaveText('200 điểm');
  await expect(page.getByTestId('result-campaign-score')).toHaveText('700');
  await expect(page.getByTestId('rank-reward')).toContainText(
    'Danh hiệu: Tân binh',
  );
  await expectLayoutOk(page, 'thưởng mốc cấp 1');
  await result.restart(page).tap();
  await play.hintButton(page).tap();
  await hints.open(page, 1).tap();
  await hints.close(page).tap();
  await expect(page.getByLabel('Điểm thử thách')).toContainText('150 điểm');
  await level06.solve(page);
  await expect(page.getByTestId('run-score')).toHaveText('150 điểm');
  await expect(page.getByTestId('result-campaign-score')).toHaveText('700');
  await result.backToLevels(page).tap();
  await expect(page).toHaveURL(/\/levels$/);
  await page.reload();
  await expect(page.getByTestId('campaign-score')).toHaveText('700 điểm');
});

test('xem đáp án mở màn kế, giải lại mới nhận danh hiệu', async ({ page }) => {
  await openCampaignLevel(page, '2d-06');
  await play.hintButton(page).tap();
  await hints.open(page, 1).tap();
  await hints.open(page, 2).tap();
  await hints.open(page, 3).tap();
  await hints
    .sheet(page)
    .getByRole('button', { name: 'Xem đáp án', exact: true })
    .tap();
  await expect(page.getByTestId('run-score')).toHaveText('0 điểm');
  await expect(page.getByTestId('result-campaign-score')).toHaveText('500');
  await expect(page.getByTestId('rank-reward')).toContainText(
    'Đã giải 5/6 màn',
  );
  await expect(result.next(page)).toHaveAttribute('href', '/play/2d-07');
  await result.restart(page).tap();
  await level06.solve(page);
  await expect(page.getByTestId('rank-reward')).toContainText(
    'Danh hiệu: Tân binh',
  );
  await expect(page.getByTestId('result-campaign-score')).toHaveText('700');
});

test('màn 42 trao danh hiệu cuối và tổng điểm đủ 42 màn', async ({ page }) => {
  await openCampaignLevel(page, '2d-39');
  await expect(page.getByLabel('Điểm thử thách')).toContainText('1.400 điểm');
  await finale.solve(page);
  await expect(page.getByTestId('rank-reward')).toContainText(
    'Danh hiệu: Nhà vô địch',
  );
  await expect(page.getByTestId('result-campaign-score')).toHaveText('19.600');
  await expect(result.next(page)).toHaveCount(0);
  await expect(result.backToLevels(page)).toBeInViewport();
  await expectLayoutOk(page, 'mốc màn 42');
  await page.screenshot({
    path: test.info().outputPath('champion-result.png'),
    fullPage: true,
  });
});
