import { expect, type Page } from '@playwright/test';

/** Đọc vị trí chiếu của vùng chạm; thao tác vẫn đi qua Canvas, raycast và luật chơi như người dùng. */
export async function sceneTarget(page: Page, id: string) {
  const canvas = page.locator('canvas');
  await canvas.scrollIntoViewIfNeeded();
  let attribute: string | null = null;
  await expect
    .poll(async () => {
      attribute = await canvas.getAttribute(`data-target-${id}`);
      return attribute;
    })
    .toMatch(/\{"x":/);
  const target = JSON.parse(attribute!) as {
    x: number;
    y: number;
    minSize: number;
  };
  expect(target.minSize).toBeGreaterThanOrEqual(44);
  const rect = await canvas.boundingBox();
  if (!rect) throw new Error('Canvas chưa có kích thước');
  return { x: rect.x + target.x, y: rect.y + target.y };
}

export async function tapSceneTarget(page: Page, id: string) {
  const point = await sceneTarget(page, id);
  await page.touchscreen.tap(point.x, point.y);
}
