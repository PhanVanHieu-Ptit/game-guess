import { describe, expect, it } from 'vitest';
import {
  angleBetweenDeg,
  angleDifferenceDeg,
  isLookingAlong,
  isOrbitNear,
  lookDirection,
  orbitAngles,
  positionFromOrbit,
  type CameraView,
  type Vec3,
} from '@/domain/view/view-check';

const ORIGIN: Vec3 = [0, 0, 0];
/** Camera đứng ở +Z, nhìn về gốc toạ độ: hướng nhìn là −Z. */
const FRONT: CameraView = { position: [0, 0, 10], target: ORIGIN };

/** Xoay hướng −Z quanh trục Y một góc `deg`, rồi đặt camera sao cho nó nhìn đúng hướng đó từ xa. */
const lookingAtAngleFromMinusZ = (deg: number): CameraView => {
  const rad = (deg * Math.PI) / 180;
  const direction: Vec3 = [Math.sin(rad), 0, -Math.cos(rad)];
  return {
    position: [-direction[0] * 10, 0, -direction[2] * 10],
    target: ORIGIN,
  };
};

describe('lookDirection và angleBetweenDeg', () => {
  it('hướng nhìn là vectơ đơn vị từ camera tới điểm nhìn', () => {
    expect(lookDirection(FRONT)).toEqual([0, 0, -1]);
    const slanted = lookDirection({ position: [3, 4, 0], target: ORIGIN });
    expect(slanted?.[0]).toBeCloseTo(-0.6);
    expect(slanted?.[1]).toBeCloseTo(-0.8);
  });

  it('camera trùng điểm nhìn thì không có hướng', () => {
    expect(lookDirection({ position: ORIGIN, target: ORIGIN })).toBeNull();
  });

  it('góc giữa hai hướng: cùng chiều 0°, vuông góc 90°, ngược chiều 180°', () => {
    expect(angleBetweenDeg([0, 0, 1], [0, 0, 5])).toBeCloseTo(0);
    expect(angleBetweenDeg([1, 0, 0], [0, 1, 0])).toBeCloseTo(90);
    expect(angleBetweenDeg([0, 0, 1], [0, 0, -2])).toBeCloseTo(180);
  });

  it('vectơ không có hướng (độ dài 0) thì coi là lệch tối đa, không ném lỗi', () => {
    expect(angleBetweenDeg([0, 0, 0], [0, 0, 1])).toBe(180);
  });
});

describe('isLookingAlong: camera có nhìn gần đúng một hướng không', () => {
  const MINUS_Z: Vec3 = [0, 0, -1];

  it('đúng hướng thì khớp, kể cả khi sai số bằng 0', () => {
    expect(isLookingAlong(FRONT, MINUS_Z, 0)).toBe(true);
  });

  it('hướng cho trước không cần là vectơ đơn vị', () => {
    expect(isLookingAlong(FRONT, [0, 0, -37], 1)).toBe(true);
  });

  it('lệch trong sai số thì khớp, lệch quá thì không', () => {
    const tilted = lookingAtAngleFromMinusZ(4);
    expect(isLookingAlong(tilted, MINUS_Z, 5)).toBe(true);
    expect(isLookingAlong(tilted, MINUS_Z, 3)).toBe(false);
  });

  it('sai số cấu hình được: cùng một góc lệch, nới sai số thì khớp', () => {
    const tilted = lookingAtAngleFromMinusZ(20);
    expect(isLookingAlong(tilted, MINUS_Z, 10)).toBe(false);
    expect(isLookingAlong(tilted, MINUS_Z, 25)).toBe(true);
  });

  it('đúng biên (lệch bằng sai số) thì vẫn khớp', () => {
    expect(isLookingAlong(lookingAtAngleFromMinusZ(5), MINUS_Z, 5)).toBe(true);
  });

  it('nhìn ngược hướng thì không khớp với sai số hợp lý', () => {
    expect(isLookingAlong(FRONT, [0, 0, 1], 45)).toBe(false);
    expect(isLookingAlong(FRONT, [0, 0, 1], 180)).toBe(true);
  });

  it('sai số âm, NaN hoặc vô cực không bao giờ khớp (cấu hình sai không được làm màn tự thắng)', () => {
    expect(isLookingAlong(FRONT, MINUS_Z, -1)).toBe(false);
    expect(isLookingAlong(FRONT, MINUS_Z, Number.NaN)).toBe(false);
    expect(isLookingAlong(FRONT, MINUS_Z, Number.POSITIVE_INFINITY)).toBe(
      false,
    );
  });

  it('camera trùng điểm nhìn, hoặc hướng cho trước bằng 0, thì không khớp', () => {
    expect(
      isLookingAlong({ position: ORIGIN, target: ORIGIN }, MINUS_Z, 90),
    ).toBe(false);
    expect(isLookingAlong(FRONT, [0, 0, 0], 90)).toBe(false);
  });
});

