'use client';

import type { ThreeElements } from '@react-three/fiber';
import { BoxParts, type BoxPart } from './box-parts';

const WALLS: readonly BoxPart[] = [
  { position: [0, 0.8, -2.8], size: [6.4, 1.6, 0.16] },
  { position: [-3.12, 0.4, 0], size: [0.16, 0.8, 5.6] },
  { position: [3.12, 0.4, 0], size: [0.16, 0.8, 5.6] },
];
const TRIM: readonly BoxPart[] = [
  { position: [0, -0.15, 0], size: [6.5, 0.24, 6.2] },
  { position: [2.5, 0.04, 2.95], size: [1.2, 0.08, 0.4] },
  { position: [1.84, 0.58, 2.88], size: [0.12, 1.16, 0.12] },
  { position: [3.08, 0.58, 2.88], size: [0.12, 1.16, 0.12] },
  ...[-2, -1, 0, 1, 2].map((x) => ({
    position: [x, 0.008, 0] as const,
    size: [0.012, 0.012, 6] as const,
  })),
  ...[-2, -1, 0, 1, 2].map((z) => ({
    position: [0, 0.008, z] as const,
    size: [6.2, 0.012, 0.012] as const,
  })),
];

/** Phòng nhà ống cắt mở, cửa ở góc +X/+Z; tường thấp để xoay mà vẫn quan sát được. */
export function TownhouseRoom({
  wallColor = '#f1d9a7',
  ...props
}: ThreeElements['group'] & { wallColor?: string }) {
  return (
    <group {...props}>
      <BoxParts parts={WALLS} color={wallColor} castShadow={false} />
      <BoxParts parts={TRIM} color="#c3a47b" castShadow={false} />
      <mesh position={[0, -0.015, 0]} receiveShadow>
        <boxGeometry args={[6.2, 0.03, 6]} />
        <meshLambertMaterial color="#f7e8ca" />
      </mesh>
    </group>
  );
}
