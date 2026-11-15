// Kho lưu trữ an toàn: mọi lần đọc, ghi, xóa đều bọc try/catch và không bao giờ ném lỗi ra ngoài.
// Khi localStorage không dùng được (chế độ riêng tư, bị chặn, hết dung lượng) thì tự rơi về bộ nhớ của trang:
// game vẫn chạy bình thường, chỉ là tiến trình mất khi đóng tab (docs/GDD.md mục 6, docs/TECH.md mục 6).

export type StorageMode = 'local' | 'memory';

export interface SafeStorage {
  getItem(key: string): string | null;
  /** Trả về `false` nếu không ghi được vào ổ lưu trữ thật (giá trị vẫn được giữ trong bộ nhớ). */
  setItem(key: string, value: string): boolean;
  removeItem(key: string): void;
  getMode(): StorageMode;
  /** Đăng ký nghe khi chế độ đổi từ `local` sang `memory`. Trả về hàm hủy đăng ký. */
  subscribe(listener: () => void): () => void;
}

/**
 * @param getBackend Trả về `Storage` thật. Gọi lười (mỗi lần dùng) vì chỉ việc truy cập `window.localStorage`
 * cũng có thể ném lỗi ở một số trình duyệt, và vì trên máy chủ không có `window`.
 */
export function createSafeStorage(
  getBackend: () => Storage | null | undefined,
): SafeStorage {
  // Bản sao trong bộ nhớ của mọi giá trị đã ghi: nguồn đọc duy nhất sau khi ổ thật hỏng.
  const memory = new Map<string, string>();
  const listeners = new Set<() => void>();
  let mode: StorageMode = 'local';

  const degrade = (): void => {
    if (mode === 'memory') return;
    mode = 'memory';
    listeners.forEach((listener) => {
      try {
        listener();
      } catch {
        // Người nghe lỗi không được làm hỏng việc lưu.
      }
    });
  };

  const backend = (): Storage | null => {
    try {
      return getBackend() ?? null;
    } catch {
      return null;
    }
  };

  return {
    getItem(key) {
      if (mode === 'local') {
        try {
          const store = backend();
          if (store) return store.getItem(key);
        } catch {
          // rơi xuống chế độ bộ nhớ bên dưới
        }
        degrade();
      }
      return memory.get(key) ?? null;
    },

    setItem(key, value) {
      memory.set(key, value);
      if (mode === 'local') {
        try {
          const store = backend();
          if (store) {
            store.setItem(key, value);
            return true;
          }
        } catch {
          // đầy dung lượng hoặc bị chặn: rơi xuống chế độ bộ nhớ bên dưới
        }
        degrade();
      }
      return false;
    },

    removeItem(key) {
      memory.delete(key);
      if (mode === 'local') {
        try {
          backend()?.removeItem(key);
        } catch {
          degrade();
        }
      }
    },

    getMode: () => mode,

    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

/** Kho dùng chung của ứng dụng, bọc `window.localStorage` (chỉ chạm tới khi thật sự đọc/ghi, tức là trên trình duyệt). */
export const safeStorage: SafeStorage = createSafeStorage(
  () => window.localStorage,
);
