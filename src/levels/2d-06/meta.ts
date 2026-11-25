import type { LevelMeta } from '@/domain/levels/types';
import { word } from '@/domain/levels/prompt';

export const meta = {
  id: '2d-06',
  ordinal: 6,
  kind: '2d',
  title: 'Cá trốn trong lời nhắn',
  prompt: ['Ngoại nhắn: “Bắt ', word('cá'), ' vào giỏ nhé!” Ao trống trơn…'],
  thinking: 'wordplay',
  input: 'drag',
  difficulty: 2,
  hints: [
    'Đồ vật kéo được, nhưng liệu chỉ bức tranh mới có cá?',
    'Đọc lại lời nhắn của ngoại. Thử chạm thứ đang cần tìm.',
    'Chạm chữ “cá” trong đề, rồi kéo cá vừa xuất hiện vào giỏ bên trái.',
  ],
  explanation:
    'Cá trốn ngay trong lời nhắn! Chạm chữ để tìm, kéo cá vào giỏ. Bạn đã biết tìm mẹo cả trong tranh lẫn ngoài tranh.',
  wrong: {
    not_fish: 'Bạn này chưa có vây, chưa nhận làm cá đâu!',
    fishing_rod: 'Cần câu kéo lên một chiếc lá. Cá đi đâu rồi?',
    lotus: 'Sen chưa mọc vây đâu. Tìm chỗ khác thử nhé!',
    water: 'Ao trống trơn. Thử tìm ngoài bức tranh xem!',
    empty: 'Giỏ đang trống. Tìm cá trước đã nhé!',
    basket: 'Chọn cá trước, rồi chạm giỏ để đưa cá về.',
    miss: 'Cá muốn về giỏ bên trái, chưa muốn đi dạo!',
  },
  source: 'original',
} as const satisfies LevelMeta;
