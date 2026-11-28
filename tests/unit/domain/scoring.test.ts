import { describe, expect, it } from 'vitest';
import { applyResult } from '@/domain/progress/apply-result';
import { CHAPTERS, chapterIndex } from '@/domain/progress/journey';
import {
  campaignScore,
  chapterReward,
  earnedRank,
  isCheckpoint,
  maxLevelScore,
  runScore,
} from '@/domain/progress/scoring';
import type { LevelResult, LevelResults } from '@/domain/progress/types';
import { LEVEL_METAS } from '@/levels';

const solved: LevelResult = {
  status: 'solved',
  bestMs: 1000,
  bestHints: 0,
  lastSolvedAt: '2026-11-27T00:00:00.000Z',
};

describe('thang chinh phục 42 màn', () => {
  it('giữ sáu màn Tết, tăng độ khó liên tục, bảy cấp đủ sáu màn và kết thúc bằng kiểm luật', () => {
    expect(LEVEL_METAS.slice(0, 6).map((meta) => meta.id)).toEqual([
      '2d-01',
      '2d-02',
      '2d-03',
      '2d-04',
      '2d-05',
      '2d-06',
    ]);
    expect(LEVEL_METAS).toHaveLength(42);
    expect(LEVEL_METAS.at(-1)?.id).toBe('2d-39');
    LEVEL_METAS.forEach((meta, i) => {
      if (i > 0)
        expect(meta.difficulty).toBeGreaterThanOrEqual(
          LEVEL_METAS[i - 1].difficulty,
        );
    });
    CHAPTERS.forEach((_, index) => {
      expect(
        LEVEL_METAS.filter((meta) => chapterIndex(meta.ordinal) === index),
      ).toHaveLength(6);
    });
  });

  it('mỗi màn chốt gấp đôi điểm, điểm tăng theo cấp', () => {
    expect(
      LEVEL_METAS.filter((meta) => isCheckpoint(meta.ordinal)).map(
        (meta) => meta.ordinal,
      ),
    ).toEqual([6, 12, 18, 24, 30, 36, 42]);
    expect(isCheckpoint(0)).toBe(false);
    expect(maxLevelScore(1)).toBe(100);
    expect(maxLevelScore(6)).toBe(200);
    expect(maxLevelScore(7)).toBe(200);
    expect(maxLevelScore(42)).toBe(1400);
  });

  it('gợi ý giảm điểm rõ ràng, xem đáp án không nhận điểm', () => {
    expect(runScore(6, 'solved', 0)).toBe(200);
    expect(runScore(6, 'solved', 1)).toBe(150);
    expect(runScore(6, 'solved', 2)).toBe(100);
    expect(runScore(6, 'revealed', 3)).toBe(0);
    expect(runScore(6, 'solved', 3)).toBe(0);
  });

  it('không tính dữ liệu ngoài catalog, chơi lại không cộng trùng và không làm giảm điểm tốt nhất', () => {
    const first = LEVEL_METAS[0];
    const results: LevelResults = { [first.id]: solved, '2d-unknown': solved };
    expect(campaignScore(LEVEL_METAS, results)).toBe(100);
    results[first.id] = applyResult(solved, {
      status: 'solved',
      durationMs: 900,
      hintsUsed: 1,
      at: solved.lastSolvedAt,
    });
    expect(campaignScore(LEVEL_METAS, results)).toBe(100);
    expect(
      campaignScore(LEVEL_METAS, JSON.parse(JSON.stringify(results))),
    ).toBe(100);
  });

  it('xem đáp án đủ chặng chưa nhận danh hiệu; giải lại nâng điểm và nhận danh hiệu', () => {
    const results: LevelResults = Object.fromEntries(
      LEVEL_METAS.slice(0, 6).map((meta) => [meta.id, solved]),
    );
    const last = LEVEL_METAS[5];
    results[last.id] = { ...solved, status: 'revealed', bestHints: 3 };
    expect(chapterReward(LEVEL_METAS, results, 0)).toMatchObject({
      solved: 5,
      mastered: false,
      score: 500,
      maximum: 700,
      milestone: 6,
    });
    expect(earnedRank(LEVEL_METAS, results)).toBe('Đang khởi động');
    results[last.id] = applyResult(results[last.id], {
      status: 'solved',
      durationMs: 1000,
      hintsUsed: 1,
      at: solved.lastSolvedAt,
    });
    expect(chapterReward(LEVEL_METAS, results, 0)).toMatchObject({
      mastered: true,
      score: 650,
    });
    expect(earnedRank(LEVEL_METAS, results)).toBe('Tân binh');
  });

  it('tổng tối đa 19.600, mỗi cấp có mốc thưởng riêng và danh hiệu cuối', () => {
    const results: LevelResults = Object.fromEntries(
      LEVEL_METAS.map((meta) => [meta.id, solved]),
    );
    expect(campaignScore(LEVEL_METAS, results)).toBe(19600);
    expect(
      CHAPTERS.map((_, i) => chapterReward(LEVEL_METAS, results, i).maximum),
    ).toEqual([700, 1400, 2100, 2800, 3500, 4200, 4900]);
    expect(earnedRank(LEVEL_METAS, results)).toBe('Nhà vô địch');
    expect(chapterReward([], {}, 0).mastered).toBe(false);
  });
});
