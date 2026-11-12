# Progress và sổ bằng chứng

Ngày khảo sát: **2026-11-10**, múi giờ Asia/Ho_Chi_Minh. Kế hoạch đề xuất; implementation bắt đầu 2026-11-11 với SP-00 (trạng thái hiện hành ở PROGRESS.md).

<!-- plan-stats: tasks=147; sprints=12; points=201 -->

## Trạng thái hiện tại

- Planning: tài liệu và JSON đã đồng bộ với nguồn hiện tại (SRC-CHG-001, 2026-11-11); kế hoạch còn proposed, quyết định sản phẩm chưa được xác nhận.
- Business implementation: **bắt đầu 2026-11-11** theo yêu cầu người dùng chạy Sprint đầu tiên đủ điều kiện. **1/147 task done** (LL-001-T01, người dùng duyệt 2026-11-12), 0 in_progress, 1 in_review (LL-001-T02: nhận 2026-11-12 07:10, có bằng chứng 07:24, chờ người dùng duyệt), 0 blocked theo workflow; 145 task `todo`. “Decision/dependency blocked” trong readiness là lý do chưa được nhận, không đồng nghĩa workflow status đã blocked.
- Product: 0/51 story implementation completed, 51 MISSING; không có BUG runtime được xác nhận. Hai story enabler cũng chưa triển khai.
- Sprint: SP-00 in_progress (chỉ các task đủ điều kiện nhận); 11 sprint còn lại planned/conditional; 0 completed. Không có ngày bắt đầu/kết thúc cam kết.
- Estimation: 201 SP task mới; 211 SP source tách biệt. Không bao gồm defect chưa xác nhận hoặc thêm cơ chế sau script.
- Source: nhánh `init`, HEAD `c8f53f06828e250b66361408025df26c078af6ae` (người dùng commit `feat: init` 2026-11-11 21:13, gồm `docs/` với hai nguồn, khung Next.js và `next.config.ts`; trước đó là `666c413` trên `main`). Khi kiểm tra 2026-11-12 06:20, working tree chỉ có `scrum/` chưa theo dõi. Agent không tự commit, tag hay thêm git index; thay đổi mới nằm ở working tree để người dùng review.

## Nhật ký thực thi

Mục mới nhất ở cuối. Mỗi mục theo “Mẫu cập nhật mỗi lần thực thi” ở cuối file.

### 2026-11-11 07:27 (UTC+7) — Đối soát nguồn SRC-CHG-001 trước khi thực thi

- Phạm vi được yêu cầu: người dùng yêu cầu kiểm tra repo, lập đủ artefact planning và bắt đầu Sprint đầu tiên đủ điều kiện, trong phạm vi được ủy quyền. Artefact planning đã tồn tại từ 2026-11-10 nên được kiểm chứng và giữ nguyên, không dựng lại.
- Phát hiện: `verify_plan.py` FAIL `Source drift: docs/backlog.md`. `docs/backlog.md` và `docs/sprint-1.md` đổi sau snapshot (README khớp).
- Phân tích: bảng 51 story/211 điểm, ưu tiên, phụ thuộc, sẵn sàng, AC và neo dòng khớp snapshot (0 khác biệt). Thay đổi có ghi nhận: backlog v2.1 (LL-014 thêm task đo FPS trên điện thoại thật, đã được LL-014-T03 bao phủ); sprint-1.md thêm một dòng Giả định ngoại lệ “Mốc 1” (dòng dịch +1). Chi tiết và giới hạn của phép so sánh: `tasks.json.source_changes[0]`.
- Hành động: cập nhật hash snapshot kèm lý do, sửa số dòng trích dẫn của DOC-BUG-01. Không đổi task/DAG/sprint/estimate/gate.
- Lệnh: `python3 docs/ai-planning/verify_plan.py` → exit 0 (PASS) sau cập nhật; trước đó exit 1.
- Giới hạn: hai nguồn untracked nên không có bản trước drift để diff từng ký tự.

### 2026-11-11 07:30 (UTC+7) — Admission LL-001-T01

