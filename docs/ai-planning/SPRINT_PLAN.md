# Sprint Plan

Ngày khảo sát: **2026-11-10**, múi giờ Asia/Ho_Chi_Minh. Kế hoạch đề xuất; implementation bắt đầu 2026-11-11 với SP-00 (trạng thái hiện hành ở PROGRESS.md).

<!-- plan-stats: tasks=147; sprints=12; points=201 -->

## Quy tắc lập và nhận sprint

SP-00 đang thực thi từ 2026-11-11, chỉ với các task đã đủ điều kiện nhận (xem PROGRESS.md); các sprint còn lại là **planned / conditional candidates**, chưa nhận thực thi. Capacity giả định 20 SP/tuần, target ≤18; không có lịch ngày đã được xác nhận. Mỗi task xuất hiện đúng một sprint dự kiến, mọi dependency ở sprint trước hoặc wave trước. **Admission** chỉ xảy ra khi dependency đã done và bằng chứng/gate của task đủ. Không bắt đầu theo mốc giờ scaffold như sprint cũ. Thực hiện Sprint 0 trước; nếu gate Sprint 0 chưa rõ, vẫn làm task độc lập có readiness=ready, không suy ra cả sprint đã đạt.

Waves mô tả thứ tự dependency, không phải ngày công hay chỉ dẫn phải chạy nhiều agent. Một agent có thể thực hiện lần lượt; không mặc định nhân lực/vai trò sẵn có. Task còn gate chưa duyệt không được bắt đầu, kể cả task trước trong cùng wave đã xong. Nếu hụt capacity/input, chuyển task chưa done sang replan và không mở task phụ thuộc.

Sprint nguồn `docs/sprint-1.md` là đề xuất khác với Sprint 0 ở đây; cả hai chưa cam kết. Mọi thay đổi phạm vi/ngày cần ghi vào PROGRESS và quyết định delivery thay vì âm thầm sửa nguồn.

## SP-00 — Sprint 0

**Sprint Goal:** Nền tảng Next.js/TypeScript, tooling/CI, PostgreSQL và quyết định có thể truy vết.

**Scope:** 13 task, 15/20 SP giả định; AI-ST-001, AI-ST-002, LL-001, LL-002.

