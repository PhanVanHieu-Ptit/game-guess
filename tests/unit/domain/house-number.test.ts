import { describe, expect, it } from 'vitest';
import {
  canReadTankNumber,
  checkHouseNumber,
} from '@/domain/puzzles/house-number';
import { positionFromOrbit, type CameraView } from '@/domain/view/view-check';

describe('3D-01: điều kiện thắng và phản hồi', () => {
  it.each(['36', ' 36 '])('nhận số đúng %j', (value) => {
    expect(checkHouseNumber(value)).toBe('correct');
  });
  it.each(['', '   '])('bỏ trống %j chưa thắng và không tính sai', (value) => {
    expect(checkHouseNumber(value)).toBe('empty');
  });
  it.each(['3', '6', '35', '37', '0', '036', 'ba sáu', 'NaN'])(
    'số sai %j chưa thắng',
    (value) => {
      expect(checkHouseNumber(value)).toBe('wrong');
    },
  );
  it('đọc ngược có phản hồi riêng; thử sai rồi đúng không khóa màn', () => {
    expect(checkHouseNumber('63')).toBe('reversed');
    expect(checkHouseNumber('36')).toBe('correct');
  });
});

describe('vùng quan sát bồn nước', () => {
  const view = (azimuthDeg: number, polarDeg: number): CameraView => ({
    position: positionFromOrbit([0, 2.7, 0], 12, { azimuthDeg, polarDeg }),
    target: [0, 2.7, 0],
  });
  it('góc ban đầu và hai bên nhà chưa phải vùng đọc số', () => {
    expect(
      canReadTankNumber({ position: [6.7, 6.4, 9], target: [0, 2.7, 0] }),
    ).toBe(false);
    expect(canReadTankNumber(view(90, 65))).toBe(false);
    expect(canReadTankNumber(view(-90, 65))).toBe(false);
  });
  it('nhận vùng rộng phía sau, cả hai phía của mốc ±180°', () => {
    for (const azimuth of [140, 160, 180, -180, -160, -140])
      expect(canReadTankNumber(view(azimuth, 65))).toBe(true);
    expect(canReadTankNumber(view(139, 65))).toBe(false);
  });
  it('bỏ góc quá cao, quá thấp và dữ liệu camera không hợp lệ', () => {
    expect(canReadTankNumber(view(180, 46))).toBe(false);
    expect(canReadTankNumber(view(180, 84))).toBe(false);
    expect(canReadTankNumber({ position: [0, 0, 0], target: [0, 0, 0] })).toBe(
      false,
    );
    expect(
      canReadTankNumber({ position: [NaN, 1, 0], target: [0, 0, 0] }),
    ).toBe(false);
  });
});
