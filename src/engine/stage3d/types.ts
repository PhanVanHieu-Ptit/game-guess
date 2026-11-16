import type { ReactNode } from 'react';
import type { CameraView, Vec3 } from '@/domain/view/view-check';

export interface CameraPreset {
  position: Vec3;
  target: Vec3;
  fov: number;
  minDistance: number;
  maxDistance: number;
  minPolar: number;
  maxPolar: number;
  minAzimuth: number;
  maxAzimuth: number;
}
export interface Scene3DProps {
  children: ReactNode;
  label?: string;
  preset?: CameraPreset;
  controlsEnabled?: boolean;
  /** Bật cho hai màn 3D đầu: hướng dẫn kéo trong 5 giây sau khi cảnh sẵn sàng. */
  showDragHint?: boolean;
  onViewChange?(view: CameraView): void;
}
export const DEFAULT_CAMERA: CameraPreset = {
  position: [4, 3, 6],
  target: [0, 0, 0],
  fov: 45,
  minDistance: 2,
  maxDistance: 12,
  minPolar: Math.PI / 12,
  maxPolar: (Math.PI * 11) / 12,
  minAzimuth: -Math.PI,
  maxAzimuth: Math.PI,
};