describe('orbitAngles và positionFromOrbit', () => {
  it('quy ước góc: +Z là phương vị 0°, +X là 90°, nhìn từ trên xuống là góc cực 0°', () => {
    expect(orbitAngles({ position: [0, 0, 10], target: ORIGIN })).toEqual({
      azimuthDeg: 0,
      polarDeg: 90,
    });
    const east = orbitAngles({ position: [10, 0, 0], target: ORIGIN });
    expect(east?.azimuthDeg).toBeCloseTo(90);
    expect(east?.polarDeg).toBeCloseTo(90);
    const top = orbitAngles({ position: [0, 10, 0], target: ORIGIN });
    expect(top?.polarDeg).toBeCloseTo(0);
  });

  it('tính theo điểm nhìn, không theo gốc toạ độ', () => {
    const angles = orbitAngles({ position: [5, 0, 12], target: [5, 0, 2] });
    expect(angles).toEqual({ azimuthDeg: 0, polarDeg: 90 });
  });

  it('camera trùng điểm nhìn thì không có góc', () => {
    expect(orbitAngles({ position: [1, 1, 1], target: [1, 1, 1] })).toBeNull();
  });

  it('positionFromOrbit là phép ngược của orbitAngles trên lưới góc', () => {
    for (const azimuthDeg of [-170, -90, -30, 0, 40, 90, 135, 179]) {
      for (const polarDeg of [10, 45, 90, 120, 170]) {
        const target: Vec3 = [1, 2, -3];
        const position = positionFromOrbit(target, 7, { azimuthDeg, polarDeg });
        const back = orbitAngles({ position, target });
        expect(back?.azimuthDeg).toBeCloseTo(azimuthDeg, 6);
        expect(back?.polarDeg).toBeCloseTo(polarDeg, 6);
        const distance = Math.hypot(
          position[0] - target[0],
          position[1] - target[1],
          position[2] - target[2],
        );
        expect(distance).toBeCloseTo(7, 9);
      }
    }
  });
});

describe('angleDifferenceDeg', () => {
  it('lấy đường ngắn nhất, kể cả vòng qua ±180°', () => {
    expect(angleDifferenceDeg(10, 30)).toBe(20);
    expect(angleDifferenceDeg(179, -179)).toBe(2);
    expect(angleDifferenceDeg(-90, 90)).toBe(180);
    expect(angleDifferenceDeg(350, 10)).toBe(20);
  });
});

describe('isOrbitNear: ghép hình theo góc nhìn với sai số riêng cho từng góc', () => {
  const GOAL = { azimuthDeg: 40, polarDeg: 75 };
  const TOLERANCE = { azimuthDeg: 5, polarDeg: 4 };
  const at = (azimuthDeg: number, polarDeg: number): CameraView => ({
    position: positionFromOrbit(ORIGIN, 10, { azimuthDeg, polarDeg }),
    target: ORIGIN,
  });

  it('đúng góc thì khớp', () => {
    expect(isOrbitNear(at(40, 75), GOAL, TOLERANCE)).toBe(true);
  });

  it('lệch trong sai số của từng góc thì khớp', () => {
    expect(isOrbitNear(at(44.5, 78.5), GOAL, TOLERANCE)).toBe(true);
    expect(isOrbitNear(at(35.5, 71.5), GOAL, TOLERANCE)).toBe(true);
  });

  it('chỉ cần một góc lệch quá là không khớp', () => {
    expect(isOrbitNear(at(46, 75), GOAL, TOLERANCE)).toBe(false);
    expect(isOrbitNear(at(40, 80), GOAL, TOLERANCE)).toBe(false);
  });

  it('sai số của hai góc độc lập nhau', () => {
    const wideAzimuth = { azimuthDeg: 30, polarDeg: 4 };
    expect(isOrbitNear(at(65, 75), GOAL, wideAzimuth)).toBe(true);
    expect(isOrbitNear(at(40, 85), GOAL, wideAzimuth)).toBe(false);
  });

  it('phương vị vòng qua ±180° vẫn tính lệch đúng', () => {
    const goal = { azimuthDeg: 178, polarDeg: 90 };
    expect(
      isOrbitNear(at(-179, 90), goal, { azimuthDeg: 5, polarDeg: 1 }),
    ).toBe(true);
    expect(
      isOrbitNear(at(-170, 90), goal, { azimuthDeg: 5, polarDeg: 1 }),
    ).toBe(false);
  });

  it('nhìn thẳng từ trên xuống thì phương vị không còn nghĩa, chỉ xét góc cực', () => {
    const goal = { azimuthDeg: 90, polarDeg: 0 };
    const top: CameraView = { position: [0, 10, 0], target: ORIGIN };
    expect(isOrbitNear(top, goal, { azimuthDeg: 1, polarDeg: 1 })).toBe(true);
  });

  it('sai số không hợp lệ không bao giờ khớp', () => {
    expect(isOrbitNear(at(40, 75), GOAL, { azimuthDeg: -1, polarDeg: 4 })).toBe(
      false,
    );
    expect(
      isOrbitNear(at(40, 75), GOAL, { azimuthDeg: 5, polarDeg: Number.NaN }),
    ).toBe(false);
  });

  it('camera trùng điểm nhìn thì không khớp', () => {
    expect(
      isOrbitNear({ position: ORIGIN, target: ORIGIN }, GOAL, TOLERANCE),
    ).toBe(false);
  });
});

it('hướng không hợp lệ và góc đích ngoài miền không làm màn tự thắng dù dung sai rộng', () => {
  expect(isLookingAlong(FRONT, [0, 0, 0], 180)).toBe(false);
  expect(isLookingAlong(FRONT, [0, NaN, 1], 180)).toBe(false);
  expect(
    isLookingAlong(
      { position: [Infinity, 0, 1], target: ORIGIN },
      [0, 0, -1],
      180,
    ),
  ).toBe(false);
  expect(
    isOrbitNear(
      FRONT,
      { azimuthDeg: 0, polarDeg: 181 },
      { azimuthDeg: 180, polarDeg: 180 },
    ),
  ).toBe(false);
});
