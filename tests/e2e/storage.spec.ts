import { strings } from '@/features/strings';
import { expect, test } from './fixtures';
import { typesOf } from './helpers/events';
import { expectLayoutOk } from './helpers/layout';
import { home, play, result } from './helpers/ui';
import { solution as level01 } from './solutions/2d-01';
import { solution as level02 } from './solutions/2d-02';

// Lưu tiến trình bằng localStorage phải không bao giờ làm hỏng game (docs/GDD.md mục 6, docs/TECH.md mục 6):
// không lưu được thì vẫn chơi, dữ liệu hỏng thì bắt đầu lại phần hỏng, tất cả không có lỗi console.

const PROGRESS_KEY = 'latleo:v1';

// Các cách localStorage hỏng. Hàm chạy trong trang trước mọi mã của game (addInitScript), nên không dùng biến ngoài.
const STORAGE_FAILURES: ReadonlyArray<{ name: string; install: () => void }> = [
  {
    // Safari ở chế độ riêng tư cũ, hoặc người dùng chặn cookie và dữ liệu trang: chỉ truy cập localStorage đã ném lỗi.
    name: 'trình duyệt chặn truy cập localStorage',
    install: () => {
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        get() {
          throw new DOMException('The operation is insecure.', 'SecurityError');
        },
      });
    },
  },
  {
    // Hết dung lượng: đọc được nhưng ghi thì ném lỗi.
    name: 'localStorage đầy dung lượng',
    install: () => {
      Storage.prototype.setItem = function setItem() {
        throw new DOMException(
          'The quota has been exceeded.',
          'QuotaExceededError',
        );
      };
    },
  },
];

for (const failure of STORAGE_FAILURES) {
  test(`vẫn chơi trọn luồng khi ${failure.name}, có một dòng báo, không lỗi console`, async ({
    page,
    events,
  }) => {
    await page.addInitScript(failure.install);

    await page.goto('/');
    await expect(home.play(page)).toBeVisible();
    await home.play(page).tap();
    await expect(play.heading(page, 1)).toBeVisible();
    await expect.poll(() => typesOf(events)).toEqual(['level_start']);

    // Một dòng báo, không chặn chơi.
    await expect(page.getByTestId('storage-notice')).toHaveText(
      strings.storage.notice,
    );
    await expectLayoutOk(page, 'màn chơi có dòng báo không lưu được');

    await level01.solve(page);
    await expect(result.dialog(page)).toBeVisible({ timeout: 1000 });

    // Tiến trình giữ trong phiên: màn 2 vẫn mở dù không ghi được xuống máy.
    await result.next(page).tap();
    await expect(play.heading(page, 2)).toBeVisible();
    await level02.solve(page);
    await expect(result.dialog(page)).toBeVisible({ timeout: 1000 });
    await expect
      .poll(() => typesOf(events))
      .toEqual([
        'level_start',
        'level_complete',
        'level_start',
        'level_complete',
      ]);

    // Đúng như đã báo: tải lại trang thì tiến trình mất, người chơi bắt đầu lại bình thường.
    await page.goto('/');
    await expect(home.play(page)).toBeVisible();
    await expect(page.getByTestId('storage-notice')).toBeVisible();
    await expectLayoutOk(page, 'trang chủ khi không lưu được');
  });
}

// Dữ liệu đã lưu bị hỏng, sai kiểu hay thuộc phiên bản lạ: bỏ phần hỏng, bắt đầu lại, không ném lỗi.
const CORRUPT_DATA: ReadonlyArray<{ name: string; raw: string }> = [
  { name: 'không phải JSON', raw: '{{{ không phải json' },
  {
    name: 'đúng JSON nhưng sai kiểu',
    raw: JSON.stringify({
      version: 1,
      state: {
        installId: 42,
        levels: { '2d-01': { status: 'hacked', bestMs: 'x' } },
        attempts: 'nhiều',
        daily: null,
      },
    }),
  },
  {
    name: 'phiên bản lạ',
    raw: JSON.stringify({
      version: 99,
      state: {
        installId: '11111111-1111-4111-8111-111111111111',
        levels: {
          '2d-01': {
            status: 'solved',
            bestMs: 1000,
            bestHints: 0,
            lastSolvedAt: '2026-01-01T00:00:00.000Z',
          },
        },
      },
    }),
  },
  { name: 'giá trị rỗng', raw: '' },
];

for (const corrupt of CORRUPT_DATA) {
  test(`dữ liệu đã lưu ${corrupt.name}: bắt đầu lại như người chơi mới và ghi lại dữ liệu sạch`, async ({
    page,
    events,
  }) => {
    await page.goto('/');
    await expect(home.play(page)).toBeVisible();
    await page.evaluate(
      ([key, raw]) => localStorage.setItem(key, raw),
      [PROGRESS_KEY, corrupt.raw],
    );

    await page.reload();
    // Không có "Chơi tiếp" vì dữ liệu hỏng không được tin; game vẫn dùng được.
    await expect(home.play(page)).toBeVisible();
    await expect(home.playContinue(page)).toHaveCount(0);
    await expect(page.getByTestId('storage-notice')).toHaveCount(0);

    await home.play(page).tap();
    await expect(play.heading(page, 1)).toBeVisible();
    await level01.solve(page);
    await expect(result.dialog(page)).toBeVisible();
    await expect
      .poll(() => typesOf(events))
      .toEqual(['level_start', 'level_complete']);

    // Sau khi chơi, dữ liệu lưu là JSON hợp lệ đúng hình dạng.
    const raw = await page.evaluate(
      (key) => localStorage.getItem(key),
      PROGRESS_KEY,
    );
    const saved = JSON.parse(raw ?? 'null') as {
      version: number;
      state: {
        installId: string;
        levels: Record<string, { status: string }>;
        attempts: Record<string, number>;
      };
    };
    expect(saved.version).toBe(1);
    expect(saved.state.installId).toMatch(/^[0-9a-f-]{36}$/);
    expect(Object.keys(saved.state.levels)).toEqual([level01.meta.id]);
    expect(saved.state.levels[level01.meta.id].status).toBe('solved');
    expect(saved.state.attempts[level01.meta.id]).toBe(1);
  });
}
