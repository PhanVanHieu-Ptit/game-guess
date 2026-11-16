import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-03',
  ordinal: 3,
  kind: '2d',
  title: 'Qua đường an toàn',
  prompt: 'Bé muốn qua đường nhưng xe chạy ào ào. Giúp bé qua đường an toàn.',
  thinking: 'logic',
  input: 'tap',
  difficulty: 1,
  hints: [
    'Ai điều khiển dòng xe?',
    'Nhìn lên cái cột nhỏ ở góc đường.',
    'Chạm vào đèn giao thông cho nó đổi sang đỏ.',
  ],
  explanation:
    'Thay vì cố lách qua xe, hãy làm cho xe dừng lại. Ngoài đời nhớ chờ đèn đỏ thật nha.',
  wrong: {
    child: 'Xe còn chạy kìa. Bé chưa muốn thi chạy với xe đâu!',
    car: 'Xe còn chạy kìa. Chạm mui xe không phải phanh đâu!',
  },
  source: 'original',
} as const satisfies LevelMeta;
