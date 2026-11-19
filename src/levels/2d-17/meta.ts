import type { LevelMeta } from '@/domain/levels/types';
export const meta = {
  id: '2d-17',
  ordinal: 20,
  kind: '2d',
  title: 'Đồng hồ quán cà phê',
  prompt:
    'Đồng hồ quán treo đối diện tấm gương. Trong gương đang là 3:40. Giờ thật là mấy giờ?',
  thinking: 'visual',
  input: 'type',
  difficulty: 4,
  hints: [
    'Chữ số trên đồng hồ trong gương có gì lạ?',
    'Gương đảo trái thành phải: kim giờ và kim phút cũng đổi bên.',
    'Lấy 12:00 trừ 3:40, đáp án 8:20.',
  ],
  explanation:
    'Gương không nói dối, chỉ nói ngược, giống mấy lời hứa "năm phút nữa tới" của bạn bè.',
  wrong: {
    mirror: 'Đó là giờ trong gương. Đồng hồ cũng thích soi!',
    other: 'Kim đồng hồ còn đang soi gương, thử tính lại nhé!',
    clock: 'Chạm mãi đồng hồ vẫn chưa tới giờ uống cà phê!',
  },
  source: 'classic',
} as const satisfies LevelMeta;
