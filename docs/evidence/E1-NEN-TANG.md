# Evidence — E1 Nền tảng: khung chạy được theo `docs/TECH.md`

> **Báo cáo lịch sử.** Bằng chứng hiện hành sau sửa bộ nạp cảnh, bổ sung test và cập nhật Scrum là [E1-NEN-TANG-RECHECK.md](E1-NEN-TANG-RECHECK.md). Các số đo và giới hạn bên dưới thuộc lượt kiểm chứng cũ.

| Mục | Giá trị |
|---|---|
| Phạm vi | Epic **E1 Nền tảng** theo yêu cầu trực tiếp của người dùng ngày 2026-11-14 (7 mục + 3 tiêu chí hoàn thành). **Không có task ID** trong `tasks.json`: phạm vi này theo thiết kế mới của `docs/TECH.md` (localStorage, R3F/drei/Zustand, không PostgreSQL) nên không khớp 1-1 với 147 task cũ. Xem quyết định mở **OPS-5** ở `docs/ai-planning/PROGRESS.md`. |
| Status sau lượt này | **`in_review`.** Agent không đặt `done` cho bất cứ thứ gì; chỉ người dùng đặt (CLAUDE.md, OPS-3/OPS-4). |
| Thời gian | 2026-11-14 (UTC+7). Phần lớn mã nguồn đã có sẵn trong working tree khi tôi bắt đầu (theo thời gian sửa file: 07:46–08:09; không có bằng chứng, không có test E2E, và tôi không có ngữ cảnh của lượt làm đó). Lượt này rà soát, sửa lỗi, viết bộ E2E và kiểm chứng; chạy cuối khoảng 15:55–16:05. |
| Revision | HEAD `4a36256` (nhánh `init`) + working tree **chưa commit**. 117 file thuộc phạm vi (6 file đã theo dõi bị sửa, 111 file mới); sha256 từng file ở `E1-NEN-TANG.artifacts/files.sha256`. |
| Môi trường | macOS 15.7.4 (Darwin 24.6.0, arm64) · Node v22.22.3 · npm 10.9.8 · Next 16.4.6 · Playwright 1.65.0 (Chrome for Testing 158.0.8127.18 headless shell; WebKit 27.2). |
| Prerequisites | Registry npm truy cập được; bốn bản trình duyệt Playwright đã có sẵn trong cache máy (`playwright install --dry-run` xác nhận), không phải tải. Không cần credential, DB hay thiết bị thật. |
| Tái hiện | `bash docs/evidence/E1-NEN-TANG.artifacts/reproduce.sh` (chạy từ gốc repo). Đầu ra từng bước nằm cạnh file này, đuôi `.txt` (vì `.gitignore` loại `*.log`). |

## Điểm cần người duyệt xem kỹ

1. **Phạm vi lệch với backlog gốc và kế hoạch AI** (`docs/GDD.md` mục 13.3): lưu bằng localStorage thay PostgreSQL, R3F/drei thay Three.js trực tiếp, mở khóa tuần tự thay mở sẵn. Hệ quả cần bạn quyết: LL-002 (PostgreSQL, 3 điểm) trong Sprint 1 không còn mục đích; LL-003 chờ H1. Tôi làm theo yêu cầu trực tiếp của bạn (đứng trên backlog trong thứ tự ưu tiên nguồn) nhưng **không** sửa `tasks.json`, backlog gốc hay `GDD.md`. LL-001-T02 vẫn `in_review`, tôi làm epic mà chưa chờ nó `done` vì yêu cầu trực tiếp mới đứng trên OPS-3 (xem PROGRESS.md).
2. **Mã có sẵn trong working tree có 3 lỗi thật**, tìm ra khi kiểm chứng và đã sửa (mục 6): mã màn lạ không hiện trang "Không tìm thấy màn"; hộp thoại không nhận nét (`panelRef` chưa gắn); hộp xác nhận "Xem đáp án" nằm dưới mép màn hình ở iPhone SE. Cả ba chỉ là thay đổi nhỏ ở `src/`, nên đọc kỹ.
3. **Mọi kiểm chứng đều giả lập.** Không có điện thoại thật; WebKit tự động hóa không phải Safari thật; số đo hiệu năng là xấp xỉ bằng CDP, không phải Lighthouse (mục 7).
4. **Một ngoại lệ có chủ đích trong cổng console của E2E** (mục 6, O5): bỏ qua đúng một mẫu `pageerror` của WebKit khi Next đang nạp trước liên kết mà bị điều hướng cứng cắt ngang. Đã tái hiện, đã khoanh hẹp, đã có test chứng minh các `pageerror` khác vẫn bị bắt.
5. **Dư địa ngân sách mỏng:** JS tải ban đầu của trang chủ 181,7 KB nén so với mức đề xuất ≤ 200 KB (TECH.md mục 10, con số do tôi đề xuất, chưa phải yêu cầu của bạn). Chưa có màn 3D nào để đo ngân sách 3D.
6. **Chưa làm / không làm được:** README (file chỉ đọc nên LL-001-T03 chưa làm); test thành phần bằng Testing Library; `/api/events`, `/about`, `/done`, cài đặt; banner ngoại tuyến; CI. Danh sách đầy đủ ở mục 8.
7. **`npm audit` (cả công cụ dev) và `npm ls` vẫn thoát 1**, đúng như đã ghi ở LL-001-T02 (O2, O3); không có vấn đề mới do các gói vừa thêm (mục 3).

