import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-07',
  ordinal: 7,
  kind: '2d',
  title: 'Hai quả cam',
  prompt: 'Bà bán cam bảo quả bên trái to hơn. Bạn thấy sao?',
  thinking: 'visual',
  input: 'drag',
  difficulty: 2,
  hints: [
    'Mắt bạn dễ bị lừa bởi những thứ nằm cạnh.',
    'Thử đặt hai quả cam chồng lên nhau.',
    'Kéo chồng hai quả: vừa khít. Chọn "Bằng nhau".',
  ],
  explanation:
    'Đứng cạnh quả nhỏ thì thấy mình to, cạnh quả to thì thấy mình bé. Bà bán cam đã đánh lừa mắt bạn.',
  wrong: {
    left: 'Bà bán cam bảo thế thôi, chứ mắt bạn bị đánh lừa rồi!',
    right: 'Quả bên phải bị quả to vây quanh nên trông bé hơn thôi!',
    unknown: 'Thử kéo hai quả lại gần nhau xem có biết được không nhé!',
    miss: 'Đặt quả cam chồng lên quả bên kia để so sánh nhé!',
  },
  source: 'original',
} as const satisfies LevelMeta;
