import { addAfterEffect } from '@react-three/fiber';
import type { WebGLRenderer } from 'three';

/** Gắn số đo sau frame; trả lại cấu hình và gỡ bộ quan sát khi Canvas bị hủy. */
export function observeRenderer(renderer: WebGLRenderer): () => void {
  const autoReset = renderer.info.autoReset;
  // Three mặc định reset sau lượt vẽ bóng; Rig sẽ reset đầu frame để đếm đủ cả hai lượt.
  renderer.info.autoReset = false;
  const remove = addAfterEffect(() => {
    // Ghi đúng góc của frame vừa vẽ để phép đo không phải đợi một RAF riêng khi cảnh đứng yên.
    renderer.domElement.setAttribute(
      'data-render-view',
      JSON.stringify({
        azimuth: renderer.domElement.dataset.azimuth,
        polar: renderer.domElement.dataset.polar,
        distance: renderer.domElement.dataset.distance,
      }),
    );
    renderer.domElement.setAttribute(
      'data-draw-calls',
      String(renderer.info.render.calls),
    );
    renderer.domElement.setAttribute(
      'data-triangles',
      String(renderer.info.render.triangles),
    );
  });
  return () => {
    remove();
    renderer.info.autoReset = autoReset;
  };
}
