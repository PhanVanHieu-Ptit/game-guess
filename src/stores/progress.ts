import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LevelId } from '@/domain/levels/types';
import { applyResult } from '@/domain/progress/apply-result';
import {
  emptyProgress,
  migrateProgress,
  PROGRESS_VERSION,
  sanitizeProgress,
} from '@/domain/progress/migrate';
import type { ProgressData, RunOutcome } from '@/domain/progress/types';
import { generateId } from '@/services/analytics/ids';
import { createPersistStorage } from '@/services/storage/persist-storage';
import { safeStorage } from '@/services/storage/safe-storage';

// Tiến trình lưu trên máy người chơi (docs/TECH.md mục 6). Không có tài khoản, không đồng bộ giữa thiết bị.

/** Khóa localStorage. Đổi hình dạng dữ liệu thì tăng PROGRESS_VERSION và viết bước nâng cấp, không đổi khóa. */
export const PROGRESS_STORAGE_KEY = 'latleo:v1';

export interface ProgressActions {
  /** Đếm một lượt chơi mới của màn, trả về số thứ tự lượt trên máy này (bắt đầu từ 1). */
  recordAttempt(levelId: LevelId): number;
  /** Ghi kết quả một lượt chơi xong; giữ kết quả tốt nhất. */
  recordResult(levelId: LevelId, outcome: RunOutcome): void;
}

export type ProgressStore = ProgressData &
  ProgressActions & {
    /** Đã nạp xong từ localStorage chưa. Giao diện phụ thuộc tiến trình chờ cờ này để không lệch HTML máy chủ. */
    hydrated: boolean;
  };

// Mã ẩn danh vừa được sinh trong lần nạp này (người chơi mới hoặc mã cũ hỏng) thì phải ghi xuống ngay,
// nếu không các sự kiện đầu tiên sẽ mang một mã khác với lần mở trang kế tiếp.
let generatedNewInstallId = false;
const newInstallId = (): string => {
  generatedNewInstallId = true;
  return generateId();
};

const pickData = (state: ProgressStore): ProgressData => ({
  version: PROGRESS_VERSION,
  installId: state.installId,
  levels: state.levels,
  attempts: state.attempts,
  daily: state.daily,
});

export const useProgress = create<ProgressStore>()(
  persist(
    (set, get) => ({
      // Trước khi nạp: dữ liệu trống và chưa có mã ẩn danh (sinh khi nạp, trong useEffect, không phải lúc render).
      ...emptyProgress(() => ''),
      hydrated: false,

      recordAttempt(levelId) {
        const attemptNo = (get().attempts[levelId] ?? 0) + 1;
        set((state) => ({
          attempts: { ...state.attempts, [levelId]: attemptNo },
        }));
        return attemptNo;
      },

      recordResult(levelId, outcome) {
        set((state) => ({
          levels: {
            ...state.levels,
            [levelId]: applyResult(state.levels[levelId], outcome),
          },
        }));
      },
    }),
    {
      name: PROGRESS_STORAGE_KEY,
      version: PROGRESS_VERSION,
      storage: createPersistStorage<ProgressData>(safeStorage),
      // Không nạp lúc import để HTML máy chủ và lần render đầu của máy khách giống nhau (docs/TECH.md mục 6);
      // gọi ensureProgressHydrated() trong useEffect.
      skipHydration: true,
      partialize: pickData,
      migrate: (persisted, fromVersion) =>
        migrateProgress(persisted, fromVersion, newInstallId),
      // Luôn làm sạch, kể cả khi cùng phiên bản (dữ liệu có thể bị sửa tay hay hỏng): không ném lỗi.
      merge: (persisted, current) => ({
        ...current,
        ...sanitizeProgress(persisted, newInstallId),
        hydrated: true,
      }),
      onRehydrateStorage: () => () => {
        if (!generatedNewInstallId) return;
        generatedNewInstallId = false;
        // setState bọc bởi persist nên sẽ ghi xuống ổ lưu trữ dù trạng thái không đổi.
        useProgress.setState((state) => state);
      },
    },
  ),
);

/** Nạp tiến trình từ localStorage nếu chưa nạp. Gọi trong useEffect của màn nào cần tiến trình; gọi nhiều lần vẫn an toàn. */
export function ensureProgressHydrated(): void {
  if (!useProgress.persist.hasHydrated()) void useProgress.persist.rehydrate();
}
