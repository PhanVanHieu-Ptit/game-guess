'use client';

import type { ThreeElements } from '@react-three/fiber';
import { BoxParts, type BoxPart } from './box-parts';

const FRAME: readonly BoxPart[] = [
  { position: [0, 0.4, 0], size: [2.6, 0.5, 1] },
  { position: [0, 0.95, -0.4], size: [2.6, 0.8, 0.24] },
  { position: [-1.2, 0.75, 0], size: [0.24, 0.5, 1] },
  { position: [1.2, 0.75, 0], size: [0.24, 0.5, 1] },
];

export function Sofa({
  color = '#328c83',
  ...props
}: ThreeElements['group'] & { color?: string }) {
  return (
    <group {...props}>
      <BoxParts parts={FRAME} color={color} />
      <mesh position={[0, 0.7, 0.04]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.18, 0.82]} />
        <meshLambertMaterial color="#73b7a3" />
      </mesh>
    </group>
  );
}

export function Cushion({
  color = '#edb458',
  ...props
}: ThreeElements['group'] & { color?: string }) {
  return (
    <group {...props}>
      <mesh castShadow>
        <boxGeometry args={[0.72, 0.65, 0.28]} />
        <meshLambertMaterial color={color} />
      </mesh>
    </group>
  );
}
