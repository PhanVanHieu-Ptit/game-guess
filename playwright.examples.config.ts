import { defineConfig } from '@playwright/test';
import base from './playwright.config';
const server = base.webServer;
if (!server || Array.isArray(server))
  throw new Error('Cần một máy chủ Next.js cho ví dụ');
export default defineConfig({
  ...base,
  testDir: './tests/examples',
  webServer: {
    ...server,
    env: {
      NEXT_PUBLIC_ANALYTICS: 'console',
      NEXT_PUBLIC_UNLOCK_ALL: '1',
    },
  },
});
