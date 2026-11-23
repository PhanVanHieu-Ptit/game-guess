import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-34',
  ordinal: 37,
  kind: '2d',
  title: 'Chuyến đò của bác',
  prompt:
    'Giúp bác đưa sói, dê và bắp cải qua sông. Đừng để sói ở riêng với dê, hoặc dê ở riêng với bắp cải.',
  thinking: 'logic',
  input: 'tap',
  difficulty: 5,
  hints: [
    'Ai không thể ở lại cùng cả hai người bạn còn lại?',
    'Đưa dê sang trước. Có chuyến phải chở một bạn quay về.',
    'Chở lần lượt: dê sang, về một mình, sói sang, dê về, bắp cải sang, về một mình, dê sang.',
  ],
  explanation:
    'Đưa dê quay lại một chuyến giúp hai bờ luôn an toàn. Đi lùi một đoạn lại là cách đưa tất cả tiến lên!',
  wrong: {
    wolf: 'Sói đang nhìn dê như nhìn thực đơn!',
    cabbage: 'Dê tưởng bắp cải là suất ăn trên đò!',
    shore: 'Bạn này ở bờ bên kia, thuyền chưa tới đón!',
  },
  source: 'classic',
} as const satisfies LevelMeta;
