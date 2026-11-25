# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: level-3d-01.spec.ts >> 3D-01: máy chậm tự hạ chất lượng và hướng dẫn tôn trọng giảm chuyển động
- Location: tests/e2e/level-3d-01.spec.ts:210:20

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-quality="low"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('[data-quality="low"]') with timeout 5000ms
  - waiting for locator('[data-quality="low"]')

```

```yaml
- main:
  - link "Về chọn màn":
    - /url: /levels
  - heading "Màn 8 / 42" [level=1]
  - button "Chơi lại"
  - region "Hành trình lắt léo":
    - paragraph: Đừng tin mắt mình
    - strong: 1/6
  - paragraph: Shipper đang tìm nhà, mặt tiền không thấy số. Nhà số mấy?
  - status
  - group "Ngôi nhà ống có sân thượng"
  - group "Điều khiển góc nhìn":
    - button "Trái"
    - button "Phải"
    - button "Lên"
    - button "Xuống"
    - button "Gần"
    - button "Xa"
    - button "Về góc ban đầu"
  - paragraph: Nhà có nhiều mặt. Kéo một ngón để nhìn quanh.
  - group: Nhập số nhà
  - paragraph: Shipper gọi lần thứ ba rồi. Địa chỉ có thật mà!
  - button "Gợi ý (0/3)"
  - button "Chơi lại"
- alert
```

# Test source

```ts
  138 |     .getByRole('button', { name: 'Chơi lại', exact: true })
  139 |     .tap();
  140 |   await expect(page.locator('[data-number-readable]')).toHaveAttribute(
  141 |     'data-number-readable',
  142 |     'false',
  143 |   );
  144 |   await solution.solve(page);
  145 |   await expect(page.getByRole('dialog')).toBeVisible();
  146 |   expect(
  147 |     events.filter((event) => event.type === 'level_complete'),
  148 |   ).toHaveLength(2);
  149 | });
  150 | 
  151 | test('3D-01: đo ngân sách toàn bộ lượt vẽ và tải 3D đầu tiên sau trang chủ', async ({
  152 |   page,
  153 |   browserName,
  154 | }, info) => {
  155 |   test.setTimeout(60_000);
  156 |   await page.goto('/');
  157 |   await page.waitForLoadState('networkidle');
  158 |   const baseline = await page.evaluate(() =>
  159 |     performance.getEntriesByType('resource').map((entry) => entry.name),
  160 |   );
  161 |   // Trang chủ vừa tạo tiến trình rỗng; dựng lại fixture trước màn 3D, không thay đổi tài nguyên cache.
  162 |   await page.evaluate(() => localStorage.removeItem('latleo:v1'));
  163 |   await openCampaignLevel(page, '3d-01');
  164 |   await expect(
  165 |     page.getByRole('button', { name: 'Về góc ban đầu' }),
  166 |   ).toBeEnabled();
  167 |   await page.waitForLoadState('networkidle');
  168 |   const resources = await page.evaluate(
  169 |     (known) =>
  170 |       [
  171 |         ...performance.getEntriesByType('resource'),
  172 |         ...performance.getEntriesByType('navigation'),
  173 |       ]
  174 |         .filter(
  175 |           (entry): entry is PerformanceResourceTiming =>
  176 |             entry instanceof PerformanceResourceTiming &&
  177 |             !known.includes(entry.name),
  178 |         )
  179 |         .map((entry) => ({
  180 |           url: new URL(entry.name).pathname,
  181 |           encodedBytes: entry.encodedBodySize,
  182 |           transferBytes: entry.transferSize,
  183 |           decodedBytes: entry.decodedBodySize,
  184 |         })),
  185 |     baseline,
  186 |   );
  187 |   const canvas = page.locator('canvas');
  188 |   await expect(canvas).toHaveAttribute('data-draw-calls', /[1-9]\d*/);
  189 |   const samples: {
  190 |     azimuth: string | undefined;
  191 |     polar: string | undefined;
  192 |     calls: number;
  193 |     triangles: number;
  194 |   }[] = [];
  195 |   for (let polar = 0; polar < 3; polar++) {
  196 |     for (let i = 0; i < 36; i++)
  197 |       await page.getByRole('button', { name: 'Trái', exact: true }).tap();
  198 |     for (let i = 0; i < 36; i++) {
  199 |       await page.getByRole('button', { name: 'Phải', exact: true }).tap();
  200 |       samples.push(
  201 |         await canvas.evaluate((node) => ({
  202 |           azimuth: node.dataset.azimuth,
  203 |           polar: node.dataset.polar,
  204 |           calls: Number(node.dataset.drawCalls),
  205 |           triangles: Number(node.dataset.triangles),
  206 |         })),
  207 |       );
  208 |     }
  209 |     const direction = polar === 0 ? 'Lên' : 'Xuống';
  210 |     for (let i = 0; i < 4; i++)
  211 |       await page.getByRole('button', { name: direction, exact: true }).tap();
  212 |   }
  213 |   const report = {
  214 |     browser: browserName,
  215 |     project: info.project.name,
  216 |     resources,
  217 |     encodedBytes: resources.reduce((sum, entry) => sum + entry.encodedBytes, 0),
  218 |     transferBytes: resources.reduce(
  219 |       (sum, entry) => sum + entry.transferBytes,
  220 |       0,
  221 |     ),
  222 |     maxDrawCalls: Math.max(...samples.map((sample) => sample.calls)),
  223 |     maxTriangles: Math.max(...samples.map((sample) => sample.triangles)),
  224 |     samples,
  225 |   };
  226 |   await writeFile(
  227 |     info.outputPath('3d-01-budget.json'),
  228 |     JSON.stringify(report, null, 2),
  229 |   );
  230 |   expect(report.maxDrawCalls).toBeGreaterThan(0);
  231 |   expect(report.maxDrawCalls).toBeLessThan(50);
  232 |   if (browserName === 'chromium') {
  233 |     expect(report.encodedBytes).toBeGreaterThan(0);
  234 |     expect(report.transferBytes).toBeLessThan(1_000_000);
  235 |   }
  236 | });
  237 | 
