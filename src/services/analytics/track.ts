import { nowMs } from '@/services/clock/clock';
import { describeDevice } from './device';
import type {
  AnalyticsEvent,
  EventName,
  EventPayloads,
  GraphicsQuality,
} from './events';
import { generateId } from './ids';
import { consoleSink, noopSink, type AnalyticsSink } from './sinks';

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
 * Chọn sink theo môi trường: `NEXT_PUBLIC_ANALYTICS=console|off`; bỏ trống thì chạy dev ghi ra console,
 * bản production không ghi (cho tới khi chọn xong nơi nhận sự kiện, câu hỏi H1 ở docs/GDD.md mục 13.2).
 */
function sinkFromEnvironment(): AnalyticsSink {
  const mode =
    process.env.NEXT_PUBLIC_ANALYTICS ||
    (process.env.NODE_ENV === 'production' ? 'off' : 'console');
  return mode === 'console' ? consoleSink : noopSink;
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
