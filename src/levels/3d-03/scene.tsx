'use client';

import { useCallback, useRef, useState } from 'react';
import type { Group } from 'three';
import type { CameraView, Vec3 } from '@/domain/view/view-check';
import {
  checkCakeCount,
  clampPotTilt,
  isLookingIntoLowerLayer,
  MAX_POT_TILT,
  potTiltFromDrag,
} from '@/domain/puzzles/banh-chung-count';
import type { SceneProps } from '@/engine/scene';
import { NumberPad } from '@/engine/input/number-pad';
import { Scene3D, type CameraPreset } from '@/engine/stage3d/scene-3d';
import { TapTarget3D } from '@/engine/stage3d/tap-target-3d';
import { DragObject3D } from '@/engine/stage3d/drag-object-3d';
import { CookingPot, PotLid } from '@/engine/stage3d/models/cooking-pot';
import { BanhChung } from '@/engine/stage3d/models/banh-chung';
import { BrickBase } from '@/engine/stage3d/models/brick-base';
import { CAKES } from './layout';
import { ObserveCakes } from './observe-cakes';
import styles from './scene.module.css';

const CAMERA: CameraPreset = {
  position: [-0.9, 7.1, 3.4],
  target: [0, 0.85, 0],
  fov: 42,
  minDistance: 6.5,
  maxDistance: 9,
  minPolar: (25 * Math.PI) / 180,
  maxPolar: (31 * Math.PI) / 180,
  minAzimuth: (-30 * Math.PI) / 180,
  maxAzimuth: (30 * Math.PI) / 180,
};

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const [tilt, setTilt] = useState(0);
  const tiltRef = useRef(0);
  const initialTilt = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState(false);
  const [solved, setSolved] = useState(false);
  const [view, setView] = useState<CameraView>(CAMERA);
  const onViewChange = useCallback(
    (next: CameraView) => {
      setView(next);
      onProgress();
    },
    [onProgress],
  );
  const pot = useRef<Group>(null);
  const angle = (tilt * Math.PI) / 180;
  const lift = 0.2 + 2.1 * Math.sin(angle);
  const handle: Vec3 = [
    2.57,
    lift + 0.88 * Math.cos(angle),
    -0.88 * Math.sin(angle),
  ];
  const changeTilt = (next: number) => {
    tiltRef.current = clampPotTilt(next);
    setTilt(tiltRef.current);
    onProgress();
  };
  const toggleLid = () => {
    openRef.current = !openRef.current;
    setOpen(openRef.current);
    if (!openRef.current) {
      changeTilt(0);
      setSelected(false);
    }
    onProgress();
  };
  return (
    <div
      className={styles.puzzle}
      data-lid-open={open}
      data-pot-tilt={tilt.toFixed(2)}
      data-dragging={dragging}
      data-bottom-view={open && isLookingIntoLowerLayer(view, tilt)}
    >
      <Scene3D
        label="Nồi bánh chưng ngày Tết"
        preset={CAMERA}
        controlsEnabled={!dragging}
        onViewChange={onViewChange}
      >
        <mesh position={[0, -0.06, 0]} receiveShadow>
          <boxGeometry args={[7.4, 0.1, 5.8]} />
          <meshLambertMaterial color="#ead9b5" />
        </mesh>
        <BrickBase />
        <DragObject3D
          enabled={open && !solved}
          onStart={() => {
            initialTilt.current = tiltRef.current;
            setDragging(true);
            setSelected(true);
            onProgress();
          }}
          onDrag={(delta) =>
            changeTilt(potTiltFromDrag(initialTilt.current, delta[1]))
          }
          onEnd={(cancelled) => {
            if (cancelled) changeTilt(initialTilt.current);
            setDragging(false);
          }}
        >
          <group
            name="pot"
            ref={pot}
            position={[0, lift, 0]}
            rotation={[-angle, 0, 0]}
            onClick={(event) => {
              if (!open && event.delta < 6) {
                event.stopPropagation();
                onWrong('closed');
              }
            }}
          >
            <CookingPot />
            {/* Lá lót mỏng giữa hai tầng; khe giữa bốn bánh vẫn có nền thật che bánh dưới. */}
            <mesh position={[0, 0.8, 0]}>
              <boxGeometry args={[2.28, 0.01, 2.28]} />
              <meshLambertMaterial color="#44683c" />
            </mesh>
            {CAKES.map((cake) => (
              <BanhChung
                key={cake.id}
                name={cake.id}
                position={[...cake.position]}
                width={cake.width}
                height={cake.height}
                color={cake.color}
                receiveShadow={cake.id !== 'cake-5'}
              />
            ))}
          </group>
          <TapTarget3D
            id="pot-handle"
            owner="pot"
            position={handle}
            enabled={open && !solved}
            onTap={() => {
              setSelected(true);
              onProgress();
            }}
          />
        </DragObject3D>
        <PotLid
          name="lid"
          position={open ? [-2.4, 1.8, -1.6] : [0, 1.43, 0]}
          rotation={open ? [0, 0, -1] : [0, 0, 0]}
        />
        <TapTarget3D
          id="lid"
          position={open ? [-2.25, 2.05, -1.6] : [0, 1.73, 0]}
          enabled={!dragging && !solved}
          onTap={toggleLid}
        />
        <ObserveCakes pot={pot} />
      </Scene3D>
      <p className={styles.caption}>
        {open
          ? 'Đã nhìn hết chiếc nồi chưa? Thử xem cả bên dưới.'
          : 'Chạm đồ vật để khám phá, kéo nền để nhìn quanh.'}
      </p>
      {selected && open && (
        <div className={styles.tools} role="group" aria-label="Điều khiển nồi">
          <button
            type="button"
            data-touch-target
            disabled={dragging || solved || tilt >= MAX_POT_TILT}
            onClick={() => changeTilt(tilt + 8)}
          >
            Nghiêng nồi
          </button>
          <button
            type="button"
            data-touch-target
            disabled={dragging || solved || tilt === 0}
            onClick={() => changeTilt(0)}
          >
            Đặt nồi thẳng
          </button>
        </div>
      )}
      <NumberPad
        label="Nhập số bánh"
        valueLabel="Số bánh"
        maxDigits={1}
        disabled={solved}
        onProgress={onProgress}
        onSubmit={(value) => {
          const verdict = checkCakeCount(value);
          if (verdict === 'correct') {
            setSolved(true);
            onSolved();
          } else if (verdict !== 'empty') onWrong(verdict);
        }}
      />
    </div>
  );
}
