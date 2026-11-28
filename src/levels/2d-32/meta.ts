import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-32',
  ordinal: 29,
  kind: '2d',
  title: 'Ốc sên leo tường',
  prompt:
    'Tường cao 5 m. Mỗi ngày ốc leo 3 m, mỗi đêm tụt 2 m. Chạm đỉnh là dừng. Ốc cần mấy ngày?',
  thinking: 'read',
  input: 'type',
  difficulty: 3,
  hints: [
    'Ngày cuối cùng có giống những ngày trước không?',
    'Khi chạm đỉnh, ốc không phải chịu thêm một đêm trượt.',
    'Sau hai đêm ốc ở mốc 2 m; ngày thứ ba leo tới đỉnh. Nhập 3.',
  ],
  explanation:
    'Ngày thứ ba, ốc từ mốc 2 m leo tới đỉnh 5 m rồi dừng. Đến nơi rồi thì khỏi tính thêm một đêm!',
  wrong: {
    five: 'Bạn bắt ốc tăng ca thêm rồi!',
    other: 'Ốc vẫn còn thiếu một đoạn đường!',
    wall: 'Tường không thấp xuống đâu, thử tính ngày nhé!',
  },
  source: 'classic',
} as const satisfies LevelMeta;
