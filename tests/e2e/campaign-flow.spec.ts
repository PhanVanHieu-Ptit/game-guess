import { promptText } from '@/domain/levels/prompt';
import { strings } from '@/features/strings';
import { expect, test } from './fixtures';
import { typesOf } from './helpers/events';
import { expectLayoutOk } from './helpers/layout';
import { home, levelCell, play, result, TOTAL_LEVELS } from './helpers/ui';
import { solution as level01 } from './solutions/2d-01';
import { solution as level02 } from './solutions/2d-02';
import { solution as level03 } from './solutions/2d-03';
import { solution as level04 } from './solutions/2d-04';
import { solution as level05 } from './solutions/2d-05';
import { solution as level06 } from './solutions/2d-06';
import { solution as level07 } from './solutions/2d-07';
import { solution as level08 } from './solutions/2d-08';
import { solution as level09 } from './solutions/2d-09';
import { solution as level10 } from './solutions/2d-10';
import { solution as level11 } from './solutions/2d-11';
import { solution as level12 } from './solutions/2d-12';
import { solution as level13 } from './solutions/2d-13';
import { solution as level14 } from './solutions/2d-14';
import { solution as level15 } from './solutions/2d-15';
import { solution as level16 } from './solutions/2d-16';
import { solution as level17 } from './solutions/2d-17';
import { solution as level18 } from './solutions/2d-18';
import { solution as level19 } from './solutions/2d-19';
import { solution as level20 } from './solutions/2d-20';
import { solution as level21 } from './solutions/2d-21';
import { solution as level22 } from './solutions/2d-22';
import { solution as level23 } from './solutions/2d-23';
import { solution as level24 } from './solutions/2d-24';
import { solution as level25 } from './solutions/2d-25';
import { solution as level26 } from './solutions/2d-26';
import { solution as level27 } from './solutions/2d-27';
import { solution as level28 } from './solutions/2d-28';
import { solution as level29 } from './solutions/2d-29';
import { solution as level3d01 } from './solutions/3d-01';
import { solution as level3d02 } from './solutions/3d-02';
import { solution as level3d03 } from './solutions/3d-03';

// Luồng các màn thật: vào màn → giải → kết quả → màn tiếp. Chạy trên mọi dự án trong
// playwright.config.ts (iPhone SE, Pixel 5, 360×640 có cảm ứng). Chỉ dùng chạm (`tap`), không chuột, không phím tắt.

const PROGRESS_KEY = 'latleo:v1';

