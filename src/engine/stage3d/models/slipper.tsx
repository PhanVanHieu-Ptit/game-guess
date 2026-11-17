'use client';

import type { ThreeElements } from '@react-three/fiber';
import { BoxParts, type BoxPart } from './box-parts';

const STRAPS: readonly BoxPart[] = [
  {
    position: [-0.16, 0.21, -0.16],
    size: [0.1, 0.12, 0.55],
    rotation: [0, -0.55, 0],
  },
  {
    position: [0.16, 0.21, -0.16],
    size: [0.1, 0.12, 0.55],
    rotation: [0, 0.55, 0],
  },
];

/** Mặt đế ở -Y; xoay nhóm bên ngoài để lật dép và mọi vật dính dưới đế cùng lúc. */
export function Slipper({
  color = '#357c8c',
  ...props
}: ThreeElements['group'] & { color?: string }) {
  return (
    <group {...props}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.65, 0.16, 1.35]} />
        <meshLambertMaterial color={color} />
      </mesh>
      <BoxParts parts={STRAPS} color="#e7c478" />
    </group>
  );
}
