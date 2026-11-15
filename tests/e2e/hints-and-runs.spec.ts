import { strings } from '@/features/strings';
import { expect, test } from './fixtures';
import { openRuns, typesOf } from './helpers/events';
import { expectLayoutOk } from './helpers/layout';
import { hints, home, levelCell, play, result } from './helpers/ui';
import { solution as sample01 } from './solutions/2d-sample-01';
import { solution as sample02 } from './solutions/2d-sample-02';

// Gợi ý ba cấp, xem đáp án, chơi lại, rời màn giữa chừng, màn chưa mở, mã màn sai: những chỗ khung chơi phải
// bảo đảm cho mọi màn (docs/TECH.md mục 5.4), kiểm trên màn mẫu bằng thao tác chạm.

test('gợi ý mở tuần tự, ghi hint_used đúng cấp, xem lại không tính thêm', async ({
  page,
  events,
}) => {
  await page.goto(`/play/${sample01.meta.id}`);
  await expect(play.heading(page, 1)).toBeVisible();
  await expect(play.hintButton(page)).toHaveText('Gợi ý (0/3)');

  await play.hintButton(page).tap();
  await expect(hints.sheet(page)).toBeVisible();
  // Chỉ cấp kế tiếp có nút mở; cấp sau còn khóa.
  await expect(hints.open(page, 1)).toBeVisible();
  await expect(hints.open(page, 2)).toHaveCount(0);
  await expectLayoutOk(page, 'hộp gợi ý, chưa mở cấp nào');

  await hints.open(page, 1).tap();
  await expect(hints.sheet(page)).toContainText(sample01.meta.hints[0]);
  await expect(hints.open(page, 2)).toBeVisible();
  await expect
    .poll(() => typesOf(events))
    .toEqual(['level_start', 'hint_used']);
  expect(events[1]).toMatchObject({
    levelId: sample01.meta.id,
    mode: 'campaign',
    tier: 1,
  });

  await hints.close(page).tap();
  await expect(hints.sheet(page)).toBeHidden();
  await expect(play.hintButton(page)).toHaveText('Gợi ý (1/3)');

  // Mở lại hộp: gợi ý đã xem vẫn hiện và không ghi thêm sự kiện.
  await play.hintButton(page).tap();
  await expect(hints.sheet(page)).toContainText(sample01.meta.hints[0]);
  await hints.close(page).tap();
  expect(typesOf(events)).toEqual(['level_start', 'hint_used']);

  // Giải xong sau khi dùng gợi ý: mức là "Có gợi ý".
  await sample01.solve(page);
  await expect(result.dialog(page)).toBeVisible({ timeout: 1000 });
  await expect(result.dialog(page).getByTestId('result-level')).toHaveText(
    strings.result.solveLevel.hinted,
  );
  await expect
    .poll(() => typesOf(events))
    .toEqual(['level_start', 'hint_used', 'level_complete']);
  expect(events[2]).toMatchObject({ result: 'solved', hintsUsed: 1 });
});

