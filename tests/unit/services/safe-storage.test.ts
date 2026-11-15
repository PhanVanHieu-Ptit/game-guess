import { describe, expect, it, vi } from 'vitest';
import { createSafeStorage } from '@/services/storage/safe-storage';

/** Storage giả có thể bật/tắt lỗi theo từng thao tác. */
function makeBackend(
  options: { failGet?: boolean; failSet?: boolean; failRemove?: boolean } = {},
): Storage {
  const data = new Map<string, string>();
  return {
    get length() {
      return data.size;
    },
    clear: () => data.clear(),
    key: (index) => Array.from(data.keys())[index] ?? null,
    getItem(key) {
      if (options.failGet) throw new DOMException('bị chặn', 'SecurityError');
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      if (options.failSet)
        throw new DOMException('đầy dung lượng', 'QuotaExceededError');
      data.set(key, value);
    },
    removeItem(key) {
      if (options.failRemove)
        throw new DOMException('bị chặn', 'SecurityError');
      data.delete(key);
    },
  };
}

describe('createSafeStorage', () => {
  it('ổ thật hoạt động: đọc/ghi/xóa qua ổ thật, chế độ local', () => {
    const backend = makeBackend();
    const storage = createSafeStorage(() => backend);
    expect(storage.setItem('k', 'v')).toBe(true);
    expect(backend.getItem('k')).toBe('v');
    expect(storage.getItem('k')).toBe('v');
    storage.removeItem('k');
    expect(storage.getItem('k')).toBeNull();
    expect(storage.getMode()).toBe('local');
  });

  it('ghi lỗi (đầy dung lượng): không ném lỗi, giữ giá trị trong bộ nhớ, báo chế độ memory', () => {
    const storage = createSafeStorage(() => makeBackend({ failSet: true }));
    const listener = vi.fn();
    storage.subscribe(listener);

    expect(() => storage.setItem('k', 'v')).not.toThrow();
    expect(storage.setItem('k2', 'v2')).toBe(false);
    expect(storage.getItem('k')).toBe('v');
    expect(storage.getItem('k2')).toBe('v2');
    expect(storage.getMode()).toBe('memory');
    expect(listener).toHaveBeenCalledTimes(1); // chỉ báo một lần dù ghi lỗi nhiều lần
  });

  it('đọc lỗi (bị chặn): trả về null và rơi về bộ nhớ, không ném lỗi', () => {
    const storage = createSafeStorage(() => makeBackend({ failGet: true }));
    expect(() => storage.getItem('k')).not.toThrow();
    expect(storage.getItem('k')).toBeNull();
    expect(storage.getMode()).toBe('memory');
    storage.setItem('k', 'v');
    expect(storage.getItem('k')).toBe('v');
  });

  it('chính việc truy cập window.localStorage ném lỗi (một số trình duyệt chặn): vẫn chạy', () => {
    const storage = createSafeStorage(() => {
      throw new DOMException('bị chặn', 'SecurityError');
    });
    expect(() => storage.setItem('k', 'v')).not.toThrow();
    expect(storage.getItem('k')).toBe('v');
    expect(storage.getMode()).toBe('memory');
  });

  it('không có ổ lưu trữ (máy chủ, không có window): dùng bộ nhớ', () => {
    const storage = createSafeStorage(() => undefined);
    expect(storage.getItem('k')).toBeNull();
    storage.setItem('k', 'v');
    expect(storage.getItem('k')).toBe('v');
    expect(storage.getMode()).toBe('memory');
  });

  it('xóa lỗi: không ném lỗi và vẫn xóa khỏi bộ nhớ', () => {
    const storage = createSafeStorage(() => makeBackend({ failRemove: true }));
    storage.setItem('k', 'v');
    expect(() => storage.removeItem('k')).not.toThrow();
    expect(storage.getMode()).toBe('memory');
    expect(storage.getItem('k')).toBeNull();
  });

  it('người nghe ném lỗi không làm hỏng việc lưu; hủy đăng ký thì không được gọi nữa', () => {
    const storage = createSafeStorage(() => makeBackend({ failSet: true }));
    const broken = vi.fn(() => {
      throw new Error('người nghe lỗi');
    });
    const healthy = vi.fn();
    storage.subscribe(broken);
    const unsubscribe = storage.subscribe(healthy);
    unsubscribe();

    expect(() => storage.setItem('k', 'v')).not.toThrow();
    expect(broken).toHaveBeenCalledTimes(1);
    expect(healthy).not.toHaveBeenCalled();
  });
});
