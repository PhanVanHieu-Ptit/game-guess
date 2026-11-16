import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { expect, it } from 'vitest';

it('một thư mục mới chỉ có meta.ts và scene.tsx được phát hiện mà không sửa registry', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'level-discovery-'));
  try {
    await mkdir(join(directory, '2d-test'));
    await writeFile(
      join(directory, '2d-test/meta.ts'),
      'export const meta = {};',
    );
    await writeFile(
      join(directory, '2d-test/scene.tsx'),
      'export default function Scene() { return null; }',
    );
    execFileSync(process.execPath, ['scripts/generate-levels.mjs', directory]);
    expect(
      await readFile(join(directory, 'catalog.generated.ts'), 'utf8'),
    ).toMatch(/from ['"]\.\/2d-test\/meta['"]/);
    expect(
      await readFile(join(directory, 'scenes.generated.ts'), 'utf8'),
    ).toMatch(/import\(['"]\.\/2d-test\/scene['"]\)/);
    await rm(join(directory, '2d-test/scene.tsx'));
    expect(() =>
      execFileSync(
        process.execPath,
        ['scripts/generate-levels.mjs', directory],
        { stdio: 'pipe' },
      ),
    ).toThrow();
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
