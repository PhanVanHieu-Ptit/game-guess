import { describe, expect, it } from 'vitest';
import type { LevelId, LevelMeta } from '@/domain/levels/types';
import { validateLevelMetas } from '@/domain/levels/validate';
import { makeMeta, makeMetas } from '../../fixtures/levels';

const only = (metas: LevelMeta[]): string[] => validateLevelMetas(metas);

describe('validateLevelMetas', () => {
  it('danh sách hợp lệ thì không có lỗi', () => {
    expect(only(makeMetas(3))).toEqual([]);
  });

  it('nêu mã màn và tên trường khi id trùng', () => {
    const metas = [makeMeta(), makeMeta({ ordinal: 2 })];
    expect(only(metas)).toContain('[2d-test-01] id: bị trùng');
  });

  it('bắt id sai dạng (viết hoa, thiếu tiền tố)', () => {
    expect(only([makeMeta({ id: '2D-Test' as LevelId })])[0]).toMatch(
      /^\[2D-Test\] id:/,
    );
    expect(only([makeMeta({ id: 'xx-01' as LevelId })])[0]).toMatch(
      /^\[xx-01\] id:/,
    );
  });

  it('bắt kind không khớp tiền tố của id', () => {
    expect(only([makeMeta({ kind: '3d' })])).toContainEqual(
      expect.stringContaining('kind'),
    );
  });

  it('bắt thứ tự (ordinal) không liên tục từ 1', () => {
    const metas = makeMetas(2);
    metas[1] = { ...metas[1], ordinal: 5 };
    expect(only(metas)).toContainEqual(expect.stringContaining('ordinal'));
  });

  it('bắt độ khó ngoài 1–5', () => {
    expect(
      only([makeMeta({ difficulty: 0 as LevelMeta['difficulty'] })]),
    ).toContainEqual(expect.stringContaining('difficulty'));
    expect(
      only([makeMeta({ difficulty: 6 as LevelMeta['difficulty'] })]),
    ).toContainEqual(expect.stringContaining('difficulty'));
  });

  it('đề bài đúng 120 ký tự thì được, 121 thì lỗi', () => {
    expect(only([makeMeta({ prompt: 'a'.repeat(120) })])).toEqual([]);
    expect(only([makeMeta({ prompt: 'a'.repeat(121) })])).toContainEqual(
      expect.stringContaining('prompt'),
    );
  });

  it('đếm ký tự có dấu theo cách người đọc thấy (NFD không bị tính thừa)', () => {
    const nfd = 'ế'.normalize('NFD'); // 2 điểm mã, nhưng là 1 ký tự
    expect(only([makeMeta({ prompt: nfd.repeat(120) })])).toEqual([]);
  });

  it('bắt tiêu đề, đề bài, giải thích để trống', () => {
    const problems = only([
      makeMeta({ title: ' ', prompt: '', explanation: '' }),
    ]);
    expect(problems).toEqual(
      expect.arrayContaining([
        expect.stringContaining('title'),
        expect.stringContaining('prompt'),
        expect.stringContaining('explanation'),
      ]),
    );
  });

  it('giải thích quá 140 ký tự', () => {
    expect(only([makeMeta({ explanation: 'a'.repeat(141) })])).toContainEqual(
      expect.stringContaining('explanation'),
    );
  });

  it('bắt số gợi ý khác 3, gợi ý trống và gợi ý quá dài', () => {
    const two = makeMeta({
      hints: ['a', 'b'] as unknown as LevelMeta['hints'],
    });
    expect(only([two])).toContainEqual(
      expect.stringContaining('hints: phải có đúng 3'),
    );
    expect(only([makeMeta({ hints: ['a', '', 'c'] })])).toContainEqual(
      expect.stringContaining('hints[1]'),
    );
    expect(
      only([makeMeta({ hints: ['a', 'b', 'c'.repeat(121)] })]),
    ).toContainEqual(expect.stringContaining('hints[2]'));
  });

  it('phản hồi sai quá 60 ký tự', () => {
    expect(only([makeMeta({ wrong: { a: 'x'.repeat(61) } })])).toContainEqual(
      expect.stringContaining('wrong["a"]'),
    );
  });

  it('màn lắc bắt buộc có cách thay bằng chạm', () => {
    expect(only([makeMeta({ input: 'shake' })])).toContainEqual(
      expect.stringContaining('touchFallback'),
    );
    expect(
      only([
        makeMeta({
          input: 'shake',
          sensors: { shake: { touchFallback: 'Chạm liên tục vào thân cây.' } },
        }),
      ]),
    ).toEqual([]);
  });
});
