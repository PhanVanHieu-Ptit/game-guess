import { describe, it, expect } from 'vitest';
import {
  crossRiver,
  INITIAL_RIVER,
  isRiverSolved,
  type RiverState,
  type RiverCargo,
} from '@/domain/puzzles/river-crossing';

describe('chuyến đò: an toàn ở cả hai bờ', () => {
  it('chỉ đưa dê sang là bước đầu hợp lệ; không sửa trạng thái khi sai', () => {
    const initial = { ...INITIAL_RIVER };
    expect(crossRiver(initial, null)).toEqual({ ok: false, reason: 'wolf' });
    expect(crossRiver(initial, 'wolf')).toEqual({
      ok: false,
      reason: 'cabbage',
    });
    expect(crossRiver(initial, 'cabbage')).toEqual({
      ok: false,
      reason: 'wolf',
    });
    expect(crossRiver(initial, 'goat')).toEqual({
      ok: true,
      state: { farmer: 1, wolf: 0, goat: 1, cabbage: 0 },
    });
    expect(initial).toEqual(INITIAL_RIVER);
  });

  it('không chở khách khác bờ, không bỏ sói với dê ở bờ đến sau khi quay về', () => {
    expect(
      crossRiver({ farmer: 1, wolf: 0, goat: 1, cabbage: 0 }, 'wolf'),
    ).toEqual({ ok: false, reason: 'shore' });
    expect(
      crossRiver({ farmer: 1, wolf: 1, goat: 1, cabbage: 0 }, null),
    ).toEqual({ ok: false, reason: 'wolf' });
  });

  for (const middle of ['wolf', 'cabbage'] as const) {
    it(`nhận lời giải bảy chuyến với ${middle} sang thứ hai, chỉ thắng ở bước cuối`, () => {
      let state = { ...INITIAL_RIVER };
      const sequence: (RiverCargo | null)[] = [
        'goat',
        null,
        middle,
        'goat',
        middle === 'wolf' ? 'cabbage' : 'wolf',
        null,
        'goat',
      ];
      for (const [index, cargo] of sequence.entries()) {
        const result = crossRiver(state, cargo);
        expect(result.ok).toBe(true);
        if (!result.ok) throw new Error('Lời giải bị từ chối');
        state = result.state;
        expect(isRiverSolved(state)).toBe(index === 6);
      }
    });
  }

  it('tìm kiếm toàn bộ trạng thái đi được: lời giải ngắn nhất là bảy chuyến', () => {
    const key = (state: RiverState) => JSON.stringify(state);
    const queue = [{ state: { ...INITIAL_RIVER }, depth: 0 }];
    const visited = new Set([key(INITIAL_RIVER)]);
    let shortest: number | null = null;
    for (let i = 0; i < queue.length; i++) {
      const { state, depth } = queue[i];
      if (isRiverSolved(state) && shortest === null) shortest = depth;
      expect(state.wolf === state.goat && state.goat !== state.farmer).toBe(
        false,
      );
      expect(state.goat === state.cabbage && state.goat !== state.farmer).toBe(
        false,
      );
      for (const cargo of [null, 'wolf', 'goat', 'cabbage'] as const) {
        const result = crossRiver(state, cargo);
        if (result.ok && !visited.has(key(result.state))) {
          visited.add(key(result.state));
          queue.push({ state: result.state, depth: depth + 1 });
        }
      }
    }
    expect(shortest).toBe(7);
    expect(visited.size).toBe(10);
  });
});
