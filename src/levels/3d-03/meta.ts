import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '3d-03',
  // Màn thứ 8 trong bản hiện có; vị trí #17 khi đủ các màn 2D xen kẽ.
  ordinal: 8,
  kind: '3d',
  title: 'Nồi bánh chưng có mấy cái?',
  prompt: 'Nồi bánh chưng ngày Tết. Trong nồi có mấy cái bánh?',
  thinking: 'read',
  input: 'rotate',
  difficulty: 3,
  hints: [
    'Đếm xong rồi? Chắc chưa nhìn hết mọi tầng.',
    'Nắp mở rồi, nhưng đáy nồi thì sao?',
    'Kéo để nghiêng nồi: cái thứ 5 nằm dưới cùng.',
  ],
  explanation:
    'Mẹ luôn xếp thêm một cái "để dành" dưới đáy nồi. Mẹo: đáp án đôi khi nằm ở tầng dưới.',
  wrong: {
    'top-layer': 'Nhìn kỹ lại tầng dưới',
    wrong: 'Đếm lại nhé, có bánh đang nằm dưới bánh khác!',
    closed: 'Nắp còn đóng mà! Thử chạm núm nắp xem.',
  },
  source: 'original',
} as const satisfies LevelMeta;
