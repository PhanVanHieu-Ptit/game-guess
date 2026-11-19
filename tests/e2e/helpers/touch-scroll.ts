import { expect, type Page } from '@playwright/test';

/** Vuốt cảm ứng thật (khác scrollIntoView của locator), không sửa scrollTop của game. */
export async function swipeStageUp(page: Page) {
  const art = page.getByTestId('puzzle-art').locator('..');
  const stage = art.locator('xpath=../../..');
  const box = await stage.boundingBox();
  if (!box) throw new Error('Thiếu sân chơi để vuốt');
  if (
    await stage.evaluate(
      (element) =>
        element.scrollHeight - element.clientHeight - element.scrollTop < 1,
    )
  )
    return;
  const previous = await stage.evaluate((element) => element.scrollTop);
  const cdp = await page.context().newCDPSession(page);
  try {
    const x = box.x + 8;
    const y = box.y + box.height - 18;
    const distance = Math.min(160, box.height - 36);
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x, y }],
    });
    for (let step = 1; step <= 10; step++) {
      await cdp.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x, y: y - (distance * step) / 10 }],
      });
    }
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    });
    await expect
      .poll(() => stage.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(previous);
  } finally {
    await cdp.detach();
  }
}
