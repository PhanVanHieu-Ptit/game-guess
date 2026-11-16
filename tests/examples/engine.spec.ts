import { test, expect } from '../e2e/fixtures';
import { expectLayoutOk } from '../e2e/helpers/layout';

test('hai file của màn chữ: tự vào catalog, chạm chữ, đo lường, chơi lại ở thanh dưới', async ({
  page,
  events,
}) => {
  await page.goto('/play/2d-word');
  await expect(page.getByRole('heading', { name: 'Màn 3 / 4' })).toBeVisible();
  const words = page
    .getByTestId('prompt')
    .getByRole('button', { name: 'Tết', exact: true });
  await expect(words).toHaveCount(2);
  await expectLayoutOk(page, 'đề chạm được');
  await words.first().click();
  await expect(page.getByTestId('feedback')).toBeVisible();
  await page
    .locator('footer')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .click();
  await words.nth(1).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(events.filter((event) => event.type === 'level_start')).toHaveLength(
    2,
  );
  expect(events.filter((event) => event.type === 'level_abandon')).toHaveLength(
    1,
  );
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toHaveLength(1);
});

test('hai file của màn 3D: WebGL thật, nút chạm đổi góc, reset và giải theo hướng nhìn', async ({
  page,
  guard,
  browserName,
}, testInfo) => {
  // Thông báo driver của Chromium headless khi compositor đọc framebuffer; không phải lỗi JS/WebGL của game.
  if (browserName === 'chromium')
    guard.allow(/GL Driver Message .*GPU stall due to ReadPixels/);
  await page.goto('/play/3d-view');
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  await expect(
    page.getByRole('group', { name: 'Khu vực chơi 3D', exact: true }),
  ).toHaveAttribute('aria-busy', 'false');
  await expect(
    page.getByRole('button', { name: 'Về góc ban đầu' }),
  ).toBeVisible();
  await expectLayoutOk(page, 'sân 3D');
  await canvas.evaluate((element) => {
    const gl = (element as HTMLCanvasElement).getContext('webgl2');
    if (!gl) throw new Error('Ví dụ phải tạo được WebGL2 thật');
    const draw = gl.drawElements.bind(gl);
    const counter = { count: 0 };
    Object.defineProperty(window, '__engineDraws', { value: counter });
    gl.drawElements = (
      ...args: Parameters<WebGL2RenderingContext['drawElements']>
    ) => {
      counter.count++;
      draw(...args);
    };
  });
  await page.screenshot({ path: testInfo.outputPath('scene-3d.png') });
  // Quay bằng nút chạm, không cần kéo hoặc cảm biến.
  for (let i = 0; i < 2; i++)
    await page.getByRole('button', { name: 'Trái', exact: true }).click();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as { __engineDraws: { count: number } })
            .__engineDraws.count,
      ),
    )
    .toBeGreaterThan(0);
  await page.waitForTimeout(200);
  const draws = await page.evaluate(
    () =>
      (window as unknown as { __engineDraws: { count: number } }).__engineDraws
        .count,
  );
  await page.waitForTimeout(250);
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { __engineDraws: { count: number } })
          .__engineDraws.count,
    ),
  ).toBe(draws);
  await page.getByRole('button', { name: 'Về góc ban đầu' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  for (let i = 0; i < 3; i++)
    await page.getByRole('button', { name: 'Trái', exact: true }).click();
  for (let i = 0; i < 2; i++)
    await page.getByRole('button', { name: 'Xuống', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('tự hạ DPR và bóng khi FPS thấp trong lúc xoay', async ({
  page,
  guard,
  browserName,
}) => {
  if (browserName === 'chromium')
    guard.allow(/GL Driver Message .*GPU stall due to ReadPixels/);
  // next dev phát preload chung và CSS riêng cho cùng UI; cảnh đứng lâu làm trình duyệt báo preload chung chưa dùng.
  // Ngoại lệ chỉ cho resource hint CSS của Next dev, không áp cho JS, request lỗi hay production.
  if (process.env.E2E_DEV === '1')
    guard.allow(
      /The resource http:\/\/localhost:3100\/_next\/static\/chunks\/src_features_ui_[\w.-]+\.css was preloaded using link preload but not used/,
    );
  // Mô phỏng máy yếu: không phải số đo hiệu năng trên điện thoại thật.
  await page.addInitScript(() => {
    window.requestAnimationFrame = (callback) =>
      window.setTimeout(() => callback(performance.now()), 60);
    window.cancelAnimationFrame = (id) => window.clearTimeout(id);
  });
  await page.goto('/play/3d-view');
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  await expect(
    page.getByRole('group', { name: 'Khu vực chơi 3D', exact: true }),
  ).toHaveAttribute('aria-busy', 'false');
  const box = await canvas.boundingBox();
  if (!box) throw new Error('Thiếu sân 3D');
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  try {
    for (let i = 1; i <= 48; i++) {
      await page.mouse.move(
        box.x + box.width / 2 + Math.sin(i / 4) * 40,
        box.y + box.height / 2,
      );
      await page.waitForTimeout(65);
    }
  } finally {
    await page.mouse.up();
  }
  await expect(page.locator('[data-quality="low"]')).toBeVisible();
  const resolution = await canvas.evaluate((node) => ({
    pixels: (node as HTMLCanvasElement).width,
    css: node.clientWidth,
  }));
  expect(resolution.pixels).toBeLessThanOrEqual(resolution.css + 1);
});
