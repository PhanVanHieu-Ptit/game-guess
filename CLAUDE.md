# Lắt Léo

Game đố mẹo hack não kiểu Việt chơi trên trình duyệt điện thoại: mở link là chơi, chơi một mình, không đăng nhập, tiến trình lưu trên máy người chơi.
Bản chơi thử gồm 25 màn (20 màn 2D vẽ bằng SVG, 5 màn 3D bằng React Three Fiber), gợi ý 3 cấp, đố mẹo mỗi ngày, thẻ chia sẻ không lộ đáp án, đo lường ẩn danh.
Công nghệ: Next.js (App Router) + TypeScript strict, React Three Fiber + drei, Zustand, Vitest, Playwright.

## Quy tắc đầu tiên

- Luôn đọc `docs/` và `scrum/` trước khi làm việc gì: `docs/GDD.md` (thiết kế), `docs/LEVELS.md` (25 màn), `docs/TECH.md` (kỹ thuật), `scrum/HO_SO.md` (trạng thái, giả định, quyết định), rồi file liên quan tới việc.
- **Không sửa `docs/GDD.md` khi chưa hỏi chủ dự án.** `README.md`, `docs/backlog.md`, `docs/sprint-1.md` là tài liệu gốc, chỉ đọc.
- GDD, LEVELS, TECH đang là bản nháp chờ duyệt. Lệch với `docs/backlog.md` hay `docs/ai-planning/` thì hỏi, không tự chọn (điểm lệch ở GDD mục 13.3).
- Không tự commit. Task kỹ thuật dừng ở `in_review` kèm bằng chứng ở `docs/evidence/`; chỉ chủ dự án đặt `done` (`docs/ai-planning/EXECUTION_RULES.md`).
- Ngoài phạm vi MVP, không làm: tài khoản, thanh toán, quảng cáo, nhiều người chơi, ứng dụng tải về, xưởng tạo màn.
- Trả lời bằng tiếng Việt.

## Lệnh

Node 22.22.3 theo `.nvmrc`:
- `npm run dev` · `npm run build` · `npm run start`
- `npm run lint` · `npm run format:check` · `npm run typecheck` · `npm run check` (chạy cả ba)
- `npm run test`: Vitest, unit test, chạy một lượt rồi thoát.
- `npm run test:e2e`: Playwright, tự `next build` + `next start` (cổng 3100) rồi chạy trên iPhone SE (WebKit 320×568), Pixel 5 và 360×640 có cảm ứng. Lần đầu: `npx playwright install chromium webkit`. `E2E_DEV=1 npm run test:e2e` chạy trên `next dev` (kiểm cảnh báo chỉ có ở bản dev).
- `python3 docs/ai-planning/verify_plan.py` (cổng kiểm kế hoạch, chạy trước khi nhận task)

Không báo "đã chạy qua" cho lệnh hay bộ test chưa tồn tại: test thành phần bằng Testing Library và kịch bản giải của 25 màn thật chưa có (chỉ có cho hai màn mẫu).

## Cấu trúc thư mục (chi tiết ở `docs/TECH.md` mục 4)

- `src/app/` route Next · `src/domain/` TypeScript thuần (luật chơi, so khớp đáp án, gợi ý, ngày, chia sẻ)
- `src/levels/<mã>/` mỗi màn một thư mục: `meta.ts` (dữ liệu) + `scene.tsx` (cảnh, nạp lười)
- `src/engine/` sân 2D (SVG), sân 3D (R3F), đầu vào · `src/features/` khung chơi, HUD, gợi ý, kết quả
- `src/stores/` Zustand · `src/services/` đo lường, chia sẻ, lưu trữ · `tests/` unit và e2e
- `docs/` thiết kế, kế hoạch, bằng chứng · `scrum/` trạng thái điều phối
- Đã dựng khung nền tảng (trang chủ, chọn màn, màn chơi, kết quả, lưu tiến trình, đo lường) cùng hai màn mẫu `2d-sample-01/02` (xóa khi dựng 25 màn thật). Thư mục chỉ có `.gitkeep` là chỗ chờ story sau.

## Quy ước code

- TypeScript strict, không `any`, không `@ts-ignore`. Prettier nháy đơn, ESLint `--max-warnings 0`. Import bằng `@/…`.
- Component `PascalCase`, file và thư mục `kebab-case`, hook `useXxx`, mã màn viết thường (`2d-02`, `3d-01`).
- `domain/` thuần (không React, không DOM). `engine/` và `levels/` không import `features/`. `'use client'` chỉ nơi cần.
- Không chạm `window`, `document`, `localStorage` khi render phía máy chủ; việc có tác dụng phụ đặt trong `useEffect`.
- 3D dựng từ hình khối cơ bản trong code, không dùng file mô hình ngoài; `<Canvas>` chỉ nhập qua `next/dynamic` (`ssr: false`) từ Client Component.
- Định danh bằng tiếng Anh; chữ hiển thị cho người chơi bằng tiếng Việt có dấu đầy đủ; chú thích mã bằng tiếng Việt.
- Thao tác dùng cảm biến luôn có cách thay bằng chạm; vùng chạm ≥ 44×44 px; chữ đề bài ≥ 16 px.
- Ngân sách (`docs/TECH.md` mục 10): mở game < 3 giây trên 4G; mỗi màn 3D tải thêm < 1 MB; tự hạ đồ họa khi máy yếu.

## Definition of Done

Một việc chỉ "xong" khi đủ cả sáu điều:
1. Đạt mọi tiêu chí nghiệm thu của task hoặc story.
2. Kiểm thử tự động chạy qua (`npm run check`, cộng `npm run test` và `npm run test:e2e` khi đã có).
3. Dùng tốt ở màn hình rộng 360 px: không cuộn ngang, không tràn chữ, vùng chạm ≥ 44 px.
4. Không có lỗi trong console.
5. Giải được chỉ bằng thao tác chạm (không cần cảm biến, chuột phải, rê chuột, phím tắt).
6. Ghi đủ sự kiện đo lường: `level_start`, `hint_used`, `level_complete`, `level_abandon`.

Cách kiểm từng điều: `docs/TECH.md` mục 11. Cho tới khi chủ dự án nói khác, vẫn áp thêm DoD tạm ở `scrum/HO_SO.md` (bằng chứng ở `docs/evidence/`, chủ dự án duyệt, mã đã commit).
