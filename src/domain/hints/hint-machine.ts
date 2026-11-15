// Máy trạng thái gợi ý ba cấp (docs/GDD.md mục 5). Thuần, không phụ thuộc giao diện.

/** Cấp gợi ý cao nhất đã mở trong một lượt chơi: 0 = chưa mở gợi ý nào, 3 = đã xem đáp án. */
export type HintTier = 0 | 1 | 2 | 3;

/** Cấp có thể bấm mở. */
export type OpenableTier = 1 | 2 | 3;

export interface HintState {
  /** Cấp cao nhất đã mở. Số gợi ý của lượt chơi chính là giá trị này. */
  tier: HintTier;
}

export const INITIAL_HINT_STATE: HintState = { tier: 0 };

/** Mức tự giải để hiện ở màn kết quả và (sau này) thẻ chia sẻ. Không có sao hay điểm (giả định G3). */
export type SolveLevel = 'self' | 'hinted' | 'revealed';

/** Cấp kế tiếp được phép mở, hoặc null nếu đã mở hết. Các cấp mở tuần tự. */
export function nextTier(state: HintState): OpenableTier | null {
  return state.tier >= 3 ? null : ((state.tier + 1) as OpenableTier);
}

/** Cấp 3 là xem đáp án nên cần hộp xác nhận: "Màn này sẽ không tính là tự giải". */
export function needsConfirmation(tier: OpenableTier): boolean {
  return tier === 3;
}

export interface OpenResult {
  state: HintState;
  /** True nếu đây là lần đầu mở cấp này trong lượt chơi (chỉ lúc đó mới ghi `hint_used`). */
  firstTime: boolean;
}

/**
 * Mở một cấp. Chỉ chấp nhận cấp kế tiếp hoặc cấp đã mở (xem lại, không tính thêm);
 * nhảy cóc (mở cấp 3 khi chưa mở cấp 2) bị từ chối, trả về null.
 */
export function openTier(
  state: HintState,
  tier: OpenableTier,
): OpenResult | null {
  if (tier <= state.tier) return { state, firstTime: false };
  if (tier !== state.tier + 1) return null;
  return { state: { tier }, firstTime: true };
}

export function solveLevelOf(hintsUsed: HintTier): SolveLevel {
  if (hintsUsed === 0) return 'self';
  return hintsUsed === 3 ? 'revealed' : 'hinted';
}
