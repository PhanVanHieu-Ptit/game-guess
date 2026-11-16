// Tự sinh bởi npm run levels:generate; không sửa tay.
import type { LevelMeta } from '@/domain/levels/types';
import { meta as m0 } from './2d-sample-01/meta';
import { meta as m1 } from './2d-sample-02/meta';

const entries = [
  { directory: '2d-sample-01', meta: m0 },
  { directory: '2d-sample-02', meta: m1 },
];
for (const { directory, meta } of entries) {
  if (directory !== meta.id)
    throw new Error(`Mã màn ${meta.id} khác thư mục ${directory}`);
}
export const LEVEL_METAS: readonly LevelMeta[] = entries
  .map(({ meta }) => meta)
  .sort((a, b) => a.ordinal - b.ordinal);
