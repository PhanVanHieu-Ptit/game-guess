'use client';

import type { ThreeElements } from '@react-three/fiber';

export function Basket({
  color = '#bd8652',
  ...props
}: ThreeElements['group'] & { color?: string }) {
  return (
    <group {...props}>
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.48, 0.35, 0.6, 8]} />
        <meshLambertMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.61, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.43, 0.065, 4, 8]} />
        <meshLambertMaterial color="#ead0a0" />
      </mesh>
      <mesh position={[0, 0.615, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.37, 8]} />
        <meshLambertMaterial color="#72533b" />
      </mesh>
    </group>
  );
}
