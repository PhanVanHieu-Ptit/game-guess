import { describe, expect, it } from 'vitest';
import {
  INITIAL_HINT_STATE,
  needsConfirmation,
  nextTier,
  openTier,
  solveLevelOf,
} from '@/domain/hints/hint-machine';

describe('hint-machine', () => {
  it('mở tuần tự: cấp kế tiếp đi từ 1 đến 3 rồi hết', () => {
    expect(nextTier({ tier: 0 })).toBe(1);
    expect(nextTier({ tier: 1 })).toBe(2);
    expect(nextTier({ tier: 2 })).toBe(3);
    expect(nextTier({ tier: 3 })).toBeNull();
  });

  it('mở cấp kế tiếp lần đầu thì báo firstTime và nâng cấp cao nhất', () => {
    const first = openTier(INITIAL_HINT_STATE, 1);
    expect(first).toEqual({ state: { tier: 1 }, firstTime: true });
    expect(openTier({ tier: 1 }, 2)).toEqual({
      state: { tier: 2 },
      firstTime: true,
    });
  });

  it('mở lại cấp đã xem không tính thêm và không đổi trạng thái', () => {
    const state = { tier: 2 } as const;
    expect(openTier(state, 1)).toEqual({ state, firstTime: false });
    expect(openTier(state, 2)).toEqual({ state, firstTime: false });
  });

  it('từ chối nhảy cóc cấp', () => {
    expect(openTier({ tier: 0 }, 2)).toBeNull();
    expect(openTier({ tier: 1 }, 3)).toBeNull();
  });

  it('chỉ cấp 3 (xem đáp án) cần xác nhận', () => {
    expect(needsConfirmation(1)).toBe(false);
    expect(needsConfirmation(2)).toBe(false);
    expect(needsConfirmation(3)).toBe(true);
  });

  it('phân mức tự giải: 0 gợi ý, có gợi ý, xem đáp án', () => {
    expect(solveLevelOf(0)).toBe('self');
    expect(solveLevelOf(1)).toBe('hinted');
    expect(solveLevelOf(2)).toBe('hinted');
    expect(solveLevelOf(3)).toBe('revealed');
  });
});
