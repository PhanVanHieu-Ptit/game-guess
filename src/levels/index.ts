import type { LevelMeta } from '@/domain/levels/types';
import { validateLevelMetas } from '@/domain/levels/validate';
import { LEVEL_METAS } from './catalog.generated';
export { LEVEL_METAS } from './catalog.generated';

const problems = validateLevelMetas(LEVEL_METAS);
if (problems.length)
  throw new Error(`Khai báo màn không hợp lệ:\n${problems.join('\n')}`);

export function findLevel(id: string): LevelMeta | undefined {
  return LEVEL_METAS.find((meta) => meta.id === id);
}