test('xem đáp án cần xác nhận, ghi kết quả "xem đáp án" và vẫn mở màn kế', async ({
  page,
  events,
}) => {
  await page.goto(`/play/${sample01.meta.id}`);
  await expect(play.heading(page, 1)).toBeVisible();

  await play.hintButton(page).tap();
  await hints.open(page, 1).tap();
  await hints.open(page, 2).tap();
  await expect(hints.sheet(page)).toContainText(sample01.meta.hints[1]);

  // Cấp 3 là xem đáp án: có hộp xác nhận, bấm "Thôi" thì chưa xem.
  await hints.open(page, 3).tap();
  const confirm = hints
    .sheet(page)
    .getByRole('group', { name: strings.hints.confirmTitle });
  await expect(confirm).toBeVisible();
  await expect(confirm).toContainText(strings.hints.confirmBody);
  // Máy nhỏ (iPhone SE 320×568): hộp gợi ý đã cao gần hết màn hình, nên phần xác nhận phải được cuộn vào tầm nhìn
  // chứ không nằm dưới mép; cả hai nút phải nhìn thấy trọn vẹn.
  for (const name of [strings.hints.confirmYes, strings.hints.confirmNo]) {
    await expect(confirm.getByRole('button', { name })).toBeInViewport({
      ratio: 1,
    });
  }
  await expectLayoutOk(page, 'hộp xác nhận xem đáp án');
  await confirm.getByRole('button', { name: strings.hints.confirmNo }).tap();
  await expect(confirm).toBeHidden();
  await expect(result.dialog(page)).toBeHidden();
  expect(typesOf(events)).toEqual(['level_start', 'hint_used', 'hint_used']);

  // Xác nhận thì kết thúc lượt với kết quả "revealed".
  await hints.open(page, 3).tap();
  await confirm.getByRole('button', { name: strings.hints.confirmYes }).tap();
  await expect(result.dialog(page)).toBeVisible({ timeout: 1000 });
  await expect(
    result
      .dialog(page)
      .getByRole('heading', { name: strings.result.revealedTitle }),
  ).toBeVisible();
  await expect(result.dialog(page)).toContainText(sample01.meta.hints[2]);
  await expect(result.dialog(page).getByTestId('result-level')).toHaveText(
    strings.result.solveLevel.revealed,
  );
  await expectLayoutOk(page, 'kết quả sau khi xem đáp án');
  await expect
    .poll(() => typesOf(events))
    .toEqual([
      'level_start',
      'hint_used',
      'hint_used',
      'hint_used',
      'level_complete',
    ]);
  expect(events[3]).toMatchObject({ tier: 3 });
  expect(events[4]).toMatchObject({ result: 'revealed', hintsUsed: 3 });

  // Xem đáp án vẫn mở màn kế (docs/GDD.md mục 5), và chọn màn đánh dấu "đã xem đáp án".
  await result.next(page).tap();
  await expect(page).toHaveURL(/\/play\/2d-sample-02$/);
  await expect(play.heading(page, 2)).toBeVisible();
  await page.goto('/levels');
  await expect(levelCell(page, 1, 'revealed')).toBeVisible();
  await expect(levelCell(page, 2, 'open')).toBeVisible();
});

test('chơi lại và rời màn giữa chừng ghi bỏ cuộc rồi bắt đầu lượt mới', async ({
  page,
  events,
}) => {
  await page.goto(`/play/${sample01.meta.id}`);
  await expect(play.heading(page, 1)).toBeVisible();
  await expect.poll(() => typesOf(events)).toEqual(['level_start']);

  await sample01.mistakes[0].tap(page);
  await expect(play.feedback(page)).toContainText(
    sample01.mistakes[0].feedback,
  );

  // Chơi lại: lượt dở bị ghi bỏ cuộc, lượt mới bắt đầu và cảnh được dựng lại từ đầu.
  await play.restart(page).tap();
  await expect
    .poll(() => typesOf(events))
    .toEqual(['level_start', 'level_abandon', 'level_start']);
  expect(events[1]).toMatchObject({ levelId: sample01.meta.id, wrongCount: 1 });
  expect(events[2]).toMatchObject({ attemptNo: 2, restart: true });
  await expect(play.feedback(page)).toHaveCount(0);
  for (const label of ['0 quả', '1 quả', '2 quả', '3 quả']) {
    await expect(
      page.getByRole('button', { name: label, exact: true }),
    ).toHaveAttribute('data-state', 'idle');
  }

  // Rời màn khi chưa giải cũng là bỏ cuộc.
  await play.back(page).tap();
  await expect(page).toHaveURL(/\/levels$/);
  await expect
    .poll(() => typesOf(events))
    .toEqual(['level_start', 'level_abandon', 'level_start', 'level_abandon']);
  expect(openRuns(events)).toEqual([]);
});

test('chơi lại từ màn kết quả bắt đầu lượt mới và đếm lại gợi ý từ 0', async ({
  page,
  events,
}) => {
  await page.goto(`/play/${sample01.meta.id}`);
  await expect(play.heading(page, 1)).toBeVisible();
  await play.hintButton(page).tap();
  await hints.open(page, 1).tap();
  await hints.close(page).tap();
  await sample01.solve(page);
  await expect(result.dialog(page)).toBeVisible();

  await result.restart(page).tap();
  await expect(result.dialog(page)).toBeHidden();
  await expect(play.hintButton(page)).toHaveText('Gợi ý (0/3)');
  await sample01.solve(page);
  await expect(result.dialog(page).getByTestId('result-level')).toHaveText(
    strings.result.solveLevel.self,
  );
  await expect
    .poll(() => typesOf(events))
    .toEqual([
      'level_start',
      'hint_used',
      'level_complete',
      'level_start',
      'level_complete',
    ]);
  expect(events[3]).toMatchObject({ attemptNo: 2, restart: true });

  // Kết quả tốt nhất được giữ: lần đầu có gợi ý, lần sau tự giải → trang chủ vẫn coi màn 1 đã giải.
  await page.goto('/levels');
  await expect(levelCell(page, 1, 'solved')).toBeVisible();
});

