import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution as level01 } from './solutions/2d-01';
import { solution as level02 } from './solutions/2d-02';
import { solution as level03 } from './solutions/2d-03';
import { solution as level04 } from './solutions/2d-04';
import { solution as level05 } from './solutions/2d-05';
import { solution as level06 } from './solutions/2d-06';

test('chơi trọn chặng, sưu tập dấu, chơi tiếp và tải lại vẫn giữ hộ chiếu', async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto('/');
  await expect(page.getByLabel('Bộ sưu tập dấu hành trình')).toContainText(
    '0/7 dấu',
  );
  await page.getByRole('link', { name: 'Chơi', exact: true }).tap();
  for (const level of [level01, level02, level03, level04, level05, level06]) {
    await level.solve(page);
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Tiếp theo có gì?');
    if (level !== level06) {
      await expect(page.getByTestId('earned-stamp')).toHaveCount(0);
      await dialog.getByRole('link', { name: 'Màn tiếp', exact: true }).tap();
    }
  }
  await expect(page.getByTestId('earned-stamp')).toContainText('Mầm lắt léo');
  await expectLayoutOk(page, 'hoàn tất chặng');
  await page
    .getByRole('dialog')
    .getByRole('link', { name: 'Về chọn màn', exact: true })
    .tap();
  await expect(page.getByLabel('Bộ sưu tập dấu hành trình')).toContainText(
    '1/7 dấu',
  );
  await page.reload();
  await expect(page.getByLabel('Mầm lắt léo: đã sưu tập')).toBeVisible();
  await expectLayoutOk(page, 'hộ chiếu sau tải lại');
});

test('rương có thể giải bằng ghép chữ, chơi lại khôi phục mật khẩu ban đầu', async ({
  page,
  events,
}) => {
  await openCampaignLevel(page, '2d-08');
  const lab = page.getByRole('region', { name: 'Xưởng nghịch chữ' });
  await lab.getByRole('button', { name: 'Đổi chỗ hai tiếng' }).tap();
  await expect(
    lab.getByRole('button', { name: 'Mở bằng mật khẩu này' }),
  ).toBeDisabled();
  await lab.getByRole('button', { name: 'Đổi vần và thanh' }).tap();
  await expect(
    lab.getByRole('button', { name: 'Mở bằng mật khẩu này' }),
  ).toBeDisabled();
  await lab.getByRole('button', { name: 'Đổi chỗ hai tiếng' }).tap();
  await lab.getByRole('button', { name: 'Mở bằng mật khẩu này' }).tap();
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toMatchObject([{ result: 'solved', wrongCount: 0 }]);
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .tap();
  await expect(
    lab.getByRole('button', { name: 'Mở bằng mật khẩu này' }),
  ).toBeDisabled();
  await expectLayoutOk(page, 'xưởng nghịch chữ');
});

