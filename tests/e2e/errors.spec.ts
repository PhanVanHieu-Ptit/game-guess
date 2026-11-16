import { promptText } from '@/domain/levels/prompt';
import { strings } from '@/features/strings';
import { expect, test } from './fixtures';
import { typesOf } from './helpers/events';
import { expectLayoutOk } from './helpers/layout';
import { play, result } from './helpers/ui';
import { solution as level01 } from './solutions/2d-01';

// "Không sập" (docs/TECH.md mục 1, nguyên tắc 6): lỗi của một màn không kéo sập khung chơi. Kịch bản thật: mạng làm
// hỏng đúng gói JS của cảnh, rồi mạng phục hồi và người chơi bấm "Thử lại".

// Chữ chỉ có trong gói JS của cảnh màn 1; gói chính không có.
const SCENE_MARKER = 'Bốn bé và bao lì xì khổng lồ';

test('nạp cảnh của màn thất bại: báo lỗi kèm Thử lại và Về chọn màn, chưa ghi level_start; mạng phục hồi rồi Thử lại thì chơi được', async ({
  page,
  events,
  guard,
}) => {
  // Cố ý làm hỏng một yêu cầu JS nên trình duyệt ghi lỗi tải tài nguyên vào console và Playwright báo yêu cầu lỗi.
  // Chỉ cho phép đúng loại này; mọi lỗi khác vẫn làm test thất bại.
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

  // Khung chơi vẫn đứng vững; chỉ phần cảnh báo lỗi, có hai lối ra.
  const alert = page.getByRole('main').getByRole('alert');
  // Hộp báo lỗi hiện sau giới hạn nạp cảnh của game (5 giây trong E2E, playwright.config.ts), nên chờ lâu hơn mặc định.
  await expect(alert).toContainText(strings.play.loadError, {
    timeout: 15_000,
  });
  const retry = alert.getByRole('button', { name: strings.play.retry });
  await expect(retry).toBeVisible();
  await expect(
    alert.getByRole('link', { name: strings.play.back }),
  ).toHaveAttribute('href', '/levels');
  await expect(play.heading(page, 1)).toBeVisible();
  await expect(play.prompt(page)).toHaveText(promptText(level01.meta.prompt));
  await expectLayoutOk(page, 'lỗi nạp cảnh');

  // Cảnh chưa dựng được nên chưa có lượt chơi nào: không có sự kiện đo lường.
  expect(typesOf(events)).toEqual([]);

  // Mạng phục hồi, bấm Thử lại: cảnh nạp được, lượt chơi bắt đầu đúng một lần và giải được.
  networkDown = false;
  await retry.tap();
  await expect(
    page.getByRole('button', { name: 'Bao lì xì', exact: true }),
  ).toBeVisible();
  await expect(alert).toHaveCount(0);
  await expect.poll(() => typesOf(events)).toEqual(['level_start']);

  await level01.solve(page);
  await expect(result.dialog(page)).toBeVisible({ timeout: 1000 });
  await expect
    .poll(() => typesOf(events))
    .toEqual(['level_start', 'level_complete']);
});