## 1. Phạm vi file

| Nhóm | File | Ghi chú |
|---|---|---|
| Cấu hình | `package.json`, `package-lock.json`, `eslint.config.mjs`, `next.config.ts`, `playwright.config.ts`, `vitest.config.mts`, `.env.example` | 4 file đã có bị sửa, 3 file mới. ESLint thêm luật phụ thuộc giữa các tầng (`no-restricted-imports`); `next.config.ts` đưa phiên bản ứng dụng vào đo lường |
| `src/app` | `layout`, trang chủ, `levels`, `play/[id]` (+ `error`, `not-found`), `daily`, `error`, `global-error`, `not-found` | `about`, `done`, `api/events` mới có `.gitkeep` |
| `src/domain` | `levels` (kiểu, `validateLevelMetas`), `hints` (máy trạng thái 3 cấp), `progress` (kiểu, `applyResult`, `unlock`, `migrate`), `share/format-duration` | Thuần TypeScript, ESLint chặn import React/Next/Zustand/three |
| `src/engine` | `scene.ts`, `stage2d` (SVG 360×480, cảnh `choose`) | Không import `features/`, `stores/`, `services/` |
| `src/features` | `game-shell` (khung chạy màn, `LevelRun`, error boundary), `hud`, `hints`, `result`, `home`, `level-select`, `ui`, `strings.ts` | Chữ hiển thị gom ở `strings.ts` |
| `src/stores`, `src/services` | `progress.ts`; `analytics` (`track`, sink, id, thiết bị), `storage` (kho an toàn), `clock` | `services/` không import `stores/` |
| `src/levels` | `index.ts` (sổ đăng ký), hai **màn mẫu** `2d-sample-01/02` | Màn mẫu không thuộc 25 màn trong LEVELS.md; xóa khi dựng màn thật |
| `src/styles` | `tokens.css`, `globals.css` | CSS Modules cho từng thành phần |
| `tests/unit` | 12 file test (145 ca) + `setup.ts` | domain, store, lưu trữ, đo lường, `LevelRun`, sổ đăng ký màn |
| `tests/e2e` | 4 spec + `fixtures.ts` + `helpers/{events,layout,ui}.ts` + `solutions/{types,2d-sample-01,2d-sample-02}.ts` | 32 test × 3 thiết bị = 96 ca |
| Tài liệu sửa theo mã | `docs/TECH.md`, `CLAUDE.md` | Quy tắc "lệch thì sửa cùng thay đổi". **Không** sửa `docs/GDD.md`, `README.md`, `docs/backlog.md`, `docs/sprint-1.md` |

`package.json` so với HEAD: thêm script `test` (`vitest run`), `test:e2e` (`playwright test`), đổi `typecheck` thành `next typegen && tsc --noEmit`; thêm phụ thuộc production `@react-three/fiber`, `@react-three/drei`, `three`, `zustand`; thêm dev `vitest`, `vite`, `jsdom`, `@playwright/test`, `@testing-library/{dom,react,jest-dom,user-event}`, `@types/three`.

