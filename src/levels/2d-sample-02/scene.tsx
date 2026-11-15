'use client';

import type { SceneProps } from '@/engine/scene';
import { ChooseScene, type ChooseOption } from '@/engine/stage2d/scenes/choose';
import { Art } from './art';

// Khóa của lựa chọn trùng khóa trong `meta.wrong` để mỗi lựa chọn sai có phản hồi riêng.
const OPTIONS: readonly ChooseOption[] = [
  { id: 'feb', label: 'Chỉ tháng 2' },
  { id: 'six', label: '6 tháng' },
  { id: 'eleven', label: '11 tháng' },
  { id: 'all', label: 'Cả 12 tháng' },
];

export default function Scene({ session }: SceneProps) {
  return (
    <ChooseScene
      session={session}
      options={OPTIONS}
      correctId="all"
      art={<Art />}
      artLabel="Tờ lịch ghi số 28"
      groupLabel="Chọn số tháng có 28 ngày"
    />
  );
}