test('màn chưa mở không vào được và chỉ đường về màn đang chơi', async ({
  page,
  events,
}) => {
  await page.goto(`/play/${sample02.meta.id}`);
  await expect(
    page.getByRole('heading', { name: strings.play.locked.title }),
  ).toBeVisible();
  await expectLayoutOk(page, 'màn chưa mở');

  await page.getByRole('link', { name: strings.play.locked.goOn }).tap();
  await expect(page).toHaveURL(/\/play\/2d-sample-01$/);
  await expect(play.heading(page, 1)).toBeVisible();
  // Màn bị khóa không phát sự kiện nào; sự kiện đầu tiên là của màn 1.
  await expect.poll(() => typesOf(events)).toEqual(['level_start']);
  expect(events[0]).toMatchObject({ levelId: sample01.meta.id });
});

test('mã màn không có hiện trang "không tìm thấy", không sập', async ({
  page,
  guard,
}) => {
  // Cố ý mở địa chỉ không tồn tại nên máy chủ trả 404 (cả dòng báo của HTTP lẫn dòng báo lỗi tải tài nguyên
  // mà trình duyệt ghi vào console cho mã 404). Chỉ cho phép đúng hai địa chỉ này.
  guard.allow(/HTTP 404: .*\/(play\/khong-co|khong-co)$/);
  guard.allow(/Failed to load resource.*404/);

  await page.goto('/play/khong-co');
  await expect(
    page.getByRole('heading', { name: strings.play.notFound.title }),
  ).toBeVisible();
  await expectLayoutOk(page, 'không tìm thấy màn');
  await page.getByRole('link', { name: strings.play.back }).tap();
  await expect(page).toHaveURL(/\/levels$/);

  await page.goto('/khong-co');
  await expect(
    page.getByRole('heading', { name: strings.notFound.title }),
  ).toBeVisible();
  await expectLayoutOk(page, 'không tìm thấy trang');
  await page.getByRole('link', { name: strings.notFound.home }).tap();
  await expect(home.play(page)).toBeVisible();
});

// Sai liền 3 lần thì nút Gợi ý nhấp nháy nhẹ, không có hộp thoại ép buộc (docs/GDD.md mục 3.1, quy tắc 6).
test.describe('nút Gợi ý khi người chơi bí', () => {
  test('sai liền 3 lần thì nút nhấp nháy và lời phản hồi nhắc tới nút', async ({
    page,
  }) => {
    await page.goto(`/play/${sample01.meta.id}`);
    await expect(play.heading(page, 1)).toBeVisible();
    await expect(play.hintButton(page)).toHaveAttribute('data-nudge', 'false');

    for (const mistake of sample01.mistakes.slice(0, 2))
      await mistake.tap(page);
    await expect(play.hintButton(page)).toHaveAttribute('data-nudge', 'false');

    await sample01.mistakes[2].tap(page);
    await expect(play.hintButton(page)).toHaveAttribute('data-nudge', 'true');
    await expect(play.hintButton(page)).toHaveCSS(
      'animation-iteration-count',
      'infinite',
    );
    await expect(play.feedback(page)).toContainText(strings.play.wrongStuck);
    // Không có hộp thoại nào bật lên: chỉ nhấp nháy.
    await expect(hints.sheet(page)).toBeHidden();
    await expect(result.dialog(page)).toBeHidden();
  });

  // Hoạt ảnh nhấp nháy vô hạn làm Playwright coi nút "không ổn định" nên không chạm được; bật giảm chuyển động
  // vừa tránh điều đó, vừa kiểm đúng yêu cầu truy cập: người dùng chọn giảm chuyển động thì nút không nhấp nháy mãi.
  test.describe('khi người dùng chọn giảm chuyển động', () => {
    test.use({ reducedMotion: 'reduce' });

    test('nút không nhấp nháy mãi, chạm được, và hết nhấp nháy sau khi mở gợi ý', async ({
      page,
    }) => {
      await page.goto(`/play/${sample01.meta.id}`);
      await expect(play.heading(page, 1)).toBeVisible();
      for (const mistake of sample01.mistakes) await mistake.tap(page);
      await expect(play.hintButton(page)).toHaveAttribute('data-nudge', 'true');
      await expect(play.hintButton(page)).toHaveCSS(
        'animation-iteration-count',
        '1',
      );

      await play.hintButton(page).tap();
      await hints.open(page, 1).tap();
      await hints.close(page).tap();
      await expect(play.hintButton(page)).toHaveAttribute(
        'data-nudge',
        'false',
      );
    });
  });
});
