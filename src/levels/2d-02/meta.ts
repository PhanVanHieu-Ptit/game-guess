import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-02',
  ordinal: 2,
  kind: '2d',
  title: 'Con gì càng to càng nhỏ?',
  prompt: 'Con gì càng to càng nhỏ? Gõ đáp án.',
  thinking: 'wordplay',
  input: 'type',
  difficulty: 1,
  hints: [
    'Chữ "càng" có hai nghĩa; bạn mới nghĩ tới một.',
    '"Càng" còn là bộ phận của một con vật sống ở nước, đi ngang.',
    'Đáp án: con cua.',
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