## 2. Lựa chọn phiên bản và căn cứ

Ghim phiên bản chính xác (giữ quy ước repo). Kiểm `peerDependencies` bằng `npm view <gói>@<bản> peerDependencies` với React 19.3.1:

| Gói | Bản | Peer đã khai báo | Đạt? |
|---|---|---|---|
| `@react-three/fiber` | 9.8.2 | `react` và `react-dom` `>=19 <19.4`, `three >=0.156` | Có (React 19.3.1, three 0.187.0). **Khi nâng React tới 19.4 phải nâng R3F trước** |
| `@react-three/drei` | 10.7.9 | `react ^19`, `three >=0.159`, `@react-three/fiber ^9.0.0` | Có |
| `three` / `@types/three` | 0.187.0 / 0.187.0 | — | Cùng bản |
| `zustand` | 5.1.0 | `react >=18` | Có |
| `vitest` | 5.1.0 | `vite ^6.4.0 \|\| ^7 \|\| ^8`, `@types/node ^22 \|\| >=24` | Có (vite 8.3.8, @types/node 22.20.5) |
| `@testing-library/react` | 16.3.3 | `react ^18 \|\| ^19` | Có |

Căn cứ chọn bản: bản ổn định hiện hành trên registry lúc cài (2026-11-14) mà peer range chấp nhận React 19.3.1 và Node 22.22.3. Trình duyệt Playwright 1.65.0: Chromium 158 và WebKit 27.2 đã có trong cache. `npm ls --all` không có peer thiếu mới (mục 3, dòng 11).

## 3. Lệnh và kết quả

Tất cả chạy bởi `reproduce.sh` trên cây file cuối; mã thoát gom ở `E1-NEN-TANG.artifacts/exit-codes.txt`.

| # | Lệnh | Exit | Kết quả | Artifact |
|---|---|---|---|---|
| 1 | `python3 docs/ai-planning/verify_plan.py` | 0 | `PASS`, statuses `{done: 1, in_review: 1, todo: 145}` (không đổi) | `01-verify-plan.txt` |
| 2 | `npm ci --dry-run` | 0 | Lockfile khớp `package.json` | `02-npm-ci-dry-run.txt` |
| 3 | `npm run check` (lint, `format:check`, `typecheck`) | 0 | 0 lỗi, 0 cảnh báo (`--max-warnings 0`) | `03-check.txt` |
| 4 | `npx vitest run` | 0 | **12 file, 145 ca đạt** | `04-unit.txt` |
| 5 | `npm run build` | 0 | Biên dịch thành công; `/`, `/levels`, `/daily` tĩnh, `/play/2d-sample-01`, `/play/2d-sample-02` dựng sẵn | `05-build.txt` |
| 6 | `npx playwright test` (production) | 0 | **96 ca đạt** (32 test × iPhone SE, Pixel 5, 360×640), 18,4 s | `06-e2e-prod.txt` |
| 7 | `npx playwright test --repeat-each=3` | 0 | **288 ca đạt**: không có test chập chờn | `07-e2e-prod-lap-3.txt` |
| 8 | `E2E_DEV=1 npx playwright test --workers=2` (trên `next dev`) | 0 | **96 ca đạt**: không cảnh báo React/StrictMode nào trong console | `08-e2e-dev.txt` |
| 9 | `npm audit --omit=dev` | 0 | **0 lỗ hổng** ở phụ thuộc production | `09-audit-prod.txt` |
| 10 | `npm audit` | **1** | 10 mức moderate: **cùng một advisory `minimatch` ở công cụ dev đã ghi ở LL-001-T02 (O3)**; số lượng không đổi dù thêm gói mới | `10-audit-tat-ca.txt` |
| 11 | `npm ls --all` | **1** | Chỉ `eslint@10.14.0 invalid` (3 plugin khai báo peer ≤ ESLint 9, T02 O2) và 2 gói `extraneous` của `sharp` (T01 O3); **không có vấn đề mới** | `11-npm-ls.txt` |
| 12 | Đo hiệu năng gần đúng (mục 3.1) | 0 | xem 3.1 | `12-perf.txt` |
| 13 | Tìm three.js trong mã | — | Không có `import` three/R3F/drei trong `src/` và `tests/`; không chunk nào đã build chứa mã three.js | `13-khong-co-three.txt` |

