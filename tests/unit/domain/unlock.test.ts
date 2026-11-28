import { describe, expect, it } from 'vitest';
import type { LevelResult } from '@/domain/progress/types';
import {
  countCompleted,
  isUnlocked,
  levelAfter,
  nextPlayable,
} from '@/domain/progress/unlock';
import { makeMetas } from '../../fixtures/levels';

const metas = makeMetas(3);
const [m1, m2, m3] = metas;
const done = (status: LevelResult['status']): LevelResult => ({
  status,
  bestMs: 1000,
  bestHints: status === 'revealed' ? 3 : 0,
  lastSolvedAt: '2026-11-14T00:00:00.000Z',
});

describe('isUnlocked (mở tuần tự)', () => {
  it('người chơi mới: chỉ màn đầu mở', () => {
    expect(isUnlocked(metas, m1.id, {}, false)).toBe(true);
    expect(isUnlocked(metas, m2.id, {}, false)).toBe(false);
    expect(isUnlocked(metas, m3.id, {}, false)).toBe(false);
  });

  it('có kết quả màn n thì mở màn n+1, chưa mở màn n+2', () => {
    const results = { [m1.id]: done('solved') };
    expect(isUnlocked(metas, m2.id, results, false)).toBe(true);
    expect(isUnlocked(metas, m3.id, results, false)).toBe(false);
  });

  it('xem đáp án (revealed) vẫn mở màn kế', () => {
    expect(isUnlocked(metas, m2.id, { [m1.id]: done('revealed') }, false)).toBe(
      true,
    );
  });

  it('unlockAll mở hết', () => {
    expect(isUnlocked(metas, m3.id, {}, true)).toBe(true);
  });

  it('màn đã có kết quả vẫn chơi lại được sau khi sắp xếp lại chiến dịch', () => {
    expect(isUnlocked(metas, m3.id, { [m3.id]: done('solved') }, false)).toBe(
      true,
    );
    expect(isUnlocked(metas, m3.id, { [m3.id]: done('revealed') }, false)).toBe(
      true,
    );
  });

  it('mã màn không có trong danh sách thì không mở, kể cả khi unlockAll', () => {
    expect(isUnlocked(metas, '2d-khong-co', {}, true)).toBe(false);
  });
});

describe('nextPlayable (đích của "Chơi tiếp")', () => {
  it('chưa chơi gì: màn đầu', () => {
    expect(nextPlayable(metas, {}, false)?.id).toBe(m1.id);
  });

  it('bỏ qua các màn đã có kết quả', () => {
    const results = { [m1.id]: done('solved'), [m2.id]: done('revealed') };
    expect(nextPlayable(metas, results, false)?.id).toBe(m3.id);
  });

  it('xong hết thì null', () => {
    const results = {
      [m1.id]: done('solved'),
      [m2.id]: done('solved'),
      [m3.id]: done('solved'),
    };
    expect(nextPlayable(metas, results, false)).toBeNull();
  });

  it('danh sách rỗng thì null', () => {
    expect(nextPlayable([], {}, false)).toBeNull();
  });
});

describe('levelAfter', () => {
  it('trả về màn đứng ngay sau', () => {
    expect(levelAfter(metas, m1.id)?.id).toBe(m2.id);
  });

  it('màn cuối hoặc mã lạ thì null', () => {
    expect(levelAfter(metas, m3.id)).toBeNull();
    expect(levelAfter(metas, '2d-khong-co')).toBeNull();
  });
});

describe('countCompleted', () => {
  it('đếm số màn đã có kết quả', () => {
    expect(countCompleted(metas, {})).toBe(0);
    expect(
      countCompleted(metas, {
        [m1.id]: done('solved'),
        [m3.id]: done('revealed'),
      }),
    ).toBe(2);
  });
});
