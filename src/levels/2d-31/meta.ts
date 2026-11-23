import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-31',
  ordinal: 34,
  kind: '2d',
  title: 'Bánh còn trong giỏ',
  prompt:
    'Chia 3 cái bánh cho 3 bé, mỗi bé một cái, mà vẫn còn một cái bánh trong giỏ.',
  thinking: 'logic',
  input: 'drag',
  difficulty: 3,
  hints: [
    'Bánh trong giỏ có nhất thiết là bánh chưa được nhận không?',
    'Một bé có thể nhận cả bánh lẫn thứ đựng bánh.',
    'Chia hai bánh riêng, rồi đưa giỏ còn một bánh cho bé cuối.',
  ],
  explanation:
    'Bé cuối nhận cả giỏ lẫn bánh. Ai cũng có một cái, mà trong giỏ vẫn còn một cái!',
  wrong: {
    occupied: 'Bé này đủ phần rồi, còn bạn đang chờ!',
    empty: 'Giỏ trống rồi, điều kiện còn thiếu nhé!',
    many: 'Giỏ còn nhiều bánh quá, mỗi bé chỉ một cái!',
    choose: 'Bé chìa tay rồi, bạn chọn bánh hay giỏ nhé!',
    miss: 'Bánh quay về giỏ, chưa ai bị đói phần đâu!',
  },
  source: 'classic',
} as const satisfies LevelMeta;
