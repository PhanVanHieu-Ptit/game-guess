import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Lắt Léo',
  description: 'Game đố mẹo hack não kiểu Việt.',
  // Chưa có biểu tượng thương hiệu (phong cách hình ảnh do LL-023 chốt). Icon rỗng khiến trình duyệt
  // không gọi /favicon.ico (404 ghi lỗi vào console); thay bằng src/app/icon.* khi có thiết kế.
  icons: { icon: 'data:,' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
