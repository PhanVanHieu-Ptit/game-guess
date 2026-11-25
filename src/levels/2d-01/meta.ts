import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-01',
  ordinal: 1,
  kind: '2d',
  title: 'Lì xì cho đứa nhỏ nhất',
  prompt: 'Trao lì xì cho đứa nhỏ nhất nhà. Bé đâu rồi?',
  thinking: 'visual',
  input: 'drag',
  difficulty: 1,
  hints: [
    'Hình như có ai chưa chịu lộ mặt.',
    'Bao lì xì to bất thường: nó đang che thứ gì đó.',
    'Kéo bao lì xì sang bên, rồi chạm vào bé nhỏ xíu phía sau.',
  ],
  explanation:
    'Lì xì to thế này che được cả một đứa bé. Mẹo: thứ che mắt bạn cũng có thể kéo đi được.',
  wrong: {
    child: 'Còn bé nhỏ hơn nữa. Hội này chưa đủ quân đâu!',
    miss: 'Bao lì xì thích nằm gọn sang bên cơ!',
  },
  source: 'original',
} as const satisfies LevelMeta;
