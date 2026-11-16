import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useShake } from '@/engine/input/use-shake';
import { useTilt } from '@/engine/input/use-tilt';
import { SensorControls } from '@/engine/input/sensor-controls';
import { TypedAnswer } from '@/engine/stage2d/scenes/typed-answer';

function Shake({ onShake }: { onShake(): void }) {
  const sensor = useShake(onShake);
  return <SensorControls sensor={sensor} label="Lắc" />;
}
function motion(values: Record<string, unknown>) {
  window.dispatchEvent(Object.assign(new Event('devicemotion'), values));
}
function orientation(beta: number | null, gamma: number | null) {
  window.dispatchEvent(
    Object.assign(new Event('deviceorientation'), { beta, gamma }),
  );
}
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('cảm biến có đường chạm', () => {
  it('iPhone: không xin quyền khi mount; chỉ xin sau chạm, từ chối vẫn dùng nút Lắc', async () => {
    const requestPermission = vi.fn().mockResolvedValue('denied');
    vi.stubGlobal('DeviceMotionEvent', { requestPermission });
    const onShake = vi.fn();
    render(<Shake onShake={onShake} />);
    expect(requestPermission).not.toHaveBeenCalled();
    expect(screen.getByText(/Cho phép cảm biến/)).toBeVisible();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Bật cảm biến' }));
    });
    expect(requestPermission).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('status')).toHaveTextContent('chưa cho phép');
    fireEvent.click(screen.getByRole('button', { name: 'Lắc' }));
    expect(onShake).toHaveBeenCalledTimes(1);
  });
  it('thiếu API hoặc lỗi xin quyền đều còn nút thay thế', async () => {
    vi.stubGlobal('DeviceMotionEvent', undefined);
    const onShake = vi.fn();
    const { unmount } = render(<Shake onShake={onShake} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bật cảm biến' }));
    expect(screen.getByRole('status')).toHaveTextContent('không gửi dữ liệu');
    fireEvent.click(screen.getByRole('button', { name: 'Lắc' }));
    expect(onShake).toHaveBeenCalledTimes(1);
    unmount();
    vi.stubGlobal('DeviceMotionEvent', {
      requestPermission: vi.fn().mockRejectedValue(new Error('blocked')),
    });
    const hook = renderHook(() => useShake(onShake));
    await act(async () => {
      await hook.result.current.enable();
    });
    expect(hook.result.current.status).toBe('denied');
  });
  it('xin quyền xong nhưng không có dữ liệu thì tự chuyển sang thông báo dùng chạm', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('DeviceMotionEvent', {});
    const hook = renderHook(() => useShake(vi.fn()));
    await act(async () => {
      await hook.result.current.enable();
    });
    act(() => {
      motion({ acceleration: { x: null, y: null, z: null } });
      vi.advanceTimersByTime(2500);
    });
    expect(hook.result.current.status).toBe('unsupported');
  });
  it('lắc: bỏ rung nhẹ, chống lặp, không tính trọng lực đứng yên, dọn listener khi gỡ', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('DeviceMotionEvent', {});
    const onShake = vi.fn();
    const hook = renderHook(() => useShake(onShake));
    await act(async () => {
      await hook.result.current.enable();
    });
    act(() => {
      motion({ accelerationIncludingGravity: { x: 0, y: 0, z: 9.81 } });
      motion({ accelerationIncludingGravity: { x: 0, y: 0, z: 9.81 } });
      motion({ acceleration: { x: 2, y: 1, z: 0 } });
    });
    expect(onShake).not.toHaveBeenCalled();
    act(() => {
      motion({ acceleration: { x: 18, y: 0, z: 0 } });
      motion({ acceleration: { x: -18, y: 0, z: 0 } });
    });
    expect(onShake).toHaveBeenCalledTimes(1);
    act(() => {
      vi.advanceTimersByTime(801);
      motion({ acceleration: { x: 18, y: 0, z: 0 } });
    });
    expect(onShake).toHaveBeenCalledTimes(2);
    hook.unmount();
    motion({ acceleration: { x: 20, y: 0, z: 0 } });
    expect(onShake).toHaveBeenCalledTimes(2);
  });
  it('nghiêng: quyền sau chạm, góc tương đối, bỏ vùng chết và đường chạm tương đương', async () => {
    const requestPermission = vi.fn().mockResolvedValue('granted');
    vi.stubGlobal('DeviceOrientationEvent', { requestPermission });
    const onTilt = vi.fn();
    const hook = renderHook(() => useTilt(onTilt));
    expect(requestPermission).not.toHaveBeenCalled();
    await act(async () => {
      await hook.result.current.enable();
    });
    act(() => {
      orientation(null, null);
      orientation(20, 10);
      orientation(21, 11);
    });
    expect(onTilt).not.toHaveBeenCalled();
    act(() => {
      orientation(25, 30);
    });
    expect(onTilt).toHaveBeenLastCalledWith({ x: 20, y: 5 });
    act(() => hook.result.current.fallbackProps.onClick());
    expect(onTilt).toHaveBeenLastCalledWith({ x: 30, y: 0 });
  });
});

describe('ô đáp án dùng chung', () => {
  it('bỏ trống không tính sai, gõ không dấu khớp alias và chỉ báo thắng một lần', () => {
    const onSolved = vi.fn(),
      onWrong = vi.fn(),
      onProgress = vi.fn();
    render(
      <TypedAnswer
        accepted={['con cua', 'cua biển']}
        onSolved={onSolved}
        onWrong={onWrong}
        onProgress={onProgress}
      />,
    );
    const input = screen.getByLabelText('Đáp án của bạn');
    const submit = screen.getByRole('button', { name: 'Trả lời' });
    fireEvent.click(submit);
    expect(onWrong).not.toHaveBeenCalled();
    expect(screen.getByRole('status')).toHaveTextContent('chưa nhập');
    fireEvent.change(input, { target: { value: 'cá' } });
    fireEvent.click(submit);
    expect(onWrong).toHaveBeenCalledTimes(1);
    fireEvent.change(input, { target: { value: ' CUA BIEN ' } });
    fireEvent.click(submit);
    fireEvent.click(submit);
    expect(onSolved).toHaveBeenCalledTimes(1);
    expect(input).toBeDisabled();
    expect(onProgress).toHaveBeenCalledTimes(2);
  });
});

it('không chấm giữa lúc bộ gõ IME đang ghép chữ', () => {
  const onSolved = vi.fn(),
    onWrong = vi.fn();
  render(
    <TypedAnswer
      accepted={['cua']}
      onSolved={onSolved}
      onWrong={onWrong}
      onProgress={() => {}}
    />,
  );
  const input = screen.getByLabelText('Đáp án của bạn');
  fireEvent.compositionStart(input);
  fireEvent.change(input, { target: { value: 'cua' } });
  fireEvent.submit(input.closest('form')!);
  expect(onSolved).not.toHaveBeenCalled();
  expect(onWrong).not.toHaveBeenCalled();
  fireEvent.compositionEnd(input);
  fireEvent.submit(input.closest('form')!);
  expect(onSolved).toHaveBeenCalledTimes(1);
});
