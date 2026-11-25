import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-03',
  ordinal: 3,
  kind: '2d',
  title: 'Qua đường an toàn',
  prompt: 'Đưa bé út qua đường về nhà ngoại an toàn.',
  thinking: 'logic',
  input: 'tap',
  difficulty: 1,
  hints: [
    'Làm sao cho xe chịu dừng trước đã?',
    'Nhìn lên cái cột nhỏ ở góc đường.',
    'Chạm đèn giao thông cho xe dừng, rồi chạm bé để cùng qua vạch.',
  ],
  explanation:
    'Xe dừng rồi mới đưa bé qua vạch. Tết vui là cả nhà về đủ; ngoài đời nhớ quan sát và tuân theo đèn thật nhé.',
  wrong: {
    child: 'Xe còn chạy kìa. Bé chưa muốn thi chạy với xe đâu!',
    car: 'Xe còn chạy kìa. Chạm mui xe không phải phanh đâu!',
  },
  source: 'original',
} as const satisfies LevelMeta;
