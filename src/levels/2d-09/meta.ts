import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-09',
  ordinal: 9,
  kind: '2d',
  title: 'Bài kiểm tra 5 phút',
  prompt: 'Đọc kỹ đề trước khi làm bài.',
  thinking: 'read',
  input: 'tap',
  difficulty: 2,
  hints: [
    'Có phải câu nào cũng cần làm không?',
    'Đọc đến dòng cuối cùng rồi hãy quyết định.',
    'Dòng cuối bảo bỏ qua các câu trên: chạm Nộp bài, đừng điền gì.',
  ],
  explanation:
    'Thầy cô dặn "đọc kỹ đề" là có lý do. Câu cuối bảo bỏ qua hết, bạn nộp bài trước cả khi tính xong 24 × 17.',
  wrong: {
    redundant: 'Làm thừa rồi! Câu cuối dặn bỏ qua các câu trên mà!',
    filled: 'Cặm cụi làm bài rồi... hãy đọc đến câu cuối cùng!',
    name: 'Chưa gì đã vội điền tên, thử đọc hết đề bài đã!',
  },
  source: 'original',
} as const satisfies LevelMeta;
