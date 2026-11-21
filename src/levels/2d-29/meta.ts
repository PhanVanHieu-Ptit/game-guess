import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-29',
  ordinal: 32,
  kind: '2d',
  title: 'Sáu cốc nước',
  prompt:
    'Chỉ nhấc một cốc, được rót nước. Làm cho cốc đầy và cốc rỗng đứng xen kẽ.',
  thinking: 'logic',
  input: 'drag',
  difficulty: 4,
  hints: [
    'Đổi lượng nước có thể hữu ích hơn đổi vị trí cốc.',
    'Cốc thứ hai cần rỗng, cốc thứ năm cần đầy.',
    'Rót hết nước từ cốc 2 sang cốc 5, rồi đặt cốc 2 về chỗ cũ.',
  ],
  explanation:
    'Chỉ một cốc được nhấc, nhưng hai cốc đổi trạng thái. Dãy mới là đầy, rỗng, đầy, rỗng, đầy, rỗng.',
  wrong: {
    pour: 'Nước đổi nhà rồi, mà hàng vẫn chưa xen kẽ!',
    empty: 'Cốc rỗng xin phép không có nước để rót!',
    full: 'Cốc đầy rồi, thêm nữa là bàn được uống!',
    miss: 'Cốc về chỗ cũ nhé, bàn chưa khát nước!',
  },
  source: 'classic',
} as const satisfies LevelMeta;
