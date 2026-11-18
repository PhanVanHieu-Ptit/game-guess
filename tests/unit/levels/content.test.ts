import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { promptText } from '@/domain/levels/prompt';
import { findLevel } from '@/levels';

const source = readFileSync('docs/LEVELS.md', 'utf8');

describe('nội dung màn sản phẩm khớp tài liệu thiết kế', () => {
  for (const id of [
    '2d-01',
    '2d-02',
    '2d-03',
    '2d-04',
    '2d-05',
    '2d-06',
    '2d-07',
    '2d-08',
    '2d-09',
    '2d-10',
    '3d-01',
    '3d-02',
    '3d-03',
  ]) {
    it(`${id}: đúng đề, ba gợi ý, giải thích và độ khó`, () => {
      const row = source
        .split('\n')
        .find((line) => line.includes(`| ${id.toUpperCase()} |`));
      expect(row).toBeDefined();
      const cells = row!.split('|').map((cell) => cell.trim());
      const meta = findLevel(id)!;
      expect(meta.title).toBe(cells[3]);
      expect(promptText(meta.prompt)).toBe(cells[6]);
      expect(meta.hints).toEqual(
        cells[8].split('<br>').map((hint) => hint.replace(/^\d\) /, '')),
      );
      expect(meta.explanation).toBe(cells[9]);
      expect(meta.difficulty).toBe(Number(cells[10]));
      expect(Object.keys(meta.wrong ?? {}).length).toBeGreaterThanOrEqual(2);
    });
  }
});
