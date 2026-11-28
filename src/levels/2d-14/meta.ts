import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-14',
  ordinal: 21,
  kind: '2d',
  title: 'Bắt lươn',
  prompt: 'Con lươn trơn tuột, bắt hoài không được. Nhanh tay lên!',
  thinking: 'physics',
  input: 'drag',
  difficulty: 3,
  hints: [
    'Tay trơn thì bắt gì cũng trượt. Làm tay bớt trơn được không?',
    'Ngoài ruộng người ta hay dùng thứ lấy từ bếp.',
    'Kéo chén tro bếp lên bàn tay, rồi chạm vào lươn.',
  ],
  explanation:
    'Mẹo dân gian: xát tro vào tay thì giữ được con vật trơn. Con lươn chạy không thoát khỏi... bà ngoại.',
  wrong: {
    eel: 'Tuột rồi! Lươn đang thi trượt tay nghệ thuật!',
    hand: 'Tay trơn bóng, lươn tưởng đây là cầu trượt!',
    miss: 'Tro rơi nhầm chỗ, bếp tưởng bạn đang dọn nhà!',
    basket: 'Rổ ngồi yên lắm. Lươn mới là nhà vô địch trượt!',
  },
  source: 'folk',
} as const satisfies LevelMeta;
