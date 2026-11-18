import { act, cleanup, fireEvent, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useQuietWait } from '@/engine/input/use-quiet-wait';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
  document.querySelectorAll('dialog').forEach((dialog) => dialog.remove());
});

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));

describe('đợi yên liên tục', () => {
  it('đủ sáu giây mới hoàn tất, chỉ gọi một lần kể cả sau restart', () => {
    const onComplete = vi.fn();
    const hook = renderHook(() => useQuietWait(onComplete));
    advance(5999);
    expect(onComplete).not.toHaveBeenCalled();
    expect(hook.result.current.finished).toBe(false);
    advance(1);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(hook.result.current.finished).toBe(true);
    act(() => hook.result.current.restart());
    advance(6000);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('rerender giữ thời gian đang đợi nhưng gọi callback mới nhất', () => {
    const first = vi.fn();
    const latest = vi.fn();
    const hook = renderHook(({ done }) => useQuietWait(done), {
      initialProps: { done: first },
    });
    const restart = hook.result.current.restart;
    advance(5000);
    hook.rerender({ done: latest });
    expect(hook.result.current.restart).toBe(restart);
    advance(1000);
    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });

  it.each(['pointerdown', 'touchstart', 'click', 'keydown'])(
    '%s ở bất cứ đâu trên trang bắt đầu lại đủ sáu giây',
    (eventName) => {
      const onComplete = vi.fn();
      renderHook(() => useQuietWait(onComplete));
      advance(5000);
      fireEvent(document.body, new Event(eventName, { bubbles: true }));
      advance(5999);
      expect(onComplete).not.toHaveBeenCalled();
      advance(1);
      expect(onComplete).toHaveBeenCalledTimes(1);
    },
  );

  it('rê chuột và cuộn trang không làm mất khoảng yên', () => {
    const onComplete = vi.fn();
    renderHook(() => useQuietWait(onComplete));
    advance(5000);
    fireEvent.pointerMove(document.body);
    fireEvent.scroll(document.body);
    advance(1000);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('ẩn tab hủy thời gian, hiện lại phải đợi đủ sáu giây mới', () => {
    const visibility = vi.spyOn(document, 'visibilityState', 'get');
    visibility.mockReturnValue('visible');
    const onComplete = vi.fn();
    renderHook(() => useQuietWait(onComplete));
    advance(5000);
    visibility.mockReturnValue('hidden');
    fireEvent(document, new Event('visibilitychange'));
    advance(60_000);
    expect(onComplete).not.toHaveBeenCalled();
    visibility.mockReturnValue('visible');
    fireEvent(document, new Event('visibilitychange'));
    advance(5999);
    expect(onComplete).not.toHaveBeenCalled();
    advance(1);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('hộp thoại mở thì dừng, đóng lại mới tính đủ sáu giây', async () => {
    const onComplete = vi.fn();
    renderHook(() => useQuietWait(onComplete));
    const dialog = document.createElement('dialog');
    document.body.append(dialog);
    advance(5000);
    await act(async () => dialog.setAttribute('open', ''));
    advance(60_000);
    expect(onComplete).not.toHaveBeenCalled();
    await act(async () => dialog.removeAttribute('open'));
    advance(5999);
    expect(onComplete).not.toHaveBeenCalled();
    advance(1);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('có hộp thoại ngay khi mount thì đợi đến khi hộp bị gỡ', async () => {
    const dialog = document.createElement('dialog');
    dialog.setAttribute('open', '');
    document.body.append(dialog);
    const onComplete = vi.fn();
    renderHook(() => useQuietWait(onComplete));
    advance(60_000);
    expect(onComplete).not.toHaveBeenCalled();
    await act(async () => dialog.remove());
    advance(6000);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('restart thủ công tính lại và unmount không để lại timer', () => {
    const onComplete = vi.fn();
    const hook = renderHook(() => useQuietWait(onComplete));
    advance(5000);
    act(() => hook.result.current.restart());
    advance(5000);
    expect(onComplete).not.toHaveBeenCalled();
    hook.unmount();
    fireEvent.click(document.body);
    advance(60_000);
    expect(onComplete).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });
});
