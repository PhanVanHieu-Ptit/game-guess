import type { LevelMeta } from '@/domain/levels/types';
import type { LevelResults } from './types';

export const CHAPTER_SIZE = 6;
export const CHAPTERS = [
  {
    name: 'Tết nhà ngoại',
    stamp: 'Mầm lắt léo',
    icon: '🧧',
    color: '#ffe4d4',
  },
  {
    name: 'Đừng tin mắt mình',
    stamp: 'Mắt cú vọ',
    icon: '👀',
    color: '#dff4f3',
  },
  {
    name: 'Bình tĩnh mà quậy',
    stamp: 'Đầu lạnh tim vui',
    icon: '🧊',
    color: '#dcecff',
  },
  {
    name: 'Xoắn một chút thôi',
    stamp: 'Não biết uốn',
    icon: '🌀',
    color: '#eee2ff',
  },
  {
    name: 'Chuyện nhỏ có võ',
    stamp: 'Thám tử tí hon',
    icon: '🔎',
    color: '#ffe1b2',
  },
  {
    name: 'Tưởng dễ mà…',
    stamp: 'Bậc thầy bất ngờ',
    icon: '🎭',
    color: '#fce0eb',
  },
  {
    name: 'Trùm cuối là bạn',
    stamp: 'Trùm lắt léo',
    icon: '🏆',
    color: '#fff0ac',
  },
] as const;

export function chapterIndex(ordinal: number): number {
  return Math.min(
    CHAPTERS.length - 1,
    Math.max(0, Math.floor((ordinal - 1) / CHAPTER_SIZE)),
  );
}

export function chapterProgress(
  levels: readonly LevelMeta[],
  results: LevelResults,
  index: number,
) {
  const members = levels.filter(
    (level) => chapterIndex(level.ordinal) === index,
  );
  const completed = members.filter(
    (level) => results[level.id] !== undefined,
  ).length;
  return {
    completed,
    total: members.length,
    earned: members.length > 0 && completed === members.length,
  };
}

/** Chọn thử thách có ý nghĩa khi đã đi hết hành trình; không làm mất kết quả tốt nhất. */
export function replayChallenge(
  levels: readonly LevelMeta[],
  results: LevelResults,
): LevelMeta | null {
  return (
    levels.find((level) => results[level.id]?.status === 'revealed') ??
    levels.find((level) => (results[level.id]?.bestHints ?? 0) > 0) ??
    levels.find((level) => results[level.id] === undefined) ??
    levels[0] ??
    null
  );
}
