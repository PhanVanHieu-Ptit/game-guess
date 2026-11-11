# Sprint 1 — Lắt Léo

- **Thời gian:** thứ Hai 16/11 → thứ Sáu 20/11/2026 · **Cập nhật:** 2026-11-10
- **Backlog nguồn:** [backlog.md](backlog.md) (v2.1)
- **Trạng thái:** kế hoạch đề xuất, chờ xác nhận các mục ở cuối file

## Giả định

- Sprint 1 chạy từ thứ Hai 16/11 đến thứ Sáu 20/11/2026 (thứ Hai kế tiếp tính từ 10/11). Nếu bắt đầu ngày khác, thứ tự trong tuần giữ nguyên.
- Năng lực 20 điểm (ước tạm, chưa có velocity), chưa trừ ngày nghỉ riêng của nhóm. Chưa có kết quả sprint trước.
- Chưa có tên người (Q2) nên cột "Người" dùng mã vai trò như backlog (FE, BE, DEV3D, LD, ART2D, PO).
- Chưa có DoD (Q11). Tạm hiểu "xong" là tiêu chí nghiệm thu đạt, PO duyệt và mã đã vào nhánh chính.
- Phụ thuộc vào LL-001 được hiểu ở mức task: khung Next.js vào nhánh chính (**Mốc 1**, trước 10:00 thứ Hai) là đủ để bắt đầu LL-002, LL-008, LL-014, LL-023, dù LL-001 chỉ "xong" sau nghiệm thu chéo thứ Ba. Đây là ngoại lệ so với quy tắc "phụ thuộc xong mới bắt đầu" ở mục "Cách đọc bảng" của backlog; nếu giữ đúng quy tắc, bốn story này bắt đầu từ thứ Tư và LL-014 (≈ 2,5 ngày công) kéo tới trưa thứ Sáu, mất phần dự phòng.

## Mục tiêu sprint

Đến 17:00 thứ Sáu 20/11/2026, nhóm có:

- khung Next.js + PostgreSQL chạy được từ máy mới clone theo README;
- danh sách 25 màn đã được PO duyệt;
- bộ giao diện chung hiển thị đúng tiếng Việt có dấu;
- quyết định cách dựng 2D và số đo FPS của cảnh 3D mẫu trên ≥ 1 điện thoại thật,

để Sprint 2 dựng khung chơi mà không còn ẩn số kỹ thuật lớn. Cam kết 18/20 điểm (90%), chừa 2 điểm cho phát sinh.

## Sprint Backlog

| Mã | Story | Điểm | Người | Ngày dự kiến xong |
|---|---|---|---|---|
| [LL-001] | Khung dự án Next.js & quy ước chung | 2 | FE (nghiệm thu chéo: BE) | Thứ Ba 17/11 |
| [LL-028] | Danh sách 25 màn & đường cong độ khó | 3 | LD; PO duyệt | Thứ Tư 18/11 |
| [LL-008] | Spike: chốt cách dựng màn 2D | 2 | FE; PO duyệt quyết định | Thứ Tư 18/11 |
| [LL-014] | Khung cảnh 3D Three.js trên trang riêng | 5 | DEV3D | Thứ Năm 19/11 |
| [LL-023] | Phong cách hình ảnh & bộ giao diện hỗ trợ tiếng Việt | 3 | ART2D (phong cách, phông) + FE (thành phần); PO chốt phong cách | Thứ Năm 19/11 |
| [LL-002] | Kết nối PostgreSQL & migration | 3 | BE (nghiệm thu chéo: FE) | Thứ Tư 18/11 |
| | **Tổng** | **18 / 20 (90%)** | | Thứ Sáu 20/11: review, retro, dự phòng |

Cách chọn: lấy lần lượt các story "Có" từ đầu backlog. LL-003 bị bỏ qua vì "Chưa" (chờ Q4). Dừng ở LL-004 vì thêm 5 điểm sẽ lên 23/20 (115%).

## Lịch theo ngày

Daily Scrum 15' lúc 09:00 mỗi ngày. Mỗi vai trò làm không quá 1 ngày công mỗi ngày. **Mốc** là điểm mở khóa phụ thuộc.

### Thứ Hai 16/11

- 09:00 họp chốt kế hoạch 30': xác nhận tên theo vai trò (Q2) và điện thoại để đo FPS (Q3). PO giao tài liệu/ý tưởng màn có sẵn cho LD.
- **FE · LL-001** (cả ngày):
  1. Khởi tạo Next.js, chốt phiên bản Node.
  2. ESLint/Prettier và lệnh lint.
  3. Cấu trúc thư mục và trang mẫu.
  4. README và `.env.example`.
  - **Mốc 1 (trước 10:00):** khung Next.js đã vào nhánh chính, mở khóa LL-002, LL-008, LL-014, LL-023.
