import type { Locator, Page } from '@playwright/test';
import { strings } from '@/features/strings';
import { LEVEL_METAS } from '@/levels';

// Cách tìm các phần tử giao diện dùng chung giữa các spec. Chữ lấy từ `strings` (nguồn duy nhất của chữ hiển thị)
// nên sửa câu chữ không làm vỡ test; test kiểm hành vi chứ không kiểm chính tả của câu chữ.

export const TOTAL_LEVELS = LEVEL_METAS.length;

export const home = {
  play: (page: Page): Locator =>
    page.getByRole('link', { name: strings.home.play, exact: true }),
  playContinue: (page: Page): Locator =>
    page.getByRole('link', {
      name: new RegExp(`^${strings.home.playContinue}`),
    }),
  playAgain: (page: Page): Locator =>
    page.getByRole('link', { name: strings.home.playAgain, exact: true }),
  daily: (page: Page): Locator =>
    page.getByRole('link', { name: new RegExp(`^${strings.home.daily}`) }),
  levels: (page: Page): Locator =>
    page.getByRole('link', { name: strings.home.levels, exact: true }),
};

export const play = {
  heading: (page: Page, ordinal: number): Locator =>
    page.getByRole('heading', {
      name: strings.play.levelOf(ordinal, TOTAL_LEVELS),
    }),
  prompt: (page: Page): Locator => page.getByTestId('prompt'),
  feedback: (page: Page): Locator => page.getByTestId('feedback'),
  hintButton: (page: Page): Locator =>
    page.getByRole('button', { name: /^Gợi ý \(\d\/3\)$/ }),
  /** Nút "Chơi lại" trên thanh trên của màn (không nhầm với nút cùng tên trong hộp kết quả). */
  restart: (page: Page): Locator =>
    page.locator('header').getByRole('button', { name: strings.play.restart }),
  back: (page: Page): Locator =>
    page.locator('header').getByRole('link', { name: strings.play.back }),
};

export const hints = {
  sheet: (page: Page): Locator =>
    page.getByRole('dialog', { name: strings.hints.title }),
  open: (page: Page, tier: 1 | 2 | 3): Locator =>
    hints
      .sheet(page)
      .getByRole('button', { name: strings.hints.open[tier - 1], exact: true }),
  close: (page: Page): Locator =>
    hints.sheet(page).getByRole('button', { name: strings.hints.close }),
};

export const result = {
  dialog: (page: Page): Locator =>
    page.getByRole('dialog', { name: strings.result.dialogLabel }),
  next: (page: Page): Locator =>
    result.dialog(page).getByRole('link', { name: strings.result.next }),
  backToLevels: (page: Page): Locator =>
    result
      .dialog(page)
      .getByRole('link', { name: strings.result.backToLevels }),
  restart: (page: Page): Locator =>
    result.dialog(page).getByRole('button', { name: strings.result.restart }),
};

export const levelCell = (
  page: Page,
  ordinal: number,
  state: 'locked' | 'open' | 'solved' | 'revealed',
): Locator =>
  page.getByLabel(strings.levels.cell(ordinal, state), { exact: true });