test('ốc chạm đỉnh ngày ba và dừng; diễn thử không tự thắng hoặc tính sai', async ({
  page,
  events,
}) => {
  await openCampaignLevel(page, '2d-32');
  const lab = page.getByRole('region', { name: 'Diễn thử ốc leo tường' });
  for (const metres of [3, 1, 4, 2, 5]) {
    await lab.getByRole('button').first().tap();
    await expect(lab).toContainText(`${metres} m`);
  }
  await expect(lab).toContainText('Ngày 3');
  await expect(lab.getByRole('button').first()).toBeDisabled();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await lab.getByRole('button', { name: 'Diễn lại' }).tap();
  await expect(lab).toContainText('Xuất phát · 0 m');
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toHaveLength(0);
  await expectLayoutOk(page, 'ốc leo thử');
  for (let i = 0; i < 5; i++) await lab.getByRole('button').first().tap();
  await lab.getByRole('button', { name: 'Hoàn thành chuyến leo' }).tap();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('quầy tính tiền kiểm cả tổng và chênh lệch; giá túi không âm', async ({
  page,
}) => {
  await openCampaignLevel(page, '2d-37');
  const lab = page.getByRole('region', { name: 'Quầy tính tiền thử' });
  await expect(lab).toContainText('Chênh lệch: 9.000 đ');
  await lab.getByRole('button', { name: 'Bớt 500 đ cho túi' }).tap();
  await expect(lab).toContainText('Khớp!');
  await expect(lab).toContainText('Túi 500 đ · Bánh 10.500 đ');
  await lab.getByRole('button', { name: 'Bớt 500 đ cho túi' }).tap();
  await expect(
    lab.getByRole('button', { name: 'Bớt 500 đ cho túi' }),
  ).toBeDisabled();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expectLayoutOk(page, 'quầy tính tiền thử');
  await expect(
    lab.getByRole('button', { name: 'Chốt hóa đơn' }),
  ).toBeDisabled();
  await lab.getByRole('button', { name: 'Thêm 500 đ cho túi' }).tap();
  await lab.getByRole('button', { name: 'Chốt hóa đơn' }).tap();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('điểm danh vịt bật tắt độc lập, không tự nộp đáp án', async ({
  page,
  events,
}) => {
  await openCampaignLevel(page, '2d-10');
  const lab = page.getByRole('region', { name: 'Điểm danh vịt' });
  for (let i = 1; i <= 4; i++)
    await lab.getByRole('button', { name: `Vịt ${i}`, exact: true }).tap();
  await expect(lab).toContainText('Đã điểm danh: 4 bạn.');
  await lab.getByRole('button', { name: 'Vịt 2 ✓', exact: true }).tap();
  await expect(lab).toContainText('Đã điểm danh: 3 bạn.');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toHaveLength(0);
  await expectLayoutOk(page, 'điểm danh vịt');
  await lab.getByRole('button', { name: 'Chốt số vịt đã đếm' }).tap();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(lab).toContainText('Đã điểm danh: 3 bạn.');
  await lab.getByRole('button', { name: 'Vịt 2', exact: true }).tap();
  await lab.getByRole('button', { name: 'Chốt số vịt đã đếm' }).tap();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('đếm góc trực tiếp trên giấy, bỏ dấu không cộng trùng', async ({
  page,
}) => {
  await openCampaignLevel(page, '2d-27');
  for (let i = 1; i <= 5; i++)
    await page
      .getByRole('button', { name: `Đánh dấu góc ${i}`, exact: true })
      .tap();
  const lab = page.getByRole('region', { name: 'Đếm góc bằng chạm' });
  await expect(lab).toContainText('Đã đánh dấu: 5 góc.');
  await page.getByRole('button', { name: 'Đánh dấu góc 1', exact: true }).tap();
  await expect(lab).toContainText('Đã đánh dấu: 4 góc.');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expectLayoutOk(page, 'đếm góc trên giấy');
  await lab.getByRole('button', { name: 'Chốt các góc đã đánh dấu' }).tap();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(lab).toContainText('Đã đánh dấu: 4 góc.');
  await page.getByRole('button', { name: 'Đánh dấu góc 1', exact: true }).tap();
  await lab.getByRole('button', { name: 'Chốt các góc đã đánh dấu' }).tap();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('đổi giữa ảnh gương và đồng hồ thật, không tự nộp đáp án', async ({
  page,
}) => {
  await openCampaignLevel(page, '2d-17');
  const lab = page.getByRole('region', { name: 'Thử phản chiếu đồng hồ' });
  await lab.getByRole('button', { name: 'Nhìn trực tiếp đồng hồ' }).tap();
  await expect(
    page.getByRole('img', {
      name: 'Đồng hồ nhìn trực tiếp, không qua gương',
      exact: true,
    }),
  ).toBeVisible();
  await lab.getByRole('button', { name: 'Nhìn lại qua gương' }).tap();
  await expect(
    page.getByRole('img', {
      name: 'Đồng hồ kim phản chiếu trong gương ở quán cà phê',
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expectLayoutOk(page, 'đồng hồ đổi góc nhìn');
});

test('tách rổ ra khỏi cam và xếp lại, thử nghiệm không phạt', async ({
  page,
  events,
}) => {
  await openCampaignLevel(page, '2d-26');
  const lab = page.getByRole('region', { name: 'Tách hàng trên cân' });
  await lab.getByRole('button', { name: 'Tách rổ và cam' }).tap();
  await expect(lab).toContainText('Rổ rỗng 1 kg + 🍊 cam ? kg = 3 kg');
  await lab.getByRole('button', { name: 'Xếp lại vào rổ' }).tap();
  await expect(lab).toContainText('Rổ còn nguyên cam = 3 kg');
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toHaveLength(0);
  await expectLayoutOk(page, 'tách hàng trên cân');
});

test('diễn lại pha vượt, bé tiến lên nhưng người dẫn đầu giữ vị trí', async ({
  page,
}) => {
  await openCampaignLevel(page, '2d-35');
  const lab = page.getByRole('region', { name: 'Diễn lại pha vượt người' });
  const leader = page.getByText('DẪN ĐẦU', { exact: true });
  const child = page.getByText('BÉ', { exact: true });
  const before = await child.boundingBox();
  const leaderBefore = await leader.boundingBox();
  await lab.getByRole('button', { name: 'Vượt người thứ hai' }).tap();
  await expect(lab).toContainText('Người dẫn đầu vẫn ở phía trước.');
  const after = await child.boundingBox();
  const leaderAfter = await leader.boundingBox();
  expect(after?.x).toBeLessThan(before?.x ?? 0);
  expect(leaderAfter?.x).toBeCloseTo(leaderBefore?.x ?? 0, 0);
  await lab.getByRole('button', { name: 'Trở về trước khi vượt' }).tap();
  await expect(lab).toContainText('Bé ở phía sau người thứ hai.');
  await expectLayoutOk(page, 'diễn lại pha vượt');
});
