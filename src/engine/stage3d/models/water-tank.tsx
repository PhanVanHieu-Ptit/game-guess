'use client';

import { useMemo } from 'react';
import type { ThreeElements } from '@react-three/fiber';
import { BoxParts, type BoxPart } from './box-parts';

const SEGMENTS: Readonly<Record<string, readonly number[]>> = {
  '0': [0, 1, 2, 4, 5, 6],
  '1': [2, 5],
  '2': [0, 2, 3, 4, 6],
  '3': [0, 2, 3, 5, 6],
  '4': [1, 2, 3, 5],
  '5': [0, 1, 3, 5, 6],
  '6': [0, 1, 3, 4, 5, 6],
  '7': [0, 2, 5],
  '8': [0, 1, 2, 3, 4, 5, 6],
  '9': [0, 1, 2, 3, 5, 6],
};
const STROKES: readonly BoxPart[] = [
  { position: [0, 0.25, 0], size: [0.24, 0.065, 0.015] },
  { position: [-0.13, 0.125, 0], size: [0.065, 0.23, 0.015] },
  { position: [0.13, 0.125, 0], size: [0.065, 0.23, 0.015] },
  { position: [0, 0, 0], size: [0.24, 0.065, 0.015] },
  { position: [-0.13, -0.125, 0], size: [0.065, 0.23, 0.015] },
  { position: [0.13, -0.125, 0], size: [0.065, 0.23, 0.015] },
  { position: [0, -0.25, 0], size: [0.24, 0.065, 0.015] },
];
const FRAME: readonly BoxPart[] = [
  { position: [-0.43, 0.2, 0], size: [0.08, 0.4, 0.9] },
  { position: [0.43, 0.2, 0], size: [0.08, 0.4, 0.9] },
];

/** Số được ghép từ khối hộp, không cần tải phông hoặc texture. */
export function TankNumber({ value }: { value: string }) {
  const parts = useMemo(
    () =>
      [...value].flatMap((digit, i) =>
        (SEGMENTS[digit] ?? []).map((segment) => ({
          ...STROKES[segment],
          position: [
            STROKES[segment].position[0] + (i - (value.length - 1) / 2) * 0.43,
            STROKES[segment].position[1],
            0.025,
          ] as const,
        })),
      ),
    [value],
  );
  return <BoxParts parts={parts} color="#263c45" castShadow={false} />;
}

/** Chân bồn ở Y=0; mặt ghi số hướng -Z, bị thân bồn che khi nhìn từ mặt tiền. */
export function WaterTank({
  number,
  color = '#c0d2d0',
  ...props
}: ThreeElements['group'] & { number?: string; color?: string }) {
  return (
    <group {...props}>
      <BoxParts parts={FRAME} color="#617f7f" />
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.74, 0.74, 1.35, 12]} />
        <meshLambertMaterial color={color} flatShading />
      </mesh>
      <mesh position={[0, 1.71, 0]} castShadow>
        <cylinderGeometry args={[0.66, 0.78, 0.12, 12]} />
        <meshLambertMaterial color="#e1e7d9" flatShading />
      </mesh>
      {number && (
        <group position={[0, 1, -0.755]} rotation={[0, Math.PI, 0]}>
          <mesh>
            <boxGeometry args={[1.12, 0.73, 0.02]} />
            <meshLambertMaterial color="#fff3d4" />
          </mesh>
          <TankNumber value={number} />
        </group>
      )}
    </group>
  );
}
