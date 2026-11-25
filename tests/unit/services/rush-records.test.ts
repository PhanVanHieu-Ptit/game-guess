import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  readRushBest,
  saveRushBest,
  subscribeRushBest,
} from '@/services/storage/rush-records';

const memory = vi.hoisted(() => new Map<string, string>());
vi.mock('@/services/storage/safe-storage', () => ({
  safeStorage: {
    getItem: (key: string) => memory.get(key) ?? null,
    setItem: (key: string, value: string) => memory.set(key, value),
  },
}));

beforeEach(() => memory.clear());

describe('rush personal records', () => {
  it('ignores malformed, negative, fractional and impossible stored scores', () => {
    for (const value of ['oops', '-100', '10.5', 'Infinity', '999999']) {
      memory.set('latleo:rush:v1:free', value);
      expect(readRushBest('free')).toBe(0);
    }
  });

  it('keeps the best score and separates free play and each daily challenge', () => {
    saveRushBest('free', 950);
    saveRushBest('free', 100);
    saveRushBest('daily:2026-11-25', 500);
    saveRushBest('daily:2026-11-26', 700);
    expect(readRushBest('free')).toBe(950);
    expect(readRushBest('daily:2026-11-25')).toBe(500);
    expect(readRushBest('daily:2026-11-26')).toBe(700);
    expect(memory.has('latleo:v1')).toBe(false);
  });

  it('notifies record subscribers only for a new record, and unsubscribes cleanly', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeRushBest(listener);
    saveRushBest('free', 100);
    saveRushBest('free', 50);
    saveRushBest('free', Number.NaN);
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
    saveRushBest('free', 200);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
