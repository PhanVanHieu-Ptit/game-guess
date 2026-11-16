'use client';

import type { ThreeElements } from '@react-three/fiber';

export function Planter({
  potColor = '#c96d4e',
  leafColor = '#53826c',
  ...props
}: ThreeElements['group'] & { potColor?: string; leafColor?: string }) {
  return (
    <group {...props}>
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.17, 0.44, 8]} />
        <meshLambertMaterial color={potColor} flatShading />
      </mesh>
      <mesh position={[0, 0.65, 0]} scale={[0.32, 0.45, 0.32]} castShadow>
        <icosahedronGeometry args={[1, 0]} />
        <meshLambertMaterial color={leafColor} flatShading />
      </mesh>
    </group>
  );
}
