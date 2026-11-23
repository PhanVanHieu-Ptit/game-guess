export type RiverSide = 0 | 1;
export type RiverCargo = 'wolf' | 'goat' | 'cabbage';
export interface RiverState {
  farmer: RiverSide;
  wolf: RiverSide;
  goat: RiverSide;
  cabbage: RiverSide;
}
export const INITIAL_RIVER: RiverState = {
  farmer: 0,
  wolf: 0,
  goat: 0,
  cabbage: 0,
};
type Crossing =
  | { ok: true; state: RiverState }
  | { ok: false; reason: 'wolf' | 'cabbage' | 'shore' };

/** Kiểm cả bờ đi lẫn bờ đến; chuyến không an toàn không thay đổi trạng thái. */
export function crossRiver(
  state: RiverState,
  cargo: RiverCargo | null,
): Crossing {
  if (cargo && state[cargo] !== state.farmer)
    return { ok: false, reason: 'shore' };
  const destination = state.farmer === 0 ? 1 : 0;
  const next: RiverState = { ...state, farmer: destination };
  if (cargo) next[cargo] = destination;
  if (next.wolf === next.goat && next.goat !== next.farmer)
    return { ok: false, reason: 'wolf' };
  if (next.goat === next.cabbage && next.goat !== next.farmer)
    return { ok: false, reason: 'cabbage' };
  return { ok: true, state: next };
}

export function isRiverSolved(state: RiverState): boolean {
  return (
    state.farmer === 1 &&
    state.wolf === 1 &&
    state.goat === 1 &&
    state.cabbage === 1
  );
}
