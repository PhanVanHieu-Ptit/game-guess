import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-11',
  ordinal: 12,
  kind: '2d',
  title: 'Của mình, người khác dùng',
  prompt:
    'Cái gì là của mình, nhưng người khác dùng nhiều hơn mình? Chạm vào nó.',
  thinking: 'wordplay',
  input: 'tap',
  difficulty: 2,
  hints: [
    'Nghĩ tới thứ mà ai cũng gọi bạn bằng nó.',
    'Bạn hiếm khi tự gọi, nhưng cả ngày có người gọi bạn.',
    'Đó là cái tên: chạm vào bảng tên trên áo.',
  ],
  explanation:
    'Tên là của bạn mà người khác dùng nhiều nhất, nhất là mẹ khi gọi cả họ lẫn tên.',
  wrong: {
    bike: 'Món này chỉ mình bạn dùng. Xe chưa biết gọi tên!',
    bag: 'Món này chỉ mình bạn dùng. Cặp chỉ gọi... sách vở!',
    hat: 'Món này chỉ mình bạn dùng. Nón đội đầu, không gọi!',
    child: 'Chạm cả bạn luôn à? Thử nhìn kỹ trên áo nhé!',
  },
  source: 'folk',
} as const satisfies LevelMeta;
