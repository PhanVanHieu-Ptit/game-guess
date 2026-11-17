'use client';

import type { ThreeElements } from '@react-three/fiber';
import { BoxParts, type BoxPart } from './box-parts';

const PARTS: readonly BoxPart[] = [
  { position: [0, 0.65, 0], size: [1.8, 0.16, 1.1] },
  ...[-0.68, 0.68].flatMap((x) =>
    [-0.36, 0.36].map((z) => ({
      position: [x, 0.3, z] as const,
      size: [0.13, 0.6, 0.13] as const,
    })),
  ),
];

export function LowTable({
  color = '#aa6950',
  ...props
}: ThreeElements['group'] & { color?: string }) {
  return (
    <group {...props}>
      <BoxParts parts={PARTS} color={color} />
    </group>
  );
}
