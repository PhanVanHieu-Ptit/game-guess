# Execution Rules cho AI Coding Agent

Ngày khảo sát: **2026-11-10**, múi giờ Asia/Ho_Chi_Minh. Kế hoạch đề xuất; implementation bắt đầu 2026-11-11 với SP-00 (trạng thái hiện hành ở PROGRESS.md).

<!-- plan-stats: tasks=147; sprints=12; points=201 -->

## Phạm vi hiện tại

Yêu cầu phiên làm việc này là **planning**: không sửa business code, không cài package, không tạo DB, không chạy deployment/tag/commit. Các task là công việc tương lai, chỉ thực hiện khi có yêu cầu triển khai tương ứng. Không coi `sprint_id` hoặc một task có chữ “deploy” là quyền thao tác tài khoản bên ngoài. Khi đã được cấp quyền cho bước cụ thể, lưu provenance và tiếp tục trong phạm vi, không hỏi lại.

## Nguồn, schema và ID

1. Đọc PROJECT_ANALYSIS, REQUIREMENTS, ARCHITECTURE, RISKS, PROGRESS, rồi task ở tasks.json/BACKLOG và AC story nguồn. Kiểm tra AGENTS.md áp dụng tại thời điểm thực thi.
2. `tasks.json` là danh mục máy đọc của baseline planning; BACKLOG/SPRINT_PLAN/REQUIREMENTS là bản người đọc đồng bộ. Nguồn yêu cầu chính vẫn là bảng `docs/backlog.md` cho đến khi có quyết định được xác nhận khác. Không chỉnh IDs LL-001…LL-051.
3. Task IDs LL-NNN-TNN/AI-TNN độc nhất; subtask `<TASK-ID>-SNN`; defect xác nhận dùng DEF-NNN với cùng fields, thuộc story/feature/epic liên quan. Story source estimate 211 không cộng với task estimate 201.
4. Mỗi task có priority, complexity, points, deps, gates, files, steps/subtasks, AC, DoD, commands, manual checks, status và evidence. `affected_files` là dự kiến; nếu đường dẫn thay đổi phải cập nhật task/Markdown. Subtask không có estimate riêng nên không cộng điểm lần hai.
5. `source_files.sha256` đóng băng cả file chưa commit. Nguồn đổi: đọc diff, phân tích ảnh hưởng, cập nhật snapshot với lý do và replan, không chỉ sửa hash để verifier qua.

## Admission và lựa chọn task

- Tất cả 147 task hiện là `todo`, mọi evidence rỗng. `readiness` là snapshot: ready / dependency_blocked / decision_blocked; phải tính lại lúc nhận task.
- Chọn P0 rồi P1, tiếp theo P2/P3 khi phù hợp dependency và sprint goal. Không nhảy sang dependent chưa đủ input để tận dụng thời gian.
- Điều kiện nhận: phạm vi đã được yêu cầu; mọi dependency **thực tế done**, không chỉ scaffold xong; decision/evidence gate được xác nhận đúng scope; file/tool/thiết bị/account cần thiết có sẵn; task ≤1 ngày dự kiến.
- Kế hoạch sprint chứa ứng viên tương lai. Wave sau chỉ được admit sau dependency hoàn tất. Task chưa đủ predecessor chỉ là ứng viên, không được nhận vào scope thực thi; nếu predecessor không đạt, dời dependent và tính lại forecast.
- Gate approval cho lô/script/model có scope theo task: evidence duyệt 2D lô 1 không mở gate lô 2; `decisions[].status=resolved` tổng quát chưa đủ. Lưu task IDs, reviewer, timestamp, artifact version và nội dung xác nhận. Gate release gắn đúng RC hash.
- Các task AI-T01…AI-T06 tạo quyết định cần câu trả lời thật. Có thể soạn phương án trước, nhưng không done khi chưa xác nhận. Không hỏi lại điều đã được xác nhận trong session/context.
- Khi cần quyết định, ghi cụ thể câu hỏi/ảnh hưởng, tiếp tục task độc lập đã được ủy quyền. Không được bịa script, model, credentials hay số đo.

## Luồng thực hiện một task

1. `python3 docs/ai-planning/verify_plan.py`; đọc git status, source hash và các file liên quan. Không reset/sửa file người dùng ngoài phạm vi. `.git`, `.agents`, `.codex`, `.aws` không phải phạm vi chỉnh của planning.
2. Ghi task được nhận vào PROGRESS và status `in_progress` (chỉ sau admission). Nếu thiếu quyết định, đặt blocked với lý do, không chuyển done.
3. Đọc source/contract thật, làm theo implementation_steps và subtasks. Giữ một trách nhiệm/module chính; shared file chỉ sửa phần task sở hữu. Không dùng parallel agents mặc định.
4. Nếu phát sinh cơ chế/endpoint/schema mới không nằm trong task hoặc estimate >1 ngày, chia task nhỏ với AC/deps/files/verify cụ thể, cập nhật DAG/sprints trước khi bắt đầu phần mới. Parent chưa được tự done.
5. Tạo/chạy test hành vi cần thiết: domain cases, API validation/idempotency/isolation, UI E2E theo task. Không viết test chỉ lặp logic implementation hoặc test không cần thiết cho sửa docs nhỏ.
6. Chạy verification_commands theo prerequisites. Script chưa tồn tại phải được tạo ở task sở hữu; lệnh fail, skipped hoặc chưa chạy không tính pass. Lint/build đơn thuần không chứng minh đúng logic nghiệp vụ.
7. Thực hiện manual_verification bằng thiết bị/người có thật. Browser emulation không là máy thật; WebKit automation không là Safari thật; fixture không là một màn sản phẩm được duyệt. Không thu video/animation bằng workflow mới nếu không cần cho evidence; ảnh/log đủ khi phù hợp.
8. Ghi report thực vào `docs/evidence/<TASK-ID>.md`: revision/diff, môi trường, prerequisites, commands/exit codes, assertions và manual artifacts. Không tạo report pass từ dự định.
9. Đặt in_review; đối chiếu AC task và AC story nguồn, D1–D4. Có review theo DoD đã chốt. Agent không tự ký PO/ART3D hoặc người đọc khác tác giả.
10. Chỉ done khi mọi điều kiện pass, deps done, scoped gates đã có evidence, evidence không rỗng và subtasks liên quan done. Cập nhật JSON/PROGRESS/Markdown cùng lượt, chạy lại verifier. Không tự merge/commit/tag/publish nếu chưa có quyền phù hợp.

