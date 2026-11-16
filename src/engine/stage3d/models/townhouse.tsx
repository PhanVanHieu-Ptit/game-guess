'use client';

import type { ThreeElements } from '@react-three/fiber';
import { BoxParts, type BoxPart } from './box-parts';

const TRIM: readonly BoxPart[] = [
  { position: [0, 0.12, 0], size: [3.1, 0.24, 3.9] },
  { position: [0, 2.12, 0.15], size: [3, 0.16, 3.9] },
  { position: [0, 4.18, 0], size: [3.1, 0.2, 3.7] },
  { position: [0, 4.45, 1.7], size: [3, 0.4, 0.12] },
  { position: [-1.44, 4.45, 0], size: [0.12, 0.4, 3.4] },
  { position: [1.44, 4.45, 0], size: [0.12, 0.4, 3.4] },
  { position: [0, 4.45, -1.7], size: [3, 0.4, 0.12] },
];
const DARK: readonly BoxPart[] = [
  { position: [0, 1.08, 1.67], size: [2.15, 1.85, 0.08] },
  { position: [0, 3.08, 1.67], size: [1.7, 1.42, 0.08] },
  { position: [0, 3.15, -1.67], size: [1.2, 0.95, 0.08] },
];
const METAL: readonly BoxPart[] = [
  ...Array.from({ length: 9 }, (_, i) => ({
    position: [0, 0.33 + i * 0.18, 1.73] as const,
    size: [2.04, 0.035, 0.025] as const,
  })),
  ...Array.from({ length: 7 }, (_, i) => ({
    position: [-1.12 + i * 0.375, 2.55, 2.04] as const,
    size: [0.055, 0.7, 0.055] as const,
  })),
  { position: [0, 2.91, 2.04], size: [2.4, 0.07, 0.07] },
  { position: [0, 3.08, 1.73], size: [0.07, 1.42, 0.06] },
  { position: [0, 3.15, -1.73], size: [0.06, 0.95, 0.06] },
  { position: [1.5, 2.28, -1.22], size: [0.07, 4.5, 0.07] },
  { position: [1.5, 4.6, -0.85], size: [0.07, 0.07, 0.8] },
];

/** Nhà ống hai tầng; cửa chính hướng +Z, sân thượng ở Y=4,28. */
export function Townhouse({
  wallColor = '#efc978',
  trimColor = '#fff2d3',
  ...props
}: ThreeElements['group'] & { wallColor?: string; trimColor?: string }) {
  return (
    <group {...props}>
      <mesh position={[0, 2.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 4, 3.3]} />
        <meshLambertMaterial color={wallColor} />
      </mesh>
      <BoxParts parts={TRIM} color={trimColor} />
      <BoxParts parts={DARK} color="#275b60" />
      <BoxParts parts={METAL} color="#96b7ac" />
      <mesh position={[0, 3.92, 1.95]} rotation={[0.12, 0, 0]} castShadow>
        <boxGeometry args={[2.35, 0.16, 0.86]} />
        <meshLambertMaterial color="#cd6652" />
      </mesh>
    </group>
  );
}
