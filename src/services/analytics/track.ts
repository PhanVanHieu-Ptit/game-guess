import { nowMs } from '@/services/clock/clock';
import { describeDevice } from './device';
import type {
  AnalyticsEvent,
  EventName,
  EventPayloads,
  GraphicsQuality,
} from './events';
import { generateId } from './ids';
import { consoleSink, httpSink, noopSink, type AnalyticsSink } from './sinks';

/** Phần ngữ cảnh do tầng trên (features/) cung cấp, vì services/ không được import stores/. */
export interface AnalyticsContext {
  installId: string;
  quality: GraphicsQuality;
}

const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? 'dev';

let sink: AnalyticsSink | null = null;
let sessionId: string | null = null;
let contextProvider: () => AnalyticsContext = () => ({
  installId: 'unknown',
  quality: 'medium',
});

/**
 * Development logs to the browser; production sends to the same-origin receiver.
 * NEXT_PUBLIC_ANALYTICS=console|http|off overrides the default.
 */
function sinkFromEnvironment(): AnalyticsSink {
  const mode =
    process.env.NEXT_PUBLIC_ANALYTICS ||
    (process.env.NODE_ENV === 'production' ? 'http' : 'console');
  if (mode === 'console') return consoleSink;
  return mode === 'http' ? httpSink : noopSink;
}

/** Thay sink (dịch vụ thật, hoặc sink giả trong test). Truyền `null` để quay về sink mặc định theo môi trường. */
export function setSink(next: AnalyticsSink | null): void {
  sink = next;
}

/** Đăng ký nơi lấy `installId` và mức đồ họa hiện tại. Gọi một lần khi khởi động khung chơi. */
export function setContextProvider(provider: () => AnalyticsContext): void {
  contextProvider = provider;
}

/**
 * Ghi một sự kiện đo lường: `track('level_start', { levelId, mode, attemptNo, restart })`.
 * Tên sự kiện và dữ liệu được kiểm kiểu với nhau; các trường chung (mã sự kiện, mã ẩn danh, thời điểm, thiết bị…)
 * do hàm này tự điền. Mọi lỗi bị nuốt: đo lường không bao giờ được làm hỏng hay chặn việc chơi.
 */
export function track<K extends EventName>(
  name: K,
  data: EventPayloads[K],
): void {
  try {
    const { installId, quality } = contextProvider();
    sessionId ??= generateId();
    const event = {
      type: name,
      eventId: generateId(),
      installId,
      sessionId,
      ts: new Date(nowMs()).toISOString(),
      appVersion: APP_VERSION,
      device: describeDevice(quality),
      ...data,
    } as AnalyticsEvent;
    sink ??= sinkFromEnvironment();
    sink.send(event);
  } catch {
    // Nuốt lỗi có chủ đích (docs/GDD.md mục 9.2).
  }
}
