'use client';
import type { SceneProps } from '@/engine/scene';
import { Scene3D } from '@/engine/stage3d/scene-3d';
import { isLookingAlong } from '@/domain/view/view-check';
export default function Scene({ onSolved, onProgress }: SceneProps) {
  return (
    <Scene3D
      onViewChange={(view) => {
        onProgress();
        if (isLookingAlong(view, [0, 0, -1], 6)) onSolved();
      }}
    >
      <mesh castShadow>
        <boxGeometry args={[2, 2, 2]} />
        {['#e3f4f2', '#e3f4f2', '#e3f4f2', '#e3f4f2', '#c62f3b', '#e3f4f2'].map(
          (color, i) => (
            <meshLambertMaterial
              key={i}
              attach={`material-${i}`}
              color={color}
            />
          ),
        )}
      </mesh>
    </Scene3D>
  );
}