- Task: LL-001-T01 (P0, XS, 1 SP, SP-00). Status `todo` → `in_progress`.
- Điều kiện nhận: không có dependency, không có gate; phạm vi được yêu cầu; Node 22.22.3 và npm 10.9.8 sẵn có; registry truy cập được; task ≤1 ngày.
- Lựa chọn phiên bản (sẽ ghi bằng chứng đầy đủ ở docs/evidence/LL-001-T01.md): Next.js 16.4.6, React/React DOM 19.3.1, TypeScript 5.9.3, @types/node 22.20.5, Node 22.22.3, npm 10.9.8.
- Còn lại cho T01: tạo scaffold, `npm ci`, `npm run build`, kiểm tra trang mẫu trong trình duyệt thật, viết evidence, chuyển `in_review`.

### 2026-11-11 07:36 (UTC+7) — LL-001-T01: kiểm chứng xong, chuyển `in_review`

- Task và phạm vi: LL-001-T01 trong phạm vi SP-00 đã được yêu cầu. Status `in_progress` → **`in_review`** (không `done`).
- Dependencies/gates: không có dependency, không có gate.
- Files: đúng 7 file của task (`package.json`, `package-lock.json`, `.nvmrc`, `.gitignore`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/page.tsx`) trên HEAD `666c413` + working tree chưa commit. Băm từng file ở evidence.
- Lệnh (exit code): `npm ci` 0 (lockfile không đổi); `npm run build` 0; `npm run start` và `npm run dev` + `curl` + Chrome 157 thật, 0 console error/warning, 0 page error, 0 request lỗi, 0 request Three.js; `npm audit` 0 lỗ hổng. Báo cáo: `docs/evidence/LL-001-T01.md` và thư mục `docs/evidence/LL-001-T01.artifacts/`.
- Manual/thiết bị: không có kiểm tra trên thiết bị thật (không thuộc AC; Q3 chưa trả lời). Chỉ Chrome macOS headless.
- AC task: cả hai đạt. AC story LL-001 chưa đủ: README và clone sạch (T03), lint/format (T02).
- Phát sinh: (O1) lần chạy đầu có 1 console error do `/favicon.ico` 404, đã sửa trong `layout.tsx` rồi chạy lại sạch; (O2) `next dev` tự sinh `AGENTS.md` ở gốc repo, ngoài phạm vi nên đã xóa, **cần quyết định giữ/tắt** (xem mục “Quyết định/input còn mở”); (O3) `npm ls` báo 2 package optional “extraneous” của `sharp`, vô hại.
- Ảnh hưởng DAG/sprint/estimate: không đổi. LL-001-T02 vẫn `dependency_blocked`.
- **Blocker để tiếp tục:** theo EXECUTION_RULES, dependent chỉ được nhận khi dependency `done`; `done` cần review theo DoD đã xác nhận (Q11 chưa trả lời) và agent không tự ký. Chuỗi LL-001-T02 → LL-001-T03 → AI-T07 → AI-T08/LL-002-T01 → LL-002-T02 đang chờ quyết định về review/DoD.

### 2026-11-11 20:40 (UTC+7) — Quyết định của người dùng và hoàn thiện LL-001-T01

- Người dùng trả lời câu hỏi sau khoảng 13 giờ: (1) **duyệt từng task**: tôi dừng, LL-001-T02 chưa được nhận cho tới khi người dùng xác nhận `done` cho LL-001-T01; (2) **tắt `AGENTS.md` bằng `next.config`** (OPS-1).
- Hành động: thêm `next.config.ts` (`agentRules: false`); thêm vào `affected_files` của LL-001-T01 (JSON và BACKLOG); chạy lại toàn bộ kiểm chứng trên cây file cuối: `npm ci` 0 (lockfile không đổi), `npm run build` 0, Chrome production/dev 0 lỗi, `npm audit` 0, `AGENTS.md` không còn được sinh. Bằng chứng lượt 1 được đánh dấu `superseded` trong `tasks.json` (giữ lịch sử), bằng chứng lượt 2 được thêm vào; artifacts và `docs/evidence/LL-001-T01.md` đã cập nhật.
- Đính chính: khi hỏi, tôi mô tả "mỗi lần ai đó chạy `npm run dev` file sẽ được sinh lại". Theo tài liệu Next (`agentRules.md`) và mã nguồn, file chỉ được tạo khi `next dev` **phát hiện AI coding agent**. Quyết định tắt vẫn hợp lý vì quy trình dự án chạy bằng agent; nếu muốn giữ khối chỉ dẫn do Next quản lý, xóa `next.config.ts`.
- Kiểm tra đổi nguồn sau 13 giờ chờ: `verify_plan.py` PASS (hash nguồn không đổi), không file nào của người dùng bị sửa.
- Status: LL-001-T01 giữ `in_review`; không nhận task nào thêm. Đang chờ người dùng đọc `docs/evidence/LL-001-T01.md` và xác nhận `done` (kèm DoD/người review nếu muốn chốt Q11).

### 2026-11-12 06:20 (UTC+7) — Chạy lại orchestrator: khôi phục trạng thái, chưa có task nào đủ điều kiện nhận

- Task ID và phạm vi đã được yêu cầu: người dùng dán lại lời nhắc "Autonomous Software Development Orchestrator" (kiểm tra repo, lập artefact planning, chạy Sprint đầu tiên đủ điều kiện trong phạm vi được ủy quyền). Artefact planning đã có và đồng bộ nên được kiểm chứng và giữ nguyên, không dựng lại. Phạm vi ủy quyền hiện hành vẫn là OPS-3 (duyệt từng task); lời nhắc chỉ cho tiếp tục "trong phạm vi được ủy quyền" nên không nới OPS-3.
- Status trước → sau: không đổi (`in_review: 1`, `todo: 146`). Không nhận task nào.
- Dependencies đã done / gates: tính lại admission từ `tasks.json` (status `todo`, mọi dependency `done`, mọi decision gate resolved có evidence) → **0 task đủ điều kiện**. AI-T01…AI-T06 chờ decision Q1–Q11 (unresolved, evidence rỗng). LL-001-T02 chờ LL-001-T01 `done`; LL-001-T03, AI-T07, AI-T08, LL-002-T01, LL-002-T02 chờ theo chuỗi phía sau.
- Files/diff/revision: nhánh `init`, HEAD `c8f53f0` (người dùng commit `feat: init` 2026-11-11 21:13, sau lượt kiểm chứng 20:36–20:40). sha256 của 8 file thuộc phạm vi LL-001-T01 ở HEAD và ở working tree **khớp 8/8** bảng ở `docs/evidence/LL-001-T01.md` mục 1; `AGENTS.md` không tồn tại; Node 22.22.3 và npm 10.9.8 đúng bản ghim. Dòng "Source" ở "Trạng thái hiện tại" đã sửa theo thực tế (điểm lệch L5 ở `scrum/HO_SO.md`). Cả 14 file ở `scrum/HO_SO.md` mục 1 khớp hash đã ghi tại 06:20 (trước khi sửa file này), tức không ai sửa nguồn từ 11/11.
- Lệnh (exit code): `python3 docs/ai-planning/verify_plan.py` 0 (PASS); `python3 -m json.tool docs/ai-planning/tasks.json` 0. Không chạy lại `npm ci`/`npm run build`: cây file giống hệt lượt kiểm chứng 20:36 (hash khớp); LL-001-T02 sẽ chạy build khi được nhận.
- Manual/thiết bị: không có.
- AC/DoD đạt hoặc thiếu: không đổi so với 20:40. Việc người dùng commit `feat: init` **không** được coi là xác nhận `done` (OPS-3 đòi xác nhận rõ ràng; Q11 chưa trả lời).
- Blocker: chờ người dùng đặt `done` cho LL-001-T01 (kèm DoD/người duyệt nếu chốt Q11). Đây là đường găng của chuỗi SP-00 và của Sprint 1 ở `scrum/` (SPRINT.md rủi ro 9).
- Ảnh hưởng DAG/sprint/estimate và bước tiếp theo: không đổi. Sau khi được xác nhận: nhận LL-001-T02 (`eslint.config.mjs`, `.prettierrc.json`, script `lint`/`format:check`/`typecheck`, fixture lỗi tạm rồi xóa).

### 2026-11-12 07:10 (UTC+7) — Người dùng duyệt LL-001-T01 `done`; nhận LL-001-T02

- Quyết định của người dùng (hộp thoại xác nhận, 2026-11-12): (1) **đặt LL-001-T01 `done`** sau khi được báo rõ giới hạn (chỉ Chrome 157 headless/macOS, chưa có review độc lập, hôm nay chỉ đối chiếu hash chứ chưa chạy lại build); (2) **dùng DoD tạm** ở `scrum/HO_SO.md` mục 6 Câu 1 cho tới Retro 20/11/2026 (OPS-4).
- LL-001-T01: `in_review` → **`done`**. Bằng chứng duyệt: mục `kind: decision` trong `tasks.json` (reviewer `hieu`, `scope_task_ids: [LL-001-T01]`, `recorded_at` 2026-11-12T07:10:53+07:00, revision HEAD `c8f53f0`); subtasks S01–S02 `done`. Story LL-001 chưa hoàn tất (còn T02, T03).
- Admission LL-001-T02 (P0, XS, 1 SP, SP-00): `todo` → `in_progress`. Điều kiện: dependency LL-001-T01 `done`; không có decision gate; Node 22.22.3/npm 10.9.8 và registry truy cập được (đã `npm view`); task ≤1 ngày. Readiness tính lại: `dependency_blocked` → `ready`.
- Thay đổi kế hoạch: `affected_files` của LL-001-T02 thêm `package-lock.json` (thêm devDependencies làm đổi lockfile; JSON và BACKLOG cùng cập nhật). `Q11.working_baseline` ghi DoD tạm; Q11 vẫn `unresolved`.
- Lệnh: `python3 docs/ai-planning/verify_plan.py` exit 0 sau cập nhật, statuses `{done: 1, in_progress: 1, todo: 145}`.
- Lựa chọn công cụ **ban đầu, đã bị đổi ở mục 07:24 bên dưới** (ESLint 9.39.5 hóa ra deprecated nên chốt ESLint 10.14.0):  ESLint 9.39.5, `eslint-config-next` 16.4.6 (trùng phiên bản `next`), Prettier 3.10.0, ghim chính xác. Căn cứ: tài liệu đi kèm Next 16.4.6 (`eslint-config-next` hỗ trợ ESLint 9 và 10; một số plugin chưa khai báo ESLint 10) và `npm install --dry-run` trong thư mục tạm: ESLint 10.14.0 → exit 0 nhưng 3 cảnh báo `ERESOLVE overriding peer dependency`; ESLint 9.39.5 → exit 0, 0 cảnh báo. ESLint 10 là hướng nâng cấp khả thi sau này (task riêng). **(Đã đảo ngược ngay trong lượt T02, xem mục 07:24.)**

### 2026-11-12 07:24 (UTC+7) — LL-001-T02: kiểm chứng xong, chuyển `in_review`

- Task và phạm vi: LL-001-T02 (P0, XS, 1 SP, SP-00) trong phạm vi đã được yêu cầu. Status `in_progress` → **`in_review`** (không `done`).
- Dependencies/gates: LL-001-T01 `done` (người dùng duyệt 07:10); không có decision gate.
- Files: `package.json`, `package-lock.json` (thêm vào `affected_files` vì devDependencies làm đổi lockfile), `eslint.config.mjs`, `.prettierrc.json`. Băm từng file ở `docs/evidence/LL-001-T02.md` mục 1. Không đổi `src/`, `next.config.ts`, `tsconfig.json`, README và hai nguồn `docs/backlog.md`, `docs/sprint-1.md`.
- Lệnh (exit code): `npm ci` 0 (lockfile không đổi); `npm run lint` 0; `npm run format:check` 0; `npm run typecheck` 0; `npm run check` 0 (cây sạch), 1 khi có fixture lỗi và dừng sớm, 0 sau khi xóa fixture; `npm run build` 0; `npm audit --omit=dev` 0. Ma trận fixture 4×3: mỗi fixture chỉ làm đúng một công cụ fail; smoke test plugin: 7 rule id từ 5 plugin chạy dưới ESLint 10, không crash. Báo cáo: `docs/evidence/LL-001-T02.md` và `docs/evidence/LL-001-T02.artifacts/` (đuôi `.txt` vì `.gitignore` loại `*.log`).
- Manual/thiết bị: không có (không thuộc AC).
- AC task: cả hai đạt. AC2 của story LL-001 ("một lệnh lint và kiểm tra định dạng") đạt ở mức lệnh nhờ script `check`; AC1 và AC3 của story còn chờ T03.
- Lựa chọn công cụ chốt: ESLint **10.14.0**, `eslint-config-next` 16.4.6, Prettier 3.10.0, ghim chính xác. **Đổi so với dự kiến lúc nhận task:** ESLint 9.39.5 được cài trước nhưng npm báo `deprecated: no longer supported` và 51/51 bản 9.x đều deprecated, nên chuyển sang 10.14.0 (không deprecated; tài liệu Next 16.4.6 ghi hỗ trợ ESLint 9 và 10). Cái giá: 3 plugin (`eslint-plugin-import`, `-jsx-a11y`, `-react`) có peer range ≤ ESLint 9 nên `npm install`/`npm ci` in 3 cảnh báo ERESOLVE và `npm ls --all` thoát 1; đã chứng minh các plugin chạy đúng dưới ESLint 10.
- Phát sinh cần người dùng quyết (chi tiết `docs/evidence/LL-001-T02.md` mục 6): (O3) `npm audit` 10 mức moderate là một advisory `minimatch` GHSA-g3hv-75wg-m249 ở chuỗi `eslint-config-next` → `typescript-eslint` → `typescript-estree`, chỉ công cụ dev (`npm audit --omit=dev` = 0), chưa có bản vá qua `eslint-config-next@16.4.6`; chưa xử lý; (O4) Prettier không kiểm `*.md` và `docs/` vì `README.md` (nguồn chỉ đọc, hash bị đóng băng) thiếu dòng cuối; (O6) thêm script `check` và `--max-warnings 0`; (O7) `.gitignore` loại `*.log` nên bốn file `.log` bằng chứng của T01 không nằm trong commit `c8f53f0`.
- Ảnh hưởng DAG/sprint/estimate: không đổi; `affected_files` của T02 thêm `package-lock.json`. LL-001-T03 vẫn `dependency_blocked` cho tới khi người dùng xác nhận LL-001-T02 `done`.
- Giới hạn: ESLint không type-aware; chỉ chạy trên 3 file mã thật cộng fixture; chỉ macOS arm64/Node 22.22.3, chưa chạy Linux/CI (AI-T08); chưa có review độc lập.

## Công việc planning đã thực hiện

| Mục | Bằng chứng | Phạm vi kết luận |
|---|---|---|
| Inventory/đọc toàn repo | PROJECT_ANALYSIS; `git ls-tree`, inventory file ẩn/ignored, đọc toàn bộ ba file nguồn | Không có business source tại thời điểm khảo sát |
| Đối chiếu yêu cầu | REQUIREMENTS và GAP_ANALYSIS; 51 ID nguồn được giữ | Tất cả story còn MISSING implementation |
| Phân rã và lập lịch | BACKLOG / SPRINT_PLAN / tasks.json | 147 task, 12 sprint, DAG không chu trình, dependency order hợp lệ sau khi verifier chạy |
| Bảo toàn tài liệu nguồn | source_files SHA-256 trong JSON và kiểm tra verifier | README giữ nguyên. `docs/backlog.md` và `docs/sprint-1.md` đổi sau snapshot 2026-11-10; đã đối soát và re-baseline có lý do ở SRC-CHG-001 (2026-11-11). Không biến planning thành cập nhật trạng thái product |

## Verification log của planning

Kết quả bên dưới chỉ ghi sau khi chạy kiểm tra; không là test của game. Script verifier được giao kèm để tái chạy:

```sh
python3 docs/ai-planning/verify_plan.py
python3 -m json.tool docs/ai-planning/tasks.json > /dev/null
git diff --check
```

Kết quả ghi theo thời điểm chạy:

| Thời điểm (UTC+7) | Lệnh | Exit | Ghi chú |
|---|---|---|---|
| 2026-11-11 trước 07:27, trước re-baseline | `python3 docs/ai-planning/verify_plan.py` | 1 | `FAIL: Source drift: docs/backlog.md` |
| 2026-11-11, sau SRC-CHG-001 và sửa DOC-BUG-01 | `python3 docs/ai-planning/verify_plan.py` | 0 | `PASS`: 147 task, 12 sprint, 485 cạnh phụ thuộc, 51 story nguồn, 211 SP nguồn, 201 SP task |
| 2026-11-11, sau khi LL-001-T01 `in_review` | `python3 docs/ai-planning/verify_plan.py` | 0 | `PASS`, statuses `{in_review: 1, todo: 146}` |
| 2026-11-11 20:4x, sau thêm `next.config.ts` và bằng chứng lượt 2 | `python3 docs/ai-planning/verify_plan.py` | 0 | `PASS`, statuses `{in_review: 1, todo: 146}`; hash nguồn không đổi sau 13 giờ |
| 2026-11-12 06:20, HEAD `c8f53f0`, trước khi cập nhật file này | `python3 docs/ai-planning/verify_plan.py` | 0 | `PASS`, statuses `{in_review: 1, todo: 146}`; hash nguồn không đổi; 8/8 hash file LL-001-T01 khớp bằng chứng |
| 2026-11-12 07:10, sau khi LL-001-T01 `done` và nhận LL-001-T02 | `python3 docs/ai-planning/verify_plan.py` | 0 | `PASS`, statuses `{done: 1, in_progress: 1, todo: 145}` |
| 2026-11-12 07:24, sau khi LL-001-T02 `in_review` | `python3 docs/ai-planning/verify_plan.py` | 0 | `PASS`, statuses `{done: 1, in_review: 1, todo: 145}`; hash nguồn không đổi |

Verifier chỉ kiểm metadata/DAG/Markdown của kế hoạch, không phải test của game. `python3 -m json.tool` được dùng để kiểm cú pháp JSON; `git diff --check` không áp dụng ý nghĩa vì `docs/` và các file scaffold đều untracked.

Kết quả của ứng dụng: LL-001-T01 (`npm ci`, `npm run build`, kiểm tra Chrome production/dev, `npm audit`; xem `docs/evidence/LL-001-T01.md`) và LL-001-T02 (`lint`, `format:check`, `typecheck`, `check`, `build`, ma trận fixture; xem `docs/evidence/LL-001-T02.md`) có kết quả thật. Chưa có `npm test`, DB integration, E2E, deployment: runner và DB chưa tồn tại (thuộc AI-T07, AI-T08, LL-002). Coverage là UNKNOWN, không ghi 0% hay pass. Không có FPS/performance/thiết bị thật.

## Task tiếp theo

LL-001-T01 đã `done` (người dùng duyệt 2026-11-12) và LL-001-T02 đang `in_review`. Chuỗi kỹ thuật còn lại của SP-00, không có gate quyết định nào: LL-001-T03 → AI-T07 → AI-T08 và LL-002-T01 → LL-002-T02. Cả chuỗi chỉ chờ LL-001-T02 chuyển `done`, và theo OPS-3/OPS-4 chỉ người dùng xác nhận bước đó; sau khi xác nhận, bước tiếp theo là nhận LL-001-T03 (README phải ghi `npm run check`; T03 cũng quyết định có đưa Markdown vào `format:check` không, xem evidence LL-001-T02 O4). Ghi chú đã kiểm: `tsc --noEmit` trên bản sao không có `next-env.d.ts` và `.next` cho exit 0 với mã hiện tại, nên chưa cần bước tạo type trước khi typecheck; xem lại khi có import CSS/ảnh (các khai báo module toàn cục nằm trong `next-env.d.ts`, đang bị gitignore).

Sáu task quyết định AI-T01…AI-T06 cần câu trả lời thật từ người dùng nên không thể `done` bởi agent; chưa soạn phương án vì các task kỹ thuật phía trên không phụ thuộc chúng.

Không tự chọn đáp án 25 màn, device budget, hosting có phí, retention hay ký duyệt PO.

## Quyết định/input còn mở

- Q1 — Ngày bắt đầu và deadline?
- Q2 — Ai chịu trách nhiệm sản phẩm, 3D, đồ họa, review và bao nhiêu giờ mỗi tuần?
- Q3 — Thiết bị thấp nhất, browser/version và chiều màn hình?
- Q4 — Ngân sách hosting/DB, public/private và tài khoản triển khai?
- Q5 — Nguồn câu đố/assets, retention, cách xóa và trường analytics được phép?
- Q6 — Ai cung cấp hoặc cho phép AI sáng tác 25 câu đố và ai duyệt?
- Q7 — Giữ mọi màn mở sẵn và đặt 5 màn 3D ở ordinal nào?
- Q8-data — Giữ PostgreSQL cho tiến độ/events và nội dung ở repo?
- Q8-grading — Đánh giá đáp án ở client hay server, xử lý offline ra sao?
- Q9 — Có sensor/nhấn giữ ngoài tap/drag/choice/text/pick/camera?
- Q10 — Hình khối/emoji hay minh họa; model tự tạo hay nguồn nào?
- Q11 — DoD, người review và quy tắc cho phép hoãn high severity? **Mở, không còn chặn chuỗi SP-00:** từ 2026-11-12 áp dụng DoD tạm (OPS-4) cho tới Retro 20/11/2026; chốt chính thức ở Retro.

Quyết định phát sinh khi thực thi (chưa phải gate trong `tasks.json.decisions`):

- OPS-1 — **Đã quyết (2026-11-11):** tắt `AGENTS.md` do `next dev` tự sinh bằng `agentRules: false` trong `next.config.ts` (file thuộc phạm vi LL-001-T01). Next chỉ sinh file khi `next dev` phát hiện AI coding agent. Đảo ngược: xóa `next.config.ts`.
- OPS-3 — **Đã quyết (2026-11-11):** người dùng duyệt từng task. Mỗi task kỹ thuật dừng ở `in_review`; chỉ người dùng xác nhận `done`; dependent chỉ được nhận sau đó. Không thay cho Q11 (DoD và người review chính thức vẫn chưa được nêu).
- OPS-4 — **Đã quyết (2026-11-12):** dùng DoD tạm (`scrum/HO_SO.md` mục 6, Câu 1) cho tới Retro 20/11/2026. *Done* = mọi tiêu chí nghiệm thu đạt + bằng chứng ở `docs/evidence/` + không bí mật, không đổi ngoài phạm vi + người dùng duyệt + mã đã commit. Người duyệt là người dùng; lỗi mức cao chỉ hoãn khi người dùng ghi bằng văn bản; agent chỉ ghi vào PROGRESS.md, tasks.json, docs/evidence/ và file thuộc phạm vi task (README.md, docs/backlog.md, docs/sprint-1.md chỉ đọc). Không thay cho Q11 chính thức.
- OPS-2 — Pin Node: `.nvmrc` đang `22.22.3` (bản đã kiểm chứng); nodejs.org có 22.23.4 (2026-10-20). Có nâng sau khi kiểm chứng không?

Các gate còn lại (model/script/catalog/renderer/budget/thiết bị/credentials/release) trong tasks.json.decisions đều unresolved, evidence rỗng. Không có task được tự đánh dấu completed chỉ vì đã lập kế hoạch.

## Mẫu cập nhật mỗi lần thực thi

```text
Ngày/giờ (Asia/Ho_Chi_Minh):
Task ID và phạm vi đã được yêu cầu:
Status trước → sau:
Dependencies đã done / gates và scoped evidence:
Files/diff/revision:
Commands + exit code + report:
Manual review/thiết bị/thời điểm:
AC/DoD đạt hoặc thiếu:
Blocker/defect/task phát sinh:
Ảnh hưởng DAG/sprint/estimates và bước tiếp theo:
```

Mỗi status change cập nhật JSON/BACKLOG/PROGRESS cùng lượt, rerun verifier. Planning được review không khiến các task coding chuyển done.
