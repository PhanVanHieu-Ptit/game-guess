# Epic Nền tảng — bàn giao và kiểm chứng lại 14/11/2026

**Trạng thái: `in_review`, chưa commit.** Hoàn thiện bảy mục người dùng giao trên working tree đã có ở nhánh `init`, HEAD `4a36256`. Đây là bằng chứng mới nhất của epic; báo cáo [E1-NEN-TANG.md](E1-NEN-TANG.md) và artifacts cũ giữ làm lịch sử.

## Phạm vi đã có

| Yêu cầu | Triển khai và kiểm chứng |
|---|---|
| Next.js + TypeScript strict và các công cụ/thư viện | App Router trong `src/app`, `strict: true`; ESLint, Prettier, Vitest, Playwright; R3F, drei, three, Zustand trong manifest/lockfile. Giữ các phiên bản đang cài, không nâng gói trong lượt kiểm chứng này. |
| Cấu trúc theo TECH | `app`, `domain`, `engine`, `features`, `levels`, `stores`, `services`, `styles`; unit/e2e/fixtures trong `tests`. Thêm `.gitkeep` để thư mục `domain/daily` còn tồn tại khi clone. Module chưa triển khai được ghi rõ trong TECH. |
| Các màn chính và giao diện điện thoại | Trang chủ có Chơi/Chơi tiếp, Đố mẹo mỗi ngày, Chọn màn; màn chơi và hộp kết quả. CSS một cột, chữ đọc tối thiểu 16 px, vùng chạm thiết kế 48 px. E2E kiểm cuộn ngang, chữ tràn, vùng chạm ≥ 44 px. |
| Tiến trình localStorage an toàn | `services/storage` bọc truy cập backend, đọc, ghi, xóa trong try/catch; khi lỗi dùng bộ nhớ và thông báo không chặn. Zustand hydrate từ effect, không truy cập localStorage khi SSR. Unit/E2E kiểm bị chặn, đầy dung lượng, JSON hỏng, sai kiểu và phiên bản lạ. |
| `track(name, data)` | Kiểm kiểu sự kiện và dữ liệu; console mặc định ở dev, noop mặc định production. Đổi dịch vụ qua `AnalyticsSink`/`setSink`, mã gọi không đổi; lỗi đo lường không chặn game. |
| Luồng mẫu | Hai màn `2d-sample-01/02`: trang chủ → vào màn → sai rồi đúng → kết quả → màn tiếp → màn cuối → chọn màn → tải lại vẫn nhớ. Nút Chơi tiếp lấy màn chưa hoàn thành đầu tiên. |
| Scripts | `dev`, `build`, `start`, `test`, `test:e2e`, `lint`; thêm `format:check`, `typecheck`, `check`. |

## Sửa lỗi tìm được trong lượt này

1. **Cảnh bị gom vào gói khởi tạo của route.** `levels/index.ts` vừa xuất siêu dữ liệu cho Server Component vừa chứa dynamic import tới các Client Component của cảnh. Build tạo một chunk chứa cả hai cảnh và tải ngay khi mở `/play/...`. Chặn gói có nhãn cảnh màn 2 làm cả màn 1 kẹt ở “Đang tải màn…”, chưa hydrate được. Tách `levels/load-scene.ts` với `'use client'`, giữ `index.ts` chỉ có siêu dữ liệu và `findLevel`; cập nhật `lazy-scene.ts`, test registry và TECH cùng thay đổi.
2. **Test tạm chỉ in log.** Thay `zz-clientnav.spec.ts` bằng `navigation-recovery.spec.ts` có assertion: chặn cảnh màn 2 từ lúc tải trước, giải màn 1, bấm Màn tiếp, khung màn 2 và Thử lại phải hiện; mạng phục hồi thì giải được. Kiểm đúng chuỗi sự kiện, cảnh lỗi chưa phát `level_start`. Test mới thất bại trước khi tách loader và đạt sau sửa trên cả ba thiết bị.
3. **Định vị hộp báo lỗi không đủ hẹp.** `getByRole('alert')` trùng phần tử thông báo route của Next. Giới hạn vào `main`. Chỉ cho phép thêm thông báo `ChunkLoadError` đúng dạng lỗi tải gói JS mà hai test lỗi mạng chủ động gây ra; các kiểm tra console khác vẫn giữ.
4. **Ảnh chụp cảnh quá sớm.** Đợi nút đáp án hiện trước khi kiểm bố cục và chụp màn chơi, thay vì chụp khi cảnh còn loading. Chụp ảnh ba trạng thái của luồng mẫu trên mỗi thiết bị, tắt hoạt ảnh trong lúc chụp.

