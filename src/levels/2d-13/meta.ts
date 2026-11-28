import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-13',
  ordinal: 20,
  kind: '2d',
  title: 'Cầu khỉ',
  prompt:
    'Bé phải qua cầu khỉ về nhà ngoại. Cầu lắc lư dữ lắm! Giúp bé qua sông.',
  thinking: 'physics',
  input: 'hold',
  difficulty: 3,
  hints: [
    'Bé đi một mình thì chao đảo. Có gì để bám không?',
    'Cây tre nhỏ chạy dọc cầu không chỉ để trang trí.',
    'Nhấn giữ cây tre tay vịn cho tới khi bé qua hết.',
  ],
  explanation:
    'Đi cầu khỉ thì phải bám tay vịn. Giữ chặt một điểm tựa là bé qua sông an toàn.',
  wrong: {
    release: 'Buông sớm quá! Bé mới tập làm... cá thôi!',
    child: 'Bé không có cánh. Chao một cái, tắm luôn!',
    water: 'Sông mát thật, nhưng ngoại đang chờ trên bờ!',
  },
  source: 'original',
} as const satisfies LevelMeta;
