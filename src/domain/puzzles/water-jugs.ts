/** Bình không có vạch chia: chỉ lấy đầy, đổ hết, rót đến đầy/hết. */
export type JugState = readonly [number, number];
export type JugAction =
  | 'fill-large'
  | 'fill-small'
  | 'empty-large'
  | 'empty-small'
  | 'pour-large'
  | 'pour-small';
export const INITIAL_JUGS: JugState = [0, 0];
export const JUG_ACTIONS: readonly JugAction[] = [
  'fill-large',
  'fill-small',
  'empty-large',
  'empty-small',
  'pour-large',
  'pour-small',
];
type JugResult =
  | { ok: true; state: JugState }
  | { ok: false; reason: 'full' | 'empty' | 'blocked' };

export const areJugsSolved = (state: JugState) => state[0] === 4;

export function moveWater(state: JugState, action: JugAction): JugResult {
  const [large, small] = state;
  switch (action) {
    case 'fill-large':
      return large === 5
        ? { ok: false, reason: 'full' }
        : { ok: true, state: [5, small] };
    case 'fill-small':
      return small === 3
        ? { ok: false, reason: 'full' }
        : { ok: true, state: [large, 3] };
    case 'empty-large':
      return large === 0
        ? { ok: false, reason: 'empty' }
        : { ok: true, state: [0, small] };
    case 'empty-small':
      return small === 0
        ? { ok: false, reason: 'empty' }
        : { ok: true, state: [large, 0] };
    case 'pour-large': {
      if (large === 0) return { ok: false, reason: 'empty' };
      if (small === 3) return { ok: false, reason: 'blocked' };
      const amount = Math.min(large, 3 - small);
      return { ok: true, state: [large - amount, small + amount] };
    }
    case 'pour-small': {
      if (small === 0) return { ok: false, reason: 'empty' };
      if (large === 5) return { ok: false, reason: 'blocked' };
      const amount = Math.min(small, 5 - large);
      return { ok: true, state: [large + amount, small - amount] };
    }
  }
}
