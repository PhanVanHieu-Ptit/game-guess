import { describe, expect, it } from 'vitest';
import {
  areJugsSolved,
  INITIAL_JUGS,
  JUG_ACTIONS,
  moveWater,
  type JugAction,
  type JugState,
} from '@/domain/puzzles/water-jugs';

describe('đong 4 lít chỉ bằng bình 5 và 3 lít', () => {
  for (const sequence of [
    [
      'fill-large',
      'pour-large',
      'empty-small',
      'pour-large',
      'fill-large',
      'pour-large',
    ],
    [
      'fill-small',
      'pour-small',
      'fill-small',
      'pour-small',
      'empty-large',
      'pour-small',
      'fill-small',
      'pour-small',
    ],
  ] satisfies JugAction[][]) {
    it(`nhận lời giải ${sequence.length} bước, chỉ thắng khi bình lớn chứa 4 lít`, () => {
      let state: JugState = INITIAL_JUGS;
      for (const [index, action] of sequence.entries()) {
        const result = moveWater(state, action);
        expect(result.ok).toBe(true);
        if (!result.ok) throw new Error('Từ chối bước hợp lệ');
        state = result.state;
        expect(areJugsSolved(state)).toBe(index === sequence.length - 1);
      }
    });
  }

  it('bảo toàn lượng nước khi rót; dừng đúng lúc nguồn hết hoặc đích đầy ở mọi trạng thái nguyên', () => {
    for (let large = 0; large <= 5; large++)
      for (let small = 0; small <= 3; small++) {
        const state: JugState = Object.freeze([large, small]);
        for (const action of JUG_ACTIONS) {
          const result = moveWater(state, action);
          if (!result.ok) continue;
          const [nextLarge, nextSmall] = result.state;
          expect(
            Number.isInteger(nextLarge) && Number.isInteger(nextSmall),
          ).toBe(true);
          expect(nextLarge).toBeGreaterThanOrEqual(0);
          expect(nextLarge).toBeLessThanOrEqual(5);
          expect(nextSmall).toBeGreaterThanOrEqual(0);
          expect(nextSmall).toBeLessThanOrEqual(3);
          if (action.startsWith('pour')) {
            expect(nextLarge + nextSmall).toBe(large + small);
            expect(
              action === 'pour-large'
                ? nextLarge === 0 || nextSmall === 3
                : nextSmall === 0 || nextLarge === 5,
            ).toBe(true);
          }
        }
        expect(state).toEqual([large, small]);
      }
  });

  it('bình rỗng/đầy không đổi tiến triển và có lý do phản hồi', () => {
    expect(moveWater([0, 0], 'pour-large')).toEqual({
      ok: false,
      reason: 'empty',
    });
    expect(moveWater([5, 1], 'fill-large')).toEqual({
      ok: false,
      reason: 'full',
    });
    expect(moveWater([2, 3], 'pour-large')).toEqual({
      ok: false,
      reason: 'blocked',
    });
  });

  it('tìm kiếm toàn bộ trạng thái đi được: ít nhất 6 bước mới đong được 4 lít', () => {
    const queue = [{ state: INITIAL_JUGS, depth: 0 }];
    const visited = new Set([INITIAL_JUGS.join(',')]);
    let shortest: number | null = null;
    for (let i = 0; i < queue.length; i++) {
      const { state, depth } = queue[i];
      if (areJugsSolved(state) && shortest === null) shortest = depth;
      for (const action of JUG_ACTIONS) {
        const result = moveWater(state, action);
        if (result.ok && !visited.has(result.state.join(','))) {
          visited.add(result.state.join(','));
          queue.push({ state: result.state, depth: depth + 1 });
        }
      }
    }
    expect(shortest).toBe(6);
    expect(visited.size).toBe(16);
  });
});
