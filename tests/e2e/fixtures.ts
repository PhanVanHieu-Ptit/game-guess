import { expect, test as base } from '@playwright/test';
import { findEventProblems, type TrackedEvent } from './helpers/events';

// Fixture chung của mọi test E2E (docs/TECH.md mục 11):
//  - `guard` chạy tự động: test THẤT BẠI nếu trang có console.error / console.warn, lỗi chưa bắt (pageerror),
//    yêu cầu mạng lỗi hoặc trả về mã ≥ 400 (Definition of Done mục 4: không lỗi trong console);
//  - `events` chạy tự động: gom sự kiện đo lường mà game ghi ra console (tiền tố `[track] `) và, khi test kết thúc,
//    kiểm chúng đúng cấu trúc, không trường lạ, mỗi lượt chơi bắt đầu rồi đúng một kết thúc (Definition of Done mục 6).
//    Test mong đợi một lỗi cụ thể thì gọi `guard.allow(...)` kèm lý do.

const TRACK_PREFIX = '[track] ';

interface Guard {
  /** Cho phép một thông báo lỗi cụ thể (khớp theo văn bản). Nơi gọi PHẢI ghi lý do. */
  allow(pattern: RegExp): void;
}

interface Fixtures {
  guard: Guard;
  events: TrackedEvent[];
}

// Trình duyệt tự hủy một yêu cầu (ví dụ nạp trước một liên kết rồi người dùng đã sang trang khác) không phải lỗi mạng.
const isAborted = (errorText: string | undefined): boolean =>
  /ERR_ABORTED|NS_BINDING_ABORTED|cancel+ed|aborted/i.test(errorText ?? '');

// Ngoại lệ DUY NHẤT cho `pageerror`, có lý do: khi test điều hướng cứng ngay sau khi trang tải xong (trong vài chục
// mili giây), Next đang nạp trước các liên kết (`?_rsc=`) và trình duyệt hủy chúng. Chromium báo `requestfailed` (đã
// được bỏ qua ở trên), còn WebKit không có `requestfailed` mà ném một lỗi chưa bắt dạng
// "…/play/2d-01?_rsc=… due to access control checks". Người chơi thật không rời trang nhanh đến vậy và chính
// trình duyệt chủ động hủy, nên đây là nhiễu của tự động hóa. Mẫu này chỉ khớp lỗi về yêu cầu `_rsc`; mọi pageerror
// khác vẫn làm test thất bại (xem tests/e2e/gates.spec.ts). Phát hiện ở phiên 2026-11-14, tái hiện được: delay 0 ms
// có lỗi, từ 50 ms trở lên không.
const ABORTED_PREFETCH_ERROR = /\?_rsc=\S+ due to access control checks/;

export const test = base.extend<Fixtures>({
  events: [
    async ({ page }, provide) => {
      const events: TrackedEvent[] = [];
      page.on('console', (message) => {
        const text = message.text();
        if (!text.startsWith(TRACK_PREFIX)) return;
        events.push(
          JSON.parse(text.slice(TRACK_PREFIX.length)) as TrackedEvent,
        );
      });
      await provide(events);
      expect(
        findEventProblems(events),
        'Sự kiện đo lường sai cấu trúc hoặc sai luồng bắt đầu → kết thúc',
      ).toEqual([]);
    },
    { auto: true },
  ],

  guard: [
    async ({ page }, provide) => {
      const problems: string[] = [];
      const allowed: RegExp[] = [];
      const report = (text: string): void => {
        if (!allowed.some((pattern) => pattern.test(text))) problems.push(text);
      };

      page.on('console', (message) => {
        const type = message.type();
        if (type === 'error' || type === 'warning')
          report(`console.${type}: ${message.text()}`);
      });
      page.on('pageerror', (error) => {
        if (ABORTED_PREFETCH_ERROR.test(error.message)) return;
        report(`pageerror: ${error.message}`);
      });
      page.on('requestfailed', (request) => {
        const errorText = request.failure()?.errorText;
        if (!isAborted(errorText))
          report(
            `yêu cầu lỗi: ${request.method()} ${request.url()} (${errorText})`,
          );
      });
      page.on('response', (response) => {
        if (response.status() >= 400)
          report(`HTTP ${response.status()}: ${response.url()}`);
      });

      await provide({ allow: (pattern) => allowed.push(pattern) });

      expect(problems, 'Trang có lỗi console hoặc lỗi mạng').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
