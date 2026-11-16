import { promptText } from '@/domain/levels/prompt';
import { strings } from '@/features/strings';
import { expect, test } from './fixtures';
import { typesOf } from './helpers/events';
import { expectLayoutOk } from './helpers/layout';
import { home, levelCell, play, result } from './helpers/ui';
import { solution as sample01 } from './solutions/2d-sample-01';
import { solution as sample02 } from './solutions/2d-sample-02';

// Luồng màn mẫu của epic Nền tảng: vào màn → giải → màn kết quả → sang màn tiếp. Chạy trên mọi dự án trong
// playwright.config.ts (iPhone SE, Pixel 5, 360×640 có cảm ứng). Chỉ dùng chạm (`tap`), không chuột, không phím tắt.

const PROGRESS_KEY = 'latleo:v1';

test('trang chủ → màn 1 → sai rồi đúng → kết quả → màn tiếp → màn cuối → chọn màn → tải lại vẫn nhớ', async ({
  page,
  events,
}, testInfo) => {
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
  await expect(page).toHaveURL(/\/play\/2d-sample-01$/);
  await expect(play.heading(page, 1)).toBeVisible();
  await expect(play.prompt(page)).toHaveText(promptText(sample01.meta.prompt));
  await expect(
    page.getByRole('button', { name: '2 quả', exact: true }),
  ).toBeVisible();
  await expectLayoutOk(page, 'màn 1');
  await page.screenshot({
    path: testInfo.outputPath('02-man-choi.png'),
    animations: 'disabled',
  });
  await expect.poll(() => typesOf(events)).toEqual(['level_start']);
  expect(events[0]).toMatchObject({
    levelId: sample01.meta.id,
    mode: 'campaign',
    attemptNo: 1,
    restart: false,
  });

  // ---- Sai: mỗi thao tác sai đều có phản hồi riêng và cho thử lại ngay, không tải lại trang ----
  for (const mistake of sample01.mistakes.slice(0, 2)) {
    await mistake.tap(page);
    await expect(play.feedback(page)).toContainText(mistake.feedback);
  }
  await expect(page).toHaveURL(/\/play\/2d-sample-01$/);
  await expectLayoutOk(page, 'màn 1 sau khi chọn sai');

  // ---- Đúng: trạng thái thắng hiện trong ≤ 1 giây (docs/GDD.md mục 3.1, quy tắc 4) ----
  await sample01.solve(page);
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
  await expect(dialog).toContainText(sample01.meta.explanation);
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
    levelId: sample01.meta.id,
    mode: 'campaign',
    result: 'solved',
    hintsUsed: 0,
    wrongCount: 2,
  });

  // ---- Màn tiếp ----
  await result.next(page).tap();
  await expect(page).toHaveURL(/\/play\/2d-sample-02$/);
  await expect(play.heading(page, 2)).toBeVisible();
  await expect(play.prompt(page)).toHaveText(promptText(sample02.meta.prompt));
  await expectLayoutOk(page, 'màn 2');
  await expect
    .poll(() => typesOf(events))
    .toEqual(['level_start', 'level_complete', 'level_start']);
  expect(events[2]).toMatchObject({
    levelId: sample02.meta.id,
    mode: 'campaign',
    attemptNo: 1,
    restart: false,
  });

  // ---- Màn cuối: giải xong thì không còn "Màn tiếp", nút chính thành "Về chọn màn" (docs/backlog.md LL-005) ----
  await sample02.mistakes[0].tap(page);
  await expect(play.feedback(page)).toContainText(
    sample02.mistakes[0].feedback,
  );
  await sample02.solve(page);
  await expect(result.dialog(page)).toBeVisible({ timeout: 1000 });
  await expect(result.next(page)).toHaveCount(0);
  await expect(result.backToLevels(page)).toBeVisible();
  await expect(result.dialog(page)).toContainText(sample02.meta.explanation);
  await expectLayoutOk(page, 'kết quả màn cuối');

  // ---- Chọn màn: cả hai màn đã giải ----
  await result.backToLevels(page).tap();
  await expect(page).toHaveURL(/\/levels$/);
  await expect(levelCell(page, 1, 'solved')).toBeVisible();
  await expect(levelCell(page, 2, 'solved')).toBeVisible();
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
  expect(state.levels[sample01.meta.id]?.status).toBe('solved');
  expect(state.levels[sample02.meta.id]?.status).toBe('solved');

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
  await page.goto(`/play/${sample01.meta.id}`);
  await expect(play.heading(page, 1)).toBeVisible();
  await sample01.solve(page);
  await expect(result.dialog(page)).toBeVisible();

  // Về trang chủ bằng tải trang mới: tiến trình phải đọc lại từ localStorage.
  await page.goto('/');
  await expect(home.playContinue(page)).toBeVisible();
  await expect(home.playContinue(page)).toContainText(
    strings.home.continueTo(2, 2),
  );
  await expectLayoutOk(page, 'trang chủ có nút Chơi tiếp');

  await home.playContinue(page).tap();
  await expect(page).toHaveURL(/\/play\/2d-sample-02$/);
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
  await expect(first).toHaveAttribute('href', `/play/${sample01.meta.id}`);

  const locked = levelCell(page, 2, 'locked');
  await expect(locked).toBeVisible();
  await expect(locked).toHaveText('2');
  await expect(locked).not.toHaveAttribute('href', /.*/);
  await expect(page.getByText(sample02.meta.title)).toHaveCount(0);
  await expectLayoutOk(page, 'chọn màn của người chơi mới');

  await first.tap();
  await expect(page).toHaveURL(/\/play\/2d-sample-01$/);
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
