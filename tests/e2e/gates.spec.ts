import { expect, test } from './fixtures';
import {
  findEventProblems,
  openRuns,
  type TrackedEvent,
} from './helpers/events';
import { findLayoutProblems } from './helpers/layout';

// Tự kiểm các CỔNG của bộ E2E: một cổng không bao giờ thất bại thì không chứng minh được gì. Mỗi test `test.fail()`
// cố ý gây ra vi phạm và Playwright yêu cầu test đó phải THẤT BẠI (nếu nó lại qua, test này báo lỗi).
// Không cần máy chủ của game: dùng `page.setContent` và các hàm kiểm thuần.

test.describe('cổng console và mạng (fixture guard)', () => {
  test('console.error làm test thất bại', async ({ page }) => {
    test.fail();
    await page.setContent('<p>x</p>');
    await page.evaluate(() => console.error('lỗi cố ý'));
    await page.waitForTimeout(50);
  });

  test('console.warn làm test thất bại', async ({ page }) => {
    test.fail();
    await page.setContent('<p>x</p>');
    await page.evaluate(() => console.warn('cảnh báo cố ý'));
    await page.waitForTimeout(50);
  });

  test('lỗi chưa bắt (pageerror) làm test thất bại', async ({ page }) => {
    test.fail();
    await page.setContent('<p>x</p>');
    await page.evaluate(() => {
      setTimeout(() => {
        throw new Error('lỗi chưa bắt cố ý');
      }, 0);
    });
    await page.waitForTimeout(100);
  });

  test('yêu cầu mạng trả mã ≥ 400 làm test thất bại', async ({ page }) => {
    test.fail();
    // Điều hướng (không phải fetch) nên không dính CORS: lỗi duy nhất có thể làm test này thất bại là mã 500.
    await page.route('http://may-chu-gia.test/**', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'text/html',
        body: '<p>lỗi</p>',
      }),
    );
    await page.goto('http://may-chu-gia.test/trang');
  });

  test('pageerror do WebKit hủy yêu cầu nạp trước (?_rsc=) không làm test thất bại', async ({
    page,
  }) => {
    await page.setContent('<p>x</p>');
    await page.evaluate(() => {
      setTimeout(() => {
        throw new Error(
          '/localhost:3100/play/2d-sample-01?_rsc=abc123 due to access control checks.',
        );
      }, 0);
    });
    await page.waitForTimeout(100);
  });

  test('lỗi được cho phép bằng guard.allow thì không làm test thất bại', async ({
    page,
    guard,
  }) => {
    guard.allow(/lỗi được phép/);
    await page.setContent('<p>x</p>');
    await page.evaluate(() => console.error('lỗi được phép cố ý'));
    await page.waitForTimeout(50);
  });

  test('sự kiện đo lường sai cấu trúc làm test thất bại', async ({ page }) => {
    test.fail();
    await page.setContent('<p>x</p>');
    // Thiếu trường, có trường lạ (email) và không có level_start trước.
    await page.evaluate(() =>
      console.info(
        `[track] ${JSON.stringify({ type: 'level_complete', email: 'a@b.c' })}`,
      ),
    );
    await page.waitForTimeout(50);
  });
});

test.describe('cổng bố cục (findLayoutProblems)', () => {
  test('bắt cuộn ngang, vùng chạm nhỏ và chữ nhỏ', async ({ page }) => {
    await page.setContent(`
      <body style="margin:0">
        <button data-touch-target style="width:30px;height:30px">x</button>
        <p style="font-size:12px">chữ nhỏ</p>
        <div style="width:2000px;height:10px">rộng</div>
      </body>`);
    const problems = await findLayoutProblems(page);
    expect(problems.join('\n')).toContain('cuộn ngang');
    expect(problems.join('\n')).toContain('vùng chạm nhỏ 30×30');
    expect(problems.join('\n')).toContain('chữ nhỏ 12px');
  });

  test('bắt chữ tràn khỏi mép màn hình', async ({ page }) => {
    await page.setContent(`
      <body style="margin:0;overflow-x:hidden">
        <p style="font-size:18px;white-space:nowrap;position:absolute;left:0">
          ${'chữ rất dài '.repeat(40)}
        </p>
      </body>`);
    expect((await findLayoutProblems(page)).join('\n')).toContain(
      'chữ tràn khỏi mép màn hình',
    );
  });

  test('trang đạt chuẩn thì không báo gì', async ({ page }) => {
    await page.setContent(`
      <body style="margin:0;font-size:18px">
        <button data-touch-target style="width:48px;height:48px;font-size:18px">ok</button>
        <p>Chữ đủ lớn, nằm gọn trong màn hình.</p>
      </body>`);
    expect(await findLayoutProblems(page)).toEqual([]);
  });
});

