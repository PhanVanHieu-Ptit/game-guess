'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import {
  PerspectiveCamera,
  Raycaster,
  Vector3,
  type Mesh,
  type Object3D,
} from 'three';
import type { Vec3 } from '@/domain/view/view-check';

const hasOwner = (object: Object3D, owner: string): boolean => {
  for (let current: Object3D | null = object; current; current = current.parent)
    if (current.name === owner) return true;
  return false;
};

/** Vùng chạm hướng về camera, luôn ít nhất 44 px; kéo qua vật vẫn xoay camera bình thường. */
export function TapTarget3D({
  id,
  owner = id,
  position,
  enabled = true,
  onTap,
}: {
  id: string;
  owner?: string;
  position: Vec3;
  enabled?: boolean;
  onTap(): void;
}) {
  const mesh = useRef<Mesh>(null);
  const available = useRef(false);
  const { camera, gl, scene, size, invalidate } = useThree();
  const scratch = useRef({
    world: new Vector3(),
    projected: new Vector3(),
    direction: new Vector3(),
    ray: new Raycaster(),
  });
  useEffect(() => {
    invalidate();
    const canvas = gl.domElement;
    return () => canvas.removeAttribute(`data-target-${id}`);
  }, [enabled, gl, id, invalidate, position]);

  useFrame(() => {
    const target = mesh.current;
    if (!target || !(camera instanceof PerspectiveCamera)) return;
    const { world, projected, direction, ray } = scratch.current;
    world.set(...position);
    const distance = camera.position.distanceTo(world);
    const side =
      (2 * distance * Math.tan((camera.fov * Math.PI) / 360) * 44) /
      size.height;
    target.scale.set(side, side, 1);
    target.quaternion.copy(camera.quaternion);
    target.updateMatrixWorld();
    projected.copy(world).project(camera);
    available.current =
      enabled &&
      Math.abs(projected.x) < 1 &&
      Math.abs(projected.y) < 1 &&
      projected.z > -1 &&
      projected.z < 1;
    if (available.current) {
      // Kiểm vật che bằng hình học thật; hộp chạm không thể xuyên qua tường hoặc đồ đạc khác.
      scene.updateMatrixWorld(true);
      ray.set(
        camera.position,
        direction.copy(world).sub(camera.position).normalize(),
      );
      const obstruction = ray
        .intersectObjects(scene.children, true)
        .find(({ object }) => !object.userData.tapProxy);
      available.current =
        !obstruction ||
        obstruction.distance >= distance - 0.08 ||
        hasOwner(obstruction.object, owner);
    }
    if (available.current) {
      // Tọa độ chiếu phục vụ chẩn đoán vùng chạm; kiểm thử vẫn phải chạm Canvas và đi qua raycast thật.
      gl.domElement.setAttribute(
        `data-target-${id}`,
        JSON.stringify({
          x: ((projected.x + 1) * size.width) / 2,
          y: ((1 - projected.y) * size.height) / 2,
          minSize: 44,
        }),
      );
    } else gl.domElement.removeAttribute(`data-target-${id}`);
  });

  const tap = (event: ThreeEvent<MouseEvent>) => {
    if (!available.current || event.delta > 6 || event.button !== 0) return;
    event.stopPropagation();
    onTap();
  };
  return (
    <mesh
      ref={mesh}
      position={[...position]}
      userData={{ tapProxy: true }}
      onClick={tap}
    >
      <planeGeometry />
      <meshBasicMaterial visible={false} />
    </mesh>
  );
}
