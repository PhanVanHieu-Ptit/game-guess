'use client';
import type { LevelId } from '@/domain/levels/types';
import type { Level, SceneModule } from '@/engine/scene';
import { findLevel } from './index';
import { SCENES } from './scenes.generated';

/** Ghép dữ liệu và component mà không làm Server Component nhập bộ nạp cảnh. */
export function findPlayableLevel(id: string): Level | undefined {
  const meta = findLevel(id);
  const component = SCENES[id];
  return meta && component ? { ...meta, component } : undefined;
}
export function loadScene(id: LevelId): Promise<SceneModule> {
  const level = findPlayableLevel(id);
  return level
    ? level.component()
    : Promise.reject(new Error(`Không có cảnh cho màn ${id}`));
}
