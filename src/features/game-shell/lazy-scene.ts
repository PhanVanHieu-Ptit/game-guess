import { lazy, type LazyExoticComponent } from 'react';
import type { LevelId } from '@/domain/levels/types';
import type { Level, LevelScene } from '@/engine/scene';
import { SCENE_LOAD_TIMEOUT_MS } from '@/features/config';
import { loadScene } from '@/levels/load-scene';

// Cảnh của màn nạp lười (docs/TECH.md mục 3, 5): màn chọn màn và trang chủ không kéo theo mã cảnh.

const cache = new Map<LevelId, LazyExoticComponent<LevelScene>>();

type SceneModule = Awaited<ReturnType<typeof loadScene>>;

/** Nạp cảnh nhưng từ chối sau `SCENE_LOAD_TIMEOUT_MS` (xem features/config.ts) để lỗi nạp luôn đến được SceneBoundary. */
function loadSceneWithTimeout(
  id: LevelId,
  component: Level['component'] = () => loadScene(id),
): Promise<SceneModule> {
  return new Promise<SceneModule>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`Hết thời gian nạp cảnh của màn ${id}`)),
      SCENE_LOAD_TIMEOUT_MS,
    );
    component().then(
      (loaded) => {
        clearTimeout(timer);
        resolve(loaded);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

/** Cảnh nạp lười của màn, nhớ theo mã màn để các lần render dùng chung một lần nạp. */
export function getLazyScene(
  id: LevelId,
  component?: Level['component'],
): LazyExoticComponent<LevelScene> {
  let scene = cache.get(id);
  if (!scene) {
    scene = lazy(() => loadSceneWithTimeout(id, component));
    cache.set(id, scene);
  }
  return scene;
}

/** Quên bản đã nhớ (sau khi nạp lỗi) để lần render kế tiếp nạp lại từ đầu. */
export function resetLazyScene(id: LevelId): void {
  cache.delete(id);
}

/** Nạp trước cảnh của màn kế tiếp. Lỗi bị nuốt: sẽ nạp lại và báo lỗi khi người chơi thật sự vào màn đó. */
export function preloadScene(id: LevelId): void {
  loadSceneWithTimeout(id).catch(() => {});
}
