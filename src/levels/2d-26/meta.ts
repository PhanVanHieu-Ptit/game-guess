import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-26',
  ordinal: 14,
  kind: '2d',
  title: 'Cân cả chiếc rổ',
  prompt: 'Cân đang thăng bằng. Riêng số cam trong rổ nặng mấy ký?',
  thinking: 'read',
  input: 'type',
  difficulty: 2,
  hints: [
    'Trên đĩa cân đâu chỉ có cam.',
    'Chiếc rổ cũng góp một phần cân nặng.',
    'Lấy 3 ký trừ 1 ký của rổ: cam nặng 2 ký.',
  ],
  explanation:
    'Cam nặng 2 ký, chiếc rổ góp thêm 1 ký. Mang rổ đi chợ thì nhớ trừ bì!',
  wrong: {
    total: 'Bạn mua cam hay mua luôn cân nặng của rổ?',
    other: 'Cân đang chờ bạn trừ bì đó!',
    basket: 'Rổ cũng có cân nặng, đừng cho rổ đi ké!',
  },
  source: 'original',
} as const satisfies LevelMeta;
