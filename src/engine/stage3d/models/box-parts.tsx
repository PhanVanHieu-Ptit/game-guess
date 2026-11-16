'use client';

import { useLayoutEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Object3D, type InstancedMesh } from 'three';
import type { Vec3 } from '@/domain/view/view-check';

export interface BoxPart {
  position: Vec3;
  size: Vec3;
  rotation?: Vec3;
}

/** Các khối cùng màu chỉ tốn một lệnh vẽ, kể cả song cửa và các nét số lặp lại. */
export function BoxParts({
  parts,
  color,
  castShadow = true,
}: {
  parts: readonly BoxPart[];
  color: string;
  castShadow?: boolean;
}) {
  const mesh = useRef<InstancedMesh>(null);
  const invalidate = useThree((state) => state.invalidate);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    const transform = new Object3D();
    parts.forEach((part, index) => {
      transform.position.set(...part.position);
      transform.scale.set(...part.size);
      transform.rotation.set(...(part.rotation ?? [0, 0, 0]));
      transform.updateMatrix();
      mesh.current!.setMatrixAt(index, transform.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.computeBoundingSphere();
    invalidate();
  }, [parts, invalidate]);
  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, parts.length]}
      castShadow={castShadow}
      receiveShadow
    >
      <boxGeometry />
      <meshLambertMaterial color={color} />
    </instancedMesh>
  );
}
