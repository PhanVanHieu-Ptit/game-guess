import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-30',
  ordinal: 33,
  kind: '2d',
  title: 'Thắp gì trước?',
  prompt:
    'Có một que diêm chưa châm, một cây nến và một đèn dầu đều chưa cháy. Chạm thứ phải châm trước.',
  thinking: 'read',
  input: 'tap',
  difficulty: 2,
  hints: [
    'Muốn có lửa thì phải bắt đầu từ đâu?',
    'Nến và đèn dầu chưa tự cháy được.',
    'Chạm vào que diêm chưa châm.',
  ],
  explanation:
    'Phải châm que diêm trước rồi mới thắp nến hay đèn dầu. Nguồn sáng cũng cần người mở màn!',
  wrong: {
    candle: 'Nến đang chờ ai đó mồi lửa!',
    lamp: 'Có dầu rồi, còn thiếu lửa thôi!',
  },
  source: 'classic',
} as const satisfies LevelMeta;