## State và evidence

`todo → in_progress → in_review → done`; có thể chuyển blocked khi có lý do/input thiếu. Không chuyển done do hết thời gian hoặc đã tạo file. Nếu kiểm tra mới phát hiện AC chưa đạt, reopen và cập nhật downstream gate. Subtasks kế thừa status và evidence nhưng không tự mở khóa story dependency. Story chỉ completed khi tất cả task của story done và AC story được kiểm chứng ở sản phẩm thực.

Evidence JSON mỗi mục nên có `kind` (command/manual/decision), `artifact`, `revision`, `recorded_at`, `result`, `command`/`exit_code` nếu là command và `reviewer`/`scope_task_ids` nếu là approval. Gate evidence rỗng nghĩa là unresolved. Validator kiểm cấu trúc và tính nhất quán; không thể tự chứng nhận tính đúng của ảnh/log hoặc người duyệt.

## Command contract và prerequisites

| Command | Task tạo contract | Prerequisites/ý nghĩa |
|---|---|---|
| `python3 docs/ai-planning/verify_plan.py` | Có sẵn trong lần planning | Python stdlib; kiểm JSON/IDs/DAG/waves/source hash/Markdown; không chạy game tests |
| `npm ci`, `npm run dev`, `npm run build` | LL-001-T01 | Runtime pin, package manifest/lockfile; build SSR cần không lỗi window |
| `npm run lint`, `format:check`, `typecheck` | LL-001-T02 | Cấu hình thật và source có thể kiểm tra |
| `npm run test:unit -- --run` | AI-T07 | Runner không watch; test nghiệp vụ xuất hiện cùng task tương ứng |
| `npm run test:e2e -- <spec>` | AI-T08 | Browser binaries; webServer production tự chạy; DB test khi flow cần; không tính spec chưa có |
| `docker compose up -d db`, `npm run db:migrate`, `test:integration` | LL-002-T01 | Docker đã sẵn, DB test riêng qua DATABASE_URL; integration runner --run; không chạm production |
| `npm run content:validate` | LL-028-T01 | Catalog/scripts/production mode; production release đòi đủ 25 id/implementation không placeholder |
| `npm run assets:check` | LL-016-T02; mở rộng model tasks | Manifest thật và budget đã duyệt; GLB decoder/stat checking cần phụ thuộc phù hợp |
| `npm run licenses:check` | LL-037-T01 | Ledger đối soát nguồn thực; script không thay người review quyền sử dụng |
| `npm run perf:check -- --profile 4g` | LL-041-T01 | Production staging, profile/cache/build hash cố định; low-end/kind theo LL-050 |
| `node scripts/deploy-staging.mjs --dry-run/--execute` | LL-003-T01 | Hosting/account/env được chốt; execute cần quyền đã ghi, secrets không in log |
| `node scripts/verify-deployed.mjs --suite smoke/all-levels` | LL-003-T01 | URL/config môi trường đúng staging và revision; all-levels chỉ khi đủ nội dung |
| `npm run verify:release` | LL-040-T02 | Tập report thực và gate summary, không sinh pass bằng tồn tại file; tương tác lỗi phải fail |

Các lệnh npm hiện chưa được chạy vì không có package.json. Chỉ verifier planning có kết quả trong PROGRESS. Khi chọn công cụ cụ thể, xác minh docs chính thức/compatibility ở thời điểm thực thi; không dùng phiên bản “latest” tùy tiện hoặc tự gọi network để nâng version ngoài task.

## Defect và scope change

- Không mở defect nếu chỉ thiếu code. Defect cần hành vi thực sai AC, bước tái hiện và evidence.
- LL-040-T01 triage; thêm DEF-NNN độc lập ≤1 ngày, `priority/complexity/points/dependencies/files/steps/AC/DoD/commands` đủ như task thường. Gắn blocker/high chưa hoãn vào dependencies LL-040-T02; không dùng gate chữ đơn thuần bỏ qua sửa lỗi.
- PO có thể hoãn high bằng văn bản theo AC nguồn; blocker phải zero. Cập nhật task count/SP/sprint/count markers giữa các docs sau khi thêm defect; 147/201 là baseline, không hardcode như hạn mức.
- Cắt Should/Could theo impact analysis ROADMAP; không để dependencies trỏ task bị xóa hoặc notice mô tả dữ liệu không còn thu. Q7/Q8 thay baseline cần task mới; không sửa business scope ngầm.

## Exit sprint và release

Demo deliverables thực, tổng hợp task done bằng evidence, giữ task chưa đạt nguyên trạng, ghi velocity thật và replan. Không mở dependent chỉ vì đến tuần kế. Final release: 25 valid levels, checks và manual matrix đạt, license/data phù hợp, zero blockers, high theo PO, tag/URL/revision đúng RC, deployed smoke đủ 25 màn. Quyền deploy/tag/publish là gate có thể được cấp từ trước, không hỏi lại khi đã có bằng chứng ủy quyền.
