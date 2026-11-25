export interface RushOption {
  id: string;
  label: string;
  color?: string;
  size?: number;
}

export interface RushPuzzle {
  family: string;
  tag: string;
  prompt: string;
  note: string;
  options: RushOption[];
  answer: string[];
  explanation: string;
  tokens?: string[];
}

export function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const COLORS = [
  { label: 'ĐỎ', color: '#b3261e' },
  { label: 'XANH LÁ', color: '#14753f' },
  { label: 'XANH DƯƠNG', color: '#2457c5' },
  { label: 'TÍM', color: '#793ba2' },
];

/** A seed freezes both the questions and their positions for a daily challenge. */
export function createRushDeck(seed: number): RushPuzzle[] {
  const random = seededRandom(seed);
  const integer = (min: number, max: number) =>
    min + Math.floor(random() * (max - min + 1));
  const choices = (labels: (number | string)[]): RushOption[] =>
    shuffle(
      labels.map((label) => ({ id: String(label), label: String(label) })),
      random,
    );
  const deck: RushPuzzle[] = [];

  for (let round = 0; round < 12; round++) {
    const numbers = shuffle(
      [integer(1, 3), integer(4, 6), integer(7, 9), integer(10, 15)],
      random,
    );
    const largest = random() > 0.5;
    const answer = String(
      largest ? Math.max(...numbers) : Math.min(...numbers),
    );
    const distraction = numbers.find((n) => String(n) !== answer)!;
    const targetColor = integer(0, 3);
    const ink = shuffle(COLORS, random);
    const fruit = shuffle(['🍊', '🍎', '🍋', '🍐'], random);
    const count = integer(3, 6);
    const tokens = shuffle(
      [
        ...Array<string>(count).fill(fruit[0]),
        ...Array<string>(integer(3, 5)).fill(fruit[1]),
        fruit[2],
        fruit[3],
      ],
      random,
    );
    const sequence = shuffle(
      [integer(1, 3), integer(4, 6), integer(7, 9)],
      random,
    );
    const ascending = random() > 0.5;
    const ordered = [...sequence].sort((a, b) => (ascending ? a - b : b - a));
    const bag = integer(1, 4) * 1000;
    const difference = integer(5, 9) * 2000;
    const total = difference + bag * 2;
    const people = integer(4, 9);
    const rounds: RushPuzzle[] = [
      {
        family: 'size',
        tag: 'MẮT CÓ LỪA BẠN?',
        prompt: `Chạm số có GIÁ TRỊ ${largest ? 'lớn' : 'nhỏ'} nhất.`,
        note: 'Kích thước chỉ đang đánh lạc hướng.',
        options: numbers.map((n) => ({
          id: String(n),
          label: String(n),
          size: n === distraction ? 64 : 30,
        })),
        answer: [answer],
        explanation: `${answer} có giá trị ${largest ? 'lớn' : 'nhỏ'} nhất. Chữ to chưa chắc số lớn!`,
      },
      {
        family: 'color',
        tag: 'ĐỌC CHỮ HAY NHÌN MÀU?',
        prompt: `Chạm chữ được in bằng MÀU ${COLORS[targetColor].label}.`,
        note: 'Nhìn màu mực, đừng đọc tên màu.',
        options: ink.map((color, i) => ({
          id: color.label,
          label: COLORS[(COLORS.indexOf(color) + 1 + (round % 3)) % 4].label,
          color: color.color,
          size: 24 + (i % 2) * 2,
        })),
        answer: [COLORS[targetColor].label],
        explanation: `Cần chọn màu mực ${COLORS[targetColor].label.toLowerCase()}, dù chữ viết tên màu khác.`,
      },
      {
        family: 'count',
        tag: 'ĐẾM CHO CHẮC',
        prompt: `Có bao nhiêu ${fruit[0]} trong rổ?`,
        note: 'Chỉ đếm trong rổ, bỏ qua hình ở câu hỏi.',
        tokens,
        options: choices([count - 1, count, count + 1, count + 2]),
        answer: [String(count)],
        explanation: `Trong rổ có ${count} ${fruit[0]}. Hình ở câu hỏi không nằm trong rổ.`,
      },
      {
        family: 'sequence',
        tag: 'TAY NHANH, NÃO TỈNH',
        prompt: `Chạm 3 số theo thứ tự ${ascending ? 'tăng' : 'giảm'} dần.`,
        note: 'Một câu, ba lần chạm. Đúng thứ tự mới được điểm.',
        options: sequence.map((n) => ({ id: String(n), label: String(n) })),
        answer: ordered.map(String),
        explanation: `Thứ tự ${ascending ? 'tăng' : 'giảm'} dần là ${ordered.join(' → ')}.`,
      },
      {
        family: 'price',
        tag: 'COI CHỪNG TÍNH NHẨM',
        prompt: `Bánh và túi giá ${total / 1000}.000đ. Bánh đắt hơn túi ${difference / 1000}.000đ. Túi giá bao nhiêu?`,
        note: 'Chênh lệch khác với giá của chiếc bánh.',
        options: choices([bag, bag * 2, difference, total]).map((o) => ({
          ...o,
          label: `${Number(o.id) / 1000}.000đ`,
        })),
        answer: [String(bag)],
        explanation: `Túi ${bag / 1000}.000đ, bánh ${(difference + bag) / 1000}.000đ: vừa đủ tổng, vừa đúng chênh lệch.`,
      },
      {
        family: 'logic',
        tag: 'KHOAN, ĐỌC LẠI ĐÃ',
        prompt: `Bạn vượt người đang đứng thứ ${people} trong cuộc đua. Bạn đứng thứ mấy?`,
        note: 'Bạn vừa chiếm vị trí của ai?',
        options: choices([people - 1, people, people + 1, 1]),
        answer: [String(people)],
        explanation: `Bạn chiếm chỗ người thứ ${people}, nên bạn đang đứng thứ ${people}.`,
      },
    ];
    const block = shuffle(rounds, random);
    if (deck.at(-1)?.family === block[0].family)
      [block[0], block[1]] = [block[1], block[0]];
    deck.push(...block);
  }
  return deck;
}

export function vietnamDay(now: number): string {
  return new Date(now + 7 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export function dailySeed(day: string): number {
  return [...`latleo-rush-v1:${day}`].reduce(
    (hash, char) => Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0,
    2166136261,
  );
}
