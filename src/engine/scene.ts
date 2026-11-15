import type { ComponentType } from 'react';
import type { LevelSession } from '@/domain/levels/types';

// Phần của hợp đồng màn có phụ thuộc React (docs/TECH.md mục 5.1). Đặt ở engine/ thay vì domain/ để domain/ giữ thuần.

export interface SceneProps {
  /** Cầu nối duy nhất tới khung chơi: báo đúng, báo sai, báo có tiến triển. Cảnh không tự gọi đo lường. */
  session: LevelSession;
}

export type LevelScene = ComponentType<SceneProps>;
