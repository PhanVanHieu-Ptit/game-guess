// Tự sinh bởi npm run levels:generate; không sửa tay.
import type { LevelMeta } from '@/domain/levels/types';
import { meta as m0 } from './2d-01/meta';
import { meta as m1 } from './2d-02/meta';
import { meta as m2 } from './2d-03/meta';
import { meta as m3 } from './2d-04/meta';
import { meta as m4 } from './2d-05/meta';
import { meta as m5 } from './2d-06/meta';
import { meta as m6 } from './2d-07/meta';
import { meta as m7 } from './2d-08/meta';
import { meta as m8 } from './2d-09/meta';
import { meta as m9 } from './2d-10/meta';
import { meta as m10 } from './3d-01/meta';
import { meta as m11 } from './3d-02/meta';
import { meta as m12 } from './3d-03/meta';

const entries = [
  { directory: '2d-01', meta: m0 },
  { directory: '2d-02', meta: m1 },
  { directory: '2d-03', meta: m2 },
  { directory: '2d-04', meta: m3 },
  { directory: '2d-05', meta: m4 },
  { directory: '2d-06', meta: m5 },
  { directory: '2d-07', meta: m6 },
  { directory: '2d-08', meta: m7 },
  { directory: '2d-09', meta: m8 },
  { directory: '2d-10', meta: m9 },
  { directory: '3d-01', meta: m10 },
  { directory: '3d-02', meta: m11 },
  { directory: '3d-03', meta: m12 },
];
for (const { directory, meta } of entries) {
  if (directory !== meta.id)
    throw new Error(`Mã màn ${meta.id} khác thư mục ${directory}`);
}
export const LEVEL_METAS: readonly LevelMeta[] = entries
  .map(({ meta }) => meta)
  .sort((a, b) => a.ordinal - b.ordinal);
