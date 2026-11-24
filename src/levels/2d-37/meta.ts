import type { LevelMeta } from '@/domain/levels/types';
export const meta = {
  id: '2d-37',
  title: 'Bánh và túi',
  prompt:
    'Bánh và túi giá tổng cộng 11 nghìn đồng. Bánh đắt hơn túi 10 nghìn đồng. Túi giá bao nhiêu đồng?',
  thinking: 'read',
  input: 'type',
  difficulty: 3,
  hints: [
    'Tổng tiền và chênh lệch là hai điều kiện khác nhau.',
    'Bớt phần chênh 10 nghìn, số tiền còn lại là hai lần giá túi.',
    'Túi giá 500 đồng, bánh giá 10.500 đồng. Nhập 500.',
  ],
  explanation:
    'Túi 500 đồng, bánh 10.500 đồng: tổng 11.000, chênh 10.000. Chiếc túi nhỏ mà đánh lừa phép tính to!',
  wrong: {
    thousand: 'Thử cộng lại nhé, hóa đơn đang dư tiền rồi!',
    other: 'Quầy bánh cần khớp cả tổng lẫn chênh lệch!',
    cake: 'Bánh ngon nhưng chưa biết tính tiền đâu!',
  },
  ordinal: 40,
  kind: '2d',
  source: 'classic',
} as const satisfies LevelMeta;
