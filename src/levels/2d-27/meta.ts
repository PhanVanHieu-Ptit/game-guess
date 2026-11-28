import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-27',
  ordinal: 26,
  kind: '2d',
  title: 'Cắt một góc',
  prompt:
    'Tờ giấy hình vuông bị cắt mất một góc như hình. Phần còn lại có mấy góc?',
  thinking: 'visual',
  input: 'type',
  difficulty: 3,
  hints: [
    'Mất một góc chưa chắc số góc sẽ ít đi.',
    'Vết cắt tạo thêm góc ở hai đầu.',
    'Ba góc cũ cộng hai góc mới: có 5 góc.',
  ],
  explanation:
    'Cắt mất một góc nhưng sinh thêm hai góc mới. Tờ giấy còn lại có 5 góc!',
  wrong: {
    subtract: 'Bạn trừ góc cũ mà quên đón hai góc mới!',
    other: 'Đi một vòng mép giấy, góc nào cũng điểm danh!',
    scrap: 'Mảnh này đã rời đội hình, đừng đếm chung nhé!',
  },
  source: 'classic',
} as const satisfies LevelMeta;
