'use client';

import { Component, type ReactNode } from 'react';

interface SceneBoundaryProps {
  /** Hiện khi cảnh ném lỗi hoặc nạp lỗi; nhận hàm "thử lại". */
  fallback: (retry: () => void) => ReactNode;
  /** Gọi trước khi dựng lại cảnh, để xóa bản nạp lười đã hỏng. */
  onRetry: () => void;
  children: ReactNode;
}

interface SceneBoundaryState {
  failed: boolean;
}

/**
 * Error boundary riêng quanh cảnh của một màn (docs/TECH.md mục 3, nguyên tắc 6 "Không sập"): lỗi dựng cảnh hay lỗi
 * nạp mã của một màn không kéo sập khung chơi, người chơi vẫn có nút Thử lại và Về chọn màn.
 */
export class SceneBoundary extends Component<
  SceneBoundaryProps,
  SceneBoundaryState
> {
  state: SceneBoundaryState = { failed: false };

  static getDerivedStateFromError(): SceneBoundaryState {
    return { failed: true };
  }

  private readonly retry = (): void => {
    this.props.onRetry();
    this.setState({ failed: false });
  };

  render(): ReactNode {
    return this.state.failed
      ? this.props.fallback(this.retry)
      : this.props.children;
  }
}