Lần chạy đầu `check` còn báo định dạng file test tạm; đã xử lý khi thay bằng kiểm thử hồi quy. Lượt chạy E2E trong sandbox bị chặn mở cổng (`listen EPERM`); các lượt nghiệm thu cuối chạy bằng quyền mở máy chủ local, không thay đổi cấu hình bảo mật của ứng dụng.

## Kết quả nghiệm thu cuối

Môi trường: macOS arm64, Node **22.22.3**, npm **10.9.8**, Next **16.4.6**, Playwright **1.65.0**. Log thực và mã thoát nằm trong [thư mục artifacts](E1-NEN-TANG-RECHECK.artifacts/exit-codes.txt).

| Lệnh | Kết quả | Log |
|---|---|---|
| `python3 docs/ai-planning/verify_plan.py` | Exit 0; metadata/DAG/hash nguồn vẫn khớp | [01-verify-plan.txt](E1-NEN-TANG-RECHECK.artifacts/01-verify-plan.txt) |
| `npm run check` | Exit 0; lint, định dạng, TypeScript đều đạt | [02-check.txt](E1-NEN-TANG-RECHECK.artifacts/02-check.txt) |
| `npm run test` | Exit 0; **12 file, 145 ca đạt** | [03-unit.txt](E1-NEN-TANG-RECHECK.artifacts/03-unit.txt) |
| `npm run build` | Exit 0; production biên dịch và dựng trang thành công | [04-build.txt](E1-NEN-TANG-RECHECK.artifacts/04-build.txt) |
| `npm run test:e2e` | Exit 0; **102 ca đạt** (34 test × 3 cấu hình), 21,9 giây | [05-e2e.txt](E1-NEN-TANG-RECHECK.artifacts/05-e2e.txt) |

Cấu hình E2E: **iPhone SE — WebKit 320×568**, **Pixel 5 — Chromium 393×727**, **mobile-360 — Chromium 360×640**; đều mô phỏng cảm ứng. Luồng mẫu dùng `tap()`. Fixture kiểm console, lỗi mạng và cấu trúc/luồng sự kiện. Tổng 102 ca bao gồm 15 ca cố ý gây lỗi bằng `test.fail()` để kiểm chính các cổng này; các ca đó phải thất bại đúng dự kiến thì suite mới đạt.

Ảnh mới ở `E1-NEN-TANG-RECHECK.artifacts/screenshots/` (3 trạng thái × 3 thiết bị). Đã xem ảnh trang chủ iPhone SE, màn chơi 360 px và kết quả Pixel 5; ảnh và kiểm tra DOM không phát hiện cuộn ngang hoặc tràn chữ. Đây là giả lập, chưa kiểm điện thoại thật. Không đo lại hiệu năng, không chạy lại audit hoặc cài lại từ đầu trong lượt này; không dùng kết quả cũ làm số đo mới.

## Cách chạy lại

Sau khi cài Node theo `.nvmrc`:

```sh
npm ci
npx playwright install chromium webkit
bash docs/evidence/E1-NEN-TANG-RECHECK.artifacts/reproduce.sh
```

Script dừng khi một bước lỗi. Playwright tự build và chạy production ở cổng 3100, rồi dừng máy chủ do nó tạo. `npm run dev` dùng cho phát triển. Các phụ thuộc đã có trên máy trong lượt này; hai lệnh cài đặt ở trên là hướng dẫn tái hiện, không phải lệnh được báo đã chạy.

## Điều phối và đề xuất commit

Đã cập nhật cả `scrum/BACKLOG.md`, `SPRINT.md`, `HO_SO.md`, `LICH_SU.md` và nhật ký PROGRESS. Epic theo bảy mục được giao ở **Chờ duyệt** theo `CLAUDE.md`; chưa tự đặt story/task cũ `done`, chưa cộng điểm velocity. Không sửa `README.md`, `docs/backlog.md`, `docs/sprint-1.md`, `docs/GDD.md`, `docs/LEVELS.md` hoặc `tasks.json`.

Đố mẹo mỗi ngày hiện có trang trạng thái kho trống theo thiết kế. Nội dung ngày, 25 màn thật, cảnh 3D, dịch vụ nhận đo lường và hosting là các bước sau; R3F/drei đã cài để tiếp tục dựng 3D. Backlog cũ còn PostgreSQL cần đối soát với TECH; không chặn phạm vi localStorage vừa hoàn thiện.

Chưa commit. Đề xuất thông điệp: **`feat: hoàn thiện nền tảng game Lắt Léo`**. Phạm vi commit: công cụ/cấu hình, `src/`, `tests/`, `.env.example`, `CLAUDE.md`, TECH, bằng chứng epic và các file điều phối. GDD/LEVELS đang là bản nháp chưa tracked từ trước; không tự gộp chúng vào đề xuất triển khai. Danh sách băm mã nguồn để review: [files.sha256](E1-NEN-TANG-RECHECK.artifacts/files.sha256).
