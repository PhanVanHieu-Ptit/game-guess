import type { ReactNode } from 'react';

// Icon SVG nội tuyến (nét 2,5 px, theo màu chữ) để hiện giống nhau ở mọi thiết bị, không phụ thuộc phông emoji.
// Đường nét theo bộ icon Lucide (giấy phép ISC).

function Icon({ children, size = 24 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function ArrowLeftIcon() {
  return (
    <Icon>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </Icon>
  );
}

export function RestartIcon() {
  return (
    <Icon>
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </Icon>
  );
}

export function BulbIcon({ size }: { size?: number }) {
  return (
    <Icon size={size}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </Icon>
  );
}

export function CheckIcon({ size }: { size?: number }) {
  return (
    <Icon size={size}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
}

export function LockIcon({ size }: { size?: number }) {
  return (
    <Icon size={size}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Icon>
  );
}
