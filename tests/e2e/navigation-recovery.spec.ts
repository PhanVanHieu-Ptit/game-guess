import { strings } from '@/features/strings';
import { expect, test } from './fixtures';
import { typesOf } from './helpers/events';
import { expectLayoutOk } from './helpers/layout';
import { play, result } from './helpers/ui';
import { solution as level01 } from './solutions/2d-01';
import { solution as level02 } from './solutions/2d-02';

// Chặn riêng gói cảnh màn 2, kể cả lần tải trước khi người chơi đang xem kết quả màn 1.
const SCENE_MARKER = 'Ao nhà ngoại: cá, tôm và cua có hai càng khác cỡ';

test('Màn tiếp gặp lỗi tải cảnh: hiện khung màn mới, Thử lại khôi phục và giải được', async ({
  page,
  events,
  guard,
}) => {
  // Lỗi tải JS do test chủ động gây ra; mọi lỗi console hoặc mạng khác vẫn bị fixture bắt.
  guard.allow(/ERR_FAILED|Failed to load resource|yêu cầu lỗi: GET .*\.js/);
  guard.allow(
    /^console\.error: ChunkLoadError: Failed to load chunk \/_next\/static\/chunks\/[^\s]+\.js from module \d+/,
  );

  let networkDown = true;
  await page.route('**/_next/static/chunks/*.js', async (route) => {
    const response = await route.fetch();
    const body = await response.text();
    if (networkDown && body.includes(SCENE_MARKER)) {
      await route.abort('failed');
    } else {
      await route.fulfill({ response, body });
    }
  });

  await page.goto(`/play/${level01.meta.id}`);
  await expect(play.heading(page, 1)).toBeVisible();
  await level01.solve(page);
  await expect(result.dialog(page)).toBeVisible();
  await result.next(page).tap();

  // Điều hướng phải rời hộp kết quả cũ dù cảnh tiếp theo chưa nạp được.
  await expect(page).toHaveURL(`/play/${level02.meta.id}`);
  await expect(play.heading(page, 2)).toBeVisible();
  await expect(result.dialog(page)).not.toBeVisible();
  const alert = page.getByRole('main').getByRole('alert');
  await expect(alert).toContainText(strings.play.loadError, {
    timeout: 15_000,
  });
  await expect(
    alert.getByRole('link', { name: strings.play.back }),
  ).toHaveAttribute('href', '/levels');
  await expectLayoutOk(page, 'lỗi tải cảnh sau Màn tiếp');
  expect(typesOf(events)).toEqual(['level_start', 'level_complete']);

  networkDown = false;
  await alert.getByRole('button', { name: strings.play.retry }).tap();
  await expect(
    page.getByRole('button', { name: 'Con cua', exact: true }),
  ).toBeVisible();
  await expect(alert).toHaveCount(0);
  await level02.solve(page);
  await expect(result.dialog(page)).toBeVisible();
  await expect
    .poll(() => typesOf(events))
    .toEqual([
      'level_start',
      'level_complete',
      'level_start',
      'level_complete',
    ]);
});