Các dòng 10 và 11 thoát 1 là **trạng thái đã biết**, không phải hồi quy; chưa xử lý, đợi quyết định (T02, mục 6).

### 3.1 Hiệu năng (gần đúng)

Cách đo: Chromium + hồ sơ Pixel 5, cache lạnh, CDP mô phỏng "Slow 4G" của Lighthouse (RTT 150 ms, 1,6 Mbps xuống, 750 Kbps lên) và CPU chậm 4×, trung vị 3 lần (`perf-measure.mjs`). **Đây không phải Lighthouse thật.** "Dùng được" = phần tử tương tác đầu tiên (nút Chơi / ô màn / nút đáp án) xuất hiện sau khi hydrate.

| Trang | LCP | Dùng được | JS (nén) | CSS | Tổng (nén) | Yêu cầu |
|---|---|---|---|---|---|---|
| `/` | 400 ms | 1,30 s | 181,7 KB | 4,5 KB | 196,1 KB | 24 |
| `/levels` | 400 ms | 1,30 s | 181,7 KB | 4,5 KB | 193,9 KB | 22 |
| `/play/2d-sample-01` (gồm cảnh nạp lười) | 1,35 s | 2,14 s | 180,4 KB | 4,5 KB | 189,8 KB | 19 |

So với TECH.md mục 10: "mở game < 3 giây trên 4G" (yêu cầu của bạn): đạt ở mức xấp xỉ này (1,3 s). "JS ban đầu của trang chủ ≤ 200 KB gzip" (đề xuất của tôi): đạt nhưng còn 18 KB dư địa. Ngân sách "mỗi màn 3D < 1 MB" và "tự hạ đồ họa" chưa kiểm được vì chưa có màn 3D.

## 4. Bằng chứng các cổng kiểm phát hiện được lỗi

Một cổng chưa từng thất bại thì không chứng minh được gì, nên đã làm các phép thử âm:

**4.1 Cổng console/mạng/sự kiện của E2E** (`tests/e2e/gates.spec.ts`, 14 test × 3 thiết bị). Năm test dùng `test.fail()` cố ý gây vi phạm; để chắc chúng thất bại *đúng vì cổng bắt được* (không phải vì lý do khác), tôi chạy bản sao không có `test.fail()` và đọc lỗi thật:
`console.error: lỗi cố ý` · `console.warning: cảnh báo cố ý` · `pageerror: lỗi chưa bắt cố ý` · `HTTP 500: http://may-chu-gia.test/trang` · sự kiện đo lường `thiếu trường eventId… có trường lạ "email"`. (Hai sai sót của chính tôi trong lúc làm, đã sửa: lần thăm dò đầu dùng `sed` của macOS không hiểu `\s` nên `test.fail()` còn nguyên và kết quả vô nghĩa, đã làm lại bằng `perl`; và test "mã ≥ 400" ban đầu dùng `fetch` chéo nguồn nên có thể thất bại vì CORS chứ không vì cổng, đã đổi sang điều hướng tới địa chỉ giả.)

**4.2 Sổ đăng ký màn.** Test mới `tests/unit/levels/registry.test.ts` (5 ca): tạm gỡ cảnh `2d-sample-02` khỏi `SCENES` → test thất bại với `Không có cảnh cho màn 2d-sample-02`; đã khôi phục (`src/levels/index.ts` về nguyên trạng, kiểm lại bằng `check` và 145 ca đạt).

**4.3 Cổng bố cục** (`findLayoutProblems`): test trên trang giả xác nhận bắt được cuộn ngang, vùng chạm 30×30, chữ 12 px, chữ tràn mép; trang đạt chuẩn thì không báo gì. Trong lúc đó chính nó đã bắt một lỗi trong *trang thử của tôi* (nút mặc định 13,3 px) trước khi tôi nhận ra.

