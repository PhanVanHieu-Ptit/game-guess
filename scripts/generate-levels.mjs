import { readdir, access, readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL, fileURLToPath } from 'node:url';

// Sinh import tĩnh để Next tách chunk, không kéo cảnh hoặc Three.js vào sổ metadata.
const base = process.argv[2]
  ? pathToFileURL(`${process.argv[2].replace(/\/$/, '')}/`)
  : new URL('../src/levels/', import.meta.url);
const names = (await readdir(base, { withFileTypes: true }))
  .filter(
    (entry) =>
      entry.isDirectory() &&
      /^(2d|3d)-[a-z0-9]+(-[a-z0-9]+)*$/.test(entry.name),
  )
  .map((entry) => entry.name)
  .sort();
for (const name of names) {
  for (const file of ['meta.ts', 'scene.tsx']) {
    try {
      await access(new URL(`${name}/${file}`, base));
    } catch {
      throw new Error(`Màn ${name} thiếu ${file}`);
    }
  }
}
const heading = '// Tự sinh bởi npm run levels:generate; không sửa tay.\n';
const imports = names
  .map((name, i) => `import { meta as m${i} } from './${name}/meta';`)
  .join('\n');
const metadata = `${heading}import type { LevelMeta } from '@/domain/levels/types';\n${imports}\n\nconst entries = [${names.map((name, i) => `{ directory: '${name}', meta: m${i} }`).join(', ')}];\nfor (const { directory, meta } of entries) {\n  if (directory !== meta.id) throw new Error(\`Mã màn \${meta.id} khác thư mục \${directory}\`);\n}\nexport const LEVEL_METAS: readonly LevelMeta[] = entries.map(({ meta }) => meta).sort((a, b) => a.ordinal - b.ordinal);\n`;
const scenes = `${heading}'use client';\nimport type { Level } from '@/engine/scene';\n\nexport const SCENES: Readonly<Partial<Record<string, Level['component']>>> = {\n${names.map((name) => `  '${name}': () => import('./${name}/scene'),`).join('\n')}\n};\n`;
// Cùng Prettier với repo; chỉ ghi nếu đổi để không kích HMR vô hạn.
const { format, resolveConfig } = await import('prettier');
for (const [name, source] of [
  ['catalog.generated.ts', metadata],
  ['scenes.generated.ts', scenes],
]) {
  const url = new URL(name, base);
  const options = await resolveConfig(fileURLToPath(url));
  const formatted = await format(source, {
    ...options,
    filepath: fileURLToPath(url),
  });
  const old = await readFile(url, 'utf8').catch(() => '');
  if (old !== formatted) await writeFile(url, formatted);
}
console.log(`Đã nhận ${names.length} màn (meta.ts + scene.tsx).`);
