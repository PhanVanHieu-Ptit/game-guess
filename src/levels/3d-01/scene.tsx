'use client';

import { useCallback, useState } from 'react';
import type { CameraView } from '@/domain/view/view-check';
import {
  canReadTankNumber,
  checkHouseNumber,
} from '@/domain/puzzles/house-number';
import type { SceneProps } from '@/engine/scene';
import { Scene3D, type CameraPreset } from '@/engine/stage3d/scene-3d';
import { Townhouse } from '@/engine/stage3d/models/townhouse';
import { WaterTank } from '@/engine/stage3d/models/water-tank';
import { Planter } from '@/engine/stage3d/models/planter';
import { NumberPad } from '@/engine/input/number-pad';
import styles from './scene.module.css';

const CAMERA: CameraPreset = {
  position: [6.7, 6.4, 9],
  target: [0, 2.7, 0],
  fov: 42,
  minDistance: 9,
  maxDistance: 14,
  minPolar: (47 * Math.PI) / 180,
  maxPolar: (83 * Math.PI) / 180,
  minAzimuth: -Math.PI,
  maxAzimuth: Math.PI,
};

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const [readable, setReadable] = useState(false);
  const [solved, setSolved] = useState(false);
  const onViewChange = useCallback(
    (view: CameraView) => {
      setReadable(canReadTankNumber(view));
      onProgress();
    },
    [onProgress],
  );
  return (
    <div className={styles.puzzle} data-number-readable={readable}>
      <Scene3D
        label="Ngôi nhà ống có sân thượng"
        preset={CAMERA}
        onViewChange={onViewChange}
        showDragHint
      >
        <mesh position={[0, -0.13, 0]} receiveShadow>
          <boxGeometry args={[5.8, 0.24, 5.6]} />
          <meshLambertMaterial color="#d0d9bc" />
        </mesh>
        <mesh position={[0, 0.005, 2.15]} receiveShadow>
          <boxGeometry args={[5.5, 0.03, 0.95]} />
          <meshLambertMaterial color="#e5cc9f" />
        </mesh>
        <Townhouse />
        <WaterTank position={[0, 4.28, -0.6]} number="36" />
        <Planter position={[-1.08, 2.23, 1.76]} scale={0.8} />
        <Planter position={[2, 0, -1.45]} />
      </Scene3D>
      <p className={styles.caption}>
        Nhà có nhiều mặt. Kéo một ngón để nhìn quanh.
      </p>
      <NumberPad
        label="Nhập số nhà"
        maxDigits={2}
        disabled={solved}
        onProgress={onProgress}
        onSubmit={(value) => {
          const verdict = checkHouseNumber(value);
          if (verdict === 'correct') {
            setSolved(true);
            onSolved();
          } else if (verdict !== 'empty') onWrong(verdict);
        }}
      />
    </div>
  );
}
