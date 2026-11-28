import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-20',
  ordinal: 39,
  kind: '2d',
  title: 'Ba túi nhãn nhầm',
  prompt:
    'Ba túi trái cây dán nhãn CAM, BƯỞI, CAM + BƯỞI, nhưng nhãn nào cũng SAI. Chỉ được lấy ra một quả. Dán lại cho đúng.',
  thinking: 'logic',
  input: 'drag',
  difficulty: 5,
  hints: [
    'Nhãn nào cũng sai: đó là thông tin quý.',
    'Có một túi chắc chắn không phải túi hỗn hợp. Túi nào?',
    'Lấy một quả từ túi nhãn "CAM + BƯỞI", rồi suy ra hai túi còn lại.',
  ],
  explanation:
    'Biết một thứ sai cũng là biết rất nhiều. Bà bán hàng dán nhầm hết mà vẫn giúp bạn giải xong cả bài toán.',
  wrong: {
    draw: 'Túi này chưa chắc giúp suy ra cả ba đâu!',
    extra: 'Một quả thôi nha, đây chưa phải tiệc trái cây!',
    first: 'Nhãn đang chờ một quả làm nhân chứng!',
    label: 'Nhãn lại đi lạc rồi! Thử túi khác nhé.',
  },
  source: 'classic',
} as const satisfies LevelMeta;
