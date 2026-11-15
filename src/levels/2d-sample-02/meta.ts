import type { LevelMeta } from '@/domain/levels/types';

// MÀN MẪU thứ hai để chứng minh bước "sang màn tiếp" (xem 2d-sample-01). Xóa khi dựng màn thật.
export const meta = {
  id: '2d-sample-02',
  ordinal: 2,
  kind: '2d',
  title: 'Tháng có 28 ngày',
  prompt:
    'Có tháng 30 ngày, có tháng 31 ngày. Vậy có bao nhiêu tháng có 28 ngày?',
  thinking: 'read',
  input: 'choose',
  difficulty: 2,
  hints: [
    'Đề hỏi "có 28 ngày", chứ đâu hỏi "chỉ có 28 ngày".',
    'Tháng 30 ngày hay 31 ngày thì đã đủ 28 ngày chưa?',
    'Đáp án: cả 12 tháng, vì tháng nào cũng có ít nhất 28 ngày.',
  ],
  explanation:
    'Tháng nào cũng có ít nhất 28 ngày, không riêng tháng 2. Đề đâu có nói "chỉ có 28 ngày".',
  wrong: {
    feb: 'Tháng 2 có 28 ngày, nhưng các tháng khác cũng đủ rồi.',
    six: 'Đếm lại xem: tháng nào có ít hơn 28 ngày không?',
    eleven: 'Gần đúng rồi, còn thiếu đúng một tháng nữa.',
  },
  source: 'folk',
} as const satisfies LevelMeta;
