import type { AnalyticsEvent } from './events';

/**
 * Nơi nhận sự kiện. Muốn gửi tới dịch vụ thật (docs/TECH.md mục 9.1: hàng đợi, HTTP `/api/events`) chỉ cần viết
 * một sink mới và gọi `setSink(...)`; mã gọi `track` không đổi.
 */
export interface AnalyticsSink {
  send(event: AnalyticsEvent): void;
}

/**
 * In sự kiện ra console, mỗi sự kiện một dòng JSON có tiền tố `[track]` (dễ đọc, và E2E phân tích được đồng bộ).
 * Dùng `console.info`, không phải `console.error`, nên không bị tính là lỗi console.
 */
export const consoleSink: AnalyticsSink = {
  send(event) {
    console.info(`[track] ${JSON.stringify(event)}`);
  },
};

/** Bỏ qua mọi sự kiện. */
export const noopSink: AnalyticsSink = {
  send() {},
};

/** Same-origin transport; loss of analytics must never interrupt a game. */
export const httpSink: AnalyticsSink = {
  send(event) {
    const body = JSON.stringify(event);
    try {
      if (
        typeof navigator !== 'undefined' &&
        typeof navigator.sendBeacon === 'function' &&
        navigator.sendBeacon(
          '/api/events',
          new Blob([body], { type: 'application/json' }),
        )
      )
        return;
    } catch {
      // Some browsers expose sendBeacon but reject it in private mode.
    }
    void fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
      credentials: 'omit',
    }).catch(() => {});
  },
};
