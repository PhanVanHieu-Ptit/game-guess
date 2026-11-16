import { cp, access, readFile, writeFile, rm, readdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

// Lắp đúng hai file của mỗi ví dụ vào catalog thật, chạy trình duyệt, rồi luôn dọn sạch.
const examples = ['2d-word', '3d-view'];
const installed = [];
const count = (await readdir('src/levels', { withFileTypes: true })).filter(
  (entry) => entry.isDirectory() && /^(2d|3d)-/.test(entry.name),
).length;
let exitCode = 1;
try {
  for (const [index, id] of examples.entries()) {
    const target = `src/levels/${id}`;
    const exists = await access(target).then(
      () => true,
      () => false,
    );
    if (exists) throw new Error(`${target} đã có; không ghi đè màn của bạn.`);
    await cp(`examples/levels/${id}`, target, { recursive: true });
    installed.push(target);
    const file = `${target}/meta.ts`;
    const source = await readFile(file, 'utf8');
    await writeFile(
      file,
      source.replace(/ordinal: \d+/, `ordinal: ${count + index + 1}`),
    );
  }
  const result = spawnSync(
    'npx',
    ['playwright', 'test', '--config', 'playwright.examples.config.ts'],
    { stdio: 'inherit' },
  );
  exitCode = result.status ?? 1;
} finally {
  for (const target of installed)
    await rm(target, { recursive: true, force: true });
  const generated = spawnSync(
    process.execPath,
    ['scripts/generate-levels.mjs'],
    { stdio: 'inherit' },
  );
  if (generated.status !== 0) exitCode = 1;
}
process.exitCode = exitCode;
