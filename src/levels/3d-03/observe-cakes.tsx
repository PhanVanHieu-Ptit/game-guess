'use client';

import { useRef, type RefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Raycaster, Vector3, type Group, type Object3D } from 'three';
import { CAKES } from './layout';

function cakeOwner(object: Object3D): string | undefined {
  for (let node: Object3D | null = object; node; node = node.parent)
    if (node.name.startsWith('cake-')) return node.name;
}

const SAMPLES = CAKES.map((cake) => {
  const points: Vector3[] = [];
  for (const x of [-0.35, 0, 0.35])
    for (const z of [-0.35, 0, 0.35])
      points.push(
        new Vector3(
          cake.position[0] + x * cake.width,
          cake.position[1] + cake.height / 2,
          cake.position[2] + z * cake.width,
        ),
      );
  for (const side of [-1, 1])
    for (const h of [-0.42, -0.25, 0, 0.25, 0.42])
      for (const along of [-0.35, 0, 0.35]) {
        points.push(
          new Vector3(
            cake.position[0] + along * cake.width,
            cake.position[1] + h * cake.height,
            cake.position[2] + (side * cake.width) / 2,
          ),
        );
        points.push(
          new Vector3(
            cake.position[0] + (side * cake.width) / 2,
            cake.position[1] + h * cake.height,
            cake.position[2] + along * cake.width,
          ),
        );
      }
  return { id: cake.id, points };
});

/** Quan sát các mặt bánh bằng raycast thật; không quyết định render hoặc điều kiện thắng. */
export function ObserveCakes({ pot }: { pot: RefObject<Group | null> }) {
  const { scene, camera, gl } = useThree();
  const scratch = useRef({
    ray: new Raycaster(),
    point: new Vector3(),
    direction: new Vector3(),
  });
  useFrame(() => {
    if (!pot.current) return;
    scene.updateMatrixWorld(true);
    const { ray, point, direction } = scratch.current;
    const visible: string[] = [];
    for (const cake of SAMPLES) {
      for (const sample of cake.points) {
        pot.current.localToWorld(point.copy(sample));
        ray.set(
          camera.position,
          direction.copy(point).sub(camera.position).normalize(),
        );
        const hit = ray
          .intersectObjects(scene.children, true)
          .find(({ object }) => !object.userData.tapProxy);
        if (hit && cakeOwner(hit.object) === cake.id) {
          visible.push(cake.id);
          break;
        }
      }
    }
    gl.domElement.setAttribute('data-visible-cakes', visible.join(','));
    gl.domElement.setAttribute(
      'data-bottom-visible',
      String(visible.includes('cake-5')),
    );
  });
  return null;
}
