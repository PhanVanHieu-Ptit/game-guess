import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-21',
  ordinal: 24,
  kind: '2d',
  title: 'Tắt đèn cho bé ngủ',
  prompt: 'Đèn đã tắt mà bé vẫn chói mắt. Giúp bé ngủ ngon.',
  thinking: 'logic',
  input: 'drag',
  difficulty: 3,
  hints: [
    'Đèn đã tắt. Thứ gì khác còn chiếu sáng căn phòng?',
    'Ánh trăng đang lọt qua cửa sổ mở rèm.',
    'Kéo rèm che kín cửa sổ để ánh trăng không rọi vào bé.',
  ],
  explanation:
    'Đèn ngủ tắt rồi, nhưng trăng vẫn tăng ca. Kéo rèm là bé được ngủ ngon.',
  wrong: {
    lamp: 'Đèn đã nghỉ rồi, còn ai đang tăng ca nhỉ?',
    moon: 'Trăng ở xa quá, tay bạn chưa với tới đâu!',
    bed: 'Bé đang nhắm mắt mà ánh sáng vẫn ghé chơi!',
    window: 'Cửa sổ đang chờ rèm, chưa chờ một lời chúc ngủ ngon!',
    miss: 'Rèm đi dạo rồi! Cửa sổ vẫn còn sáng.',
  },
  source: 'original',
} as const satisfies LevelMeta;
