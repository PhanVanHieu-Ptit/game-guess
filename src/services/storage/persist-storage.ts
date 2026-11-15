import type { PersistStorage, StorageValue } from 'zustand/middleware';
import type { SafeStorage } from './safe-storage';

const isStorageValue = <S>(value: unknown): value is StorageValue<S> =>
  typeof value === 'object' && value !== null && 'state' in value;

/**
 * Bộ chuyển cho `persist` của Zustand: đọc/ghi JSON qua `SafeStorage`. JSON hỏng hay sai hình dạng thì
 * coi như chưa có dữ liệu (trả về null) chứ không ném lỗi; lỗi ghi bị nuốt (SafeStorage đã giữ bản trong bộ nhớ).
 */
export function createPersistStorage<S>(
  storage: SafeStorage,
): PersistStorage<S> {
  return {
    getItem(name) {
      const raw = storage.getItem(name);
      if (raw === null) return null;
      try {
        const parsed: unknown = JSON.parse(raw);
        return isStorageValue<S>(parsed) ? parsed : null;
      } catch {
        return null;
      }
    },
    setItem(name, value) {
      try {
        storage.setItem(name, JSON.stringify(value));
      } catch {
        // Không tuần tự hóa được: bỏ qua, game vẫn chạy.
      }
    },
    removeItem(name) {
      storage.removeItem(name);
    },
  };
}