// Hợp lệ theo docs/GDD.md mục 9.1; các test dưới đây sửa từng chỗ để chứng minh bộ kiểm bắt được.
const VALID_START: TrackedEvent = {
  type: 'level_start',
  eventId: '11111111-1111-4111-8111-111111111111',
  installId: '22222222-2222-4222-8222-222222222222',
  sessionId: '33333333-3333-4333-8333-333333333333',
  ts: '2026-11-14T08:00:00.000Z',
  appVersion: '0.1.0',
  device: { kind: 'android', w: 393, h: 727, quality: 'medium' },
  levelId: '2d-sample-01',
  mode: 'campaign',
  attemptNo: 1,
  restart: false,
};
const VALID_COMPLETE: TrackedEvent = {
  ...VALID_START,
  type: 'level_complete',
  eventId: '44444444-4444-4444-8444-444444444444',
  durationMs: 4200,
  hintsUsed: 0,
  result: 'solved',
  wrongCount: 1,
};
delete (VALID_COMPLETE as Record<string, unknown>).attemptNo;
delete (VALID_COMPLETE as Record<string, unknown>).restart;

test.describe('cổng sự kiện đo lường (findEventProblems)', () => {
  test('chuỗi hợp lệ không có vi phạm', () => {
    expect(findEventProblems([VALID_START, VALID_COMPLETE])).toEqual([]);
    expect(openRuns([VALID_START])).toEqual(['2d-sample-01']);
    expect(openRuns([VALID_START, VALID_COMPLETE])).toEqual([]);
  });

  test('bắt trường lạ, thiếu trường và sai kiểu', () => {
    const withPii = { ...VALID_START, email: 'a@b.c' };
    expect(findEventProblems([withPii]).join('\n')).toContain(
      'trường lạ "email"',
    );

    const missing: Record<string, unknown> = { ...VALID_START };
    delete missing.attemptNo;
    expect(findEventProblems([missing as TrackedEvent]).join('\n')).toContain(
      'thiếu trường attemptNo',
    );

    const wrongType = { ...VALID_START, restart: 'không' };
    expect(findEventProblems([wrongType]).join('\n')).toContain('restart');

    const badDevice = {
      ...VALID_START,
      device: { kind: 'tivi', w: 0, h: 1, quality: 'ultra', ip: '1.2.3.4' },
    };
    expect(findEventProblems([badDevice]).join('\n')).toContain('device');
  });

  test('bắt vi phạm luồng bắt đầu → đúng một kết thúc', () => {
    const second = {
      ...VALID_START,
      eventId: '55555555-5555-4555-8555-555555555555',
    };
    expect(findEventProblems([VALID_START, second]).join('\n')).toContain(
      'bắt đầu lần nữa',
    );
    expect(findEventProblems([VALID_COMPLETE]).join('\n')).toContain(
      'chưa bắt đầu',
    );
    const again = {
      ...VALID_COMPLETE,
      eventId: '66666666-6666-4666-8666-666666666666',
    };
    expect(
      findEventProblems([VALID_START, VALID_COMPLETE, again]).join('\n'),
    ).toContain('chưa bắt đầu');
  });

  test('bắt eventId trùng và tên sự kiện lạ', () => {
    const dup = { ...VALID_START, type: 'level_start' };
    expect(
      findEventProblems([VALID_START, VALID_COMPLETE, dup]).join('\n'),
    ).toContain('eventId bị trùng');
    expect(
      findEventProblems([{ ...VALID_START, type: 'level_wrong' }]).join('\n'),
    ).toContain('không nằm trong GDD');
  });
});
