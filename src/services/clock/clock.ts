// Đồng hồ bọc ở một chỗ để test đặt được giờ giả (docs/TECH.md mục 6). Mã khác không gọi `Date.now()` trực tiếp.

type NowFn = () => number;

const realNow: NowFn = () => Date.now();
let currentNow: NowFn = realNow;

/** Thời điểm hiện tại, mili giây kể từ epoch. */
export const nowMs = (): number => currentNow();

/** Thời điểm hiện tại dạng ISO 8601 (UTC). */
export const nowIso = (): string => new Date(currentNow()).toISOString();

/** Chỉ dùng trong test: đặt giờ giả. Truyền `null` để trả về đồng hồ thật. */
export function setClock(now: NowFn | null): void {
  currentNow = now ?? realNow;
}
