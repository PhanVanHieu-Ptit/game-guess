'use client';

import type { LevelId } from '@/domain/levels/types';
import type { LevelScene } from '@/engine/scene';

interface SceneModule {
  default: LevelScene;
}

// Tách khỏi index.ts vì các Server Component cũng đọc siêu dữ liệu ở đó. Nếu cùng module, Next có thể đưa mọi
// cảnh vào gói khởi tạo của route, khiến một cảnh lỗi tải chặn cả hydration thay vì tới SceneBoundary.
const SCENES: Readonly<Record<string, () => Promise<SceneModule>>> = {
  '2d-sample-01': () => import('./2d-sample-01/scene'),
  '2d-sample-02': () => import('./2d-sample-02/scene'),
};

export function loadScene(id: LevelId): Promise<SceneModule> {
  const load = SCENES[id];
  return load
    ? load()
    : Promise.reject(new Error(`Không có cảnh cho màn ${id}`));
}
