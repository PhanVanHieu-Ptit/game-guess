import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-05',
  ordinal: 5,
  kind: '2d',
  title: 'Gà trống đẻ trứng',
  prompt:
    'Gà trống đẻ một quả trứng ngay trên đỉnh mái nhà. Trứng sẽ lăn về phía nào?',
  thinking: 'read',
  input: 'choose',
  difficulty: 1,
  hints: [
    'Đọc lại xem ai đang đẻ.',
    'Gà trống và gà mái khác nhau ở chỗ nào?',
    'Gà trống không đẻ trứng: chọn đáp án đó.',
  ],
  explanation:
    'Gà trống thì gáy, gà mái mới đẻ. Bạn đang tính hướng trứng lăn trong khi trứng còn chưa có.',
  wrong: {
    left: 'Mái trái chờ mãi mà chưa thấy quả trứng nào!',
    right: 'Mái phải cũng chờ. Anh gà chỉ gáy thôi mà!',
    down: 'Chưa có trứng thì trọng lực cũng chịu thua!',
  },
  source: 'folk',
} as const satisfies LevelMeta;
