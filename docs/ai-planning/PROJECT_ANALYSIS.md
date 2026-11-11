# Project Analysis — Lắt Léo

Ngày khảo sát: **2026-11-10**, múi giờ Asia/Ho_Chi_Minh. Kế hoạch đề xuất; implementation bắt đầu 2026-11-11 với SP-00 (trạng thái hiện hành ở PROGRESS.md).

<!-- plan-stats: tasks=147; sprints=12; points=201 -->

## Kết luận có bằng chứng

Dự án ở giai đoạn **repository tài liệu trước implementation**. Trước thay đổi planning, toàn bộ working tree ngoài `.git` chỉ gồm `README.md`, `docs/backlog.md`, `docs/sprint-1.md`. Git chỉ theo dõi README; hai tài liệu sản phẩm đang untracked và đã được đọc như nguồn yêu cầu tại working tree, không tự thêm vào index.

**0/51 story sản phẩm có implementation xác minh được.** Không có source để build/chạy và không có coverage report. Điều này không chứng minh runtime sai, không tương đương test coverage 0%, và không chứng minh có mã trùng lặp.

## Phạm vi và phương pháp

- Đọc toàn bộ 640 dòng backlog, 129 dòng sprint và README một dòng không có newline.
- Inventory gồm file ẩn và ignored bằng `rg --files --hidden --no-ignore -g '!.git/**'`; đọc git tree, status, commit hiện tại và kiểm tra các AGENTS.md trong cây cha/phạm vi làm việc. Không tìm thấy AGENTS.md áp dụng tại thời điểm khảo sát.
- Không đọc credential, không gọi dịch vụ ngoài, không cài dependency, không chạy app hoặc sửa business code. Không cần tài liệu web để kết luận nội dung repo; phiên bản thư viện sẽ được xác minh khi khởi tạo.
- Commit khảo sát: `666c413aeaada490768a201155653377d1958de7`, nhánh `main`, một commit “Initial commit”. SHA-256 ba file nguồn được lưu tại `tasks.json.source_files` để phát hiện drift kể cả tài liệu chưa commit.

## Cấu trúc thực tế trước planning

```text
game-guess/
├── .git/
├── README.md           # chỉ "# game-guess"
└── docs/
    ├── backlog.md      # 51 story, 211 SP nguồn
    └── sprint-1.md     # đề xuất 16–20/11/2026, chưa xác nhận
```

## Công nghệ và conventions

| Khía cạnh | Đã xác minh | Điều chưa tồn tại/chưa biết |
|---|---|---|
| Framework | Backlog:11 yêu cầu Next.js, Three.js, PostgreSQL | Không `package.json`, lockfile, `next.config.*`, `tsconfig.json`, source hoặc DB migrations; không suy ra phiên bản |
| Dependencies | Không manifest/lockfile trong inventory | Dependency graph và lỗ hổng thư viện UNKNOWN |
| Modules/components | Không `src/`, `app/`, `pages/`, `components/` | Chưa có module frontend/backend/2D/3D |
| Routes/API | Không route hoặc server code | Health/progress/events/grading chưa triển khai |
| Hooks/state | Không hooks/store/reducer | Không thể kết luận dùng Redux/Zustand/Context; state machine là đề xuất |
| Database | Chỉ có yêu cầu PostgreSQL | Không schema, ORM, migration, seed, env example hoặc compose |
| Conventions | Story ID LL-001…LL-051, E1…E7, MoSCoW, task ≤1 ngày trong docs | Chưa có coding conventions, runtime pin, formatter, linter, CI |
| Quality | Không test/test config/report | Coverage, performance, tương thích thiết bị và error handling runtime UNKNOWN |
| Hosting | Sprint cũ nói sẽ triển khai | Không config/URL/credential; trạng thái tài nguyên ngoài repo UNKNOWN |

Runtime có sẵn trên máy khảo sát: Node `v22.22.3`, npm `10.9.8`, Python `3.9.6`. Đây là quan sát môi trường, **không phải phiên bản đã chọn cho dự án**. Docker/DB/trình duyệt thật chưa kiểm chứng.

## Tài liệu và yêu cầu

- [README](../../README.md): chưa hướng dẫn cài/chạy, architecture hoặc contribution.
- [Backlog nguồn](../backlog.md): tên Lắt Léo, nhóm 15–35 tuổi, 25 màn (20 2D/5 3D), tiến độ ẩn danh, 7 epic, 51 story/211 SP. Kiểm đếm lại bảng chính: Must 44/192 SP; Should 6/17 SP; Could 1/2 SP; readiness nguồn 25 Có và 26 Chưa. Đây là readiness của yêu cầu, không là trạng thái implementation.
- [Sprint nguồn](../sprint-1.md): 6 story/18 SP, 16–20/11/2026 chỉ là đề xuất. Kế hoạch mới là nhánh planning chi tiết, chưa thay thế cam kết hoặc tự sửa hai tài liệu nguồn.
- Chưa có script câu đố, catalog, mockup, asset, mô hình, budget 3D, kiến trúc được chốt hay báo cáo test thực.

## Debt và giới hạn kết luận

Thiếu scaffolding, tooling, validation/error recovery, migration, CI và documentation vận hành là **khoảng trống nền tảng**, không phải debt chất lượng của code đã tồn tại. Duplicated code, dead code, security implementation, flaky test: UNKNOWN vì chưa có source. Không mở task “refactor duplication” hoặc “fix runtime bug” giả định.

Một lỗi lập lịch tài liệu được xác nhận tại [GAP_ANALYSIS](GAP_ANALYSIS.md): story nền LL-001 hoàn tất thứ Ba nhưng các dependent bắt đầu thứ Hai/thứ Ba. Quy tắc admission mới yêu cầu dependency thực sự done; mốc scaffold chỉ là subtask không tự hoàn thành story.

## Chuyển tiếp

Đọc [REQUIREMENTS](REQUIREMENTS.md) để biết baseline và Q chưa rõ, [ARCHITECTURE](ARCHITECTURE.md) cho kiến trúc đề xuất, [BACKLOG](BACKLOG.md) và [EXECUTION_RULES](EXECUTION_RULES.md) trước khi coding. Chỉ tài liệu và verifier planning được thêm trong lần làm việc này.
