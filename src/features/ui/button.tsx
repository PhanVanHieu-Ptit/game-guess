import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './button.module.css';

// Nút và liên kết-nút dùng chung. Mọi phần tử bấm được đều mang `data-touch-target` và cao tối thiểu 48 px
// (≥ 44 px theo docs/GDD.md mục 12.2); E2E kiểm kích thước thật của các phần tử có thuộc tính này (docs/TECH.md mục 11).

export type ButtonVariant = 'primary' | 'secondary' | 'quiet';

interface LookProps {
  variant?: ButtonVariant;
  /** Chiếm hết chiều ngang. */
  block?: boolean;
  /** Icon đặt trước chữ. */
  icon?: ReactNode;
  className?: string;
}

const classes = ({
  variant = 'secondary',
  block = false,
  className,
}: LookProps): string =>
  [styles.button, styles[variant], block ? styles.block : '', className ?? '']
    .filter(Boolean)
    .join(' ');

export function Button({
  variant,
  block,
  icon,
  className,
  children,
  type = 'button',
  ...rest
}: LookProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type={type}
      data-touch-target
      className={classes({ variant, block, className })}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  block,
  icon,
  className,
  children,
  ...rest
}: LookProps & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      data-touch-target
      className={classes({ variant, block, className })}
      {...rest}
    >
      {icon}
      {children}
    </Link>
  );
}

// Nút chỉ có icon bắt buộc có nhãn cho trình đọc màn hình.
export function IconButton({
  label,
  className,
  children,
  type = 'button',
  ...rest
}: { label: string; className?: string } & ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type={type}
      data-touch-target
      aria-label={label}
      className={[styles.iconButton, className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}

export function IconLink({
  label,
  className,
  children,
  ...rest
}: { label: string; className?: string } & ComponentPropsWithoutRef<
  typeof Link
>) {
  return (
    <Link
      data-touch-target
      aria-label={label}
      className={[styles.iconButton, className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Link>
  );
}
