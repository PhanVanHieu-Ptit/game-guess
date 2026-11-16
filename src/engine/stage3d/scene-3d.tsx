'use client';
import dynamic from 'next/dynamic';
import type { Scene3DProps } from './types';

// Điểm vào duy nhất: Canvas/R3F chỉ được nạp phía trình duyệt và chỉ khi màn thật sự dùng 3D.
const Canvas3D = dynamic(() => import('./canvas-3d'), {
  ssr: false,
  loading: () => <p role="status">Đang dựng cảnh 3D…</p>,
});
export function Scene3D(props: Scene3DProps) {
  return <Canvas3D {...props} />;
}
export type { Scene3DProps, CameraPreset } from './types';
