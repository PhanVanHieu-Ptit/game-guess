import { isOrbitNear, type CameraView } from '@/domain/view/view-check';

export type KeySearchState = 'searching' | 'flipped' | 'solved';
export type KeySearchObject =
  'cushion' | 'basket' | 'table' | 'slippers' | 'key';

/** Đế dép hướng lên sau khi lật; vùng quan sát rộng, không đòi căn đúng một góc. */
export function canSeeSlipperSole(view: CameraView): boolean {
  return isOrbitNear(
    view,
    { azimuthDeg: 0, polarDeg: 54 },
    { azimuthDeg: 75, polarDeg: 26 },
  );
}

/** Chỉ nhặt được chìa sau khi lật dép và nhìn thấy đế. */
export function searchForKey(
  state: KeySearchState,
  object: KeySearchObject,
  soleVisible: boolean,
): { state: KeySearchState; wrong?: 'cushion' | 'basket' | 'table' } {
  if (state === 'solved') return { state };
  if (object === 'cushion' || object === 'basket' || object === 'table')
    return { state, wrong: object };
  if (object === 'slippers') return { state: 'flipped' };
  if (state === 'flipped' && soleVisible) return { state: 'solved' };
  return { state };
}
