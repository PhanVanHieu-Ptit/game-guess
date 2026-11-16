# Lịch sử sprint — Lắt Léo

> Cập nhật gần nhất: 2026-11-15. File này ghi kết quả review, retro, năng lực và các ghi nhận trước sprint. Sprint hiện tại ở [SPRINT.md](SPRINT.md).

**Chưa có sprint nào kết thúc.** Sprint 1 (đề xuất 16–20/11/2026) chưa bắt đầu.

## Năng lực (velocity)

Điểm tính khi story đạt *Xong* theo DoD, không tính điểm làm dở.

| Sprint | Thời gian | Cam kết | Xong thật | Năng lực dùng cho sprint sau | Ghi chú |
|---|---|---|---|---|---|
| (giả định ban đầu) | — | — | — | 20 | docs/backlog.md:16; chưa có velocity thật |
| Sprint 1 | 16–20/11/2026 | 18 (đề xuất) | — | — | chưa bắt đầu |

## Ghi nhận trước sprint (không tính velocity)

- **2026-11-11** — LL-001-T01 (khung Next.js 16.4.6, 1 điểm task của kế hoạch AI) làm xong lượt 2 lúc 20:40, trạng thái `in_review`, chờ bạn duyệt. Điểm của LL-001 (2 điểm story) chỉ tính khi cả story *Xong*; theo đề xuất ở HO_SO Câu 2, nếu *Xong* trước 16/11 thì vẫn tính vào Sprint 1.
- **2026-11-14** — Epic Nền tảng theo bảy mục được giao đã triển khai và kiểm chứng, trạng thái `in_review`: `check`/`build` đạt, 145 unit test, 102 ca Playwright trên iPhone SE, Pixel 5 và 360 px. Luồng mẫu, lưu tiến trình khi tải lại, lỗi localStorage và phục hồi lỗi tải cảnh đều được kiểm. Bằng chứng: [E1-NEN-TANG-RECHECK.md](../docs/evidence/E1-NEN-TANG-RECHECK.md). Chưa có phê duyệt hoặc commit; không cộng điểm, không thay đổi cam kết Sprint 1.

- **2026-11-15** — Epic Bộ máy màn chơi theo tám mục được giao: LevelShell, đề chạm được, hook lắc/nghiêng/kéo/nhập, Scene3D thích ứng, kiểm góc, tài liệu và ví dụ hai file. Chuyển hai màn mẫu; 214 unit/component, 102 ca hồi quy, 9 ca ví dụ production và 9 ca dev/StrictMode đạt; bằng chứng check/build/hồi quy tại [E2-BO-MAY-MAN-CHOI.md](../docs/evidence/E2-BO-MAY-MAN-CHOI.md). Đã phát hiện/sửa thao tác chạm đề trước khi cảnh sẵn sàng; ghim Three/kiểu 0.182.0 để bỏ cảnh báo tương thích với R3F 9.8.2. Trạng thái `in_review`, chưa duyệt hoặc commit; không tính velocity.

## Mẫu ghi một sprint (dùng cho `/review`)

```
## Sprint N — dd/mm → dd/mm/yyyy
- Mục tiêu sprint: đạt / đạt một phần / không đạt — lý do
- Cam kết → xong thật: X → Y điểm; story xong: …; story chưa xong và chuyển đi đâu: …
- Demo / review: những gì đã trình bày, phản hồi của PO
- Retro — Giữ lại: … · Bỏ đi: … · Thử mới: …
- Số liệu: điểm xong thật, số lần phát sinh (/phatsinh), lỗi mở
- Năng lực sprint sau: Z điểm (căn cứ …)
- Cập nhật backlog: story đổi điểm/ưu tiên/sẵn sàng; story mới (nếu có)
```
