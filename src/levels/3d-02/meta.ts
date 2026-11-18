import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '3d-02',
  // Vị trí #13 theo thiết kế, sau 2D-11.
  ordinal: 13,
  kind: '3d',
  title: 'Tìm chìa khóa xe máy',
  prompt: 'Sắp trễ giờ! Chìa khóa xe máy đâu rồi?',
  thinking: 'physics',
  input: 'rotate',
  difficulty: 3,
  hints: [
    'Chìa khóa không nằm ở chỗ bạn hay để.',
    'Nó đang dính vào thứ bạn mới mang vào.',
    'Chạm đôi dép ở cửa để lật lên: chìa khóa dính dưới đế.',
  ],
  explanation:
    'Chìa khóa đi theo bạn từ sáng: dính kẹo cao su dưới đế dép. Tìm khắp nhà, hóa ra nó chưa rời bạn.',
  wrong: {
    cushion: 'Gối chỉ giấu giấc ngủ, không giấu chìa khóa!',
    basket: 'Giỏ trống trơn. Chìa khóa chưa đi chợ đâu!',
    table: 'Bàn sạch quá! Hôm nay chìa khóa đổi chỗ rồi.',
  },
  source: 'original',
} as const satisfies LevelMeta;
