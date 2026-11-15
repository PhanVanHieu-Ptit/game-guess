import { describe, expect, it } from 'vitest';
import { formatDuration } from '@/domain/share/format-duration';

describe('formatDuration', () => {
  it.each([
    [0, '0:00'],
    [48_000, '0:48'],
    [48_400, '0:48'],
    [48_500, '0:49'],
    [65_000, '1:05'],
    [600_000, '10:00'],
    [3_600_000, '60:00'],
    [-5, '0:00'],
    [Number.NaN, '0:00'],
    [Number.POSITIVE_INFINITY, '0:00'],
  ])('%d ms → %s', (ms, expected) => {
    expect(formatDuration(ms)).toBe(expected);
  });
});
