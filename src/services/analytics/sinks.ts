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
