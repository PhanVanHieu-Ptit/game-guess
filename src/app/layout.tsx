import type { Metadata, Viewport } from 'next';
import { Suspense, type ReactNode } from 'react';
import { PageAnalytics } from '@/features/analytics/page-analytics';
import '@/styles/tokens.css';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: { default: 'Lắt Léo', template: '%s · Lắt Léo' },
  description:
    'Game đố mẹo hack não kiểu Việt. Mở link là chơi, không cần đăng nhập.',
  // Chưa có biểu tượng thương hiệu (phong cách hình ảnh do LL-023 chốt). Icon rỗng khiến trình duyệt
  // không gọi /favicon.ico (404 ghi lỗi vào console); thay bằng src/app/icon.* khi có thiết kế.
  icons: { icon: 'data:,' },
};

export const viewport: Viewport = {
  themeColor: '#fff6e5',
  // Cho phép nội dung tràn xuống vùng an toàn của iPhone; mã CSS tự chừa chỗ bằng env(safe-area-inset-*).
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Suspense fallback={null}>
          <PageAnalytics />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
