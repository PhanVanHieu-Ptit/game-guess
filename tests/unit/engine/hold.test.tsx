import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useHold } from '@/engine/input/use-hold';

function Demo({
  onComplete,
  onRelease,
  onStart,
  railKey = 0,
}: {
  onComplete(): void;
  onRelease?(): void;
  onStart?(): void;
  railKey?: number;
}) {
  const hold = useHold(onComplete, { onRelease, onStart });
  return (
    <svg>
      <g
        key={railKey}
        {...hold.holdProps}
        aria-label="Tay vịn"
        data-progress={hold.progress}
        data-finished={hold.finished}
      >
        <rect width={100} height={60} />
      </g>
    </svg>
  );
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal(
    'PointerEvent',
    class extends MouseEvent {
      pointerId: number;
      isPrimary: boolean;
      constructor(type: string, init: PointerEventInit = {}) {
        super(type, init);
        this.pointerId = init.pointerId ?? 1;
        this.isPrimary = init.isPrimary ?? true;
      }
    },
  );
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  document.querySelectorAll('dialog').forEach((dialog) => dialog.remove());
});

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));
const rail = () => screen.getByRole('button', { name: 'Tay vịn' });

function pointerDown(pointerId = 1) {
  const target = rail();
  Object.defineProperties(target, {
    setPointerCapture: { value: vi.fn(), configurable: true },
    hasPointerCapture: { value: () => true, configurable: true },
    releasePointerCapture: { value: vi.fn(), configurable: true },
  });
  fireEvent.pointerDown(target, { pointerId });
}

