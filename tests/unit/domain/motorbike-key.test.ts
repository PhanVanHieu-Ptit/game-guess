import { describe, expect, it } from 'vitest';
import {
  canSeeSlipperSole,
  searchForKey,
} from '@/domain/puzzles/motorbike-key';
import { positionFromOrbit, type CameraView } from '@/domain/view/view-check';

describe('tìm chìa khóa xe máy', () => {
  it('không nhặt được chìa khi chưa lật dép, kể cả đang ở góc nhìn thuận lợi', () => {
    expect(searchForKey('searching', 'key', true)).toEqual({
      state: 'searching',
    });
    expect(searchForKey('searching', 'key', false)).toEqual({
      state: 'searching',
    });
  });
  it.each(['cushion', 'basket', 'table'] as const)(
    '%s có phản hồi riêng và không làm mất tiến triển',
    (object) => {
      expect(searchForKey('searching', object, true)).toEqual({
        state: 'searching',
        wrong: object,
      });
      expect(searchForKey('flipped', object, true)).toEqual({
        state: 'flipped',
        wrong: object,
      });
    },
  );
  it('lật dép chỉ mở bước tìm; phải chạm chìa khi nhìn thấy mới thắng', () => {
    expect(searchForKey('searching', 'slippers', false)).toEqual({
      state: 'flipped',
    });
    expect(searchForKey('flipped', 'slippers', true)).toEqual({
      state: 'flipped',
    });
    expect(searchForKey('flipped', 'key', false)).toEqual({ state: 'flipped' });
    expect(searchForKey('flipped', 'key', true)).toEqual({ state: 'solved' });
  });
  it('sau thắng không phát lại lỗi hoặc quay về bước cũ', () => {
    for (const object of ['key', 'slippers', 'table'] as const)
      expect(searchForKey('solved', object, true)).toEqual({ state: 'solved' });
  });
  it('đế mở có thể nhìn từ một vùng rộng phía trước, camera hỏng không hợp lệ', () => {
    const target = [0, 0.5, 0.15] as const;
    const view = (azimuthDeg: number, polarDeg: number): CameraView => ({
      target,
      position: positionFromOrbit(target, 10, { azimuthDeg, polarDeg }),
    });
    expect(canSeeSlipperSole(view(-65, 40))).toBe(true);
    expect(canSeeSlipperSole(view(65, 75))).toBe(true);
    expect(canSeeSlipperSole(view(140, 65))).toBe(false);
    expect(canSeeSlipperSole(view(0, 100))).toBe(false);
    expect(canSeeSlipperSole({ target, position: target })).toBe(false);
    expect(canSeeSlipperSole({ target, position: [NaN, 2, 3] })).toBe(false);
  });
});
