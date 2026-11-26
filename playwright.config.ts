import { defineConfig, devices } from '@playwright/test';

// E2E chạy trên bản production (`next build` + `next start`), theo docs/TECH.md mục 11.
// Đặt `E2E_DEV=1` để chạy cùng bộ test trên `next dev`: bản phát triển có thêm cảnh báo của React (StrictMode,
// hydration...) mà bản production không in ra, nên đây là cách kiểm "không lỗi console" khi chạy `npm run dev`.
const PORT = 3100;
const DEV = process.env.E2E_DEV === '1';

export default defineConfig({
  testDir: 'tests/e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    locale: 'vi-VN',
    timezoneId: 'Asia/Ho_Chi_Minh',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    // iPhone SE: WebKit, 320×568 (hẹp hơn mốc thiết kế 360 px nên là phép thử khắt khe).
    { name: 'iphone-se', use: { ...devices['iPhone SE'] } },
    // Pixel 5: Chromium, 393×727.
    { name: 'pixel-5', use: { ...devices['Pixel 5'] } },
    // Đúng mốc 360×640 có cảm ứng của Definition of Done (docs/TECH.md mục 11).
    {
      name: 'mobile-360',
      use: { ...devices['Pixel 5'], viewport: { width: 360, height: 640 } },
    },
  ],
  webServer: {
    command: DEV
      ? `npm run dev -- --port ${PORT}`
      : `npm run build && npm run start -- --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    timeout: 240_000,
    // Luôn dựng và chạy lại bản mới: một máy chủ cũ có thể được dựng thiếu biến môi trường dưới đây.
    reuseExistingServer: false,
    // Ghi sự kiện đo lường ra console cả ở bản production để E2E kiểm được (xem services/analytics).
    env: {
      NEXT_PUBLIC_ANALYTICS: process.env.E2E_ANALYTICS ?? 'console',
      // Ngắn hơn mặc định (20 giây) để test lỗi nạp cảnh chạy nhanh; vẫn dư sức cho lần nạp bình thường (vài mili giây).
      NEXT_PUBLIC_SCENE_TIMEOUT_MS: '5000',
    },
  },
});
