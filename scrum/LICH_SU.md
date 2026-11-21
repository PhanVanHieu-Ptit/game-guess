# Lịch sử sprint — Lắt Léo

> Cập nhật gần nhất: 2026-11-20. File này ghi kết quả review, retro, năng lực và các phạm vi được giao trực tiếp. Sprint hiện tại ở [SPRINT.md](SPRINT.md).

**Chưa có sprint nào kết thúc.** Sprint 1 (đề xuất 16–20/11/2026) chưa được xác nhận cam kết.

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

## Phạm vi giao trực tiếp (không tính velocity)

**Ngày 20/11/2026 — 2D-25…29:** chủ dự án duyệt cả năm đề mới bằng “tat ca”, sau lựa chọn đề xuất thêm màn vì toàn bộ 2D-01…24 đã được triển khai. Ghi nội dung vào LEVELS mục 7, làm và kiểm lần lượt từng màn. SVG tự vẽ, bộ máy/hook dùng lại; bàn giao cả năm Chờ duyệt. 2D-27/29 ghi nguồn kinh điển. Catalog 32 màn (29 2D + 3 3D); check/300 unit và 393 ca production đạt, kiểm dev 54/57 còn cảnh báo CSS preload trang lỗi; không đổi baseline 51 story/211 điểm/147 task, không cộng velocity hoặc tự commit. [Bằng chứng và giới hạn kiểm chứng](../docs/evidence/E3-2D-25-29.md).

**Ngày 17/11/2026 — riêng 3D-03:** người dùng duyệt phương án bằng “oke”. Thêm nồi/nắp, bánh chưng, bệ gạch và cơ chế kéo vật 3D dùng chung; mở nắp thấy bốn, nghiêng nhìn bánh dưới rồi nhập 5. Scene3D giữ camera/reset/tự hạ chất lượng; hai màn 3D trước giữ hướng dẫn bàn tay. Đo cao nhất 34 draw call/frame, 260.485 byte tải thêm; 254 unit/component, 9 ca dev và 15 ca riêng màn đạt. Hồi quy cuối 185/186, ca máy chậm cũ 3D-02 đạt khi kiểm lại riêng; [log/ảnh và giới hạn kiểm chứng](../docs/evidence/E4-3D-03.md). LL-046/019 Chờ duyệt; LL-044 mới có kịch bản 3D-02/03. Chưa tự commit, đặt Xong hoặc đo điện thoại thật; không tính velocity.

**Ngày 17/11/2026 — riêng 3D-02:** người dùng duyệt phương án bằng “oke”. Thêm phòng nhà ống và đồ đạc low-poly bằng code dùng chung; chạm dép để lật, rồi chạm chìa dính kẹo cao su dưới đế. Camera/reset/hướng dẫn kéo/tự hạ chất lượng dùng Scene3D; vùng chạm ≥44 px và kiểm vật che. Số đo cao nhất 29 draw call/frame, 258.110 byte tải 3D đầu tiên gồm gói chung; kiểm thử/ảnh/log ở [E4-3D-02.md](../docs/evidence/E4-3D-02.md). LL-045/018 Chờ duyệt, LL-044 Đang làm một phần; chưa tự commit hoặc đặt Xong, chưa đo điện thoại thật. Giữ nguyên cam kết 18 điểm và không tính velocity.

**Ghi nhận phạm vi trực tiếp ngày 16/11/2026 — không tính velocity:** người dùng duyệt phương án bằng “tiếp tục”; thêm duy nhất 3D-01 “Nhà số mấy?”, thư viện nhà ống/bồn nước/chậu cây, bàn phím số và hướng dẫn kéo dùng chung. 239 unit/component, 153 ca Playwright production đạt. Đo draw call gồm lượt bóng và tải thêm của lần mở 3D đầu tiên; log, ảnh mặt tiền/mặt sau, kiểm dev và ví dụ bộ máy ở [E4-3D-01.md](../docs/evidence/E4-3D-01.md). LL-033/034/017 Chờ duyệt, chưa commit hoặc đặt Xong, chưa có số đo điện thoại thật; không đổi 18 điểm cam kết.

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
