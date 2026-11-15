import type { DeviceInfo, DeviceKind, GraphicsQuality } from './events';

/** Phân loại thiết bị từ chuỗi user agent. iPadOS 13+ tự xưng là Macintosh nên cần thêm số điểm chạm. */
export function detectDeviceKind(
  userAgent: string,
  maxTouchPoints = 0,
): DeviceKind {
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios';
  if (/Macintosh/i.test(userAgent) && maxTouchPoints > 1) return 'ios';
  if (/Android/i.test(userAgent)) return 'android'; // phải xét trước Linux vì user agent Android có chữ "Linux"
  if (/Windows|Macintosh|Linux|CrOS/i.test(userAgent)) return 'desktop';
  return 'other';
}

/** Mô tả thiết bị tại thời điểm gọi. Chỉ chạm tới `window`/`navigator` khi được gọi (trên trình duyệt). */
export function describeDevice(quality: GraphicsQuality): DeviceInfo {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { kind: 'other', w: 0, h: 0, quality };
  }
  return {
    kind: detectDeviceKind(navigator.userAgent, navigator.maxTouchPoints),
    w: Math.round(window.innerWidth),
    h: Math.round(window.innerHeight),
    quality,
  };
}
