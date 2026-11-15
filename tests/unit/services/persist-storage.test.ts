import { describe, expect, it } from 'vitest';
import { createSafeStorage } from '@/services/storage/safe-storage';
import { createPersistStorage } from '@/services/storage/persist-storage';

const memoryBackend = (initial: Record<string, string> = {}): Storage => {
  const data = new Map(Object.entries(initial));
  return {
    get length() {
      return data.size;
    },
    clear: () => data.clear(),
    key: (index) => Array.from(data.keys())[index] ?? null,
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, value),
    removeItem: (key) => void data.delete(key),
  };
};

/** SafeStorage bọc một kho ổn định (như localStorage thật: cùng một đối tượng ở mọi lần truy cập). */
const safeOver = (initial: Record<string, string> = {}) => {
  const backend = memoryBackend(initial);
  return createSafeStorage(() => backend);
};

describe('createPersistStorage', () => {
  it('ghi rồi đọc lại đúng giá trị', () => {
    const storage = createPersistStorage<{ n: number }>(safeOver());
    storage.setItem('k', { state: { n: 7 }, version: 1 });
    expect(storage.getItem('k')).toEqual({ state: { n: 7 }, version: 1 });
  });

  it('chưa có dữ liệu thì trả về null', () => {
    const storage = createPersistStorage<unknown>(safeOver());
    expect(storage.getItem('k')).toBeNull();
  });

  it.each([
    ['JSON hỏng', '{"state": {'],
    ['không phải JSON', 'xin chào'],
    ['số', '42'],
    ['null', 'null'],
    ['mảng', '[1,2]'],
    ['đối tượng thiếu state', '{"version":1}'],
  ])('%s: coi như chưa có dữ liệu, không ném lỗi', (_label, raw) => {
    const storage = createPersistStorage<unknown>(safeOver({ k: raw }));
    expect(() => storage.getItem('k')).not.toThrow();
    expect(storage.getItem('k')).toBeNull();
  });

  it('giá trị không tuần tự hóa được (vòng tham chiếu): không ném lỗi', () => {
    const storage = createPersistStorage<unknown>(safeOver());
    const loop: Record<string, unknown> = {};
    loop.self = loop;
    expect(() => storage.setItem('k', { state: loop })).not.toThrow();
  });

  it('removeItem xóa dữ liệu', () => {
    const storage = createPersistStorage<unknown>(safeOver());
    storage.setItem('k', { state: 1 });
    storage.removeItem('k');
    expect(storage.getItem('k')).toBeNull();
  });
});
