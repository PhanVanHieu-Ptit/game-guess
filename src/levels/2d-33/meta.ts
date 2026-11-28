import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-33',
  ordinal: 37,
  kind: '2d',
  title: 'Chín viên bi',
  prompt:
    'Có 9 viên bi, đúng một viên nhẹ hơn. Các viên còn lại nặng bằng nhau. Tìm viên nhẹ bằng tối đa 2 lần cân.',
  thinking: 'logic',
  input: 'tap',
  difficulty: 4,
  hints: [
    'Một lần cân có thể chia khả năng thành ba hướng.',
    'Chia thành ba nhóm, mỗi nhóm ba viên. Cân hai nhóm với nhau.',
    'Từ nhóm nghi ngờ, cân hai viên: bên nhẹ là đáp án; nếu bằng nhau, chọn viên còn lại.',
  ],
  explanation:
    'Cân ba với ba để khoanh còn ba viên, rồi cân một với một. Hai lần cân là đủ tìm viên nhẹ!',
  wrong: {
    answer: 'Viên này chưa cần ăn thêm đâu!',
    limit: 'Cân xin nghỉ, thử lại từ đầu nhé!',
    empty: 'Hai đĩa đang chờ bi, chưa cân không khí nhé!',
    choose: 'Chọn một viên bi trước, cân chưa đọc được ý nghĩ!',
  },
  source: 'classic',
} as const satisfies LevelMeta;
