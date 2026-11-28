import type { HintTier } from '@/domain/hints/hint-machine';
import type { LevelMeta } from '@/domain/levels/types';
import type { LevelResult, LevelResults } from './types';
import { CHAPTER_SIZE, CHAPTERS, chapterIndex } from './journey';

export function isCheckpoint(ordinal: number): boolean {
  return ordinal > 0 && ordinal % CHAPTER_SIZE === 0;
}

/** Điểm chinh phục, không phải tiền thưởng. Màn chốt mỗi cấp có điểm gấp đôi. */
export function maxLevelScore(ordinal: number): number {
  return (chapterIndex(ordinal) + 1) * 100 * (isCheckpoint(ordinal) ? 2 : 1);
}

export function runScore(
  ordinal: number,
  status: 'solved' | 'revealed',
  hints: HintTier,
): number {
  if (status === 'revealed' || hints === 3) return 0;
  return maxLevelScore(ordinal) * [1, 0.75, 0.5][hints];
}

export function bestLevelScore(
  meta: LevelMeta,
  result: LevelResult | undefined,
): number {
  return result ? runScore(meta.ordinal, result.status, result.bestHints) : 0;
}

/** Tính từ kết quả tốt nhất; tải lại hay chơi lại không cộng điểm trùng. */
export function campaignScore(
  levels: readonly LevelMeta[],
  results: LevelResults,
): number {
  return levels.reduce(
    (sum, meta) => sum + bestLevelScore(meta, results[meta.id]),
    0,
  );
}

export function chapterReward(
  levels: readonly LevelMeta[],
  results: LevelResults,
  index: number,
) {
  const members = levels.filter((meta) => chapterIndex(meta.ordinal) === index);
  const solved = members.filter(
    (meta) => results[meta.id]?.status === 'solved',
  ).length;
  return {
    solved,
    mastered: members.length > 0 && solved === members.length,
    score: campaignScore(members, results),
    maximum: members.reduce(
      (sum, meta) => sum + maxLevelScore(meta.ordinal),
      0,
    ),
    milestone: CHAPTER_SIZE * (index + 1),
  };
}

/** Danh hiệu chỉ trao sau khi tự giải hoặc dùng gợi ý đủ cả sáu màn của cấp. */
export function earnedRank(
  levels: readonly LevelMeta[],
  results: LevelResults,
): string {
  const index = CHAPTERS.reduce(
    (last, _, i) => (chapterReward(levels, results, i).mastered ? i : last),
    -1,
  );
  return index < 0 ? 'Đang khởi động' : CHAPTERS[index].rank;
}

export const formatScore = (score: number): string =>
  score.toLocaleString('vi-VN');
