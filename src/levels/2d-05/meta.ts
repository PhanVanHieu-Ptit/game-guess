import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-05',
  ordinal: 5,
  kind: '2d',
  title: 'Gọi gà dậy ăn Tết',
  prompt: 'Trời sáng rồi mà gà vẫn ngủ. Giúp gà gọi cả nhà!',
  thinking: 'visual',
  input: 'drag',
  difficulty: 2,
  hints: [
    'Gà tưởng vẫn còn tối. Cái gì đang che nắng?',
    'Tia nắng ló sau mây. Thử dời đám mây sang chỗ khác.',
    'Kéo mây sang khoảng trời bên trái, rồi chạm gà trống để gọi cả nhà.',
  ],
  explanation:
    'Mây che mặt trời làm gà tưởng chưa sáng. Dời mây, gọi gà: cả nhà có báo thức chạy bằng nắng!',
  wrong: {
    sleep: 'Tối thui mà! Gà xin ngủ thêm năm phút.',
    roof: 'Mái nhà chỉ biết che mưa, không biết gáy!',
    miss: 'Mây sang khoảng trời bên trái thì nắng mới tới gà.',
  },
  source: 'original',
} as const satisfies LevelMeta;
