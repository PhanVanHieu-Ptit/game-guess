import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-12',
  ordinal: 14,
  kind: '2d',
  title: 'Kẹt xe',
  prompt:
    'Kẹt xe giờ tan tầm, bấm còi mãi không ai nhúc nhích. Làm sao đi tiếp?',
  thinking: 'logic',
  input: 'wait',
  difficulty: 3,
  hints: [
    'Bấm còi có làm xe nhúc nhích không?',
    'Đôi khi cách nhanh nhất là đừng làm gì.',
    'Đừng chạm gì trong 6 giây, xe sẽ tự chạy.',
  ],
  explanation:
    'Bấm còi giữa kẹt xe cũng như hét vào quạt: ồn thêm mà gió vẫn thế. Kiên nhẫn là mẹo giỏi nhất.',
  wrong: {
    horn: 'Bíp bíp! Còi đi trước, xe vẫn ở nguyên!',
    car: 'Xe chưa mọc cánh đâu. Chạm cũng không bay được!',
    road: 'Đường đang bận, ngón tay cũng muốn chen vào à?',
  },
  source: 'original',
} as const satisfies LevelMeta;