describe('giữ liên tục bằng chạm', () => {
  it('giữ đủ bốn giây mới hoàn tất, tăng tiến trình và chỉ báo đúng một lần', () => {
    const onComplete = vi.fn();
    const onRelease = vi.fn();
    const onStart = vi.fn();
    render(
      <Demo onComplete={onComplete} onRelease={onRelease} onStart={onStart} />,
    );
    pointerDown();
    expect(onStart).toHaveBeenCalledTimes(1);
    expect(rail()).toHaveAttribute('data-finished', 'false');
    expect(rail()).toHaveAttribute('aria-pressed', 'true');
    expect(rail().setPointerCapture).toHaveBeenCalledWith(1);
    advance(1000);
    expect(rail()).toHaveAttribute('data-progress', '0.25');
    advance(2999);
    expect(onComplete).not.toHaveBeenCalled();
    advance(1);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(rail()).toHaveAttribute('aria-pressed', 'false');
    expect(rail()).toHaveAttribute('data-progress', '1');
    expect(rail()).toHaveAttribute('data-finished', 'true');
    fireEvent.pointerUp(rail(), { pointerId: 1 });
    pointerDown();
    advance(4000);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onRelease).not.toHaveBeenCalled();
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('thả sớm có phản hồi, không cộng dồn nhiều lần giữ', () => {
    const onComplete = vi.fn();
    const onRelease = vi.fn();
    render(<Demo onComplete={onComplete} onRelease={onRelease} />);
    pointerDown();
    advance(2500);
    fireEvent.pointerUp(document.body, { pointerId: 1 });
    expect(onRelease).toHaveBeenCalledTimes(1);
    expect(rail()).toHaveAttribute('data-progress', '0');
    pointerDown();
    advance(3999);
    expect(onComplete).not.toHaveBeenCalled();
    advance(1);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it.each(['pointerCancel', 'lostPointerCapture'] as const)(
    '%s hủy giữ và không tự tiếp tục sau đó',
    (eventName) => {
      const onComplete = vi.fn();
      const onRelease = vi.fn();
      render(<Demo onComplete={onComplete} onRelease={onRelease} />);
      pointerDown();
      advance(3000);
      fireEvent[eventName](rail(), { pointerId: 1 });
      advance(10_000);
      expect(onComplete).not.toHaveBeenCalled();
      expect(onRelease).not.toHaveBeenCalled();
      expect(rail()).toHaveAttribute('data-progress', '0');
      expect(rail()).toHaveAttribute('aria-pressed', 'false');
    },
  );

  it('bỏ qua ngón khác và chuột phải trong lúc giữ', () => {
    const onComplete = vi.fn();
    const onRelease = vi.fn();
    render(<Demo onComplete={onComplete} onRelease={onRelease} />);
    fireEvent.pointerDown(rail(), { button: 2 });
    advance(4000);
    expect(onComplete).not.toHaveBeenCalled();
    pointerDown();
    advance(2000);
    fireEvent.pointerDown(rail(), { pointerId: 2, isPrimary: false });
    fireEvent.pointerUp(document.body, { pointerId: 2 });
    advance(2000);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onRelease).not.toHaveBeenCalled();
  });

  it('đổi callback khi rerender không đặt lại thời gian giữ', () => {
    const first = vi.fn();
    const latest = vi.fn();
    const view = render(<Demo onComplete={first} />);
    pointerDown();
    advance(3000);
    view.rerender(<Demo onComplete={latest} />);
    advance(1000);
    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });

  it('ẩn tab hoặc mất nét hủy giữ, hiện lại phải nhấn giữ mới', () => {
    const visibility = vi.spyOn(document, 'visibilityState', 'get');
    visibility.mockReturnValue('visible');
    const onComplete = vi.fn();
    render(<Demo onComplete={onComplete} />);
    pointerDown();
    advance(3000);
    visibility.mockReturnValue('hidden');
    fireEvent(document, new Event('visibilitychange'));
    visibility.mockReturnValue('visible');
    fireEvent(document, new Event('visibilitychange'));
    advance(10_000);
    expect(onComplete).not.toHaveBeenCalled();
    pointerDown();
    advance(3000);
    fireEvent(window, new Event('blur'));
    advance(10_000);
    expect(onComplete).not.toHaveBeenCalled();
    expect(rail()).toHaveAttribute('data-progress', '0');
  });

  it('mở hộp thoại hủy giữ; đóng không tự khôi phục; không bắt đầu khi hộp đang mở', async () => {
    const onComplete = vi.fn();
    render(<Demo onComplete={onComplete} />);
    pointerDown();
    advance(3000);
    const dialog = document.createElement('dialog');
    dialog.setAttribute('open', '');
    await act(async () => document.body.append(dialog));
    pointerDown();
    advance(10_000);
    expect(onComplete).not.toHaveBeenCalled();
    await act(async () => dialog.remove());
    advance(10_000);
    expect(onComplete).not.toHaveBeenCalled();
    pointerDown();
    advance(4000);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('Enter/Space giữ được, lặp phím không reset và thả sớm có phản hồi', () => {
    const onComplete = vi.fn();
    const onRelease = vi.fn();
    render(<Demo onComplete={onComplete} onRelease={onRelease} />);
    fireEvent.keyDown(rail(), { key: 'Enter' });
    advance(1000);
    fireEvent.keyUp(rail(), { key: 'Enter' });
    expect(onRelease).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(rail(), { key: ' ' });
    advance(3000);
    fireEvent.keyDown(rail(), { key: ' ', repeat: true });
    advance(1000);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('unmount dọn timer/listener và không báo hoàn tất hoặc thả sớm', () => {
    const onComplete = vi.fn();
    const onRelease = vi.fn();
    const view = render(<Demo onComplete={onComplete} onRelease={onRelease} />);
    pointerDown();
    advance(3000);
    view.unmount();
    fireEvent.pointerUp(document.body, { pointerId: 1 });
    advance(10_000);
    expect(onComplete).not.toHaveBeenCalled();
    expect(onRelease).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('vùng giữ bị dựng lại trong khi hook còn gắn thì hủy gesture cũ', () => {
    const onComplete = vi.fn();
    const onRelease = vi.fn();
    const view = render(
      <Demo onComplete={onComplete} onRelease={onRelease} railKey={0} />,
    );
    pointerDown();
    advance(3000);
    const previousRail = rail();
    view.rerender(
      <Demo onComplete={onComplete} onRelease={onRelease} railKey={1} />,
    );
    expect(previousRail.isConnected).toBe(false);
    advance(100);
    expect(rail()).toHaveAttribute('aria-pressed', 'false');
    expect(rail()).toHaveAttribute('data-progress', '0');
    advance(5000);
    expect(onComplete).not.toHaveBeenCalled();
    expect(onRelease).not.toHaveBeenCalled();
    pointerDown();
    advance(4000);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
