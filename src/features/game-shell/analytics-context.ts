import { setContextProvider } from '@/services/analytics/track';
import { useProgress } from '@/stores/progress';

/**
 * Nối mã ẩn danh (nằm trong tiến trình) vào đo lường. services/ không được import stores/ nên features/ nối giúp.
 * Chỉ đăng ký một hàm gọi lại (không chạm DOM), nên gọi nhiều lần hay gọi lúc render đều an toàn.
 */
export function wireAnalyticsContext(): void {
  setContextProvider(() => ({
    installId: useProgress.getState().installId,
    // Mức đồ họa đang dùng: hiện mặc định "trung bình" vì chưa có bậc chất lượng 3D (docs/TECH.md mục 8.7).
    quality: 'medium',
  }));
}
