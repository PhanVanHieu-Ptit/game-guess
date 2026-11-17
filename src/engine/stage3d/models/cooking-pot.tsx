'use client';

import type { ThreeElements } from '@react-three/fiber';
import { DoubleSide } from 'three';
import { BoxParts, type BoxPart } from './box-parts';

const HANDLES: readonly BoxPart[] = [-1, 1].flatMap((side) => [
  {
    position: [side * 2.3, 0.88, -0.33] as const,
    size: [0.65, 0.15, 0.15] as const,
  },
  {
    position: [side * 2.3, 0.88, 0.33] as const,
    size: [0.65, 0.15, 0.15] as const,
  },
  {
    position: [side * 2.57, 0.88, 0] as const,
    size: [0.15, 0.15, 0.8] as const,
  },
]);

/** Nồi mở miệng: đáy Y=0, miệng Y=1,15, bán kính 2,05; thành không có nắp che. */
export function CookingPot({
  color = '#8bafb6',
  ...props
}: ThreeElements['group'] & { color?: string }) {
  return (
    <group {...props}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[2.05, 2.05, 1.1, 12, 1, true]} />
        <meshLambertMaterial color={color} side={DoubleSide} />
      </mesh>
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[2.05, 2.05, 0.08, 12]} />
        <meshLambertMaterial color="#52777e" />
      </mesh>
      <mesh position={[0, 1.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.05, 0.055, 4, 12]} />
        <meshLambertMaterial color="#d8e4df" />
      </mesh>
      <BoxParts parts={HANDLES} color="#456670" />
    </group>
  );
}

export function PotLid({
  color = '#b9d1ce',
  ...props
}: ThreeElements['group'] & { color?: string }) {
  return (
    <group {...props}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[2.03, 2.12, 0.13, 12]} />
        <meshLambertMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[0.55, 0.24, 0.35]} />
        <meshLambertMaterial color="#456670" />
      </mesh>
    </group>
  );
}
