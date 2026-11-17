'use client';

import { useCallback, useRef, useState } from 'react';
import type { CameraView } from '@/domain/view/view-check';
import {
  canSeeSlipperSole,
  searchForKey,
  type KeySearchObject,
  type KeySearchState,
} from '@/domain/puzzles/motorbike-key';
import type { SceneProps } from '@/engine/scene';
import { Scene3D, type CameraPreset } from '@/engine/stage3d/scene-3d';
import { TapTarget3D } from '@/engine/stage3d/tap-target-3d';
import { TownhouseRoom } from '@/engine/stage3d/models/townhouse-room';
import { Sofa, Cushion } from '@/engine/stage3d/models/sofa';
import { LowTable } from '@/engine/stage3d/models/low-table';
import { Basket } from '@/engine/stage3d/models/basket';
import { Slipper } from '@/engine/stage3d/models/slipper';
import { MotorbikeKey } from '@/engine/stage3d/models/motorbike-key';
import styles from './scene.module.css';

const CAMERA: CameraPreset = {
  position: [-6.8, 7, 9.2],
  target: [0, 0.5, 0.15],
  fov: 40,
  minDistance: 9,
  maxDistance: 14,
  minPolar: (35 * Math.PI) / 180,
  maxPolar: (76 * Math.PI) / 180,
  minAzimuth: (-75 * Math.PI) / 180,
  maxAzimuth: (75 * Math.PI) / 180,
};

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const [state, setState] = useState<KeySearchState>('searching');
  const current = useRef<KeySearchState>('searching');
  const [soleVisible, setSoleVisible] = useState(false);
  const onViewChange = useCallback(
    (view: CameraView) => {
      setSoleVisible(canSeeSlipperSole(view));
      onProgress();
    },
    [onProgress],
  );
  const search = (object: KeySearchObject) => {
    const before = current.current;
    const result = searchForKey(before, object, soleVisible);
    if (result.wrong) onWrong(result.wrong);
    if (result.state !== before) {
      current.current = result.state;
      setState(result.state);
      onProgress();
      if (result.state === 'solved') onSolved();
    }
  };
  const flipped = state !== 'searching';
  return (
    <div className={styles.puzzle} data-key-state={state}>
      <Scene3D
        label="Phòng khách nhà ống"
        preset={CAMERA}
        onViewChange={onViewChange}
        showDragHint
      >
        <TownhouseRoom />
        <Sofa position={[-1.05, 0, -1.72]} />
        <Cushion
          name="cushion"
          position={[-1.65, 1.03, -1.57]}
          rotation={[-0.2, 0, -0.12]}
        />
        <LowTable name="table" position={[-0.7, 0, 0.15]} />
        <Basket name="basket" position={[1.8, 0, -1.45]} />
        <group
          name="slippers"
          position={[2.12, flipped ? 0.6 : 0.16, 2.12]}
          rotation={[flipped ? 0.5 : 0, 0, flipped ? Math.PI : 0]}
        >
          <Slipper />
          <group name="key" position={[0, -0.16, -0.02]}>
            <mesh position={[0, 0.055, 0]} scale={[0.3, 0.07, 0.3]}>
              <icosahedronGeometry args={[1, 0]} />
              <meshLambertMaterial color="#df8e9a" />
            </mesh>
            <MotorbikeKey />
          </group>
        </group>
        <Slipper
          name="other-slipper"
          position={[2.83, 0.16, 1.92]}
          rotation={[0, -0.18, 0]}
          color="#427f91"
        />
        <TapTarget3D
          id="cushion"
          position={[-1.65, 1.32, -1.46]}
          onTap={() => search('cushion')}
        />
        <TapTarget3D
          id="table"
          position={[-0.7, 0.74, 0.15]}
          onTap={() => search('table')}
        />
        <TapTarget3D
          id="basket"
          position={[1.8, 0.66, -1.45]}
          onTap={() => search('basket')}
        />
        <TapTarget3D
          id="slippers"
          position={[2.12, 0.38, 2.12]}
          enabled={!flipped}
          onTap={() => search('slippers')}
        />
        <TapTarget3D
          id="other-slipper"
          position={[2.83, 0.38, 1.92]}
          enabled={!flipped}
          onTap={() => search('slippers')}
        />
        <TapTarget3D
          id="key"
          position={[2.12, 0.83, 2.18]}
          enabled={state === 'flipped' && soleVisible}
          onTap={() => search('key')}
        />
      </Scene3D>
      <p className={styles.caption} aria-live="polite">
        {flipped
          ? 'Có thứ gì dính dưới đế dép…'
          : 'Kéo để nhìn quanh, chạm đồ vật để tìm.'}
      </p>
    </div>
  );
}
