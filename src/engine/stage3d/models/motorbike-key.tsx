'use client';

import type { ThreeElements } from '@react-three/fiber';
import { BoxParts, type BoxPart } from './box-parts';

const METAL: readonly BoxPart[] = [
  { position: [0, 0, 0.12], size: [0.14, 0.055, 0.52] },
  { position: [0.1, 0, 0.27], size: [0.18, 0.055, 0.08] },
  { position: [0.1, 0, 0.12], size: [0.18, 0.055, 0.08] },
];

/** Chìa có đầu nhựa, thân kim loại và vòng khoen nằm trên mặt XZ. */
export function MotorbikeKey(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <mesh position={[0, 0, -0.28]} castShadow>
        <boxGeometry args={[0.38, 0.1, 0.36]} />
        <meshLambertMaterial color="#303d4b" />
      </mesh>
      <BoxParts parts={METAL} color="#eef2e9" />
      <mesh position={[0, 0, -0.47]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.035, 4, 10]} />
        <meshLambertMaterial color="#c9d4d0" />
      </mesh>
    </group>
  );
}
