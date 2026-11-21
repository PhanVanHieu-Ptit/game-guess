import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-28',
  ordinal: 31,
  kind: '2d',
  title: 'Ngày mai của hôm qua',
  prompt: 'Hôm qua bà nói: “Ngày mai là thứ Sáu.” Hôm nay là thứ mấy?',
  thinking: 'read',
  input: 'choose',
  difficulty: 3,
  hints: [
    'Bà nói câu đó vào lúc nào?',
    'Ngày mai của hôm qua chính là hôm nay.',
    'Hôm nay là thứ Sáu. Chạm đáp án Thứ Sáu.',
  ],
  explanation:
    'Bà nói từ hôm qua, nên ngày mai của bà chính là hôm nay. Thứ Sáu tới rồi!',
  wrong: {
    thursday: 'Bạn lùi lịch thêm một ngày rồi!',
    saturday: 'Bạn lật dư một tờ lịch rồi!',
    sunday: 'Cuối tuần chưa tới nhanh vậy đâu!',
    calendar: 'Lịch chưa điền, nghe lại lời bà nhé!',
  },
  source: 'original',
} as const satisfies LevelMeta;
