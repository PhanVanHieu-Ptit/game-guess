import { describe, expect, it } from 'vitest';
import { validateLevelMetas } from '@/domain/levels/validate';
import { findLevel, LEVEL_METAS } from '@/levels';
import { loadScene } from '@/levels/load-scene';

// Sổ đăng ký màn THẬT (src/levels/index.ts), không phải dữ liệu giả: thêm một màn sai cấu trúc, hoặc đăng ký
// siêu dữ liệu mà quên cảnh, phải làm test này thất bại (docs/TECH.md mục 5.5 và 5.6).

describe('sổ đăng ký màn (LEVEL_METAS)', () => {
  it('có ít nhất một màn và mọi màn đều hợp lệ theo validateLevelMetas', () => {
    expect(LEVEL_METAS.length).toBeGreaterThan(0);
    expect(validateLevelMetas(LEVEL_METAS)).toEqual([]);
  });

  it('mọi màn đã đăng ký đều nạp được cảnh, và cảnh là một component mặc định', async () => {
    for (const meta of LEVEL_METAS) {
      const loaded = await loadScene(meta.id);
      expect(typeof loaded.default, `cảnh của ${meta.id}`).toBe('function');
    }
  });

  it('findLevel trả đúng màn theo mã và undefined khi mã lạ', () => {
    for (const meta of LEVEL_METAS) expect(findLevel(meta.id)).toBe(meta);
    expect(findLevel('2d-khong-co')).toBeUndefined();
    expect(findLevel('')).toBeUndefined();
  });

  it('nạp cảnh của mã chưa đăng ký thì từ chối (để khung chơi hiện lỗi Thử lại, không treo)', async () => {
    await expect(loadScene('2d-khong-co')).rejects.toThrow(/2d-khong-co/);
  });

  it('phản hồi sai riêng của mỗi màn: không có khóa rỗng và không có câu phản hồi rỗng', () => {
    for (const meta of LEVEL_METAS) {
      for (const [code, text] of Object.entries(meta.wrong ?? {})) {
        expect(code, `${meta.id}: khóa phản hồi`).not.toBe('');
        expect(text.trim(), `${meta.id}.wrong[${code}]`).not.toBe('');
      }
    }
  });
});
