import { useRef } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { useDrag } from '@/engine/input/use-drag';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
function Demo({
  onDrop,
  onMiss = () => {},
}: {
  onDrop(): void;
  onMiss?(): void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useDrag({
    svgRef,
    initialPosition: { x: 20, y: 20 },
    target: { x: 100, y: 100, width: 60, height: 60 },
    onDrop,
    onMiss,
  });
  return (
    <svg ref={svgRef} viewBox="0 0 200 200">
      <circle
        aria-label="Vật"
        {...drag.dragProps}
        cx={drag.position.x}
        cy={drag.position.y}
        r={22}
      />
      <rect
        aria-label="Đích"
        {...drag.targetProps}
        x={100}
        y={100}
        width={60}
        height={60}
      />
    </svg>
  );
}
it('chỉ chạm: chọn vật rồi chạm đích, không tự thắng nếu chưa chọn', () => {
  const onDrop = vi.fn();
  render(<Demo onDrop={onDrop} />);
  fireEvent.click(screen.getByLabelText('Đích'));
  expect(onDrop).not.toHaveBeenCalled();
  fireEvent.click(screen.getByLabelText('Vật'));
  fireEvent.click(screen.getByLabelText('Đích'));
  fireEvent.click(screen.getByLabelText('Đích'));
  expect(onDrop).toHaveBeenCalledTimes(1);
  expect(screen.getByLabelText('Vật')).toHaveAttribute('cx', '130');
});
it('đổi đúng tọa độ SVG khi co 2×; thả trượt và pointercancel trở về ban đầu', () => {
  vi.stubGlobal(
    'PointerEvent',
    class extends MouseEvent {
      pointerId = 1;
      isPrimary = true;
    },
  );
  const onDrop = vi.fn(),
    onMiss = vi.fn();
  render(<Demo onDrop={onDrop} onMiss={onMiss} />);
  const source = screen.getByLabelText('Vật');
  const svg = (source as unknown as SVGElement).ownerSVGElement!;
  Object.defineProperty(svg, 'getScreenCTM', {
    value: () => ({ inverse: () => ({}) }),
  });
  Object.defineProperty(svg, 'createSVGPoint', {
    value: () => ({
      x: 0,
      y: 0,
      matrixTransform() {
        return { x: this.x / 2, y: this.y / 2 };
      },
    }),
  });
  Object.defineProperties(source, {
    setPointerCapture: { value: vi.fn() },
    hasPointerCapture: { value: () => true },
    releasePointerCapture: { value: vi.fn() },
  });
  fireEvent.pointerDown(source, { clientX: 40, clientY: 40 });
  fireEvent.pointerMove(source, { clientX: 80, clientY: 80 });
  fireEvent.pointerCancel(source);
  expect(source).toHaveAttribute('cx', '20');
  expect(onDrop).not.toHaveBeenCalled();
  fireEvent.pointerDown(source, { clientX: 40, clientY: 40 });
  fireEvent.pointerMove(source, { clientX: 80, clientY: 80 });
  fireEvent.pointerUp(source, { clientX: 80, clientY: 80 });
  expect(onMiss).toHaveBeenCalledTimes(1);
  expect(source).toHaveAttribute('cx', '20');
  fireEvent.pointerDown(source, { clientX: 40, clientY: 40 });
  fireEvent.pointerMove(source, { clientX: 260, clientY: 260 });
  fireEvent.pointerUp(source, { clientX: 260, clientY: 260 });
  expect(onDrop).toHaveBeenCalledTimes(1);
  expect(source).toHaveAttribute('cx', '130');
});
