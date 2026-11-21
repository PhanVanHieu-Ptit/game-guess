import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-25',
  ordinal: 28,
  kind: '2d',
  title: 'Ốc sên về nhà',
  prompt: 'Trời sắp mưa rồi. Giúp ốc sên về nhà.',
  thinking: 'wordplay',
  input: 'tap',
  difficulty: 2,
  hints: [
    'Có bạn chẳng bao giờ phải đi xa để về nhà.',
    'Ốc sên đang mang theo chỗ trú của mình.',
    'Chạm vào chiếc vỏ trên lưng ốc sên.',
  ],
  explanation: 'Nhà ở ngay trên lưng! Ốc sên về nhà nhanh mà chẳng cần chạy.',
  wrong: {
    house: 'Chỗ này chưa có hộ khẩu của ốc!',
    bush: 'Bụi cây chưa nhận khách đeo ba lô!',
    body: 'Ốc vẫn đang ở ngoài cửa nhà mình!',
  },
  source: 'original',
} as const satisfies LevelMeta;
