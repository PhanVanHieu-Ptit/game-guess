import type { LevelMeta } from '@/domain/levels/types';

// MÀN MẪU để chứng minh luồng của khung chơi (vào màn → giải → kết quả → màn tiếp). Không thuộc 25 màn trong
// docs/LEVELS.md; xóa khi dựng màn thật. Câu đố dân gian quen thuộc, nguồn "folk" (cần rà nguồn trước khi phát hành).
export const meta = {
  id: '2d-sample-01',
  ordinal: 1,
  kind: '2d',
  title: 'Táo trên bàn',
  prompt:
    'Trên bàn có 3 quả táo. Bạn lấy đi 2 quả. Hỏi bạn đang có mấy quả táo?',
  thinking: 'read',
  input: 'choose',
  difficulty: 1,
  hints: [
    'Đọc kỹ xem câu hỏi đang hỏi về ai.',
    'Đề hỏi bạn đang có mấy quả, không phải trên bàn còn mấy quả.',
    'Đáp án: 2 quả, vì 2 quả đó đã nằm trong tay bạn.',
  ],
  explanation:
    'Đề hỏi bạn đang có mấy quả, không hỏi trên bàn còn mấy quả. Bạn lấy 2 quả thì bạn có 2 quả.',
  wrong: {
    '0': 'Bạn vừa lấy 2 quả táo mà, sao lại không có quả nào?',
    '1': 'Số 1 là số táo còn trên bàn, đề đâu có hỏi vậy.',
    '3': 'Ba quả là lúc chưa ai lấy gì cả đó.',
  },
  source: 'folk',
} as const satisfies LevelMeta;
