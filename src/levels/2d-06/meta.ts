import type { LevelMeta } from '@/domain/levels/types';
import { word } from '@/domain/levels/prompt';

export const meta = {
  id: '2d-06',
  ordinal: 6,
  kind: '2d',
  title: 'Chạm vào con cá',
  prompt: [
    'Chạm vào con vật có vảy, sống dưới nước, trong ',
    word('các'),
    ' hình dưới đây.',
  ],
  thinking: 'wordplay',
  input: 'tap',
  difficulty: 2,
  hints: [
    'Nhìn kỹ tranh: ngoài nước ra còn gì không?',
    'Cá không nằm trong tranh. Hãy xem lại đề bài.',
    'Chạm vào chữ "các" ở dòng đề: chữ "cá" nằm trong đó.',
  ],
  explanation:
    'Tranh không có cá, nhưng đề bài thì có: cá ngồi sẵn trong chữ "các". Bạn vừa câu được cá bằng mắt.',
  wrong: {
    not_fish: 'Không phải cá. Chỗ này không có vây có vảy đâu!',
    fishing_rod: 'Cần câu để bắt cá, chứ đâu phải con cá!',
    lotus: 'Lá sen và hoa sen đẹp thật, nhưng không bơi được!',
    water: 'Nước ao trong veo nhưng nhìn hoài chẳng thấy cá đâu!',
  },
  source: 'original',
} as const satisfies LevelMeta;
