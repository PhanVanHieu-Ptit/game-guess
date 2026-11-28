import type { LevelMeta } from '@/domain/levels/types';
import type { LevelResults } from './types';

export const CHAPTER_SIZE = 6;
export const CHAPTERS = [
  {
    name: 'Tết nhà ngoại',
    rank: 'Tân binh',
    difficulty: 'Dễ · 1–2/5',
    brief: 'Làm quen với chạm, kéo và những mẹo ngay trước mắt.',
    stamp: 'Mầm lắt léo',
    icon: '🧧',
    color: '#ffe4d4',
  },
  {
    name: 'Nhìn kỹ, đọc chậm',
    rank: 'Người quan sát',
    difficulty: 'Dễ · 2/5',
    brief: 'Nhìn từ góc khác, đọc đủ dữ kiện rồi mới hành động.',
    stamp: 'Mắt cú vọ',
    icon: '👀',
    color: '#dff4f3',
  },
  {
    name: 'Bẫy trong điều quen',
    rank: 'Thợ săn bẫy',
    difficulty: 'Vừa · 2–3/5',
    brief: 'Gỡ bẫy nhẩm nhanh; màn chốt đưa bạn vào cuộc tìm kiếm 3D.',
    stamp: 'Đầu lạnh tim vui',
    icon: '🧊',
    color: '#dcecff',
  },
  {
    name: 'Đổi cách ra tay',
    rank: 'Cao thủ tương tác',
    difficulty: 'Vừa · 3/5',
    brief: 'Phối hợp quan sát và thao tác; đôi khi phải biết chờ.',
    stamp: 'Não biết uốn',
    icon: '🌀',
    color: '#eee2ff',
  },
  {
    name: 'Tính kỹ mới đúng',
    rank: 'Nhà suy luận',
    difficulty: 'Khá · 3/5',
    brief: 'Suy luận từng bước, chốt chặng bằng một hóa đơn dễ nhầm.',
    stamp: 'Thám tử tí hon',
    icon: '🔎',
    color: '#ffe1b2',
  },
  {
    name: 'Phá thế bí',
    rank: 'Bậc thầy logic',
    difficulty: 'Khó · 4/5',
    brief: 'Đổi góc nhìn, ghép dữ kiện và tìm thao tác ít mà hiệu quả.',
    stamp: 'Bậc thầy bất ngờ',
    icon: '🎭',
    color: '#fce0eb',
  },
  {
    name: 'Trùm cuối là bạn',
    rank: 'Nhà vô địch',
    difficulty: 'Thử thách · 4–5/5',
    brief: 'Lập kế hoạch, kiểm điều kiện và bắt mọi kẽ hở của luật.',
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
