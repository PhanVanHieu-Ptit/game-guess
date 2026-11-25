import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-02',
  ordinal: 2,
  kind: '2d',
  title: 'Con gì càng to càng nhỏ?',
  prompt: 'Con gì càng to càng nhỏ? Chạm vào bạn đó dưới ao.',
  thinking: 'wordplay',
  input: 'tap',
  difficulty: 1,
  hints: [
    'Chữ “càng” có hai nghĩa. Nhìn kỹ các bạn dưới ao nhé.',
    'Có bạn mang hai chiếc kìm không cùng cỡ.',
    'Chạm con cua ở bên phải, hoặc mở ô nhập rồi gõ “cua”.',
  ],
  explanation:
    'Không phải "to hơn thì nhỏ đi", mà là cái càng: cua có càng to, càng nhỏ. Bạn vừa bị cua kẹp rồi đó.',
  wrong: {
    shrimp: 'Tôm bận búng đi rồi. Thử bạn hay đi ngang xem!',
    animal: 'Con này chưa kẹp được chữ "càng" đâu!',
    water: 'Nước chỉ biết làm ướt, chưa biết trả lời đâu!',
  },
  source: 'folk',
} as const satisfies LevelMeta;
