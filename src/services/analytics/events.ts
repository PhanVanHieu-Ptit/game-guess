import type { HintTier } from '@/domain/hints/hint-machine';
import type { LevelId, PlayMode } from '@/domain/levels/types';

// Sự kiện đo lường (docs/GDD.md mục 9, docs/TECH.md mục 9.1). Khai báo thành union để trình biên dịch bắt thiếu trường.
// Không ghi dữ liệu định danh: không tên, email, IP, vị trí.

export type DeviceKind = 'ios' | 'android' | 'desktop' | 'other';
export type GraphicsQuality = 'high' | 'medium' | 'low';

export interface DeviceInfo {
  kind: DeviceKind;
  /** Kích thước cửa sổ (px). */
  w: number;
  h: number;
  /** Mức đồ họa đang dùng. */
  quality: GraphicsQuality;
}

/** Trường chung của mọi sự kiện; do `track` tự điền, nơi gọi không cần biết. */
export interface EventBase {
  /** UUID, để loại trùng. */
  eventId: string;
  installId: string;
  /** Mỗi lần mở trang một mã. */
  sessionId: string;
  /** ISO 8601. */
  ts: string;
  appVersion: string;
  device: DeviceInfo;
}

interface LevelRef {
  levelId: LevelId;
  mode: PlayMode;
}

/** Trường riêng của từng sự kiện: tên sự kiện → dữ liệu truyền vào `track`. */
export interface EventPayloads {
  /** Màn bắt đầu cho thao tác (cảnh đã sẵn sàng). */
  level_start: LevelRef & { attemptNo: number; restart: boolean };
  /** Mở một cấp gợi ý lần đầu trong lượt chơi. */
  hint_used: LevelRef & { tier: 1 | 2 | 3; elapsedMs: number };
  /** Giải xong hoặc xem đáp án xong. */
  level_complete: LevelRef & {
    durationMs: number;
    hintsUsed: HintTier;
    result: 'solved' | 'revealed';
    wrongCount: number;
    noWebgl?: boolean;
  };
  /** Rời màn khi chưa giải. */
  level_abandon: LevelRef & {
    durationMs: number;
    hintsUsed: HintTier;
    wrongCount: number;
  };
}

export type EventName = keyof EventPayloads;

export type AnalyticsEvent = {
  [K in EventName]: { type: K } & EventBase & EventPayloads[K];
}[EventName];
