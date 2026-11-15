// Cấu hình đọc từ biến môi trường công khai lúc dựng (docs/TECH.md mục 6). Xem `.env.example`.

/** Mở khóa mọi màn để thử và kiểm thử; không hiện trong giao diện. */
export const UNLOCK_ALL = process.env.NEXT_PUBLIC_UNLOCK_ALL === '1';

const DEFAULT_SCENE_TIMEOUT_MS = 20_000;
const sceneTimeout = Number(process.env.NEXT_PUBLIC_SCENE_TIMEOUT_MS);

/**
 * Thời gian tối đa chờ nạp cảnh của một màn trước khi coi là lỗi và hiện "Thử lại" (mili giây). Cần vì khi tải gói JS
 * bị treo (mạng chập chờn, yêu cầu không kết thúc), `import()` có thể chờ mãi thay vì từ chối, nên nếu không có
 * giới hạn này người chơi kẹt ở "Đang tải màn…". Mặc định 20 giây; E2E đặt ngắn hơn.
 */
export const SCENE_LOAD_TIMEOUT_MS =
  Number.isFinite(sceneTimeout) && sceneTimeout > 0
    ? sceneTimeout
    : DEFAULT_SCENE_TIMEOUT_MS;
