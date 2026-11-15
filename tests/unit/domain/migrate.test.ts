import { describe, expect, it } from 'vitest';
import {
  emptyProgress,
  migrateProgress,
  sanitizeProgress,
} from '@/domain/progress/migrate';

const newId = (): string => 'id-moi-tao-0001';

const valid = {
  version: 1,
  installId: 'abcd1234-ef56-7890',
  levels: {
    '2d-01': {
      status: 'solved',
      bestMs: 12_000,
      bestHints: 0,
      lastSolvedAt: '2026-11-14T01:02:03.000Z',
    },
  },
  attempts: { '2d-01': 3 },
  daily: {
    results: { '2026-11-14': { status: 'solved', ms: 40_000, hints: 1 } },
    streak: 2,
    bestStreak: 5,
  },
};

describe('sanitizeProgress (dữ liệu hỏng không bao giờ ném lỗi)', () => {
  it('dữ liệu hợp lệ được giữ nguyên', () => {
    expect(sanitizeProgress(valid, newId)).toEqual(valid);
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
    ['chuỗi', 'không phải đối tượng'],
    ['số', 42],
    ['mảng', [1, 2, 3]],
  ])('đầu vào %s: trả về tiến trình trống', (_label, input) => {
    expect(sanitizeProgress(input, newId)).toEqual(emptyProgress(newId));
  });

  it('bỏ từng kết quả màn hỏng, giữ phần còn lại', () => {
    const result = sanitizeProgress(
      {
        ...valid,
        levels: {
          ...valid.levels,
          '2d-02': {
            status: 'khac',
            bestMs: 1,
            bestHints: 0,
            lastSolvedAt: '2026-11-14T01:02:03.000Z',
          },
          '2d-03': {
            status: 'solved',
            bestMs: -5,
            bestHints: 0,
            lastSolvedAt: '2026-11-14T01:02:03.000Z',
          },
          '2d-04': {
            status: 'solved',
            bestMs: 5,
            bestHints: 9,
            lastSolvedAt: '2026-11-14T01:02:03.000Z',
          },
          '2d-05': {
            status: 'solved',
            bestMs: 5,
            bestHints: 0,
            lastSolvedAt: 'không phải ngày',
          },
          '2d-06': 'không phải đối tượng',
          'MAN LA': {
            status: 'solved',
            bestMs: 5,
            bestHints: 0,
            lastSolvedAt: '2026-11-14T01:02:03.000Z',
          },
        },
      },
      newId,
    );
    expect(Object.keys(result.levels)).toEqual(['2d-01']);
    expect(result.attempts).toEqual({ '2d-01': 3 });
  });

  it('khởi tạo lại phần hỏng của daily và attempts nhưng giữ phần levels', () => {
    const result = sanitizeProgress(
      {
        ...valid,
        attempts: 'hỏng',
        daily: { results: [], streak: -1, bestStreak: 'x' },
      },
      newId,
    );
    expect(result.levels).toEqual(valid.levels);
    expect(result.attempts).toEqual({});
    expect(result.daily).toEqual({ results: {}, streak: 0, bestStreak: 0 });
  });

  it('bỏ kết quả ngày sai khóa hoặc sai giá trị', () => {
    const result = sanitizeProgress(
      {
        ...valid,
        daily: {
          results: {
            '14/11/2026': { status: 'solved', ms: 1, hints: 0 },
            '2026-11-15': { status: 'solved', ms: 1, hints: 7 },
            '2026-11-16': { status: 'revealed', ms: 1, hints: 3 },
          },
          streak: 1,
          bestStreak: 1,
        },
      },
      newId,
    );
    expect(Object.keys(result.daily.results)).toEqual(['2026-11-16']);
  });

  it('bestStreak không bao giờ nhỏ hơn streak', () => {
    const result = sanitizeProgress(
      { ...valid, daily: { results: {}, streak: 7, bestStreak: 2 } },
      newId,
    );
    expect(result.daily.bestStreak).toBe(7);
  });

  it('mã ẩn danh sai dạng được thay bằng mã mới; mã hợp lệ được giữ', () => {
    expect(
      sanitizeProgress({ ...valid, installId: '<script>' }, newId).installId,
    ).toBe(newId());
    expect(sanitizeProgress({ ...valid, installId: 42 }, newId).installId).toBe(
      newId(),
    );
    expect(sanitizeProgress(valid, newId).installId).toBe(valid.installId);
  });

  it('số lượt chơi phải là số nguyên dương', () => {
    const result = sanitizeProgress(
      { ...valid, attempts: { '2d-01': 0, '2d-02': 1.5, '2d-03': 4 } },
      newId,
    );
    expect(result.attempts).toEqual({ '2d-03': 4 });
  });
});

describe('migrateProgress', () => {
  it('phiên bản hiện tại: làm sạch như bình thường', () => {
    expect(migrateProgress(valid, 1, newId)).toEqual(valid);
  });

  it('phiên bản lạ (tương lai hoặc không rõ): bắt đầu lại, không ném lỗi', () => {
    expect(migrateProgress(valid, 2, newId)).toEqual(emptyProgress(newId));
    expect(migrateProgress(valid, 0, newId)).toEqual(emptyProgress(newId));
  });
});
