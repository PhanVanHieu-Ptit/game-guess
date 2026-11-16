'use client';
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type ComponentRef,
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei/core/OrbitControls';
import { orbitAngles, positionFromOrbit } from '@/domain/view/view-check';
import { DEFAULT_CAMERA, type CameraPreset, type Scene3DProps } from './types';
import { InteractionQuality } from './quality';
import { DragHint } from './drag-hint';
import { observeRenderer } from './renderer-diagnostics';
import styles from './scene-3d.module.css';

type Command = {
  sequence: number;
  action: 'reset' | 'left' | 'right' | 'up' | 'down' | 'near' | 'far';
};
const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));
function Rig({
  preset,
  command,
  enabled,
  onViewChange,
  onSlow,
  onLost,
  onReady,
}: {
  preset: CameraPreset;
  command: Command;
  enabled: boolean;
  onViewChange: Scene3DProps['onViewChange'];
  onSlow(): void;
  onLost(): void;
  onReady(): void;
}) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const { camera, invalidate, gl } = useThree();
  const active = useRef(false);
  const quality = useRef(new InteractionQuality());
  const report = () => {
    const target = controls.current?.target;
    if (target) {
      const view = {
        position: [camera.position.x, camera.position.y, camera.position.z],
        target: [target.x, target.y, target.z],
      } as const;
      const angles = orbitAngles(view);
      if (angles) {
        gl.domElement.setAttribute(
          'data-azimuth',
          angles.azimuthDeg.toFixed(2),
        );
        gl.domElement.setAttribute('data-polar', angles.polarDeg.toFixed(2));
        gl.domElement.setAttribute(
          'data-distance',
          camera.position.distanceTo(target).toFixed(2),
        );
      }
      onViewChange?.(view);
    }
  };
  const reportInitial = useEffectEvent(report);
  useEffect(() => {
    onReady();
  }, [onReady]);
  useEffect(() => observeRenderer(gl), [gl]);
  // Cùng đường điều khiển cho reset và nút chạm, luôn áp giới hạn như OrbitControls.
  useEffect(() => {
    const orbit = controls.current;
    if (!orbit) return;
    if (command.action === 'reset') {
      camera.position.set(...preset.position);
      orbit.target.set(...preset.target);
    } else {
      const view = {
        position: [
          camera.position.x,
          camera.position.y,
          camera.position.z,
        ] as const,
        target: preset.target,
      };
      const angles = orbitAngles(view);
      if (angles) {
        const step = 10;
        const azimuth =
          angles.azimuthDeg +
          (command.action === 'left'
            ? -step
            : command.action === 'right'
              ? step
              : 0);
        const polar =
          angles.polarDeg +
          (command.action === 'up'
            ? -step
            : command.action === 'down'
              ? step
              : 0);
        const distance =
          camera.position.distanceTo(orbit.target) *
          (command.action === 'near'
            ? 0.85
            : command.action === 'far'
              ? 1.15
              : 1);
        camera.position.set(
          ...positionFromOrbit(
            preset.target,
            clamp(distance, preset.minDistance, preset.maxDistance),
            {
              azimuthDeg: clamp(
                azimuth,
                (preset.minAzimuth * 180) / Math.PI,
                (preset.maxAzimuth * 180) / Math.PI,
              ),
              polarDeg: clamp(
                polar,
                (preset.minPolar * 180) / Math.PI,
                (preset.maxPolar * 180) / Math.PI,
              ),
            },
          ),
        );
      }
    }
    orbit.update();
    invalidate();
    reportInitial();
  }, [camera, command, invalidate, preset]);
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => {
      event.preventDefault();
      onLost();
    };
    canvas.addEventListener('webglcontextlost', lost);
    return () => canvas.removeEventListener('webglcontextlost', lost);
  }, [gl, onLost]);
  useFrame(() => {
    gl.info.reset();
    if (quality.current.sample(performance.now(), active.current)) onSlow();
  });
  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enabled={enabled}
      enablePan={false}
      enableDamping={false}
      minDistance={preset.minDistance}
      maxDistance={preset.maxDistance}
      minPolarAngle={preset.minPolar}
      maxPolarAngle={preset.maxPolar}
      minAzimuthAngle={preset.minAzimuth}
      maxAzimuthAngle={preset.maxAzimuth}
      onStart={() => {
        active.current = true;
      }}
      onEnd={() => {
        active.current = false;
        quality.current.sample(performance.now(), false);
      }}
      onChange={() => report()}
    />
  );
}
export default function Canvas3D({
  children,
  label = 'Khu vực chơi 3D',
  preset = DEFAULT_CAMERA,
  controlsEnabled = true,
  onViewChange,
  showDragHint = false,
}: Scene3DProps) {
  const [low, setLow] = useState(false);
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  const [lost, setLost] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [command, setCommand] = useState<Command>({
    sequence: 0,
    action: 'reset',
  });
  const send = (action: Command['action']) => {
    setInteracted(true);
    setCommand((c) => ({ sequence: c.sequence + 1, action }));
  };
  return (
    <div className={styles.scene} data-quality={low ? 'low' : 'high'}>
      {lost ? (
        <p role="status">Cảnh 3D đã tạm dừng. Chạm Chơi lại để mở lại cảnh.</p>
      ) : (
        <div
          className={styles.canvas}
          role="group"
          aria-label={label}
          aria-busy={!ready}
          onPointerDown={() => setInteracted(true)}
        >
          <Canvas
            frameloop="demand"
            dpr={low ? 1 : [1, 1.75]}
            shadows={!low}
            camera={{ position: [...preset.position], fov: preset.fov }}
            gl={{ antialias: false, powerPreference: 'low-power' }}
            fallback={
              <p role="status">
                Thiết bị không hỗ trợ WebGL. Hãy dùng trình duyệt hỗ trợ 3D.
              </p>
            }
          >
            <ambientLight intensity={0.7} />
            <directionalLight
              position={[4, 7, 5]}
              intensity={2}
              castShadow={!low}
              shadow-mapSize={[512, 512]}
            />
            <Rig
              preset={preset}
              command={command}
              enabled={controlsEnabled}
              onViewChange={onViewChange}
              onSlow={() => setLow(true)}
              onLost={() => setLost(true)}
              onReady={markReady}
            />
            {children}
          </Canvas>
          <DragHint active={showDragHint && ready && !interacted} />
        </div>
      )}
      <div
        className={styles.toolbar}
        role="group"
        aria-label="Điều khiển góc nhìn"
      >
        {(['left', 'right', 'up', 'down', 'near', 'far'] as const).map(
          (action, i) => (
            <button
              key={action}
              type="button"
              data-touch-target
              disabled={!ready || !controlsEnabled || lost}
              onClick={() => send(action)}
            >
              {['Trái', 'Phải', 'Lên', 'Xuống', 'Gần', 'Xa'][i]}
            </button>
          ),
        )}
        <button
          type="button"
          data-touch-target
          disabled={!ready || lost}
          onClick={() => send('reset')}
        >
          Về góc ban đầu
        </button>
      </div>
    </div>
  );
}
