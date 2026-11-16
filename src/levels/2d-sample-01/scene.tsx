'use client';

import type { SceneProps } from '@/engine/scene';
import { ChooseScene, type ChooseOption } from '@/engine/stage2d/scenes/choose';
import { Art } from './art';

// Khóa của lựa chọn trùng khóa trong `meta.wrong` để mỗi lựa chọn sai có phản hồi riêng.
const OPTIONS: readonly ChooseOption[] = [
  { id: '0', label: '0 quả' },
  { id: '1', label: '1 quả' },
  { id: '2', label: '2 quả' },
  { id: '3', label: '3 quả' },
];

export default function Scene(props: SceneProps) {
  return (
    <ChooseScene
      {...props}
      options={OPTIONS}
      correctId="2"
      art={<Art />}
      artLabel="Ba quả táo đặt trên bàn"
      groupLabel="Chọn số quả táo bạn đang có"
    />
  );
}
