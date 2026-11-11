// Harness kiểm chứng một lần cho LL-001-T01 (bằng chứng, KHÔNG phải test của sản phẩm và không nằm trong build).
// Nạp một URL trong Chrome thật, ghi console, page error, mọi request/response và kết luận pass/fail.
//
// Cách chạy lại (playwright-core cài tạm NGOÀI repo; sửa CHROME bên dưới nếu Chrome ở nơi khác):
//   mkdir /tmp/pc && cd /tmp/pc && npm init -y && npm i playwright-core@1.65.0
//   cp <repo>/docs/evidence/LL-001-T01.artifacts/page-check.mjs . && node page-check.mjs http://localhost:3217/ out.json production
// Exit code 0 = HTTP 200, html lang="vi", không page error, không console error/warning, không request lỗi, không request Three.js.
import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const [, , url, outPath, label = 'run'] = process.argv;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const version = browser.version();
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();

const consoleMessages = [];
const pageErrors = [];
const requests = [];
const failedRequests = [];
const badResponses = [];
page.on('console', (m) => consoleMessages.push({ type: m.type(), text: m.text(), location: m.location() }));
page.on('response', (r) => { if (r.status() >= 400) badResponses.push({ url: r.url(), status: r.status() }); });
page.on('pageerror', (e) => pageErrors.push(String(e)));
page.on('request', (r) => requests.push({ url: r.url(), type: r.resourceType() }));
page.on('requestfailed', (r) => failedRequests.push({ url: r.url(), error: r.failure()?.errorText ?? null }));

const response = await page.goto(url, { waitUntil: 'networkidle' });
// leave time for late hydration errors to surface
await page.waitForTimeout(1500);

const dom = await page.evaluate(() => ({
  lang: document.documentElement.lang,
  title: document.title,
  h1: document.querySelector('h1')?.textContent ?? null,
  paragraph: document.querySelector('p')?.textContent ?? null,
  viewportMeta: document.querySelector('meta[name="viewport"]')?.getAttribute('content') ?? null,
  nextRuntimePresent: typeof self.__next_f !== 'undefined',
  scriptSrcs: [...document.scripts].map((s) => s.src).filter(Boolean),
}));

const result = {
  label,
  url,
  chromeVersion: version,
  status: response?.status() ?? null,
  dom,
  consoleMessages,
  pageErrors,
  failedRequests,
  badResponses,
  requestCount: requests.length,
  requestUrls: requests.map((r) => r.url),
  scriptRequests: requests.filter((r) => r.type === 'script').map((r) => r.url),
};
result.threeRequests = requests.filter((r) => /three/i.test(r.url)).map((r) => r.url);
result.consoleErrorsOrWarnings = consoleMessages.filter((m) => ['error', 'warning'].includes(m.type));

writeFileSync(outPath, JSON.stringify(result, null, 2));
await browser.close();

const problems = [];
if (result.status !== 200) problems.push(`HTTP status ${result.status}`);
if (dom.lang !== 'vi') problems.push(`html lang is "${dom.lang}"`);
if (result.pageErrors.length) problems.push(`${result.pageErrors.length} page error(s)`);
if (result.consoleErrorsOrWarnings.length) problems.push(`${result.consoleErrorsOrWarnings.length} console error/warning message(s)`);
if (result.failedRequests.length) problems.push(`${result.failedRequests.length} failed request(s)`);
if (result.threeRequests.length) problems.push('Three.js-looking request loaded');
console.log(JSON.stringify({ label, chrome: version, status: result.status, lang: dom.lang, title: dom.title, h1: dom.h1,
  scriptRequests: result.scriptRequests.length, console: consoleMessages.length, pageErrors: pageErrors.length,
  failedRequests: failedRequests.length, badResponses, threeRequests: result.threeRequests.length,
  consoleErrorsOrWarnings: result.consoleErrorsOrWarnings, problems }, null, 2));
process.exit(problems.length ? 1 : 0);
