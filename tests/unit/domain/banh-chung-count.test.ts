import { describe, expect, it } from 'vitest';
import {
  checkCakeCount,
  clampPotTilt,
  isLookingIntoLowerLayer,
  MAX_POT_TILT,
  potTiltFromDrag,
} from '@/domain/puzzles/banh-chung-count';
import { positionFromOrbit } from '@/domain/view/view-check';

describe('đếm bánh chưng', () => {
  it.each(['5', ' 5 '])(
    'nhập %s là thắng, không buộc giữ một góc camera',
    (value) => expect(checkCakeCount(value)).toBe('correct'),
  );
  it('bốn bánh chỉ là tầng trên, các số khác chưa thắng và rỗng không tính sai', () => {
    expect(checkCakeCount('4')).toBe('top-layer');
    for (const value of ['0', '1', '3', '6', '9', '55', 'năm bánh'])
      expect(checkCakeCount(value)).toBe('wrong');
    expect(checkCakeCount('')).toBe('empty');
    expect(checkCakeCount('   ')).toBe('empty');
  });
  it('kéo hoặc điều khiển chạm không làm nồi vượt giới hạn, số hỏng được xử lý', () => {
    expect(clampPotTilt(-5)).toBe(0);
    expect(clampPotTilt(100)).toBe(MAX_POT_TILT);
    expect(clampPotTilt(NaN)).toBe(0);
    expect(potTiltFromDrag(0, -0.4)).toBe(18);
    expect(potTiltFromDrag(8, 0.5)).toBe(0);
    expect(potTiltFromDrag(8, -2)).toBe(MAX_POT_TILT);
    expect(potTiltFromDrag(8, Infinity)).toBe(8);
  });
  it('vùng nhìn tầng dưới tính cả góc nghiêng nồi và loại camera hỏng', () => {
    const target = [0, 0, 0] as const;
    const view = {
      target,
      position: positionFromOrbit(target, 7, { azimuthDeg: 0, polarDeg: 30 }),
    };
    expect(isLookingIntoLowerLayer(view, 0)).toBe(false);
    expect(isLookingIntoLowerLayer(view, 16)).toBe(true);
    expect(isLookingIntoLowerLayer(view, 24)).toBe(true);
    expect(isLookingIntoLowerLayer(view, 100)).toBe(false);
    expect(isLookingIntoLowerLayer({ position: target, target }, 24)).toBe(
      false,
    );
    expect(isLookingIntoLowerLayer({ position: [NaN, 2, 3], target }, 24)).toBe(
      false,
    );
  });
});
