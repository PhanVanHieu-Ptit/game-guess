import { createAnswerChecker } from '@/domain/answers/match';
import { isOrbitNear, type CameraView } from '@/domain/view/view-check';

export const MAX_POT_TILT = 24;
const check = createAnswerChecker(['5']);

/** Đáp án số quyết định thắng; quan sát là cách tìm đáp án, không phải khóa chấm điểm. */
export function checkCakeCount(value: string) {
  const verdict = check(value);
  if (verdict.kind === 'correct' || verdict.kind === 'empty')
    return verdict.kind;
  return value.trim() === '4' ? 'top-layer' : 'wrong';
}

export function clampPotTilt(degrees: number): number {
  return Number.isFinite(degrees)
    ? Math.max(0, Math.min(MAX_POT_TILT, degrees))
    : 0;
}

/** Kéo xuống trên mặt phẳng tương tác làm nồi nghiêng, luôn giữ trong giới hạn. */
export function potTiltFromDrag(initial: number, deltaY: number): number {
  return Number.isFinite(deltaY)
    ? clampPotTilt(initial - deltaY * 45)
    : clampPotTilt(initial);
}

/** Đổi camera về hệ trục của nồi rồi kiểm một vùng nhìn rộng bằng tiện ích chung. */
export function isLookingIntoLowerLayer(
  view: CameraView,
  tilt: number,
): boolean {
  if (!Number.isFinite(tilt) || tilt < 0 || tilt > MAX_POT_TILT) return false;
  const a = (tilt * Math.PI) / 180;
  const [x, y, z] = view.position.map((n, i) => n - view.target[i]);
  return isOrbitNear(
    {
      position: [
        x,
        y * Math.cos(a) - z * Math.sin(a),
        y * Math.sin(a) + z * Math.cos(a),
      ],
      target: [0, 0, 0],
    },
    { azimuthDeg: 0, polarDeg: 50 },
    { azimuthDeg: 38, polarDeg: 13 },
  );
}
