import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-04',
  ordinal: 4,
  kind: '2d',
  title: 'Hái xoài đãi cả nhà',
  prompt: 'Hứng xoài vào giỏ đãi cả nhà. Đừng để chạm đất!',
  thinking: 'physics',
  input: 'shake',
  difficulty: 1,
  hints: [
    'Xoài trên cao, giỏ còn ở xa. Chuẩn bị trước khi hái nhé.',
    'Dời giỏ tới chỗ trống dưới quả xoài, rồi làm cây rung.',
    'Kéo giỏ sang phải dưới xoài. Lắc điện thoại hoặc chạm thân cây 3 lần nhanh.',
  ],
  explanation:
    'Đặt giỏ trước, rung cây sau: xoài xuống là hứng gọn. Ngoại giao luôn chức trưởng ban tráng miệng!',
  wrong: {
    mango: 'Bé nhảy hết cỡ rồi. Xoài vẫn cao hơn một cái đầu!',
    basket: 'Giỏ chỉ biết hứng, chưa biết trèo cây đâu!',
    child: 'Tay bé chưa dài bằng cây. Thử nhờ cái cây xem!',
    no_basket: 'Khoan rung! Giỏ còn xa, xoài rụng ai hứng?',
    miss: 'Dời giỏ tới chỗ trống ngay dưới quả xoài nhé!',
  },
  sensors: {
    shake: {
      touchFallback: 'Chạm thân cây hoặc nút Lắc ít nhất 3 lần trong 2 giây.',
    },
  },
  source: 'original',
} as const satisfies LevelMeta;
