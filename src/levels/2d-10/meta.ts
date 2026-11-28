import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-10',
  ordinal: 10,
  kind: '2d',
  title: 'Đàn vịt',
  prompt:
    'Hai con vịt đi trước hai con vịt, hai con vịt đi sau hai con vịt, hai con vịt đi giữa hai con vịt. Hỏi có mấy con vịt?',
  thinking: 'read',
  input: 'type',
  difficulty: 2,
  hints: [
    'Mỗi cụm "hai con" có phải một nhóm riêng không?',
    'Một con vịt có thể được nhắc tới trong nhiều cụm.',
    'Chỉ có 4 con xếp hàng: hai con đầu, hai con cuối, hai con giữa nằm lẫn trong đó.',
  ],
  explanation:
    'Bốn con vịt xếp hàng mà đề bài đếm tới sáu. Vịt không kêu ca gì, chỉ có người đọc đề đau đầu.',
  wrong: {
    six: 'Đếm trùng rồi đó! 2 con giữa vừa đi sau, vừa đi trước!',
    other: 'Số này chưa đúng rồi. Vẽ thử hàng dọc ra xem nào!',
    duck: 'Quạc quạc! Đếm trên đầu vịt đi, đừng chạm lông vịt!',
  },
  source: 'folk',
} as const satisfies LevelMeta;