- **DEV3D · LL-014** (½ ngày, sau Mốc 1): tích hợp Three.js (tải động, tắt SSR).
- **BE · LL-002** (cả ngày): chọn thư viện truy cập DB → cấu hình DB local → (sau Mốc 1) viết migration kiểm tra, chạy lại lần hai.
- **LD · LL-028:** viết/thu thập ≥ 25 ý tưởng mẹo, kèm dự phòng.
- **ART2D · LL-023** (¼ ngày): bắt đầu moodboard và bảng màu cùng PO.

### Thứ Ba 17/11

- **FE · LL-008** (cả ngày): prototype DOM/SVG (chạm + kéo-thả) → prototype Canvas → đo FPS và độ chính xác chạm trên điện thoại thật.
- **DEV3D · LL-014:** scene/camera/ánh sáng/vòng lặp render → xử lý resize/xoay màn hình → phát hiện WebGL và thông báo thay thế.
- **BE · LL-002:** API health ghi/đọc và test → nghiệm thu chéo LL-001 (clone vào thư mục sạch, làm theo README, chạy dev) → **LL-001 xong**.
- **LD · LL-028:** phân loại cơ chế và độ khó, xếp thứ tự → đánh dấu chỗ cần cơ chế mới.
- **PO + ART2D · LL-023:** chốt moodboard/bảng màu trước 17:00 (**Mốc 2**). ART2D chọn phông hỗ trợ tiếng Việt và dựng trang chuỗi thử dấu.

### Thứ Tư 18/11

- **FE:**
  - LL-008: viết ghi chú quyết định ≤ 1 trang, PO duyệt (**Mốc 3a**, mở khóa LL-042 cho Sprint 2) → **LL-008 xong**.
  - LL-023: dựng design token, nút/hộp thoại/tiêu đề.
  - Nghiệm thu chéo LL-002 (clone sạch, gọi API health) → **LL-002 xong**.