**Task IDs:** [AI-T01](BACKLOG.md#ai-t01), [AI-T02](BACKLOG.md#ai-t02), [AI-T03](BACKLOG.md#ai-t03), [AI-T04](BACKLOG.md#ai-t04), [AI-T05](BACKLOG.md#ai-t05), [AI-T06](BACKLOG.md#ai-t06), [LL-001-T01](BACKLOG.md#ll-001-t01), [LL-001-T02](BACKLOG.md#ll-001-t02), [LL-001-T03](BACKLOG.md#ll-001-t03), [AI-T07](BACKLOG.md#ai-t07), [AI-T08](BACKLOG.md#ai-t08), [LL-002-T01](BACKLOG.md#ll-002-t01), [LL-002-T02](BACKLOG.md#ll-002-t02).

**Dependencies:** Không có sprint trước; chỉ các dependency nội bộ và gate task. Gate task cụ thể và file nằm ở BACKLOG/JSON.

**Thứ tự admission trong sprint:**

- Wave 1: AI-T01, AI-T02, AI-T03, AI-T04, AI-T05, AI-T06, LL-001-T01.
- Wave 2: LL-001-T02.
- Wave 3: LL-001-T03.
- Wave 4: AI-T07.
- Wave 5: AI-T08, LL-002-T01.
- Wave 6: LL-002-T02.

**Deliverables (đường dẫn dự kiến):**

- `docs/decisions/delivery.md`
- `docs/decisions/devices.md`
- `docs/decisions/hosting.md`
- `docs/decisions/data.md`
- `docs/decisions/grading.md`
- `docs/decisions/art.md`
- `package.json`
- `README.md`
- `compose.yaml`
- `src/app/api/health/route.ts`

**Acceptance Criteria:**

- Clone sạch npm ci/build và toàn bộ lint/format/typecheck/unit/E2E smoke đạt; DB rỗng migrate hai lần không nhân đôi dữ liệu.
- Health read/write 200 khi DB sẵn và 503 khi DB lỗi; CI có DB integration; quyết định delivery/device/hosting/data/grading/art có xác nhận.
- Tất cả task trong sprint đáp ứng AC riêng và có evidence; không tính quyết định/thiết bị chưa có là đã đạt.
- Chạy được các verification command áp dụng và demo từ deliverables thực.

**Exit Criteria:**

- Task done sau dependency/gate và DoD; mục còn thiếu được chuyển nguyên trạng sang replan.
- Không mở sprint phụ thuộc khi deliverables cần dùng chưa đạt; task chưa ready chỉ là ứng viên, không được nhận thực thi.
- Các chỉ số và sản lượng trong acceptance criteria của increment có report thực; missing input hoặc fail thì sprint chưa đạt goal.

**Risks:**

- Q1/Q2/Q3/Q4/Q5/Q8/Q10/Q11 chưa có câu trả lời; chỉ scaffold không phụ thuộc quyết định có thể bắt đầu.
- Estimate tạm; task vượt một ngày phải chia lại và tính lại dependency/capacity.

## SP-01 — Sprint 1

**Sprint Goal:** Chốt catalog, renderer 2D và rủi ro 3D; có contract nạp màn và UI tiếng Việt.

**Scope:** 12 task, 17/20 SP giả định; LL-004, LL-008, LL-014, LL-023, LL-028.

**Task IDs:** [LL-028-T01](BACKLOG.md#ll-028-t01), [LL-028-T02](BACKLOG.md#ll-028-t02), [LL-008-T01](BACKLOG.md#ll-008-t01), [LL-008-T02](BACKLOG.md#ll-008-t02), [LL-014-T01](BACKLOG.md#ll-014-t01), [LL-014-T02](BACKLOG.md#ll-014-t02), [LL-014-T03](BACKLOG.md#ll-014-t03), [LL-023-T01](BACKLOG.md#ll-023-t01), [LL-023-T02](BACKLOG.md#ll-023-t02), [LL-004-T01](BACKLOG.md#ll-004-t01), [LL-004-T02](BACKLOG.md#ll-004-t02), [LL-004-T03](BACKLOG.md#ll-004-t03).

**Dependencies:** SP-00. Gate task cụ thể và file nằm ở BACKLOG/JSON.

**Thứ tự admission trong sprint:**

- Wave 1: LL-028-T01, LL-008-T01, LL-014-T01, LL-023-T01, LL-004-T01.
- Wave 2: LL-028-T02, LL-008-T02, LL-014-T02, LL-023-T02, LL-004-T02.
- Wave 3: LL-014-T03, LL-004-T03.

**Deliverables (đường dẫn dự kiến):**

- `docs/content/catalog.json`
- `docs/content/catalog.md`
- `src/app/lab/2d/page.tsx`
- `docs/adr/002-2d-renderer.md`
- `src/app/lab/3d/page.tsx`
- `src/features/3d/dispose-scene.ts`
- `docs/evidence/LL-014-T03.md`
- `docs/design/style.md`
- `src/components/ui/Button.tsx`
- `src/domain/levels/schema.ts`
- `src/domain/levels/repository.ts`
- `src/app/levels/[ordinal]/page.tsx`

**Acceptance Criteria:**

- Catalog đủ 25 dòng, 20 2D/5 3D, ordinal và độ khó hợp lệ, PO duyệt; route fixture đúng/not-found và adapter giả chứng minh contract.
- ADR 2D dựa trên desktop + điện thoại thật; scene 3D build SSR, heap tăng ≤10% sau 20 vòng và có FPS máy thật; UI glyph tiếng Việt/contrast đạt.
- Tất cả task trong sprint đáp ứng AC riêng và có evidence; không tính quyết định/thiết bị chưa có là đã đạt.
- Chạy được các verification command áp dụng và demo từ deliverables thực.

**Exit Criteria:**

- Task done sau dependency/gate và DoD; mục còn thiếu được chuyển nguyên trạng sang replan.
- Không mở sprint phụ thuộc khi deliverables cần dùng chưa đạt; task chưa ready chỉ là ứng viên, không được nhận thực thi.
- Các chỉ số và sản lượng trong acceptance criteria của increment có report thực; missing input hoặc fail thì sprint chưa đạt goal.

**Risks:**

- Chưa có 25 ý tưởng, thiết bị thật hoặc người duyệt renderer/budget; không coi prototype là nội dung hoàn thành.
- Estimate tạm; task vượt một ngày phải chia lại và tính lại dependency/capacity.

## SP-02 — Sprint 2

**Sprint Goal:** Chơi được vòng mẫu, chọn màn, sân 2D, nạp 3D và lưu/khôi phục tiến độ ẩn danh.

**Scope:** 12 task, 18/20 SP giả định; LL-005, LL-006, LL-007, LL-016, LL-042.

**Task IDs:** [LL-005-T01](BACKLOG.md#ll-005-t01), [LL-005-T02](BACKLOG.md#ll-005-t02), [LL-005-T03](BACKLOG.md#ll-005-t03), [LL-006-T01](BACKLOG.md#ll-006-t01), [LL-042-T01](BACKLOG.md#ll-042-t01), [LL-042-T02](BACKLOG.md#ll-042-t02), [LL-016-T01](BACKLOG.md#ll-016-t01), [LL-016-T02](BACKLOG.md#ll-016-t02), [LL-016-T03](BACKLOG.md#ll-016-t03), [LL-007-T01](BACKLOG.md#ll-007-t01), [LL-007-T02](BACKLOG.md#ll-007-t02), [LL-007-T03](BACKLOG.md#ll-007-t03).

**Dependencies:** SP-00, SP-01. Gate task cụ thể và file nằm ở BACKLOG/JSON.

**Thứ tự admission trong sprint:**

- Wave 1: LL-005-T01, LL-006-T01, LL-042-T01, LL-016-T01.
- Wave 2: LL-005-T02, LL-042-T02, LL-016-T02.
- Wave 3: LL-005-T03, LL-016-T03.
- Wave 4: LL-007-T01.
- Wave 5: LL-007-T02.
- Wave 6: LL-007-T03.

**Deliverables (đường dẫn dự kiến):**

- `src/domain/game/machine.ts`
- `src/features/game/GameShell.tsx`
- `src/features/game/ResultPanel.tsx`
- `src/app/levels/page.tsx`
- `src/domain/2d/coordinates.ts`
- `src/features/2d/Stage2D.tsx`
- `docs/performance/3d-budget.json`
- `src/features/3d/assets/loader.ts`
- `src/features/3d/assets/LoadingPanel.tsx`
- `db/migrations/`
- `src/app/api/progress/route.ts`
- `src/features/progress/useProgress.ts`

**Acceptance Criteria:**

- Fixture vòng chơi có win/wrong/reset/exit/next/final; stale async không làm sai màn; selector từ catalog all-open.
- Bốn viewport sân 2D sai số ≤2; 3D budget có số và duyệt, loader cache/retry đạt; thắng/reload online giữ tiến độ và lỗi lưu không chặn game.
- Tất cả task trong sprint đáp ứng AC riêng và có evidence; không tính quyết định/thiết bị chưa có là đã đạt.
- Chạy được các verification command áp dụng và demo từ deliverables thực.

**Exit Criteria:**

- Task done sau dependency/gate và DoD; mục còn thiếu được chuyển nguyên trạng sang replan.
- Không mở sprint phụ thuộc khi deliverables cần dùng chưa đạt; task chưa ready chỉ là ứng viên, không được nhận thực thi.
- Các chỉ số và sản lượng trong acceptance criteria của increment có report thực; missing input hoặc fail thì sprint chưa đạt goal.

**Risks:**

- Server grading có thể xung đột offline; budget và data decision phải được chốt trước task tương ứng.
- Estimate tạm; task vượt một ngày phải chia lại và tính lại dependency/capacity.

## SP-03 — Sprint 3

**Sprint Goal:** Hoàn thiện tương tác 2D/3D, phục hồi lỗi, responsive và staging có DB.

**Scope:** 13 task, 17/20 SP giả định; LL-003, LL-009, LL-015, LL-025, LL-043, LL-048.

**Task IDs:** [LL-043-T01](BACKLOG.md#ll-043-t01), [LL-043-T02](BACKLOG.md#ll-043-t02), [LL-009-T01](BACKLOG.md#ll-009-t01), [LL-009-T02](BACKLOG.md#ll-009-t02), [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-015-T01](BACKLOG.md#ll-015-t01), [LL-015-T02](BACKLOG.md#ll-015-t02), [LL-015-T03](BACKLOG.md#ll-015-t03), [LL-048-T01](BACKLOG.md#ll-048-t01), [LL-048-T02](BACKLOG.md#ll-048-t02), [LL-025-T01](BACKLOG.md#ll-025-t01), [LL-003-T01](BACKLOG.md#ll-003-t01), [LL-003-T02](BACKLOG.md#ll-003-t02).

**Dependencies:** SP-00, SP-01, SP-02. Gate task cụ thể và file nằm ở BACKLOG/JSON.

**Thứ tự admission trong sprint:**

- Wave 1: LL-043-T01, LL-009-T01, LL-015-T01, LL-048-T01, LL-025-T01, LL-003-T01.
- Wave 2: LL-043-T02, LL-009-T02, LL-015-T02, LL-048-T02, LL-003-T02.
- Wave 3: LL-009-T03, LL-015-T03.

**Deliverables (đường dẫn dự kiến):**

- `src/domain/answers/normalize.ts`
- `src/features/2d/mechanics/TextAnswer.tsx`
- `src/features/2d/mechanics/TapTarget.tsx`
- `src/features/2d/mechanics/DragDrop.tsx`
- `src/features/game/mechanic-registry.ts`
- `src/features/3d/interactions/picking.ts`
- `src/features/3d/interactions/camera-controls.ts`
- `src/features/3d/interactions/drag-controller.ts`
- `src/app/error.tsx`
- `src/features/game/OfflineBanner.tsx`
- `src/features/game/GameShell.tsx`
- `docs/deployment.md`
- `docs/evidence/LL-003-T02.md`

**Acceptance Criteria:**

- Tap/choice/drag/text và pick/drag/camera đi qua shell đúng; IME/Unicode ≥15 cases; pointer cancel không mắc trạng thái.
- Responsive 360–1920px, targets ≥44×44px; lỗi render/data/offline có recovery; staging Chrome/Safari và DB health có bằng chứng.
- Tất cả task trong sprint đáp ứng AC riêng và có evidence; không tính quyết định/thiết bị chưa có là đã đạt.
- Chạy được các verification command áp dụng và demo từ deliverables thực.

**Exit Criteria:**

- Task done sau dependency/gate và DoD; mục còn thiếu được chuyển nguyên trạng sang replan.
- Không mở sprint phụ thuộc khi deliverables cần dùng chưa đạt; task chưa ready chỉ là ứng viên, không được nhận thực thi.
- Các chỉ số và sản lượng trong acceptance criteria của increment có report thực; missing input hoặc fail thì sprint chưa đạt goal.

**Risks:**

- Tương tác camera/drag trên touch và credential staging chưa có evidence; Safari thật cần quyền truy cập thiết bị.
- Estimate tạm; task vượt một ngày phải chia lại và tính lại dependency/capacity.

## SP-04 — Sprint 4

**Sprint Goal:** Giao lát cắt 2D đầu tiên gồm năm màn thật, script/model cho 3D-01.

**Scope:** 13 task, 18/20 SP giả định; LL-010, LL-029, LL-033, LL-034.

**Task IDs:** [LL-029-T01](BACKLOG.md#ll-029-t01), [LL-029-T02](BACKLOG.md#ll-029-t02), [LL-029-T03](BACKLOG.md#ll-029-t03), [LL-029-T04](BACKLOG.md#ll-029-t04), [LL-029-T05](BACKLOG.md#ll-029-t05), [LL-010-T01](BACKLOG.md#ll-010-t01), [LL-010-T02](BACKLOG.md#ll-010-t02), [LL-010-T03](BACKLOG.md#ll-010-t03), [LL-010-T04](BACKLOG.md#ll-010-t04), [LL-010-T05](BACKLOG.md#ll-010-t05), [LL-033-T01](BACKLOG.md#ll-033-t01), [LL-034-T01](BACKLOG.md#ll-034-t01), [LL-034-T02](BACKLOG.md#ll-034-t02).

**Dependencies:** SP-01, SP-02, SP-03. Gate task cụ thể và file nằm ở BACKLOG/JSON.

**Thứ tự admission trong sprint:**

- Wave 1: LL-029-T01, LL-029-T02, LL-033-T01.
- Wave 2: LL-029-T03, LL-029-T04, LL-034-T01.
- Wave 3: LL-029-T05, LL-034-T02.
- Wave 4: LL-010-T01, LL-010-T02, LL-010-T03, LL-010-T04, LL-010-T05.

**Deliverables (đường dẫn dự kiến):**

- `docs/content/levels/2d-01.md`
- `docs/content/levels/2d-04.md`
- `public/assets/levels/2d-01/`
- `public/assets/levels/2d-04/`
- `docs/content/reviews.md`
- `content/levels/2d-01.json`
- `content/levels/2d-02.json`
- `content/levels/2d-03.json`
- `content/levels/2d-04.json`
- `content/levels/2d-05.json`
- `docs/content/levels/3d-01.md`
- `public/assets/levels/3d-01/`
- `scripts/check-assets.mjs`

**Acceptance Criteria:**

- 2D-01…05 có script/assets được PO duyệt và thắng được, mỗi màn thử ≥3 thao tác sai/lạ, reset/exit và viewport nhỏ/lớn đạt.
- Script 3D-01 khả thi được review, model đủ object names, render trong scene mẫu và nằm trong budget đã duyệt.
- Tất cả task trong sprint đáp ứng AC riêng và có evidence; không tính quyết định/thiết bị chưa có là đã đạt.
- Chạy được các verification command áp dụng và demo từ deliverables thực.

**Exit Criteria:**

- Task done sau dependency/gate và DoD; mục còn thiếu được chuyển nguyên trạng sang replan.
- Không mở sprint phụ thuộc khi deliverables cần dùng chưa đạt; task chưa ready chỉ là ứng viên, không được nhận thực thi.
- Các chỉ số và sản lượng trong acceptance criteria của increment có report thực; missing input hoặc fail thì sprint chưa đạt goal.

**Risks:**

- Kịch bản và asset cần duyệt trước từng task triển khai; cơ chế mới làm thay đổi ước lượng.
- Estimate tạm; task vượt một ngày phải chia lại và tính lại dependency/capacity.

## SP-05 — Sprint 5

**Sprint Goal:** Giao 3D-01, đo/tối ưu ba thiết bị và chuẩn bị nội dung 2D lô 2 cùng bốn script 3D.

**Scope:** 14 task, 17/20 SP giả định; LL-017, LL-022, LL-030, LL-044.

**Task IDs:** [LL-017-T01](BACKLOG.md#ll-017-t01), [LL-017-T02](BACKLOG.md#ll-017-t02), [LL-017-T03](BACKLOG.md#ll-017-t03), [LL-022-T01](BACKLOG.md#ll-022-t01), [LL-022-T02](BACKLOG.md#ll-022-t02), [LL-030-T01](BACKLOG.md#ll-030-t01), [LL-030-T02](BACKLOG.md#ll-030-t02), [LL-030-T03](BACKLOG.md#ll-030-t03), [LL-030-T04](BACKLOG.md#ll-030-t04), [LL-030-T05](BACKLOG.md#ll-030-t05), [LL-044-T01](BACKLOG.md#ll-044-t01), [LL-044-T02](BACKLOG.md#ll-044-t02), [LL-044-T03](BACKLOG.md#ll-044-t03), [LL-044-T04](BACKLOG.md#ll-044-t04).

**Dependencies:** SP-00, SP-01, SP-02, SP-03, SP-04. Gate task cụ thể và file nằm ở BACKLOG/JSON.

**Thứ tự admission trong sprint:**

- Wave 1: LL-017-T01, LL-030-T01, LL-030-T02, LL-044-T01, LL-044-T02, LL-044-T03, LL-044-T04.
- Wave 2: LL-017-T02, LL-030-T03, LL-030-T04.
- Wave 3: LL-017-T03, LL-030-T05.
- Wave 4: LL-022-T01.
- Wave 5: LL-022-T02.

**Deliverables (đường dẫn dự kiến):**

- `content/levels/3d-01.json`
- `src/features/3d/levels/3d-01.ts`
- `tests/e2e/levels/3d-01.spec.ts`
- `docs/performance/3d-baseline.md`
- `src/features/3d/quality.ts`
- `docs/content/levels/2d-06.md`
- `docs/content/levels/2d-09.md`
- `public/assets/levels/2d-06/`
- `public/assets/levels/2d-09/`
- `docs/content/reviews.md`
- `docs/content/levels/3d-02.md`
- `docs/content/levels/3d-03.md`
- `docs/content/levels/3d-04.md`
- `docs/content/levels/3d-05.md`

**Acceptance Criteria:**

- 3D-01 win/wrong/reset/exit thực và đạt budget; profile trên ≥3 thiết bị, ≥1 máy yếu, có kết quả trước/sau tối ưu.
- Nội dung/asset 2D lô 2 đã duyệt; bốn script 3D còn lại có manifest và feasibility review để cập nhật estimate.
- Tất cả task trong sprint đáp ứng AC riêng và có evidence; không tính quyết định/thiết bị chưa có là đã đạt.
- Chạy được các verification command áp dụng và demo từ deliverables thực.

**Exit Criteria:**

- Task done sau dependency/gate và DoD; mục còn thiếu được chuyển nguyên trạng sang replan.
- Không mở sprint phụ thuộc khi deliverables cần dùng chưa đạt; task chưa ready chỉ là ứng viên, không được nhận thực thi.
- Các chỉ số và sản lượng trong acceptance criteria của increment có report thực; missing input hoặc fail thì sprint chưa đạt goal.

**Risks:**

- Chưa biết độ phức tạp puzzle 3D, chưa có ba thiết bị để profile.
- Estimate tạm; task vượt một ngày phải chia lại và tính lại dependency/capacity.

## SP-06 — Sprint 6

**Sprint Goal:** Giao thêm năm màn 2D, 3D-02 và trang chủ Chơi tiếp.

**Scope:** 11 task, 18/20 SP giả định; LL-011, LL-018, LL-024, LL-045.

**Task IDs:** [LL-011-T01](BACKLOG.md#ll-011-t01), [LL-011-T02](BACKLOG.md#ll-011-t02), [LL-011-T03](BACKLOG.md#ll-011-t03), [LL-011-T04](BACKLOG.md#ll-011-t04), [LL-011-T05](BACKLOG.md#ll-011-t05), [LL-045-T01](BACKLOG.md#ll-045-t01), [LL-045-T02](BACKLOG.md#ll-045-t02), [LL-018-T01](BACKLOG.md#ll-018-t01), [LL-018-T02](BACKLOG.md#ll-018-t02), [LL-018-T03](BACKLOG.md#ll-018-t03), [LL-024-T01](BACKLOG.md#ll-024-t01).

**Dependencies:** SP-01, SP-02, SP-03, SP-05. Gate task cụ thể và file nằm ở BACKLOG/JSON.

**Thứ tự admission trong sprint:**

- Wave 1: LL-011-T01, LL-011-T02, LL-011-T03, LL-011-T04, LL-011-T05, LL-045-T01, LL-024-T01.
- Wave 2: LL-045-T02.
- Wave 3: LL-018-T01.
- Wave 4: LL-018-T02.
- Wave 5: LL-018-T03.

**Deliverables (đường dẫn dự kiến):**

- `content/levels/2d-06.json`
- `content/levels/2d-07.json`
- `content/levels/2d-08.json`
- `content/levels/2d-09.json`
- `content/levels/2d-10.json`
- `public/assets/levels/3d-02/`
- `scripts/check-assets.mjs`
- `content/levels/3d-02.json`
- `src/features/3d/levels/3d-02.ts`
- `tests/e2e/levels/3d-02.spec.ts`
- `src/app/page.tsx`

**Acceptance Criteria:**

- Có 10 màn 2D và hai màn 3D thắng được đúng script; model 3D-02 áp pipeline tối ưu và budget.
- Trang chủ mới/đã có tiến độ chọn đúng Chơi hoặc Chơi tiếp, không sinh route ngoài catalog.
- Tất cả task trong sprint đáp ứng AC riêng và có evidence; không tính quyết định/thiết bị chưa có là đã đạt.
- Chạy được các verification command áp dụng và demo từ deliverables thực.

**Exit Criteria:**

- Task done sau dependency/gate và DoD; mục còn thiếu được chuyển nguyên trạng sang replan.
- Không mở sprint phụ thuộc khi deliverables cần dùng chưa đạt; task chưa ready chỉ là ứng viên, không được nhận thực thi.
- Các chỉ số và sản lượng trong acceptance criteria của increment có report thực; missing input hoặc fail thì sprint chưa đạt goal.

**Risks:**

- Áp dụng pipeline asset đã đo; không nới budget để vừa model.
- Estimate tạm; task vượt một ngày phải chia lại và tính lại dependency/capacity.

## SP-07 — Sprint 7

**Sprint Goal:** Giao 2D-11…15, model 3D-03 và phản hồi đúng/sai hoàn chỉnh.

**Scope:** 13 task, 18/20 SP giả định; LL-012, LL-026, LL-031, LL-046.

**Task IDs:** [LL-031-T01](BACKLOG.md#ll-031-t01), [LL-031-T02](BACKLOG.md#ll-031-t02), [LL-031-T03](BACKLOG.md#ll-031-t03), [LL-031-T04](BACKLOG.md#ll-031-t04), [LL-031-T05](BACKLOG.md#ll-031-t05), [LL-012-T01](BACKLOG.md#ll-012-t01), [LL-012-T02](BACKLOG.md#ll-012-t02), [LL-012-T03](BACKLOG.md#ll-012-t03), [LL-012-T04](BACKLOG.md#ll-012-t04), [LL-012-T05](BACKLOG.md#ll-012-t05), [LL-046-T01](BACKLOG.md#ll-046-t01), [LL-046-T02](BACKLOG.md#ll-046-t02), [LL-026-T01](BACKLOG.md#ll-026-t01).

**Dependencies:** SP-01, SP-02, SP-03, SP-05. Gate task cụ thể và file nằm ở BACKLOG/JSON.

**Thứ tự admission trong sprint:**

- Wave 1: LL-031-T01, LL-031-T02, LL-046-T01, LL-026-T01.
- Wave 2: LL-031-T03, LL-031-T04, LL-046-T02.
- Wave 3: LL-031-T05.
- Wave 4: LL-012-T01, LL-012-T02, LL-012-T03, LL-012-T04, LL-012-T05.

**Deliverables (đường dẫn dự kiến):**

- `docs/content/levels/2d-11.md`
- `docs/content/levels/2d-14.md`
- `public/assets/levels/2d-11/`
- `public/assets/levels/2d-14/`
- `docs/content/reviews.md`
- `content/levels/2d-11.json`
- `content/levels/2d-12.json`
- `content/levels/2d-13.json`
- `content/levels/2d-14.json`
- `content/levels/2d-15.json`
- `public/assets/levels/3d-03/`
- `scripts/check-assets.mjs`
- `src/features/game/ResultPanel.tsx`

**Acceptance Criteria:**

- 2D-11…15 win/wrong/reset/exit đúng, tổng 15 màn 2D; model 3D-03 kiểm chứng trong scene mẫu.
- Feedback đúng/sai ≤1s, transition ≤500ms, reduced-motion vẫn rõ kết quả.
- Tất cả task trong sprint đáp ứng AC riêng và có evidence; không tính quyết định/thiết bị chưa có là đã đạt.
- Chạy được các verification command áp dụng và demo từ deliverables thực.

**Exit Criteria:**

- Task done sau dependency/gate và DoD; mục còn thiếu được chuyển nguyên trạng sang replan.
- Không mở sprint phụ thuộc khi deliverables cần dùng chưa đạt; task chưa ready chỉ là ứng viên, không được nhận thực thi.
- Các chỉ số và sản lượng trong acceptance criteria của increment có report thực; missing input hoặc fail thì sprint chưa đạt goal.

**Risks:**

- Nội dung lô 3 có thể cần cơ chế mới; CSS feedback không chặn thao tác.
- Estimate tạm; task vượt một ngày phải chia lại và tính lại dependency/capacity.

## SP-08 — Sprint 8

**Sprint Goal:** Giao 3D-03, 3D-04; duyệt 2D lô cuối và kiểm tra điều kiện hoàn tất.

**Scope:** 14 task, 18/20 SP giả định; LL-019, LL-020, LL-027, LL-032, LL-035.

**Task IDs:** [LL-019-T01](BACKLOG.md#ll-019-t01), [LL-019-T02](BACKLOG.md#ll-019-t02), [LL-019-T03](BACKLOG.md#ll-019-t03), [LL-032-T01](BACKLOG.md#ll-032-t01), [LL-032-T02](BACKLOG.md#ll-032-t02), [LL-032-T03](BACKLOG.md#ll-032-t03), [LL-032-T04](BACKLOG.md#ll-032-t04), [LL-032-T05](BACKLOG.md#ll-032-t05), [LL-035-T01](BACKLOG.md#ll-035-t01), [LL-035-T02](BACKLOG.md#ll-035-t02), [LL-020-T01](BACKLOG.md#ll-020-t01), [LL-020-T02](BACKLOG.md#ll-020-t02), [LL-020-T03](BACKLOG.md#ll-020-t03), [LL-027-T01](BACKLOG.md#ll-027-t01).

**Dependencies:** SP-01, SP-02, SP-03, SP-05, SP-07. Gate task cụ thể và file nằm ở BACKLOG/JSON.

**Thứ tự admission trong sprint:**

- Wave 1: LL-019-T01, LL-032-T01, LL-032-T02, LL-035-T01, LL-027-T01.
- Wave 2: LL-019-T02, LL-032-T03, LL-032-T04, LL-035-T02.
- Wave 3: LL-019-T03, LL-032-T05, LL-020-T01.
- Wave 4: LL-020-T02.
- Wave 5: LL-020-T03.

**Deliverables (đường dẫn dự kiến):**

- `content/levels/3d-03.json`
- `src/features/3d/levels/3d-03.ts`
- `tests/e2e/levels/3d-03.spec.ts`
- `docs/content/levels/2d-16.md`
- `docs/content/levels/2d-19.md`
- `public/assets/levels/2d-16/`
- `public/assets/levels/2d-19/`
- `docs/content/reviews.md`
- `public/assets/levels/3d-04/`
- `scripts/check-assets.mjs`
- `content/levels/3d-04.json`
- `src/features/3d/levels/3d-04.ts`
- `tests/e2e/levels/3d-04.spec.ts`
- `src/app/completed/page.tsx`

**Acceptance Criteria:**

- 3D-03 và 3D-04 chạy end-to-end và đạt budget, tổng bốn màn 3D; nội dung/asset lô 2D cuối đã duyệt.
- Điều kiện hoàn tất test bằng 25 valid IDs, không complete khi 24/25 hoặc duplicate; fixture không được tính thành số màn sản phẩm.
- Tất cả task trong sprint đáp ứng AC riêng và có evidence; không tính quyết định/thiết bị chưa có là đã đạt.
- Chạy được các verification command áp dụng và demo từ deliverables thực.

**Exit Criteria:**

- Task done sau dependency/gate và DoD; mục còn thiếu được chuyển nguyên trạng sang replan.
- Không mở sprint phụ thuộc khi deliverables cần dùng chưa đạt; task chưa ready chỉ là ứng viên, không được nhận thực thi.
- Các chỉ số và sản lượng trong acceptance criteria của increment có report thực; missing input hoặc fail thì sprint chưa đạt goal.

**Risks:**

- Màn hoàn tất kiểm tra bằng fixture 25/25, chưa được dùng làm bằng chứng đủ 25 màn thật.
- Estimate tạm; task vượt một ngày phải chia lại và tính lại dependency/capacity.

## SP-09 — Sprint 9

**Sprint Goal:** Đủ 20 màn 2D và năm màn 3D triển khai theo script đã duyệt.

**Scope:** 10 task, 17/20 SP giả định; LL-013, LL-021, LL-047.

**Task IDs:** [LL-013-T01](BACKLOG.md#ll-013-t01), [LL-013-T02](BACKLOG.md#ll-013-t02), [LL-013-T03](BACKLOG.md#ll-013-t03), [LL-013-T04](BACKLOG.md#ll-013-t04), [LL-013-T05](BACKLOG.md#ll-013-t05), [LL-047-T01](BACKLOG.md#ll-047-t01), [LL-047-T02](BACKLOG.md#ll-047-t02), [LL-021-T01](BACKLOG.md#ll-021-t01), [LL-021-T02](BACKLOG.md#ll-021-t02), [LL-021-T03](BACKLOG.md#ll-021-t03).

**Dependencies:** SP-02, SP-03, SP-05, SP-08. Gate task cụ thể và file nằm ở BACKLOG/JSON.

**Thứ tự admission trong sprint:**

- Wave 1: LL-013-T01, LL-013-T02, LL-013-T03, LL-013-T04, LL-013-T05, LL-047-T01.
- Wave 2: LL-047-T02.
- Wave 3: LL-021-T01.
- Wave 4: LL-021-T02.
- Wave 5: LL-021-T03.

**Deliverables (đường dẫn dự kiến):**

- `content/levels/2d-16.json`
- `content/levels/2d-17.json`
- `content/levels/2d-18.json`
- `content/levels/2d-19.json`
- `content/levels/2d-20.json`
- `public/assets/levels/3d-05/`
- `scripts/check-assets.mjs`
- `content/levels/3d-05.json`
- `src/features/3d/levels/3d-05.ts`
- `tests/e2e/levels/3d-05.spec.ts`

**Acceptance Criteria:**

- Catalog production đủ 20 2D+5 3D không placeholder, ordinal mapping đúng; mọi màn có đúng/≥3 sai/lạ/reset/exit evidence.
- 3D-05 đạt budget và lifecycle như các màn trước; đủ số lượng chưa bỏ qua gates QA/license/data còn lại.
- Tất cả task trong sprint đáp ứng AC riêng và có evidence; không tính quyết định/thiết bị chưa có là đã đạt.
- Chạy được các verification command áp dụng và demo từ deliverables thực.

**Exit Criteria:**

- Task done sau dependency/gate và DoD; mục còn thiếu được chuyển nguyên trạng sang replan.
- Không mở sprint phụ thuộc khi deliverables cần dùng chưa đạt; task chưa ready chỉ là ứng viên, không được nhận thực thi.
- Các chỉ số và sản lượng trong acceptance criteria của increment có report thực; missing input hoặc fail thì sprint chưa đạt goal.

**Risks:**

- Đủ số lượng chưa đồng nghĩa release-ready; QA/license/copy/performance toàn bộ còn ở sprint cuối.
- Estimate tạm; task vượt một ngày phải chia lại và tính lại dependency/capacity.

## SP-10 — Sprint 10

**Sprint Goal:** Tích hợp analytics, ghi công/xóa dữ liệu, rà văn bản và tối ưu tải toàn bộ nội dung.

**Scope:** 12 task, 14/20 SP giả định; LL-036, LL-037, LL-041, LL-049, LL-051.

**Task IDs:** [LL-036-T01](BACKLOG.md#ll-036-t01), [LL-036-T02](BACKLOG.md#ll-036-t02), [LL-037-T01](BACKLOG.md#ll-037-t01), [LL-037-T02](BACKLOG.md#ll-037-t02), [LL-049-T01](BACKLOG.md#ll-049-t01), [LL-049-T02](BACKLOG.md#ll-049-t02), [LL-049-T03](BACKLOG.md#ll-049-t03), [LL-049-T04](BACKLOG.md#ll-049-t04), [LL-051-T01](BACKLOG.md#ll-051-t01), [LL-051-T02](BACKLOG.md#ll-051-t02), [LL-041-T01](BACKLOG.md#ll-041-t01), [LL-041-T02](BACKLOG.md#ll-041-t02).

**Dependencies:** SP-00, SP-01, SP-02, SP-03, SP-04, SP-05, SP-06, SP-07, SP-08, SP-09. Gate task cụ thể và file nằm ở BACKLOG/JSON.

**Thứ tự admission trong sprint:**

- Wave 1: LL-036-T01, LL-037-T01, LL-049-T01, LL-041-T01.
- Wave 2: LL-036-T02, LL-037-T02, LL-049-T02, LL-041-T02.
- Wave 3: LL-049-T03.
- Wave 4: LL-049-T04.
- Wave 5: LL-051-T01.
- Wave 6: LL-051-T02.

**Deliverables (đường dẫn dự kiến):**

- `docs/content/copy-review.md`
- `content/levels/`
- `docs/assets/ledger.json`
- `db/migrations/`
- `src/app/api/events/route.ts`
- `src/server/analytics/queries.ts`
- `src/features/analytics/client.ts`
- `src/app/about/page.tsx`
- `src/app/api/player/route.ts`
- `scripts/measure-performance.mjs`
- `src/features/game/prefetch.ts`

**Acceptance Criteria:**

- Mọi văn bản được người khác tác giả đọc soát, sửa đóng; ledger đủ font/image/model/library/puzzle và không unknown license.
- Năm events/ba queries đúng fixture, gửi lỗi không chặn game; notice/credits khớp dữ liệu thực và xóa đúng player; selector ≤3s, ≤1MB, next ≤1s theo profile tạm đã chốt.
- Tất cả task trong sprint đáp ứng AC riêng và có evidence; không tính quyết định/thiết bị chưa có là đã đạt.
- Chạy được các verification command áp dụng và demo từ deliverables thực.

**Exit Criteria:**

- Task done sau dependency/gate và DoD; mục còn thiếu được chuyển nguyên trạng sang replan.
- Không mở sprint phụ thuộc khi deliverables cần dùng chưa đạt; task chưa ready chỉ là ứng viên, không được nhận thực thi.
- Các chỉ số và sản lượng trong acceptance criteria của increment có report thực; missing input hoặc fail thì sprint chưa đạt goal.

**Risks:**

- Reviewer khác tác giả, giấy phép và retention chưa chốt; analytics là Should, có thể cắt nhưng phải sửa notice/dependencies.
- Estimate tạm; task vượt một ngày phải chia lại và tính lại dependency/capacity.

## SP-11 — Sprint 11

**Sprint Goal:** Nghiệm thu 25 màn, matrix và máy yếu; đóng release gates, RC và deployed smoke.

**Scope:** 10 task, 14/20 SP giả định; LL-038, LL-039, LL-040, LL-050.

**Task IDs:** [LL-038-T01](BACKLOG.md#ll-038-t01), [LL-038-T02](BACKLOG.md#ll-038-t02), [LL-038-T03](BACKLOG.md#ll-038-t03), [LL-039-T01](BACKLOG.md#ll-039-t01), [LL-039-T02](BACKLOG.md#ll-039-t02), [LL-050-T01](BACKLOG.md#ll-050-t01), [LL-050-T02](BACKLOG.md#ll-050-t02), [LL-040-T01](BACKLOG.md#ll-040-t01), [LL-040-T02](BACKLOG.md#ll-040-t02), [LL-040-T03](BACKLOG.md#ll-040-t03).

**Dependencies:** SP-00, SP-02, SP-03, SP-04, SP-05, SP-06, SP-07, SP-08, SP-09, SP-10. Gate task cụ thể và file nằm ở BACKLOG/JSON.

**Thứ tự admission trong sprint:**

- Wave 1: LL-038-T01, LL-038-T02, LL-038-T03, LL-050-T01, LL-050-T02.
- Wave 2: LL-039-T01.
- Wave 3: LL-039-T02.
- Wave 4: LL-040-T01.
- Wave 5: LL-040-T02.
- Wave 6: LL-040-T03.

**Deliverables (đường dẫn dự kiến):**

- `tests/e2e/levels/`
- `playwright.config.ts`
- `docs/qa/browser-matrix.md`
- `docs/performance/low-end-2d.md`
- `docs/performance/low-end-3d.md`
- `docs/qa/defects.json`
- `docs/releases/`
- `scripts/verify-deployed.mjs`

**Acceptance Criteria:**

- 25 màn qua playthrough và ≥3 sai/lạ mỗi màn; ma trận browser/no-WebGL và low-end từng màn có evidence thật, không dùng skipped như pass.
- 0 blocker; high đóng hoặc PO hoãn bằng văn bản; mọi DEF task release dependency đạt; DoD và RC report đạt, deployed URL/tag/revision khớp và smoke đủ 25 màn sau quyền release.
- Tất cả task trong sprint đáp ứng AC riêng và có evidence; không tính quyết định/thiết bị chưa có là đã đạt.
- Chạy được các verification command áp dụng và demo từ deliverables thực.

**Exit Criteria:**

- Task done sau dependency/gate và DoD; mục còn thiếu được chuyển nguyên trạng sang replan.
- Không mở sprint phụ thuộc khi deliverables cần dùng chưa đạt; task chưa ready chỉ là ứng viên, không được nhận thực thi.
- Các chỉ số và sản lượng trong acceptance criteria của increment có report thực; missing input hoặc fail thì sprint chưa đạt goal.

**Risks:**

- Chưa biết số defect: tạo DEF task có repro rồi replan, không cam kết sửa mọi lỗi trong ba task release.
- Tag/deploy chỉ khi đã có quyền cho RC cụ thể; máy giả lập không thay bằng chứng máy thật.
- Estimate tạm; task vượt một ngày phải chia lại và tính lại dependency/capacity.