**4.4 `next typegen` trong `typecheck`.** Thử trên bản sao sạch (không `next-env.d.ts`, không `.next`): với mã hiện tại `tsc --noEmit` thoát 0 *dù có hay không có* typegen (kể cả khi cố ý khai báo sai `params`); nhưng ngay khi mã dùng kiểu toàn cục `PageProps<'/play/[id]'>` thì thiếu typegen cho `TS2304: Cannot find name 'PageProps'` (thoát 2) và có typegen thoát 0. Vậy bước này **chưa cần ở mã hiện tại, cần khi dùng `PageProps`/`LayoutProps`**; giữ để `npm run check` chạy được trên bản clone sạch, tốn khoảng 1 giây.

## 5. Đối chiếu yêu cầu

### 5.1 Bảy mục yêu cầu

| # | Yêu cầu | Kết quả | Bằng chứng |
|---|---|---|---|
| 1 | Next.js + TypeScript strict, ESLint, Prettier, Vitest, Playwright; R3F, drei, Zustand | **Đạt.** `strict: true`; mọi gói ghim phiên bản (mục 2). R3F/drei cài nhưng **chưa dùng** (chưa có màn 3D; epic này không yêu cầu) và không lọt vào gói 2D (mục 3, dòng 13) | `package.json`; mục 2 và mục 3 (dòng 3–8) |
| 2 | Cấu trúc thư mục đúng `docs/TECH.md` | **Đạt, có chỗ chờ.** Đủ các thư mục của TECH.md mục 4; thư mục chưa có nội dung chỉ chứa `.gitkeep`. TECH.md đã sửa chỗ mã khác thiết kế (mục 6, O8) | mục 1 |
| 3 | Trang chủ (Chơi tiếp, Đố mẹo mỗi ngày, Chọn màn), Màn chơi, Màn kết quả; dọc, từ 360 px, chữ to, nút ≥ 44 px | **Đạt.** "Đố mẹo mỗi ngày" là lối vào đúng nhưng trang đích báo "Chưa có câu hôm nay" vì kho câu chưa có nội dung (câu hỏi H2, GDD mục 13.2). Chữ ≥ 16 px, mọi vùng chạm ≥ 44 px (thiết kế 48 px) được E2E kiểm ở từng màn hình, từng trạng thái, trên 3 thiết bị | `screenshots/`, mục 5.3 |
| 4 | Lưu tiến trình bằng localStorage, đọc/ghi bọc try/catch, vẫn chạy khi không lưu được | **Đạt.** `SafeStorage` nuốt mọi lỗi và rơi về bộ nhớ, hiện một dòng báo. E2E: chặn truy cập localStorage, đầy dung lượng (cả hai: chơi trọn 2 màn, có dòng báo, 0 lỗi console), 4 dạng dữ liệu hỏng. Unit: 46 ca (kho an toàn 7, bộ chuyển `persist` 10, store tiến trình 15, làm sạch và nâng cấp dữ liệu 14) | `storage.spec.ts`, `tests/unit/{services,stores,domain}` |
| 5 | `track(tên sự kiện, dữ liệu)`; dev ghi ra console; dễ thay bằng dịch vụ thật | **Đạt.** `track('level_start', {…})` kiểm kiểu tên↔dữ liệu; `consoleSink` ở dev, `noopSink` ở production; đổi dịch vụ = viết sink mới + `setSink()`. Nuốt mọi lỗi. **Chưa làm** `QueueSink`/`HttpSink`/`/api/events` (chờ H1) | `src/services/analytics/`, `analytics.test.ts` |
| 6 | Một màn mẫu chứng minh luồng vào màn → giải → kết quả → màn tiếp | **Đạt, hai màn mẫu** (để có "màn tiếp" và "màn cuối") | `sample-flow.spec.ts` |
| 7 | Script dev, build, test, test:e2e, lint | **Đạt.** `dev`, `build`, `start`, `lint`, `format:check`, `typecheck`, `check`, `test`, `test:e2e` | `package.json` |

### 5.2 Ba tiêu chí hoàn thành