test('trang chủ → màn 1 → sai rồi đúng → kết quả → màn tiếp → màn cuối → chọn màn → tải lại vẫn nhớ', async ({
  page,
  events,
  guard,
  browserName,
}, testInfo) => {
  test.setTimeout(120_000);
  // Chromium headless báo khi chụp framebuffer của cảnh 3D.
  if (browserName === 'chromium')
    guard.allow(/GL Driver Message .*GPU stall due to ReadPixels/);
  // ---- Trang chủ của người chơi mới ----
  await page.goto('/');
  await expect(home.play(page)).toBeVisible();
  await expect(home.daily(page)).toBeVisible();
  await expect(home.levels(page)).toBeVisible();
  await expect(home.playContinue(page)).toHaveCount(0);
  await expectLayoutOk(page, 'trang chủ');
  await page.screenshot({
    path: testInfo.outputPath('01-trang-chu.png'),
    animations: 'disabled',
  });

  // ---- Vào màn 1 ----
  await home.play(page).tap();
  await expect(page).toHaveURL(/\/play\/2d-01$/);
  await expect(play.heading(page, 1)).toBeVisible();
  await expect(play.prompt(page)).toHaveText(promptText(level01.meta.prompt));
  await expect(
    page.getByRole('button', { name: 'Bao lì xì', exact: true }),
  ).toBeVisible();
  await expectLayoutOk(page, 'màn 1');
  await page.screenshot({
    path: testInfo.outputPath('02-man-choi.png'),
    animations: 'disabled',
  });
  await expect.poll(() => typesOf(events)).toEqual(['level_start']);
  expect(events[0]).toMatchObject({
    levelId: level01.meta.id,
    mode: 'campaign',
    attemptNo: 1,
    restart: false,
  });

  // ---- Sai: mỗi thao tác sai đều có phản hồi riêng và cho thử lại ngay, không tải lại trang ----
  for (const mistake of level01.mistakes.slice(0, 2)) {
    await mistake.tap(page);
    await expect(play.feedback(page)).toContainText(mistake.feedback);
  }
  await expect(page).toHaveURL(/\/play\/2d-01$/);
  await expectLayoutOk(page, 'màn 1 sau khi chọn sai');

  // ---- Đúng: trạng thái thắng hiện trong ≤ 1 giây (docs/GDD.md mục 3.1, quy tắc 4) ----
  await level01.solve(page);
  await expect(result.dialog(page)).toBeVisible({ timeout: 1000 });
  const dialog = result.dialog(page);
  // Hộp thoại mở bằng thao tác chạm: nét nằm ở khung hộp, không đặt vòng lấy nét lên nút đầu tiên.
  await expect
    .poll(() =>
      page.evaluate(() =>
        Boolean(document.activeElement?.closest('a, button')),
      ),
    )
    .toBe(false);
  await expect(
    dialog.getByRole('heading', { name: strings.result.solvedTitle }),
  ).toBeVisible();
  await expect(dialog).toContainText(level01.meta.explanation);
  await expect(dialog.getByTestId('result-level')).toHaveText(
    strings.result.solveLevel.self,
  );
  await expect(dialog.getByTestId('result-time')).toHaveText(/^\d+:\d{2}$/);
  await expectLayoutOk(page, 'kết quả màn 1');
  await page.screenshot({
    path: testInfo.outputPath('03-ket-qua.png'),
    animations: 'disabled',
  });
  await expect
    .poll(() => typesOf(events))
    .toEqual(['level_start', 'level_complete']);
  expect(events[1]).toMatchObject({
    levelId: level01.meta.id,
    mode: 'campaign',
    result: 'solved',
    hintsUsed: 0,
    wrongCount: 2,
  });

  // ---- Màn tiếp ----
  await result.next(page).tap();
  await expect(page).toHaveURL(/\/play\/2d-02$/);
  await expect(play.heading(page, 2)).toBeVisible();
  await expect(play.prompt(page)).toHaveText(promptText(level02.meta.prompt));
  await expectLayoutOk(page, 'màn 2');
  await expect
    .poll(() => typesOf(events))
    .toEqual(['level_start', 'level_complete', 'level_start']);
  expect(events[2]).toMatchObject({
    levelId: level02.meta.id,
    mode: 'campaign',
    attemptNo: 1,
    restart: false,
  });

  // ---- Giải lần lượt các màn còn lại; chỉ màn cuối không có "Màn tiếp" ----
  await level02.mistakes[0].tap(page);
  await expect(play.feedback(page)).toContainText(level02.mistakes[0].feedback);
  await level02.solve(page);
  await expect(result.dialog(page)).toBeVisible({ timeout: 1000 });
  await expect(result.dialog(page)).toContainText(level02.meta.explanation);
  for (const level of [
    level03,
    level04,
    level05,
    level06,
    level07,
    level3d01,
    level08,
    level09,
    level10,
    level11,
    level3d02,
    level12,
    level13,
    level14,
    level3d03,
    level15,
    level16,
    level17,
    level18,
    level19,
    level20,
    level21,
    level22,
    level23,
    level24,
    level25,
    level26,
    level27,
    level28,
    level29,
  ]) {
    await result.next(page).tap();
    await expect(page).toHaveURL(`/play/${level.meta.id}`);
    await expect(play.heading(page, level.meta.ordinal)).toBeVisible();
    await level.mistakes[0].tap(page);
    await expect(play.feedback(page)).toContainText(level.mistakes[0].feedback);
    await expectLayoutOk(page, level.meta.id);
    await level.solve(page);
    await expect(result.dialog(page)).toBeVisible({ timeout: 1000 });
    await expect(result.dialog(page)).toContainText(level.meta.explanation);
  }
  await expect(result.next(page)).toHaveCount(0);
  await expect(result.backToLevels(page)).toBeVisible();
  await expectLayoutOk(page, 'kết quả màn cuối');

  // ---- Chọn màn: mọi màn hiện có đã giải ----
  await result.backToLevels(page).tap();
  await expect(page).toHaveURL(/\/levels$/);
  for (let ordinal = 1; ordinal <= TOTAL_LEVELS; ordinal++)
    await expect(levelCell(page, ordinal, 'solved')).toBeVisible();
  await expectLayoutOk(page, 'chọn màn');

  // ---- Tiến trình nằm trong localStorage và còn nguyên sau khi tải lại trang ----
  const stored = await page.evaluate(
    (key) => localStorage.getItem(key),
    PROGRESS_KEY,
  );
  expect(stored, 'tiến trình phải được lưu vào localStorage').not.toBeNull();
  const { state } = JSON.parse(stored ?? 'null') as {
    state: { levels: Record<string, { status: string }> };
  };
  expect(state.levels[level01.meta.id]?.status).toBe('solved');
  expect(state.levels[level02.meta.id]?.status).toBe('solved');

  await page.reload();
  await expect(levelCell(page, 1, 'solved')).toBeVisible();
  await expect(levelCell(page, 2, 'solved')).toBeVisible();

  // ---- Trang chủ khi đã qua hết các màn hiện có ----
  await page.goto('/');
  await expect(page.getByText(strings.home.allDone)).toBeVisible();
  await expect(home.playAgain(page)).toBeVisible();
  await expectLayoutOk(page, 'trang chủ khi đã qua hết các màn');

  // Một người chơi, một phiên, mọi sự kiện cùng mã ẩn danh và cùng mã phiên.
  expect(new Set(events.map((event) => event.installId)).size).toBe(1);
  expect(new Set(events.map((event) => event.sessionId)).size).toBe(1);
});

