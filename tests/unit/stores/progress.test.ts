import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { RunOutcome } from '@/domain/progress/types';

const KEY = 'latleo:v1';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

// Mỗi test nạp lại module để có store và kho lưu trữ mới (cả hai là đối tượng dùng chung của module).
async function freshModules() {
  vi.resetModules();
  const progress = await import('@/stores/progress');
  const storage = await import('@/services/storage/safe-storage');
  return { ...progress, safeStorage: storage.safeStorage };
}

const outcome = (overrides: Partial<RunOutcome> = {}): RunOutcome => ({
  status: 'solved',
  durationMs: 12_000,
  hintsUsed: 0,
  at: '2026-11-14T08:00:00.000Z',
  ...overrides,
});

const stored = (): Record<string, unknown> =>
  JSON.parse(localStorage.getItem(KEY) ?? 'null');

describe('useProgress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('chưa nạp thì chưa có mã ẩn danh và hydrated = false', async () => {
    const { useProgress } = await freshModules();
    expect(useProgress.getState().hydrated).toBe(false);
    expect(useProgress.getState().installId).toBe('');
  });

  it('người chơi mới: nạp xong có mã ẩn danh UUID và được ghi xuống ngay', async () => {
    const { useProgress, ensureProgressHydrated } = await freshModules();
    ensureProgressHydrated();

    const { hydrated, installId } = useProgress.getState();
    expect(hydrated).toBe(true);
    expect(installId).toMatch(UUID);
    expect(stored()).toMatchObject({ version: 1, state: { installId } });
  });

  it('mở lại trang: giữ nguyên mã ẩn danh và tiến trình đã lưu', async () => {
    const first = await freshModules();
    first.ensureProgressHydrated();
    const installId = first.useProgress.getState().installId;
    first.useProgress.getState().recordResult('2d-01', outcome());

    const second = await freshModules();
    second.ensureProgressHydrated();
    expect(second.useProgress.getState().installId).toBe(installId);
    expect(second.useProgress.getState().levels['2d-01']).toMatchObject({
      status: 'solved',
      bestMs: 12_000,
    });
  });

  it('gọi ensureProgressHydrated nhiều lần không nạp lại', async () => {
    const { useProgress, ensureProgressHydrated } = await freshModules();
    const getItem = vi.spyOn(Storage.prototype, 'getItem');
    ensureProgressHydrated();
    expect(getItem).toHaveBeenCalled();
    expect(useProgress.persist.hasHydrated()).toBe(true);

    getItem.mockClear();
    ensureProgressHydrated();
    expect(getItem).not.toHaveBeenCalled();
  });

  it('recordAttempt đếm lượt chơi tăng dần theo từng màn và lưu lại', async () => {
    const { useProgress, ensureProgressHydrated } = await freshModules();
    ensureProgressHydrated();
    const { recordAttempt } = useProgress.getState();
    expect([
      recordAttempt('2d-01'),
      recordAttempt('2d-01'),
      recordAttempt('2d-02'),
    ]).toEqual([1, 2, 1]);
    expect(stored()).toMatchObject({
      state: { attempts: { '2d-01': 2, '2d-02': 1 } },
    });
  });

  it('recordResult giữ kết quả tốt nhất và lưu lại', async () => {
    const { useProgress, ensureProgressHydrated } = await freshModules();
    ensureProgressHydrated();
    const { recordResult } = useProgress.getState();
    recordResult('2d-01', outcome({ durationMs: 30_000, hintsUsed: 1 }));
    recordResult('2d-01', outcome({ durationMs: 20_000, hintsUsed: 0 }));
    recordResult(
      '2d-01',
      outcome({ status: 'revealed', durationMs: 5_000, hintsUsed: 3 }),
    );
    expect(useProgress.getState().levels['2d-01']).toMatchObject({
      status: 'solved',
      bestMs: 20_000,
      bestHints: 0,
    });
    expect(stored()).toMatchObject({
      state: { levels: { '2d-01': { status: 'solved', bestMs: 20_000 } } },
    });
  });

  it('chỉ lưu dữ liệu, không lưu cờ hydrated hay hàm', async () => {
    const { useProgress, ensureProgressHydrated } = await freshModules();
    ensureProgressHydrated();
    useProgress.getState().recordAttempt('2d-01');
    const state = stored().state as Record<string, unknown>;
    expect(Object.keys(state).sort()).toEqual([
      'attempts',
      'daily',
      'installId',
      'levels',
      'version',
    ]);
  });

  it.each([
    ['JSON hỏng', '{"state": {'],
    ['không phải JSON', 'xin chào'],
    ['null', 'null'],
    ['dữ liệu sai kiểu hoàn toàn', '{"state":"hỏng","version":1}'],
    [
      'phiên bản lạ',
      '{"state":{"levels":{"2d-01":{"status":"solved","bestMs":1,"bestHints":0,"lastSolvedAt":"2026-11-14T00:00:00Z"}}},"version":99}',
    ],
  ])(
    '%s: nạp được, bắt đầu lại phần hỏng, không ném lỗi',
    async (_label, raw) => {
      localStorage.setItem(KEY, raw);
      const { useProgress, ensureProgressHydrated } = await freshModules();
      expect(() => ensureProgressHydrated()).not.toThrow();
      const state = useProgress.getState();
      expect(state.hydrated).toBe(true);
      expect(state.levels).toEqual({});
      expect(state.installId).toMatch(UUID);
    },
  );

  it('dữ liệu hỏng từng phần: giữ phần tốt, bỏ phần xấu', async () => {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        version: 1,
        state: {
          installId: 'abcd1234-ef56',
          levels: {
            '2d-01': {
              status: 'solved',
              bestMs: 9000,
              bestHints: 0,
              lastSolvedAt: '2026-11-14T00:00:00.000Z',
            },
            '2d-02': {
              status: 'solved',
              bestMs: 'nhanh',
              bestHints: 0,
              lastSolvedAt: '2026-11-14T00:00:00.000Z',
            },
          },
          attempts: 'hỏng',
        },
      }),
    );
    const { useProgress, ensureProgressHydrated } = await freshModules();
    ensureProgressHydrated();
    const state = useProgress.getState();
    expect(Object.keys(state.levels)).toEqual(['2d-01']);
    expect(state.attempts).toEqual({});
    expect(state.installId).toBe('abcd1234-ef56');
  });

  it('không ghi được (đầy dung lượng): game vẫn chạy, tiến trình giữ trong phiên, báo chế độ memory', async () => {
    const { useProgress, ensureProgressHydrated, safeStorage } =
      await freshModules();
    ensureProgressHydrated();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('đầy dung lượng', 'QuotaExceededError');
    });

    expect(() =>
      useProgress.getState().recordResult('2d-01', outcome()),
    ).not.toThrow();
    expect(useProgress.getState().levels['2d-01']).toMatchObject({
      status: 'solved',
    });
    expect(useProgress.getState().recordAttempt('2d-01')).toBe(1);
    expect(safeStorage.getMode()).toBe('memory');
  });

  it('không đọc được (localStorage bị chặn): nạp vẫn xong, game bắt đầu từ trống', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('bị chặn', 'SecurityError');
    });
    const { useProgress, ensureProgressHydrated, safeStorage } =
      await freshModules();
    expect(() => ensureProgressHydrated()).not.toThrow();
    expect(useProgress.getState().hydrated).toBe(true);
    expect(useProgress.getState().installId).toMatch(UUID);
    expect(safeStorage.getMode()).toBe('memory');
  });
});
