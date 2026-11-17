import { fireEvent, render, screen, within } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { NumberPad } from '@/engine/input/number-pad';

it('bàn phím chạm: rỗng không gửi, giới hạn số chữ số, sửa rồi gửi lại', () => {
  const onSubmit = vi.fn();
  render(
    <NumberPad
      label="Nhập số nhà"
      maxDigits={2}
      onSubmit={onSubmit}
      onProgress={() => {}}
    />,
  );
  fireEvent.click(screen.getByText('Nhập số nhà'));
  const keys = within(screen.getByRole('group', { name: 'Bàn phím số' }));
  expect(keys.getByRole('button', { name: 'Gửi' })).toBeDisabled();
  for (const digit of ['6', '3', '5'])
    fireEvent.click(keys.getByRole('button', { name: digit }));
  expect(screen.getByLabelText('Số nhà')).toHaveTextContent('63');
  fireEvent.click(keys.getByRole('button', { name: 'Gửi' }));
  expect(onSubmit).toHaveBeenLastCalledWith('63');
  for (let i = 0; i < 2; i++)
    fireEvent.click(keys.getByRole('button', { name: 'Xóa' }));
  fireEvent.click(keys.getByRole('button', { name: '3' }));
  fireEvent.click(keys.getByRole('button', { name: '6' }));
  fireEvent.click(keys.getByRole('button', { name: 'Gửi' }));
  expect(onSubmit).toHaveBeenLastCalledWith('36');
});

it('khóa nhập và gửi sau khi màn đã thắng', () => {
  const onSubmit = vi.fn();
  render(
    <NumberPad
      label="Nhập số nhà"
      maxDigits={2}
      disabled
      onSubmit={onSubmit}
      onProgress={() => {}}
    />,
  );
  fireEvent.click(screen.getByText('Nhập số nhà'));
  for (const button of screen.getAllByRole('button'))
    expect(button).toBeDisabled();
  expect(onSubmit).not.toHaveBeenCalled();
});

it('dùng nhãn số bánh riêng và nhập một chữ số cho màn đếm bánh', () => {
  const onSubmit = vi.fn();
  render(
    <NumberPad
      label="Nhập số bánh"
      valueLabel="Số bánh"
      maxDigits={1}
      onSubmit={onSubmit}
      onProgress={() => {}}
    />,
  );
  fireEvent.click(screen.getByText('Nhập số bánh'));
  expect(screen.getByLabelText('Số bánh')).toHaveTextContent('—');
  fireEvent.click(screen.getByRole('button', { name: '5' }));
  expect(screen.getByRole('button', { name: '4' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Gửi' }));
  expect(onSubmit).toHaveBeenCalledWith('5');
});
