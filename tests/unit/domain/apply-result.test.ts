import { describe, expect, it } from 'vitest';
import { applyResult } from '@/domain/progress/apply-result';
import type { LevelResult, RunOutcome } from '@/domain/progress/types';

const outcome = (overrides: Partial<RunOutcome> = {}): RunOutcome => ({
  status: 'solved',
  durationMs: 30_000,
  hintsUsed: 0,
  at: '2026-11-14T10:00:00.000Z',
  ...overrides,
});

const stored = (overrides: Partial<LevelResult> = {}): LevelResult => ({
  status: 'solved',
  bestMs: 50_000,
  bestHints: 1,
  lastSolvedAt: '2026-11-13T10:00:00.000Z',
  ...overrides,
});

describe('applyResult (giữ kết quả tốt nhất)', () => {
  it('lần đầu: lấy đúng kết quả của lượt chơi', () => {
    expect(applyResult(undefined, outcome())).toEqual({
      status: 'solved',
      bestMs: 30_000,
      bestHints: 0,
      lastSolvedAt: '2026-11-14T10:00:00.000Z',
    });
  });

  it('làm tròn và không để thời gian âm', () => {
    expect(applyResult(undefined, outcome({ durationMs: 1234.6 })).bestMs).toBe(
      1235,
    );
    expect(applyResult(undefined, outcome({ durationMs: -5 })).bestMs).toBe(0);
  });

  it('cùng đã giải: giữ thời gian ngắn nhất và số gợi ý ít nhất, cập nhật lần gần nhất', () => {
    const next = applyResult(
      stored({ bestMs: 20_000, bestHints: 2 }),
      outcome({ durationMs: 30_000, hintsUsed: 0 }),
    );
    expect(next).toEqual({
      status: 'solved',
      bestMs: 20_000,
      bestHints: 0,
      lastSolvedAt: '2026-11-14T10:00:00.000Z',
    });
  });

  it('đã tự giải rồi lần sau xem đáp án thì kết quả không tệ đi', () => {
    const prev = stored();
    expect(
      applyResult(prev, outcome({ status: 'revealed', hintsUsed: 3 })),
    ).toBe(prev);
  });

  it('đã xem đáp án rồi lần sau tự giải thì thành đã giải', () => {
    const prev = stored({ status: 'revealed', bestHints: 3, bestMs: 10_000 });
    expect(
      applyResult(prev, outcome({ durationMs: 40_000, hintsUsed: 1 })),
    ).toEqual({
      status: 'solved',
      bestMs: 40_000,
      bestHints: 1,
      lastSolvedAt: '2026-11-14T10:00:00.000Z',
    });
  });

  it('cùng xem đáp án: vẫn là xem đáp án', () => {
    const prev = stored({ status: 'revealed', bestHints: 3, bestMs: 10_000 });
    expect(
      applyResult(
        prev,
        outcome({ status: 'revealed', hintsUsed: 3, durationMs: 5_000 }),
      ).status,
    ).toBe('revealed');
  });
});
