import type { LevelId, LevelMeta } from '@/domain/levels/types';
import type { LevelResults } from './types';

// Mở khóa tuần tự (docs/GDD.md mục 3.2, giả định G2): màn n mở khi màn n−1 đã có kết quả (đã giải hoặc
// đã xem đáp án). Màn đầu luôn mở. `unlockAll` (biến NEXT_PUBLIC_UNLOCK_ALL) mở hết để thử và kiểm thử.
// `metas` phải theo đúng thứ tự chơi (validateLevelMetas bảo đảm điều đó).

export const hasResult = (results: LevelResults, id: LevelId): boolean =>
  results[id] !== undefined;

export function isUnlocked(
  metas: readonly LevelMeta[],
  id: LevelId,
  results: LevelResults,
  unlockAll: boolean,
): boolean {
  const index = metas.findIndex((meta) => meta.id === id);
  if (index < 0) return false;
  if (unlockAll || index === 0 || hasResult(results, id)) return true;
  return hasResult(results, metas[index - 1].id);
}

/** Màn chưa có kết quả đầu tiên (đích của nút "Chơi tiếp"), hoặc null nếu đã xong hết. */
export function nextPlayable(
  metas: readonly LevelMeta[],
  results: LevelResults,
  unlockAll: boolean,
): LevelMeta | null {
  return (
    metas.find(
      (meta) =>
        !hasResult(results, meta.id) &&
        isUnlocked(metas, meta.id, results, unlockAll),
    ) ?? null
  );
}

/** Màn đứng ngay sau màn `id` theo thứ tự chơi, hoặc null nếu `id` là màn cuối (hay không có trong danh sách). */
export function levelAfter(
  metas: readonly LevelMeta[],
  id: LevelId,
): LevelMeta | null {
  const index = metas.findIndex((meta) => meta.id === id);
  return index < 0 ? null : (metas[index + 1] ?? null);
}

export function countCompleted(
  metas: readonly LevelMeta[],
  results: LevelResults,
): number {
  return metas.filter((meta) => hasResult(results, meta.id)).length;
}