test('Chơi tiếp đưa về màn chưa xong đầu tiên', async ({ page }) => {
  await page.goto(`/play/${level01.meta.id}`);
  await expect(play.heading(page, 1)).toBeVisible();
  await level01.solve(page);
  await expect(result.dialog(page)).toBeVisible();

  // Về trang chủ bằng tải trang mới: tiến trình phải đọc lại từ localStorage.
  await page.goto('/');
  await expect(home.playContinue(page)).toBeVisible();
  await expect(home.playContinue(page)).toContainText(
    strings.home.continueTo(2, TOTAL_LEVELS),
  );
  await expectLayoutOk(page, 'trang chủ có nút Chơi tiếp');

  await home.playContinue(page).tap();
  await expect(page).toHaveURL(/\/play\/2d-02$/);
  await expect(play.heading(page, 2)).toBeVisible();
});

test('chọn màn: màn đầu mở, màn sau khóa và chỉ hiện số, không lộ tên màn', async ({
  page,
}) => {
  await page.goto('/');
  await home.levels(page).tap();
  await expect(page).toHaveURL(/\/levels$/);

  const first = levelCell(page, 1, 'open');
  await expect(first).toBeVisible();
  await expect(first).toHaveAttribute('href', `/play/${level01.meta.id}`);

  const locked = levelCell(page, 2, 'locked');
  await expect(locked).toBeVisible();
  await expect(locked).toHaveText('2');
  await expect(locked).not.toHaveAttribute('href', /.*/);
  await expect(page.getByText(level02.meta.title)).toHaveCount(0);
  await expectLayoutOk(page, 'chọn màn của người chơi mới');

  await first.tap();
  await expect(page).toHaveURL(/\/play\/2d-01$/);
});

test('đố mẹo mỗi ngày: kho câu chưa có thì báo rõ, có đường quay về', async ({
  page,
}) => {
  await page.goto('/');
  await home.daily(page).tap();
  await expect(page).toHaveURL(/\/daily$/);
  await expect(page.getByTestId('daily-empty')).toHaveText(strings.daily.empty);
  await expectLayoutOk(page, 'đố mẹo mỗi ngày');

  await page.getByRole('link', { name: strings.daily.home }).tap();
  await expect(page).toHaveURL(/\/$/);
  await expect(home.play(page)).toBeVisible();
});
