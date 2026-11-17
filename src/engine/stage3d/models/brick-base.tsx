'use client';

import type { ThreeElements } from '@react-three/fiber';
import { BoxParts } from './box-parts';

/** Bệ gạch thấp dùng cho nồi, bếp hoặc đồ vật đặt ngoài sân. */
export function BrickBase(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <BoxParts
        color="#b67558"
        parts={[-1.35, 0, 1.35].map((x) => ({
          position: [x, 0.09, 0],
          size: [1.26, 0.18, 2.7],
        }))}
      />
    </group>
  );
}
