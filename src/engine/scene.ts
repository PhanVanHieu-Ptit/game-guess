import type { ComponentType } from 'react';
import type { LevelMeta } from '@/domain/levels/types';

/** Hợp đồng duy nhất từ cảnh tới khung chơi; cảnh không gọi đo lường hay lưu tiến trình. */
export interface SceneProps {
  onSolved(): void;
  onWrong(code?: string): void;
  onProgress(): void;
}
export type LevelScene = ComponentType<SceneProps>;
export interface SceneModule {
  default: LevelScene;
}
/** Dữ liệu nhỏ và bộ nạp component; chỉ ghép hai phần ở phía trình duyệt. */
export interface Level extends LevelMeta {
  component: () => Promise<SceneModule>;
}