> 238 | test('3D-01: máy chậm tự hạ chất lượng và hướng dẫn tôn trọng giảm chuyển động', async ({
      |                                                                     ^ Error: expect(locator).toBeVisible() failed
  239 |   page,
  240 | }) => {
  241 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  242 |   await page.addInitScript(() => {
  243 |     window.requestAnimationFrame = (callback) =>
  244 |       window.setTimeout(() => callback(performance.now()), 60);
  245 |     window.cancelAnimationFrame = (id) => window.clearTimeout(id);
  246 |   });
  247 |   await openCampaignLevel(page, '3d-01');
  248 |   await expect(
  249 |     page.getByRole('button', { name: 'Về góc ban đầu' }),
  250 |   ).toBeEnabled();
  251 |   expect(
  252 |     await page
  253 |       .getByTestId('drag-hint')
  254 |       .locator('g')
  255 |       .evaluate((node) => getComputedStyle(node).animationName),
  256 |   ).toBe('none');
  257 |   const canvas = page.locator('canvas');
  258 |   const box = await canvas.boundingBox();
  259 |   if (!box) throw new Error('Thiếu Canvas');
  260 |   await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  261 |   await page.mouse.down();
  262 |   try {
  263 |     for (let i = 1; i <= 38; i++) {
  264 |       await page.mouse.move(
  265 |         box.x + box.width / 2 + Math.sin(i / 4) * 30,
  266 |         box.y + box.height / 2,
  267 |       );
  268 |       await page.waitForTimeout(65);
  269 |     }
  270 |   } finally {
  271 |     await page.mouse.up();
  272 |   }
  273 |   await expect(page.locator('[data-quality="low"]')).toBeVisible();
  274 |   const resolution = await canvas.evaluate((node) => ({
  275 |     pixels: (node as HTMLCanvasElement).width,
  276 |     css: node.clientWidth,
  277 |   }));
  278 |   expect(resolution.pixels).toBeLessThanOrEqual(resolution.css + 1);
  279 |   await solution.solve(page);
  280 |   await expect(page.getByRole('dialog')).toBeVisible();
  281 | });
  282 | 
```