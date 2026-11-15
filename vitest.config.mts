import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Kiểm thử đơn vị và thành phần (docs/TECH.md mục 11). `npm run test` chạy một lượt rồi thoát (không watch).
export default defineConfig({
  resolve: {
    // Bí danh `@/…` giống tsconfig.json.
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    // DOM giả cho test thành phần; test của domain/ chạy trong cùng môi trường cho đơn giản.
    environment: 'jsdom',
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    setupFiles: ['tests/unit/setup.ts'],
    restoreMocks: true,
    // Sink mặc định của đo lường không in gì khi chạy test; test nào cần thì tự `setSink`.
    env: { NEXT_PUBLIC_ANALYTICS: 'off' },
  },
});
