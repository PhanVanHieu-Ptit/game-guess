// Toàn bộ chữ hiển thị cho người chơi (ngoài chữ riêng của từng màn nằm trong meta.ts của màn đó).
// Gom một chỗ để rà chính tả và giọng văn (docs/backlog.md LL-036) mà không phải lục từng file JSX.
// Giọng điệu theo docs/GDD.md mục 10: game gọi người chơi là "bạn", tự xưng "mình", trêu nhẹ chứ không chê.

export const strings = {
  appName: 'Lắt Léo',
  tagline:
    'Tưởng dễ hả? Thử một màn xem. 42 cú xoắn não, 7 chặng quậy, mở là chơi.',

  home: {
    play: 'Chơi',
    playContinue: 'Chơi tiếp',
    playAgain: 'Chơi lại từ màn 1',
    continueTo: (ordinal: number, total: number) =>
      `Tới màn ${ordinal} / ${total}`,
    allDone: 'Đủ 42 màn rồi! Thử tự giải lại những màn từng cần gợi ý nhé.',
    daily: 'Đố mẹo mỗi ngày',
    dailyEmpty: 'Chưa có câu hôm nay',
    levels: 'Chọn màn',
    menuLabel: 'Menu chính',
  },

  daily: {
    title: 'Đố mẹo mỗi ngày',
    empty:
      'Chưa có câu hôm nay. Bạn quay lại sau nhé, mình đang soạn thêm câu mới.',
    home: 'Về trang chủ',
  },

  levels: {
    title: 'Chọn màn',
    back: 'Về trang chủ',
    listLabel: 'Danh sách màn',
    legend:
      'Dấu tích là đã giải, bóng đèn là đã xem đáp án, ổ khóa là chưa mở.',
    // Ô khóa chỉ hiện số, không hiện tên (tránh lộ mẹo).
    cell: (
      ordinal: number,
      state: 'locked' | 'open' | 'solved' | 'revealed',
    ) => {
      const suffix = {
        locked: 'chưa mở',
        open: 'chưa giải',
        solved: 'đã giải',
        revealed: 'đã xem đáp án',
      }[state];
      return `Màn ${ordinal}, ${suffix}`;
    },
  },

  play: {
    levelOf: (ordinal: number, total: number) => `Màn ${ordinal} / ${total}`,
    back: 'Về chọn màn',
    restart: 'Chơi lại',
    hint: (tier: number) => `Gợi ý (${tier}/3)`,
    loading: 'Đang tải màn…',
    loadError: 'Không tải được màn này. Kiểm tra mạng rồi thử lại nhé.',
    retry: 'Thử lại',
    locked: {
      title: 'Màn này chưa mở',
      body: 'Bạn cần qua các màn trước đã nhé.',
      goOn: 'Chơi tiếp',
    },
    notFound: {
      title: 'Không tìm thấy màn',
      body: 'Màn này không có trong game.',
    },
    // Phản hồi chung khi sai (docs/GDD.md mục 10.3); màn có thể khai báo phản hồi riêng trong meta.wrong.
    wrongGeneric: [
      'Chưa phải đâu. Thử nghĩ khác cái đầu tiên bạn nghĩ nha.',
      'Gần rồi! Nhưng "gần" chưa phải "đúng".',
    ],
    wrongStuck: 'Đổi góc nghĩ thử nhé. Gợi ý luôn ở đây nếu bạn cần.',
  },

  hints: {
    title: 'Gợi ý',
    close: 'Đóng',
    intro: 'Gợi ý nhẹ thôi, đừng giận mình nha.',
    tierName: ['Gợi ý nhẹ', 'Gợi ý rõ', 'Đáp án'] as const,
    open: ['Xem gợi ý nhẹ', 'Xem gợi ý rõ', 'Xem đáp án'] as const,
    locked: 'Xem gợi ý ở bước trước để mở.',
    confirmTitle: 'Xem đáp án?',
    confirmBody: 'Màn này sẽ không tính là tự giải.',
    confirmYes: 'Xem đáp án',
    confirmNo: 'Thôi, mình nghĩ tiếp',
  },

  result: {
    dialogLabel: 'Kết quả màn chơi',
    solvedTitle: 'Chuẩn!',
    solvedLead: 'Lắt léo thật, nhưng bạn lắt léo hơn.',
    revealedTitle: 'Đáp án đây',
    revealedLead: 'Không sao, mẹo hay thì ai cũng cần biết một lần.',
    answer: 'Đáp án',
    explanation: 'Mẹo của màn này',
    time: 'Thời gian',
    level: 'Mức',
    solveLevel: { self: 'Tự giải', hinted: 'Có gợi ý', revealed: 'Xem đáp án' },
    next: 'Màn tiếp',
    backToLevels: 'Về chọn màn',
    restart: 'Chơi lại',
  },

  storage: {
    notice: 'Không lưu được trên máy này. Tiến trình sẽ mất khi đóng tab.',
  },

  errors: {
    title: 'Có lỗi rồi',
    body: 'Có gì đó trục trặc. Bạn thử lại nhé, không mất tiến trình đâu.',
    retry: 'Thử lại',
    home: 'Về trang chủ',
  },

  notFound: {
    title: 'Không tìm thấy trang',
    body: 'Đường dẫn này không có trong game.',
    home: 'Về trang chủ',
  },
} as const;
