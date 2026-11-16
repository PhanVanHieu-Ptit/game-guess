import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { word, tappableWords } from '@/domain/levels/prompt';
import { PromptWordsProvider, usePromptWordTap } from '@/engine/prompt-words';
import { PromptText } from '@/features/game-shell/prompt-text';

afterEach(cleanup);
it('mỗi chữ có mã riêng, gửi đúng chữ cho cảnh và thay listener khi chơi lại', () => {
  const first = vi.fn(),
    second = vi.fn();
  function Scene({ tap }: { tap: typeof first }) {
    usePromptWordTap(tap);
    return null;
  }
  const view = (epoch: number, tap: typeof first) => (
    <PromptWordsProvider key={epoch}>
      <PromptText
        prompt={['Chạm ', word('đây'), ': ', ...tappableWords('trời trời')]}
      />
      <Scene tap={tap} />
    </PromptWordsProvider>
  );
  const rendered = render(view(0, first));
  fireEvent.click(screen.getByRole('button', { name: 'đây' }));
  expect(first).toHaveBeenLastCalledWith({ id: 'day', text: 'đây', index: 0 });
  fireEvent.click(screen.getAllByRole('button', { name: 'trời' })[1]);
  expect(first).toHaveBeenLastCalledWith({
    id: 'troi-2',
    text: 'trời',
    index: 2,
  });
  rendered.rerender(view(1, second));
  fireEvent.click(screen.getByRole('button', { name: 'đây' }));
  expect(first).toHaveBeenCalledTimes(2);
  expect(second).toHaveBeenCalledTimes(1);
});
