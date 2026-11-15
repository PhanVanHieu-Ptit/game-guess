import type { LevelId, LevelMeta } from '@/domain/levels/types';

// Dữ liệu màn dùng riêng cho test; không thuộc nội dung production.

export const makeMeta = (overrides: Partial<LevelMeta> = {}): LevelMeta => ({
  id: '2d-test-01',
  ordinal: 1,
  kind: '2d',
  title: 'Màn thử',
  prompt: 'Đề bài thử nghiệm.',
  thinking: 'read',
  input: 'choose',
  difficulty: 1,
  hints: ['Gợi ý nhẹ.', 'Gợi ý rõ hơn.', 'Đáp án đây.'],
  explanation: 'Câu giải thích ngắn.',
  wrong: { a: 'Chưa đúng đâu.' },
  source: 'original',
  ...overrides,
});

/** Danh sách `count` màn hợp lệ, đúng thứ tự: 2d-test-01, 2d-test-02, … */
export const makeMetas = (count: number): LevelMeta[] =>
  Array.from({ length: count }, (_, index) =>
    makeMeta({
      id: `2d-test-${String(index + 1).padStart(2, '0')}` as LevelId,
      ordinal: index + 1,
    }),
  );