| Tiêu chí | Kết quả |
|---|---|
| Build không lỗi | **Đạt** (mục 3, dòng 5) |
| Kiểm thử chạy qua | **Đạt:** `check` 0, `test` 145 ca, `test:e2e` 96 ca (288 ca khi lặp 3 lần, 96 ca trên `next dev`) |
| Playwright đi hết luồng màn mẫu trên iPhone SE và Pixel 5 | **Đạt.** Test `trang chủ → màn 1 → sai rồi đúng → kết quả → màn tiếp → màn cuối → chọn màn → tải lại vẫn nhớ` chạy trên WebKit 320×568 (iPhone SE), Chromium 393×727 (Pixel 5) và Chromium 360×640. Số đo thiết bị lấy từ trang thật: iPhone SE `320×568 @2x`, Pixel 5 `393×727 @2.75x`, 360 `360×640 @2.75x`, đều con trỏ thô (`pointer: coarse`) |
| Cập nhật `scrum/` và đề xuất commit | **Đạt** (xem `scrum/` và mục 9) |

### 5.3 Definition of Done (CLAUDE.md)

| # | Điều kiện | Kết quả |
|---|---|---|
| 1 | Đạt tiêu chí nghiệm thu của task/story | **Một phần:** không có task ID để đối chiếu; xem 5.1 và mục 8 (README/LL-001 AC3 chưa) |
| 2 | Kiểm thử tự động chạy qua | **Đạt** (5.2) |
| 3 | Tốt ở 360 px: không cuộn ngang, không tràn chữ, vùng chạm ≥ 44 px | **Đạt** ở mọi màn hình và trạng thái đã kiểm: trang chủ (mới / có Chơi tiếp / đã xong), chọn màn, màn chơi (đầu và sau khi sai), hộp gợi ý, hộp xác nhận, kết quả (màn giữa và màn cuối), màn chưa mở, không tìm thấy màn/trang, đố mẹo mỗi ngày, màn có dòng báo không lưu được |
| 4 | Không lỗi trong console | **Đạt** trên production và `next dev`: fixture làm **test thất bại** khi có `console.error`/`warn`, `pageerror`, yêu cầu lỗi hoặc mã ≥ 400 (ngoại lệ có lý do: mục 6, O5 và test 404 cố ý) |
| 5 | Giải được chỉ bằng chạm | **Đạt:** 51 lần `locator.tap()`, **không** có `click`, bàn phím, hover hay kéo chuột trong `tests/e2e` (đã grep). Màn mẫu chỉ dùng chọn đáp án |
| 6 | Ghi đủ sự kiện đo lường | **Đạt:** `level_start`, `hint_used` (cấp 1–3), `level_complete` (`solved` và `revealed`), `level_abandon` (chơi lại, rời màn). Mỗi test kiểm cấu trúc theo GDD mục 9.1 viết độc lập với mã, không có trường lạ, mỗi lượt đúng một kết thúc |

## 6. Phát hiện khi kiểm chứng và cách xử lý

