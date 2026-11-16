import { createAnswerChecker } from '@/domain/answers/match';
import { isOrbitNear, type CameraView } from '@/domain/view/view-check';

const check = createAnswerChecker(['36']);

/** Nhập số là điều kiện thắng; không ép người chơi giữ camera ở một góc chính xác. */
export function checkHouseNumber(value: string) {
  const verdict = check(value);
  if (verdict.kind === 'correct' || verdict.kind === 'empty')
    return verdict.kind;
  return value.trim() === '63' ? 'reversed' : 'wrong';
}

/** Vùng quan sát rộng ở phía sau, đủ cao để đọc bồn trên sân thượng. */
export function canReadTankNumber(view: CameraView): boolean {
  return isOrbitNear(
    view,
    { azimuthDeg: 180, polarDeg: 65 },
    { azimuthDeg: 40, polarDeg: 18 },
  );
}
