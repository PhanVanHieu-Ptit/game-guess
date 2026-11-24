import type { LevelMeta } from '@/domain/levels/types';
export const meta = {
  id: '2d-36',
  title: 'Màu nào mới đúng?',
  prompt: 'Chạm vào chữ được tô màu đỏ. Nhớ nhìn màu mực!',
  thinking: 'visual',
  input: 'tap',
  difficulty: 2,
  hints: [
    'Tên gọi và màu mực có thể không giống nhau.',
    'Đừng đọc tên màu; hãy nhìn màu của nét chữ.',
    'Chạm chữ XANH được tô màu đỏ.',
  ],
  explanation:
    'Chữ XANH được tô đỏ mới đúng yêu cầu. Miệng đọc một đằng, mắt phải nhìn một nẻo!',
  wrong: {
    red: 'Mắt nhìn màu, miệng cứ đọc chữ!',
    yellow: 'Màu tím đang đóng vai màu vàng rồi!',
    purple: 'Chữ tím nhưng mực vàng, đổi vai vui ghê!',
  },
  ordinal: 39,
  kind: '2d',
  source: 'classic',
} as const satisfies LevelMeta;
