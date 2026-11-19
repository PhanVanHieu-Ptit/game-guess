import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-23';
import { swipeStageUp } from './helpers/touch-scroll';

test('2D-23: nền nhận vuốt dọc để tới đáp án, vật kéo vẫn khóa cuộn', async ({
  page,
  browserName,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  const art = page.getByTestId('puzzle-art').locator('..');
  await expect(art).toHaveCSS('touch-action', 'pan-y');
  await expect(
    page.getByRole('button', { name: 'Đá lớn ở cốc trái', exact: true }),
  ).toHaveCSS('touch-action', 'none');
  // CDP chỉ có trên Chromium; WebKit kiểm CSS cùng toàn bộ lời giải chạm ở ca bên dưới.
  if (browserName === 'chromium') {
    await swipeStageUp(page);
    await swipeStageUp(page);
    await expect(
      page.getByRole('button', { name: 'Cốc phải', exact: true }),
    ).toBeInViewport();
    await page.getByRole('button', { name: 'Cốc phải', exact: true }).tap();
    await expect(page.getByRole('dialog')).toContainText(
      solution.meta.explanation,
    );
  }
});

test('2D-23: đáp án sai không phạt; lấy đá ra thấy mực nước đổi rồi chọn phải', async ({
  page,
  events,
}, testInfo) => {
  await openCampaignLevel(page, solution.meta.id);
  await expect(
    page.getByRole('button', { name: 'Đá lớn ở cốc trái', exact: true }),
  ).toBeVisible();
  await expectLayoutOk(page, solution.meta.id);
  await page.screenshot({
    path: testInfo.outputPath('2d-23-truoc.png'),
    fullPage: true,
  });
  expect(await page.getByTestId('water-left').getAttribute('y')).toBe(
    await page.getByTestId('water-right').getAttribute('y'),
  );
  for (const mistake of solution.mistakes) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  await expect(page.getByTestId('puzzle-art')).toHaveAttribute(
    'data-reaction',
    '3',
  );
  for (const stone of ['Đá lớn ở cốc trái', 'Đá nhỏ ở cốc phải']) {
    await page.getByRole('button', { name: stone, exact: true }).tap();
    await page.getByRole('button', { name: 'Khay đựng đá', exact: true }).tap();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  expect(
    Number(await page.getByTestId('water-left').getAttribute('y')),
  ).toBeGreaterThan(
    Number(await page.getByTestId('water-right').getAttribute('y')),
  );
  await expect(
    page.getByRole('img', { name: 'Đá lớn đã ở khay', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Đá nhỏ đã ở khay', exact: true }),
  ).toBeVisible();
  await expectLayoutOk(page, '2D-23 đã lấy đá');
  await page.screenshot({
    path: testInfo.outputPath('2d-23-sau.png'),
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Cốc phải', exact: true }).tap();
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  expect(events.filter((e) => e.type === 'level_complete')).toMatchObject([
    { result: 'solved', wrongCount: 3 },
  ]);
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .tap();
  await expect(
    page.getByRole('button', { name: 'Đá lớn ở cốc trái', exact: true }),
  ).toBeVisible();
  expect(await page.getByTestId('water-left').getAttribute('y')).toBe(
    await page.getByTestId('water-right').getAttribute('y'),
  );
  // Cho phép suy luận đúng ngay, không ép làm thêm thao tác minh họa.
  await page.getByRole('button', { name: 'Cốc phải', exact: true }).tap();
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});

test('2D-23: kéo đá sang cốc khác trả về, kéo ra khay không tự thắng', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  const stone = page.getByRole('button', {
    name: 'Đá lớn ở cốc trái',
    exact: true,
  });
  await stone.scrollIntoViewIfNeeded();
  const art = await page
    .getByRole('img', {
      name: 'Hai cốc giống nhau có cùng mực nước, đá lớn bên trái và đá nhỏ bên phải',
      exact: true,
    })
    .boundingBox();
  if (!art) throw new Error('Thiếu hai cốc');
  const initial = await page.getByTestId('water-left').getAttribute('y');
  for (const [x, y] of [
    [265, 262],
    [95, 378],
  ]) {
    await page.mouse.move(
      art.x + (art.width * 95) / 360,
      art.y + (art.height * 262) / 448,
    );
    await page.mouse.down();
    await page.mouse.move(
      art.x + (art.width * x) / 360,
      art.y + (art.height * y) / 448,
      { steps: 8 },
    );
    await page.mouse.up();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    if (y === 262) {
      await expect(page.getByTestId('feedback')).toContainText(
        solution.meta.wrong!.miss,
      );
      await expect(page.getByTestId('water-left')).toHaveAttribute(
        'y',
        initial!,
      );
    }
  }
  await expect(
    page.getByRole('img', { name: 'Đá lớn đã ở khay', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Bằng nhau', exact: true }).tap();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Cốc phải', exact: true }).tap();
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
