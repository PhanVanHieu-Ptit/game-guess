import type { LevelMeta } from '@/domain/levels/types';
export const meta = {
  id: '3d-view',
  ordinal: 3,
  kind: '3d',
  title: 'Nhìn chính diện',
  prompt: 'Xoay khối hộp để nhìn thẳng vào mặt màu đỏ.',
  thinking: 'visual',
  input: 'rotate',
  difficulty: 1,
  hints: [
    'Hãy thử đổi góc nhìn.',
    'Mặt màu đỏ nằm ở phía trước khối hộp.',
    'Đưa camera về phía trước, ngang tầm khối hộp.',
  ],
  explanation:
    'Mặt màu đỏ nằm phía +Z. Nhìn thẳng theo hướng −Z sẽ thấy nó chính diện.',
  source: 'original',
} as const satisfies LevelMeta;