| # | Phát hiện | Xử lý |
|---|---|---|
| O1 | **Lỗi.** `dynamicParams = false` ở `src/app/play/[id]/page.tsx`: mã màn lạ (`/play/khong-co`) hiện trang 404 gốc ("Không tìm thấy trang", chỉ có nút về trang chủ) và **không bao giờ** dùng `not-found.tsx` của route; trang "Không tìm thấy màn" kèm "Về chọn màn" (TECH.md mục 3, LL-004 tiêu chí 2) không hiển thị trên production. Test E2E đầu tiên bắt được (3/48 thất bại, cả ba thiết bị) | Bỏ `dynamicParams = false` (kèm chú thích lý do). Mã lạ nay đi qua `notFound()` của route, vẫn trả 404. 96/96 đạt |
| O2 | **Lỗi.** `src/features/ui/modal.tsx`: `panelRef` được khai báo và dùng trong `useEffect` nhưng **chưa gắn vào phần tử nào**, nên `focus()` là thao tác rỗng; CSS `.fullPanel:focus { outline: none }` vô tác dụng. Hệ quả nhìn thấy: ở WebKit, vòng lấy nét xanh hiện quanh nút "Màn tiếp" ngay khi hộp kết quả mở | Gắn `ref={panelRef}` và `tabIndex={-1}`. Test mới: sau khi hộp kết quả mở, phần tử đang nhận nét không phải liên kết/nút |
| O3 | **Lỗi bố cục trên máy nhỏ.** Ở iPhone SE (320×568), hộp xác nhận "Xem đáp án?" nằm dưới mép màn hình: nút "Xem đáp án" lộ nửa, "Thôi, mình nghĩ tiếp" phải cuộn trong hộp mới thấy. Phát hiện bằng ảnh chụp, không phải test tự động | `HintSheet` tự `scrollIntoView({ block: 'nearest' })` khi hiện phần xác nhận, kèm `scroll-margin-bottom` để nút cuối không dính mép. Test mới đòi cả hai nút **nằm trọn** trong màn hình (`toBeInViewport({ ratio: 1 })`); lần đầu nó thất bại ở 99,6% nên mới thêm `scroll-margin-bottom` |
| O4 | **Khoảng trống test.** Chưa có test nào chạy `validateLevelMetas` trên `LEVEL_METAS` thật (TECH.md mục 5.5), nên đăng ký màn sai cấu trúc hay thiếu cảnh không bị bắt | Thêm `tests/unit/levels/registry.test.ts` (5 ca), đã chứng minh bằng đột biến (mục 4.2) |
| O5 | **Nhiễu của WebKit** (không phải lỗi game). Điều hướng cứng ngay sau khi trang tải (≤ vài chục ms) làm Next đang nạp trước liên kết (`?_rsc=`) bị hủy; Chromium báo `requestfailed` còn WebKit ném `pageerror: …?_rsc=… due to access control checks`. Tái hiện được: trễ 0 ms có lỗi, ≥ 50 ms sạch. Người chơi thật không rời trang nhanh vậy | Fixture bỏ qua **đúng mẫu** `/\?_rsc=\S+ due to access control checks/` cho `pageerror`, ghi lý do tại chỗ; có test cho thấy mẫu này được bỏ qua và mọi `pageerror` khác vẫn làm thất bại |
| O6 | **Hoạt ảnh nhấp nháy vô hạn** của nút Gợi ý (sai 3 lần liền) khiến Playwright coi nút "không ổn định" nên không chạm được (không phải lỗi người dùng). Hành vi này trước đó chưa có test | Thêm 2 test: chuyển động bình thường (`data-nudge`, `animation-iteration-count: infinite`, lời phản hồi nhắc nút) và `reducedMotion: 'reduce'` (hoạt ảnh chỉ chạy một lần, nút chạm được, hết nhấp nháy sau khi mở gợi ý), cũng kiểm yêu cầu truy cập của GDD mục 12.2 |
| O7 | **Tiến trình còn sót:** `next start -p 3101` (pid 85422, cha 85404) khởi động lúc 08:08 (cùng lúc các file cuối được sửa), chạy trong thư mục dự án này, phục vụ một bản build cũ. Tôi không biết ai khởi động nó | Tôi định dừng nhưng hệ thống từ chối hành động; **không cố vòng qua**. Để nguyên, không ảnh hưởng cổng 3100/3200 đã dùng. Mời bạn tự dừng: `kill 85422 85404` |
| O8 | **TECH.md lệch mã** ở nhiều chỗ (kiểu `SceneProps` nằm ở `engine/scene.ts` để `domain/` thuần; `track(name, data)` thay `track(event)`; `LevelRun` thay `useSession`; thêm `attempts` vào dữ liệu lưu; chữ ký `isUnlocked`…) | Đã sửa `docs/TECH.md` cùng thay đổi (sửa 20 đoạn, diff đã rà); `CLAUDE.md` mục Lệnh và Cấu trúc cũng đã cũ |
| O9 | Các ảnh chụp ngay sau thao tác đôi khi thiếu hộp phản hồi hay biểu tượng dấu tích do chụp ở khung hình đầu của hoạt ảnh (≤ 250 ms) | Không phải lỗi; bộ ảnh bằng chứng chờ 450 ms trước mỗi lần chụp. Hộp phản hồi sai được xác nhận bằng chẩn đoán riêng (vị trí, `opacity: 1`, hiển thị trên ảnh) |
| O10 | `nowIso` (`src/services/clock/clock.ts`) được export nhưng chưa ai dùng | Không đổi (tiện ích nhỏ của API đồng hồ) |

## 7. Giới hạn kết luận

