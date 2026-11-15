// Đo gần đúng ngân sách hiệu năng (docs/TECH.md mục 10) trên bản production đang chạy ở BASE_URL.
// Hồ sơ mạng/CPU mô phỏng "Slow 4G" của Lighthouse (RTT 150 ms, 1,6 Mbps xuống, 750 Kbps lên, CPU chậm 4×) bằng CDP.
// ĐÂY LÀ SỐ ĐO GẦN ĐÚNG, không phải Lighthouse thật. Mỗi lượt dùng một context mới (cache lạnh).
import { createRequire } from 'node:module';

const require = createRequire(`${process.cwd()}/package.json`);
const { chromium, devices } = require('playwright-core');

const BASE = process.env.BASE_URL ?? 'http://localhost:3200';
const RUNS = 3;
const PAGES = [
  { path: '/', waitFor: "a[href^='/play/']", label: 'Trang chủ' },
  { path: '/levels', waitFor: "a[href^='/play/']", label: 'Chọn màn' },
  {
    path: '/play/2d-sample-01',
    waitFor: "button[data-touch-target][data-state='idle']",
    label: 'Màn mẫu 1',
  },
];

const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const kb = (bytes) => Math.round((bytes / 1024) * 10) / 10;

async function measure(browser, { path, waitFor }) {
  const context = await browser.newContext({ ...devices['Pixel 5'] });
  const page = await context.newPage();
  const client = await context.newCDPSession(page);
  await client.send('Network.enable');
  await client.send('Network.setCacheDisabled', { cacheDisabled: true });
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  const requests = new Map();
  client.on('Network.responseReceived', (event) =>
    requests.set(event.requestId, {
      url: event.response.url,
      type: event.type,
      status: event.response.status,
      bytes: 0,
    }),
  );
  client.on('Network.loadingFinished', (event) => {
    const request = requests.get(event.requestId);
    if (request) request.bytes = event.encodedDataLength;
  });

  await page.addInitScript(() => {
    window.__lcp = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) window.__lcp = entry.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });

  await page.goto(`${BASE}${path}`, { waitUntil: 'load', timeout: 60_000 });
  await page.waitForSelector(waitFor, { timeout: 60_000 });
  const usableAt = await page.evaluate(() => performance.now());
  await page.waitForTimeout(800);
  const timing = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const fcp = performance.getEntriesByName('first-contentful-paint')[0];
    return {
      lcp: window.__lcp,
      fcp: fcp ? fcp.startTime : null,
      load: nav.loadEventEnd,
    };
  });

  const byType = {};
  let total = 0;
  for (const request of requests.values()) {
    byType[request.type] = (byType[request.type] ?? 0) + request.bytes;
    total += request.bytes;
  }
  await context.close();
  return { usableAt, ...timing, byType, total, count: requests.size };
}

const browser = await chromium.launch();
for (const target of PAGES) {
  const runs = [];
  for (let i = 0; i < RUNS; i += 1) runs.push(await measure(browser, target));
  const med = (key) => median(runs.map((run) => run[key]));
  const script = median(runs.map((run) => run.byType.Script ?? 0));
  const css = median(runs.map((run) => run.byType.Stylesheet ?? 0));
  console.log(
    JSON.stringify({
      trang: target.label,
      duongDan: target.path,
      soLanDo: RUNS,
      'LCP_ms(trung vị)': Math.round(med('lcp')),
      'FCP_ms': Math.round(med('fcp')),
      'dungDuoc_ms (phần tử tương tác đầu tiên xuất hiện)': Math.round(med('usableAt')),
      'load_ms': Math.round(med('load')),
      'JS_KB_nén': kb(script),
      'CSS_KB_nén': kb(css),
      'tổng_KB_nén': kb(med('total')),
      'số_yêu_cầu': med('count'),
    }),
  );
}
await browser.close();
