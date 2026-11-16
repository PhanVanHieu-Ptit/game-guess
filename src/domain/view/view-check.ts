// Kiểm tra góc nhìn của camera (docs/TECH.md mục 8.5), dùng cho các màn "ghép hình theo góc nhìn" (ví dụ 3D-04 ghép
// chữ TẾT). Thuần toán học: không three.js, không DOM; vectơ là bộ ba số [x, y, z] (trục Y hướng lên).
//
// Hai cách hỏi, tùy màn:
//  - `isLookingAlong`: camera có nhìn gần đúng một HƯỚNG cho trước không (sai số là một góc, hình nón).
//  - `isOrbitNear`: camera quay quanh điểm nhìn đã tới gần góc (phương vị, góc cực) cho trước chưa
//    (sai số riêng cho từng góc, đúng kiểu điều khiển xoay của khung 3D).

export type Vec3 = readonly [x: number, y: number, z: number];

/** Camera: đứng ở `position`, nhìn vào `target`. */
export interface CameraView {
  position: Vec3;
  target: Vec3;
}

/**
 * Góc quay của camera quanh điểm nhìn, tính bằng độ, cùng quy ước với OrbitControls của three.js:
 *  - `azimuthDeg` (phương vị): quanh trục Y, 0° = camera đứng phía +Z của điểm nhìn, tăng dần về phía +X, trong (−180°, 180°];
 *  - `polarDeg` (góc cực): so với trục Y, 0° = nhìn thẳng từ trên xuống, 90° = ngang tầm, 180° = từ dưới lên.
 */
export interface OrbitAngles {
  azimuthDeg: number;
  polarDeg: number;
}

/** Sai số cho phép của từng góc, độ. */
export type OrbitTolerance = OrbitAngles;

const EPSILON = 1e-9;
const TO_DEG = 180 / Math.PI;
const TO_RAD = Math.PI / 180;

const finiteVector = (v: Vec3): boolean => v.every(Number.isFinite);
const subtract = (a: Vec3, b: Vec3): Vec3 => [
  a[0] - b[0],
  a[1] - b[1],
  a[2] - b[2],
];
const dot = (a: Vec3, b: Vec3): number =>
  a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const lengthOf = (a: Vec3): number => Math.hypot(...a);
const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/** Sai số hợp lệ: số hữu hạn, không âm. Sai số sai (âm, NaN) thì không bao giờ coi là "khớp". */
const isValidTolerance = (value: number): boolean =>
  Number.isFinite(value) && value >= 0;

/** Hướng camera nhìn tới (vectơ đơn vị, từ camera về điểm nhìn); `null` nếu camera trùng điểm nhìn. */
export function lookDirection(view: CameraView): Vec3 | null {
  if (!finiteVector(view.target) || !finiteVector(view.position)) return null;
  const direction = subtract(view.target, view.position);
  const length = lengthOf(direction);
  if (length < EPSILON) return null;
  return [direction[0] / length, direction[1] / length, direction[2] / length];
}

/** Góc giữa hai hướng, độ, trong [0, 180]. Vectơ không có hướng (độ dài 0) thì coi là lệch tối đa: 180. */
export function angleBetweenDeg(a: Vec3, b: Vec3): number {
  const lengths = lengthOf(a) * lengthOf(b);
  if (lengths < EPSILON) return 180;
  return Math.acos(clamp(dot(a, b) / lengths, -1, 1)) * TO_DEG;
}

/**
 * Camera có đang nhìn gần đúng hướng `direction` không (lệch không quá `toleranceDeg` độ)?
 * `direction` là hướng camera NHÌN TỚI (không cần là vectơ đơn vị). Camera trùng điểm nhìn thì trả về false.
 */
export function isLookingAlong(
  view: CameraView,
  direction: Vec3,
  toleranceDeg: number,
): boolean {
  if (
    !isValidTolerance(toleranceDeg) ||
    !finiteVector(direction) ||
    lengthOf(direction) < EPSILON
  )
    return false;
  const current = lookDirection(view);
  if (current === null) return false;
  return angleBetweenDeg(current, direction) <= toleranceDeg + EPSILON;
}

/** Góc quay của camera quanh điểm nhìn; `null` nếu camera trùng điểm nhìn. */
export function orbitAngles(view: CameraView): OrbitAngles | null {
  if (!finiteVector(view.target) || !finiteVector(view.position)) return null;
  const offset = subtract(view.position, view.target);
  const radius = lengthOf(offset);
  if (radius < EPSILON) return null;
  return {
    azimuthDeg: Math.atan2(offset[0], offset[2]) * TO_DEG,
    polarDeg: Math.acos(clamp(offset[1] / radius, -1, 1)) * TO_DEG,
  };
}

/** Vị trí camera khi đứng cách `target` một đoạn `distance` ở góc `angles` (ngược lại của `orbitAngles`). */
export function positionFromOrbit(
  target: Vec3,
  distance: number,
  angles: OrbitAngles,
): Vec3 {
  const azimuth = angles.azimuthDeg * TO_RAD;
  const polar = angles.polarDeg * TO_RAD;
  return [
    target[0] + distance * Math.sin(polar) * Math.sin(azimuth),
    target[1] + distance * Math.cos(polar),
    target[2] + distance * Math.sin(polar) * Math.cos(azimuth),
  ];
}

/** Hiệu hai góc theo độ, luôn trong [0, 180], tính cả trường hợp vòng qua ±180° (179° và −179° chỉ lệch 2°). */
export function angleDifferenceDeg(a: number, b: number): number {
  const difference = Math.abs(a - b) % 360;
  return difference > 180 ? 360 - difference : difference;
}

/**
 * Camera đã quay tới gần góc `goal` chưa: lệch phương vị ≤ `tolerance.azimuthDeg` VÀ lệch góc cực ≤ `tolerance.polarDeg`.
 * Gần hai cực (nhìn thẳng từ trên xuống hoặc từ dưới lên) phương vị không còn nghĩa nên chỉ xét góc cực.
 */
export function isOrbitNear(
  view: CameraView,
  goal: OrbitAngles,
  tolerance: OrbitTolerance,
): boolean {
  if (
    !isValidTolerance(tolerance.azimuthDeg) ||
    !isValidTolerance(tolerance.polarDeg)
  )
    return false;
  if (
    !Number.isFinite(goal.azimuthDeg) ||
    !Number.isFinite(goal.polarDeg) ||
    goal.polarDeg < 0 ||
    goal.polarDeg > 180
  )
    return false;
  const current = orbitAngles(view);
  if (current === null) return false;

  const polarOk =
    Math.abs(current.polarDeg - goal.polarDeg) <= tolerance.polarDeg + EPSILON;
  const atPole = Math.sin(current.polarDeg * TO_RAD) < 1e-6;
  const azimuthOk =
    atPole ||
    angleDifferenceDeg(current.azimuthDeg, goal.azimuthDeg) <=
      tolerance.azimuthDeg + EPSILON;
  return polarOk && azimuthOk;
}
