import { act, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { DragHint } from '@/engine/stage3d/drag-hint';

afterEach(() => vi.useRealTimers());

it('chờ Canvas sẵn sàng rồi mới tính 5 giây; thao tác có thể ẩn ngay', () => {
  vi.useFakeTimers();
  const { rerender, unmount } = render(<DragHint active={false} />);
  act(() => vi.advanceTimersByTime(6000));
  expect(screen.queryByTestId('drag-hint')).not.toBeInTheDocument();
  rerender(<DragHint active />);
  act(() => vi.advanceTimersByTime(4999));
  expect(screen.getByTestId('drag-hint')).toBeInTheDocument();
  act(() => vi.advanceTimersByTime(1));
  expect(screen.queryByTestId('drag-hint')).not.toBeInTheDocument();
  unmount();
  const next = render(<DragHint active />);
  next.rerender(<DragHint active={false} />);
  expect(screen.queryByTestId('drag-hint')).not.toBeInTheDocument();
  expect(vi.getTimerCount()).toBe(0);
});
