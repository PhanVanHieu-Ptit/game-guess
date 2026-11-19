import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-15',
  ordinal: 18,
  kind: '2d',
  title: 'Học sinh học sinh học',
  prompt:
    'Câu "HỌC SINH HỌC SINH HỌC" có nghĩa. Chạm vào khe giữa các chữ để tách thành những từ đúng.',
  thinking: 'wordplay',
  input: 'tap',
  difficulty: 4,
  hints: [
    'Tiếng Việt có từ một tiếng và từ hai tiếng.',
    '"Học sinh" là một từ, "sinh học" cũng là một từ. Còn lại là gì?',
    'Tách thành: học sinh, học, sinh học.',
  ],
  explanation:
    'Học sinh học môn sinh học! Ngắt đúng chỗ là câu nào cũng có nghĩa, trừ lời hứa "tuần sau tôi bắt đầu học".',
  wrong: {
    split: 'Câu này chưa đọc được. Chữ còn đang xếp hàng!',
    board: 'Bảng đang chờ bạn ngắt câu, chưa tới giờ ra chơi!',
  },
  source: 'original',
} as const satisfies LevelMeta;