- **DEV3D · LL-014:** giải phóng tài nguyên khi rời màn → test mở–thoát 20 lần, đo heap.
- **LD + PO · LL-028:** họp duyệt danh sách 25 màn → **LL-028 xong** (**Mốc 3b**, mở khóa LL-033 và LL-029 cho Sprint 2).
- **BE, ART2D** (dư tải): BE trực hỗ trợ DEV3D nếu LL-014 trễ. ART2D rà bảng màu và chuỗi dấu của LL-023.
- 16:30 **kiểm tra giữa sprint** (15'): kỳ vọng ≥ 10 điểm đã xong (LL-001, 002, 008, 028). Nếu chưa đạt, sáng thứ Năm áp dụng rủi ro 4 và 6.

### Thứ Năm 19/11

- **DEV3D · LL-014:** chạy cảnh mẫu trên ≥ 1 điện thoại thật, ghi FPS → **LL-014 xong**; sửa lỗi tồn.
- **FE · LL-023:** trang mẫu các thành phần, kiểm chuỗi dấu và độ tương phản → **LL-023 xong**.
- Cả nhóm: rà từng tiêu chí nghiệm thu, sửa lỗi, chuẩn bị demo.

### Thứ Sáu 20/11

- Buổi sáng: dự phòng cho phát sinh (≈ 2 điểm), nghiệm thu lại các story chưa đạt.
- 15:00 **Sprint Review** (45'), demo:
  - clone → chạy, API health;
  - danh sách 25 màn;
  - quyết định 2D;
  - cảnh 3D và FPS trên điện thoại;
  - bộ giao diện tiếng Việt.
- 16:00 **Retrospective** (30'): ghi điểm xong thật làm velocity, chốt DoD (Q11).
- 16:30 làm mịn nhanh Sprint 2: chốt Q3, Q4, Q6, Q10; đưa LL-004, LL-016, LL-033, LL-042 vào danh sách chọn.

**Tải ước (ngày công):** FE 3,0 · DEV3D 2,5 · BE 1,75 · LD 1,5 · ART2D 0,75 = 9,5. Nếu một người kiêm FE+BE thì ≈ 4,75/5 ngày, khá sát. Khi đó dời LL-002 sang thứ Tư–Sáu (không story nào trong sprint phụ thuộc nó) và thả nó nếu trễ.

## Rủi ro

| # | Rủi ro | Mức | Cách giảm (điều kiện kích hoạt) |
|---|---|---|---|
| 1 | Chưa có ý tưởng/kịch bản 25 màn (Q6), LL-028 trễ hoặc thiếu màn | Cao | PO đưa tài liệu/ý tưởng có sẵn cho LD trước thứ Hai; hạn viết ý tưởng hết thứ Ba. Nếu tối thứ Ba còn < 15 ý tưởng, họp 30' với PO chọn từ nguồn có sẵn. Nếu hết thứ Tư vẫn thiếu, ghi phần "25 màn" của mục tiêu là chưa đạt và chuyển phần còn lại sang Sprint 2, không kéo dài sprint. |
| 2 | Chưa biết đội hình (Q2), có thể thiếu người làm 3D hoặc đồ họa | Cao | Xác nhận tên theo vai trò trước thứ Hai. Nếu kiêm nhiều vai, mỗi người ≤ 1 ngày công/ngày. Thứ tự nhường: LL-001 → LL-014 → LL-028 → LL-008 → LL-023 → LL-002. |
| 3 | Chưa có điện thoại thật để đo FPS (Q3) | Cao | Chốt thiết bị (1 Android tầm trung, thêm 1 iPhone nếu có) trước chiều thứ Ba, vì LL-008 và LL-014 cần đo. Nếu không có, dùng giả lập giảm CPU 4× trong Chrome DevTools, ghi rõ "chưa đo máy thật" và đo thật ở đầu Sprint 2. |
| 4 | Three.js trong Next.js gặp lỗi SSR/hydration hoặc rò rỉ bộ nhớ, LL-014 trễ | Cao | Tích hợp ngay chiều thứ Hai (tải động, tắt SSR), đo heap từ thứ Tư. Nếu hết thứ Tư chưa có cảnh chạy ổn: báo PO ngay, FE/BE hỗ trợ DEV3D, thả LL-002 và phần "trang mẫu" của LL-023 để giữ nguồn lực cho LL-014. |
| 5 | LL-001 là điểm nghẽn đầu tuần (4 story phụ thuộc) | TB | Task khởi tạo xong và merge trước 10:00 thứ Hai. Việc không cần dự án (chọn thư viện DB, DB local, moodboard, ý tưởng màn) làm trước. Nếu quá 12:00 chưa xong, hoãn lint/README sang chiều. |
| 6 | Năng lực 20 điểm chưa kiểm chứng, cam kết ở mức 90% | TB | Kiểm tra giữa sprint cuối thứ Tư (16:30). Nếu dưới 10 điểm xong, sáng thứ Năm thả LL-002 trước (3 điểm, không chặn story nào trong sprint), rồi phần "trang mẫu" của LL-023. Ghi điểm xong thật làm velocity Sprint 2. |
| 7 | PO chốt phong cách chậm (Q10), LL-023 trễ và kéo theo nội dung Sprint 2 | TB | PO chốt moodboard/bảng màu trước 17:00 thứ Ba. Nếu chưa chốt, dùng phong cách tối giản mặc định (hình khối, bảng màu hẹp); đổi sau vẫn rẻ vì dùng design token. |
| 8 | Chưa có DoD (Q11), "xong" bị hiểu khác nhau | Thấp | Dùng định nghĩa tạm ở phần giả định; chốt DoD chính thức ở Retro thứ Sáu. |

## Story để ngoài sprint

Theo thứ tự backlog, các story sau ưu tiên cao (Must) nhưng không vào Sprint 1:

| Mã | Story | Điểm | Lý do không đưa vào | Khi nào vào |
|---|---|---|---|---|
| [LL-004] | Mô hình màn chơi & trình nạp màn | 5 | "Có" và đứng ngay sau nhóm đã chọn, nhưng thêm vào đẩy tổng lên 23 điểm (115%). | Đầu Sprint 2 |
| [LL-003] | Triển khai bản chạy thử lên web | 3 | "Chưa": chờ Q4 (ngân sách, hosting, công khai hay riêng tư). Kể cả khi có Q4, thêm vào sẽ lên 21 điểm (105%). | Sprint 2 nếu Q4 có trả lời trước thứ Sáu |
| [LL-016] | Trình nạp tài nguyên 3D + ngân sách | 3 | Phụ thuộc LL-014 (xong thứ Năm), không đủ thời gian và vượt 90%. | Đầu Sprint 2 |
| [LL-033] | Kịch bản 3D-01 | 2 | Phải chờ LL-028 được duyệt (thứ Tư); thêm vào sẽ chạm 100%. Ứng viên kéo vào nếu LD rảnh từ thứ Tư và sprint đang đúng tiến độ (không tính vào cam kết). | Sprint 2 |
| [LL-042] | Sân chơi 2D co giãn | 3 | Cần quyết định 2D của LL-008 (thứ Tư). | Sprint 2 |
| [LL-005], [LL-006] | Vòng chơi cơ bản; Chọn màn | 5 + 3 | Phụ thuộc LL-004 chưa có. | Sprint 2 |
| [LL-029], [LL-010] | Nội dung 2D lô 1; dựng 2D lô 1 | 5 + 5 | "Chưa": chờ Q6, Q10; còn phụ thuộc LL-028, LL-023, LL-009. | Sprint 3, sau khi Q6 và Q10 có trả lời |

## Cần xác nhận trước thứ Hai

- Ngày sprint (đang giả định 16/11–20/11/2026) và ngày vắng của từng người. Thứ Sáu 20/11 là Ngày Nhà giáo Việt Nam, không phải ngày nghỉ chính thức nhưng có thể có người vắng; ngày vắng được trừ vào năng lực 20 điểm.
- Tên người theo vai trò (Q2).
- Điện thoại thật để đo FPS (Q3).
- Tài liệu/ý tưởng 25 màn có sẵn (Q6).
- Phong cách giao diện (Q10).
