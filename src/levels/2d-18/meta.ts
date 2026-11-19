import type { LevelMeta } from '@/domain/levels/types';
export const meta = {
  id: '2d-18',
  ordinal: 21,
  kind: '2d',
  title: 'Chia trâu',
  prompt:
    'Ông cụ để lại 17 con trâu: con cả nhận 1/2, con thứ 1/3, con út 1/9, không được mổ con nào. Giúp ba anh em chia.',
  thinking: 'logic',
  input: 'drag',
  difficulty: 4,
  hints: [
    '17 không chia hết cho 2, 3 hay 9. Có cách nào làm số trâu "đẹp" hơn?',
    'Hàng xóm có một con trâu đang đứng ngoài hàng rào.',
    'Mượn con trâu: 18 con, chia 9, 6, 2, thừa đúng 1 con để trả.',
  ],
  explanation:
    'Mượn một con rồi trả lại: ba anh em có phần, hàng xóm không mất gì. Mẹo: đôi khi phải thêm vào mới chia được.',
  wrong: {
    divide: '17 con chưa chia nguyên được. Trâu không thích bị lẻ!',
    fence: 'Hàng rào chỉ giữ trâu, không biết chia phân số!',
    miss: 'Trâu đi lạc rồi! Thử chọn lại chỗ đặt nhé!',
  },
  source: 'classic',
} as const satisfies LevelMeta;
