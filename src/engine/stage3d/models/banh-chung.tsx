'use client';

import type { ThreeElements } from '@react-three/fiber';
import { BoxParts, type BoxPart } from './box-parts';

/** Bánh vuông có hai vòng lạt thật chạy quanh thân, nhận mọi phép biến đổi group. */
export function BanhChung({
  width = 1.1,
  height = 0.3,
  color = '#56854a',
  receiveShadow = true,
  ...props
}: ThreeElements['group'] & {
  width?: number;
  height?: number;
  color?: string;
}) {
  const bands: readonly BoxPart[] = [
    { position: [0, 0, 0], size: [width + 0.025, height + 0.025, 0.065] },
    { position: [0, 0, 0], size: [0.065, height + 0.025, width + 0.025] },
  ];
  return (
    <group {...props}>
      <mesh castShadow receiveShadow={receiveShadow}>
        <boxGeometry args={[width, height, width]} />
        <meshLambertMaterial color={color} />
      </mesh>
      <BoxParts parts={bands} color="#eedfb1" />
    </group>
  );
}
