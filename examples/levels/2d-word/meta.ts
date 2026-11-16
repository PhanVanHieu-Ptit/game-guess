import type { LevelMeta } from '@/domain/levels/types';
import { tappableWords } from '@/domain/levels/prompt';
export const meta = {
  id: '2d-word',
  ordinal: 3,
  kind: '2d',
  title: 'Chữ thừa',
  prompt: ['Chạm vào chữ thừa: ', ...tappableWords('Tết Tết vui')],
  thinking: 'read',
  input: 'tap',
  difficulty: 1,
  hints: [
    'Đọc từng chữ.',
    'Một chữ bị lặp lại.',
    'Chạm chữ Tết thứ hai ngay trong đề bài.',
  ],
  explanation: 'Chữ Tết thứ hai bị lặp. Đề bài cũng là một phần của sân chơi.',
  source: 'original',
} as const satisfies LevelMeta;
