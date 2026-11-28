import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-08',
  ordinal: 12,
  kind: '2d',
  title: 'Bật mí bí mật',
  prompt: 'Muốn biết bí mật, hãy nói lái nó. Gõ từ mới.',
  thinking: 'wordplay',
  input: 'type',
  difficulty: 2,
  hints: [
    'Đề bài đã tự nói cách làm: nói lái.',
    'Đổi chỗ phần vần và dấu của hai tiếng: bí mật thành gì?',
    'Đáp án: bật mí.',
  ],
  explanation:
    'Nói lái "bí mật" ra "bật mí": muốn biết bí mật thì phải bật mí, nghe có lý ghê.',
  wrong: {
    same: 'Đó vẫn là từ cũ! Hãy nói lái nó sang từ mới xem nào!',
    reversed: 'Đảo từ thuần túy chưa phải nói lái đâu. Đổi vần và dấu nữa!',
    other: 'Từ này nghe chưa bật mí được điều gì cả. Thử lại nhé!',
    open_box: 'Hộp khóa chặt rồi, chỉ có gõ đúng câu thần chú mới mở!',
  },
  source: 'original',
} as const satisfies LevelMeta;
