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
import { meta as m10 } from './2d-11/meta';
import { meta as m11 } from './2d-12/meta';
import { meta as m12 } from './2d-13/meta';
import { meta as m13 } from './2d-14/meta';
import { meta as m14 } from './2d-15/meta';
import { meta as m15 } from './2d-16/meta';
import { meta as m16 } from './2d-17/meta';
import { meta as m17 } from './2d-18/meta';
import { meta as m18 } from './2d-19/meta';
import { meta as m19 } from './2d-20/meta';
import { meta as m20 } from './2d-21/meta';
import { meta as m21 } from './2d-22/meta';
import { meta as m22 } from './2d-23/meta';
import { meta as m23 } from './2d-24/meta';
import { meta as m24 } from './3d-01/meta';
import { meta as m25 } from './3d-02/meta';
import { meta as m26 } from './3d-03/meta';

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
  { directory: '2d-11', meta: m10 },
  { directory: '2d-12', meta: m11 },
  { directory: '2d-13', meta: m12 },
  { directory: '2d-14', meta: m13 },
  { directory: '2d-15', meta: m14 },
  { directory: '2d-16', meta: m15 },
  { directory: '2d-17', meta: m16 },
  { directory: '2d-18', meta: m17 },
  { directory: '2d-19', meta: m18 },
  { directory: '2d-20', meta: m19 },
  { directory: '2d-21', meta: m20 },
  { directory: '2d-22', meta: m21 },
  { directory: '2d-23', meta: m22 },
  { directory: '2d-24', meta: m23 },
  { directory: '3d-01', meta: m24 },
  { directory: '3d-02', meta: m25 },
  { directory: '3d-03', meta: m26 },
];
for (const { directory, meta } of entries) {
  if (directory !== meta.id)
    throw new Error(`Mã màn ${meta.id} khác thư mục ${directory}`);
}
export const LEVEL_METAS: readonly LevelMeta[] = entries
  .map(({ meta }) => meta)
  .sort((a, b) => a.ordinal - b.ordinal);