- **Không có thiết bị thật.** iPhone SE, Pixel 5 và 360 px đều là giả lập của Playwright (kích thước, tỉ lệ điểm ảnh, cảm ứng). WebKit tự động hóa không phải Safari thật; Playwright "iPhone SE" mang chuỗi user agent iOS 10.3 cũ. Bàn phím ảo, vùng an toàn (`safe-area`) và `dvh` của Safari thật **chưa kiểm**.
- **Hiệu năng là xấp xỉ** (mục 3.1): CDP, một máy, không phải Lighthouse; chưa có số đo FPS (chưa có cảnh 3D).
- **Chỉ macOS arm64 / Node 22.22.3.** Chưa chạy Linux/CI. `npm ci` thật (xóa `node_modules` cài lại) **chưa chạy**; chỉ `npm ci --dry-run`.
- **Hai màn mẫu không phải nội dung thật** và không có thật `2d-*` của LEVELS.md; chưa kiểm cách chơi chữ, gõ chữ có dấu (`isComposing` của Telex/VNI), kéo-thả, lắc, 3D.
- **Chưa có review độc lập;** chưa ai ngoài tác giả đọc mã.
- Các ảnh bằng chứng tôi đã xem bằng mắt một phần (iPhone SE, Pixel 5 và 360 px của vài màn), không phải cả 30 ảnh.
- E2E thu sự kiện từ console, chưa qua mạng: `/api/events` chưa tồn tại.

## 8. Còn thiếu để `done`, và điều cần bạn quyết

**Chưa làm trong epic này (đã nêu ở trên, không giấu):** README (`README.md` là file chỉ đọc nên LL-001-T03 và AC3 của LL-001 chưa làm); test thành phần bằng Testing Library (thư viện đã cài); `/api/events`, `QueueSink`, `HttpSink` (chờ H1); trang `/about`, `/done`, cài đặt (`useSettings`); banner ngoại tuyến (LL-048 tiêu chí 3); CI (AI-T08); kho đố mẹo mỗi ngày (H2); 25 màn thật; chia sẻ.

**Cần bạn quyết:**

1. **OPS-5**, cách ghi epic này vào kế hoạch AI (PROGRESS.md). Khuyến nghị: để ở mức epic, chưa sửa `tasks.json` tới khi duyệt GDD/LEVELS/TECH rồi `/docmoi`.
2. **LL-002 (PostgreSQL) trong Sprint 1** còn cần không, khi yêu cầu 14/11 và TECH.md bỏ PostgreSQL? (SPRINT.md rủi ro 12, HO_SO câu 6.)
3. **README.md:** cho phép tôi viết hướng dẫn cài/chạy vào đó (hiện 1 dòng) để hoàn tất LL-001-T03, hay để ở chỗ khác?
4. Dừng tiến trình mồ côi `kill 85422 85404` (O7).
5. Theo DoD tạm: duyệt (hoặc yêu cầu sửa) rồi commit; sau đó mới đặt `done`.

## 9. Đề xuất commit

Chưa commit (CLAUDE.md: không tự commit). Chia ba commit theo thứ tự, thông điệp kiểu lịch sử hiện có; mỗi commit kết thúc bằng dòng `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`:

```sh
# 1. Khung nền tảng
git add package.json package-lock.json eslint.config.mjs next.config.ts playwright.config.ts vitest.config.mts .env.example src
git commit -m "feat: dựng khung nền tảng (trang chủ, chọn màn, màn chơi, kết quả, tiến trình, đo lường, 2 màn mẫu)"

# 2. Kiểm thử
git add tests
git commit -m "test: unit (Vitest, 145 ca) và E2E (Playwright: iPhone SE, Pixel 5, 360 px; 96 ca)"

# 3. Tài liệu, bằng chứng, điều phối
git add CLAUDE.md docs/TECH.md docs/evidence/E1-NEN-TANG.md docs/evidence/E1-NEN-TANG.artifacts docs/ai-planning/PROGRESS.md scrum
git commit -m "docs: bằng chứng epic Nền tảng, cập nhật TECH, CLAUDE và scrum"
```

`docs/GDD.md` và `docs/LEVELS.md` (nháp chờ duyệt ngày 13/11, chưa commit) tôi **không** đưa vào ba commit trên; bạn tự quyết thêm vào commit 3 hay commit riêng.
