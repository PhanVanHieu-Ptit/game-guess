import { describe, expect, it } from 'vitest';
import {
  CHAPTERS,
  chapterIndex,
  chapterProgress,
  replayChallenge,
} from '@/domain/progress/journey';
import type { LevelResults, LevelResult } from '@/domain/progress/types';
import { LEVEL_METAS } from '@/levels';
import { LEVEL_FLAVOR } from '@/levels/flavor';

const result: LevelResult = {
  status: 'solved',
  bestMs: 1000,
  bestHints: 0,
  lastSolvedAt: '2026-11-24T00:00:00.000Z',
};

describe('hành trình và lý do chơi tiếp', () => {
  it('mọi màn thật thuộc đúng một chặng, có lời dẫn và câu chốt riêng', () => {
    expect(Object.keys(LEVEL_FLAVOR).sort()).toEqual(
      LEVEL_METAS.map((level) => level.id).sort(),
    );
    expect(CHAPTERS).toHaveLength(7);
    for (const level of LEVEL_METAS) {
      const flavor = LEVEL_FLAVOR[level.id as keyof typeof LEVEL_FLAVOR];
      expect(
        flavor.every((line) => line.length > 10 && line.length <= 140),
      ).toBe(true);
    }
    expect(
      new Set(Object.values(LEVEL_FLAVOR).map((flavor) => flavor[0])).size,
    ).toBe(LEVEL_METAS.length);
    expect(chapterIndex(6)).toBe(0);
    expect(chapterIndex(7)).toBe(1);
    expect(chapterIndex(42)).toBe(6);
  });

  it('chỉ sưu tập dấu khi hoàn thành đủ chặng; chơi lại không cộng trùng, kết quả ngoài catalog không tính', () => {
    const members = LEVEL_METAS.slice(0, 6);
    const results: LevelResults = Object.fromEntries(
      members.slice(0, 5).map((level) => [level.id, result]),
    );
    results['2d-unknown'] = result;
    expect(chapterProgress(LEVEL_METAS, results, 0)).toEqual({
      completed: 5,
      total: 6,
      earned: false,
    });
    results[members[5].id] = { ...result, status: 'revealed', bestHints: 3 };
    expect(chapterProgress(LEVEL_METAS, results, 0)).toEqual({
      completed: 6,
      total: 6,
      earned: true,
    });
    results[members[0].id] = { ...result, bestMs: 500 };
    expect(chapterProgress(LEVEL_METAS, results, 0).completed).toBe(6);
    expect(chapterProgress(LEVEL_METAS, results, 1).completed).toBe(0);
  });

  it('chơi lại ưu tiên màn xem đáp án, rồi màn cần gợi ý, rồi màn chưa chơi', () => {
    const [first, second, third] = LEVEL_METAS;
    const results: LevelResults = {
      [first.id]: result,
      [second.id]: { ...result, bestHints: 1 } satisfies LevelResult,
      [third.id]: {
        ...result,
        status: 'revealed',
        bestHints: 3,
      } satisfies LevelResult,
    };
    expect(replayChallenge(LEVEL_METAS, results)?.id).toBe(third.id);
    results[third.id] = result;
    expect(replayChallenge(LEVEL_METAS, results)?.id).toBe(second.id);
    results[second.id] = result;
    expect(replayChallenge(LEVEL_METAS, results)?.id).toBe(LEVEL_METAS[3].id);
    expect(replayChallenge([], {})).toBeNull();
  });
});
