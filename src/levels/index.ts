import type { LevelMeta } from '@/domain/levels/types';
import { meta as sample01 } from './2d-sample-01/meta';
import { meta as sample02 } from './2d-sample-02/meta';

// Sổ đăng ký màn (docs/TECH.md mục 5.2). Thêm một màn = tạo thư mục `<mã>/` với meta.ts và scene.tsx rồi đăng ký
// ở LEVEL_METAS và load-scene.ts. Hiện chỉ có hai MÀN MẪU; 25 màn thật theo docs/LEVELS.md sẽ thay vào khi dựng nội dung.

/** Danh sách màn theo đúng thứ tự chơi. Chỉ nạp siêu dữ liệu; cảnh nặng nạp lười qua `loadScene`. */
export const LEVEL_METAS: readonly LevelMeta[] = [sample01, sample02];

export function findLevel(id: string): LevelMeta | undefined {
  return LEVEL_METAS.find((meta) => meta.id === id);
}
