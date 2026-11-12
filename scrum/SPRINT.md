# Sprint hiện tại — Sprint 1

> Cập nhật gần nhất: 2026-11-12 (Thứ Năm). **Trạng thái: ĐỀ XUẤT, chưa chốt.** Nạp từ [docs/sprint-1.md](../docs/sprint-1.md) (sha256 `c4d7e01d2dea`); chốt bằng `/sprint` sau khi bạn trả lời 5 câu ở [HO_SO.md](HO_SO.md) mục 6.

| | |
|---|---|
| Thời gian | Thứ Hai 16/11 → thứ Sáu 20/11/2026 (giả định G2). Hôm nay Thứ Tư 11/11 là **tiền sprint**: còn 2 ngày làm việc (12–13/11) trước khi Sprint 1 bắt đầu |
| Năng lực / cam kết | 20 điểm (giả định G1, chưa có velocity) / **18 điểm (90%)**, dự phòng 2 điểm |
| Điểm xong | **0 / 18** |
| Họp | Daily 09:00 (15') · kiểm tra giữa sprint thứ Tư 16:30 · Sprint Review thứ Sáu 15:00 (45') · Retro thứ Sáu 16:00 (30') · làm mịn Sprint 2 thứ Sáu 16:30 |

## Mục tiêu sprint

Đến 17:00 thứ Sáu 20/11/2026, nhóm có:

- khung Next.js + PostgreSQL chạy được từ máy mới clone theo README;
- danh sách 25 màn đã được PO duyệt;
- bộ giao diện chung hiển thị đúng tiếng Việt có dấu;
- quyết định cách dựng 2D và số đo FPS của cảnh 3D mẫu trên ≥ 1 điện thoại thật,

để Sprint 2 dựng khung chơi mà không còn ẩn số kỹ thuật lớn.

## Sprint backlog

Vai theo sprint-1.md (Q2 chưa trả lời, xem G3). Thứ tự = thứ tự làm.

| Mã | Story | Điểm | Vai | Dự kiến xong | Trạng thái | Ghi chú |
|---|---|---|---|---|---|---|
| [LL-001] | Khung dự án Next.js & quy ước chung | 2 | FE; nghiệm thu chéo BE | Thứ Ba 17/11 | **Đang làm** | T01 *Xong* (bạn duyệt 12/11 07:10). T02 lint/format/typecheck làm xong 12/11 07:24, **chờ bạn duyệt**. Còn T03 README + clone sạch. Có thể xong trước 16/11 nếu bạn duyệt kịp |
| [LL-028] | Danh sách 25 màn & đường cong độ khó | 3 | LD; PO duyệt | Thứ Tư 18/11 | Chưa làm | Cần nguồn ý tưởng (Câu 4) |
| [LL-008] | Spike: chốt cách dựng màn 2D | 2 | FE; PO duyệt quyết định | Thứ Tư 18/11 | Chưa làm | Cần LL-001 *Xong*; cần điện thoại thật (Câu 5) |
| [LL-014] | Khung cảnh 3D Three.js trên trang riêng | 5 | DEV3D | Thứ Năm 19/11 | Chưa làm | Cần LL-001 *Xong*; đo FPS cần điện thoại thật (Câu 5) |
| [LL-023] | Phong cách hình ảnh & bộ giao diện hỗ trợ tiếng Việt | 3 | ART2D + FE; PO chốt phong cách | Thứ Năm 19/11 | Chưa làm | Cần LL-001 *Xong*; chưa chốt phong cách thì dùng tối giản mặc định (rủi ro 7) |
| [LL-002] | Kết nối PostgreSQL & migration | 3 | BE; nghiệm thu chéo FE | Thứ Tư 18/11 | Chưa làm | Cần LL-001 *Xong*; kế hoạch AI thêm phụ thuộc AI-T07 (HO_SO L4) |
| | **Tổng** | **18 / 20 (90%)** | | Thứ Sáu 20/11: review, retro, dự phòng | | |

Cách chọn (theo sprint-1.md): lấy lần lượt các story "Có" từ đầu backlog. LL-003 bị bỏ qua vì "Chưa" (chờ Q4). Dừng ở LL-004 vì thêm 5 điểm sẽ lên 23/20 (115%).

## Lịch theo ngày

**Tiền sprint (không có trong sprint-1.md)**

- Thứ Tư 11/11: LL-001-T01 xong lượt 2 lúc 20:40, chờ bạn đọc [docs/evidence/LL-001-T01.md](../docs/evidence/LL-001-T01.md) và xác nhận *Xong*.
- Thứ Năm 12/11 – thứ Sáu 13/11 (đề xuất): sau khi bạn duyệt T01 → LL-001-T02 → duyệt → LL-001-T03 → duyệt → LL-001 *Xong* trước thứ Hai, mở khóa LL-002, LL-008, LL-014, LL-023. Mỗi bước cần một lần bạn duyệt (rủi ro 9). **Tiến độ 12/11 07:24: T01 *Xong* (07:10), T02 *Chờ duyệt*, T03 chưa nhận.**

**Thứ Hai 16/11**

- 09:00 họp chốt kế hoạch 30': xác nhận nhóm theo vai (Q2) và điện thoại đo FPS (Q3). PO giao tài liệu/ý tưởng màn có sẵn cho LD.
- FE · LL-001 (nếu chưa xong): khởi tạo Next.js và chốt Node → ESLint/Prettier → cấu trúc thư mục + trang mẫu → README + `.env.example`. **Mốc 1 (trước 10:00):** khung vào nhánh chính. Với quy tắc "duyệt từng task", dependent chỉ bắt đầu khi LL-001 *Xong*, không dùng ngoại lệ "Mốc 1" (HO_SO L3).
- DEV3D · LL-014 (½ ngày sau mở khóa): tích hợp Three.js, tải động, tắt SSR.
- BE · LL-002 (cả ngày): chọn thư viện DB → DB local → (sau mở khóa) migration kiểm tra, chạy lại lần hai.
- LD · LL-028: viết/thu thập ≥ 25 ý tưởng kèm dự phòng. ART2D · LL-023 (¼ ngày): moodboard và bảng màu cùng PO.

**Thứ Ba 17/11**

- FE · LL-008: prototype DOM/SVG (chạm + kéo-thả) → prototype Canvas → đo FPS và độ chính xác chạm trên điện thoại thật.
- DEV3D · LL-014: scene, camera, ánh sáng, vòng lặp render → resize/xoay màn hình → phát hiện WebGL và thông báo thay thế.
- BE · LL-002: API health ghi/đọc và test → nghiệm thu chéo LL-001 (clone sạch, làm theo README) → **LL-001 xong** (nếu chưa xong từ tiền sprint).
- LD · LL-028: phân loại cơ chế và độ khó, xếp thứ tự, đánh dấu chỗ cần cơ chế mới.
- PO + ART2D · LL-023: chốt moodboard/bảng màu trước 17:00 (**Mốc 2**); chọn phông hỗ trợ tiếng Việt và dựng trang chuỗi thử dấu. Chốt thiết bị đo FPS trước chiều (rủi ro 3).

**Thứ Tư 18/11**

- FE: LL-008 viết ghi chú quyết định ≤ 1 trang, PO duyệt (**Mốc 3a**, mở khóa LL-042 cho Sprint 2) → LL-008 xong. LL-023 dựng design token, nút/hộp thoại/tiêu đề. Nghiệm thu chéo LL-002 → xong.
- DEV3D · LL-014: giải phóng tài nguyên khi rời màn → test mở–thoát 20 lần, đo heap.
- LD + PO · LL-028: họp duyệt danh sách 25 màn → xong (**Mốc 3b**, mở khóa LL-033 và LL-029 cho Sprint 2).
- 16:30 **kiểm tra giữa sprint** (15'): kỳ vọng ≥ 10 điểm xong (LL-001, 002, 008, 028). Chưa đạt → sáng thứ Năm áp dụng rủi ro 4 và 6.

**Thứ Năm 19/11**

- DEV3D · LL-014: chạy cảnh mẫu trên ≥ 1 điện thoại thật, ghi FPS → xong; sửa lỗi tồn. FE · LL-023: trang mẫu các thành phần, kiểm chuỗi dấu và độ tương phản → xong.
- Cả nhóm: rà từng tiêu chí nghiệm thu, sửa lỗi, chuẩn bị demo.

**Thứ Sáu 20/11**

- Sáng: dự phòng cho phát sinh (≈ 2 điểm), nghiệm thu lại story chưa đạt.
- 15:00 **Sprint Review**, demo: clone → chạy + API health; danh sách 25 màn; quyết định 2D; cảnh 3D và FPS trên điện thoại; bộ giao diện tiếng Việt.
- 16:00 **Retro**: ghi điểm xong thật làm velocity, chốt DoD (Q11). 16:30 làm mịn Sprint 2: chốt Q3, Q4, Q6, Q10; đưa LL-004, LL-016, LL-033, LL-042 vào danh sách chọn.

**Tải ước (ngày công, theo sprint-1.md):** FE 3,0 · DEV3D 2,5 · BE 1,75 · LD 1,5 · ART2D 0,75 = 9,5. Nếu một người kiêm FE + BE thì ≈ 4,75/5 ngày, khá sát; khi đó dời LL-002 sang thứ Tư–Sáu (không story nào trong sprint phụ thuộc nó) và thả nó nếu trễ.

## Rủi ro

Rủi ro 1–8 rút gọn từ sprint-1.md; 9–11 do Scrum Master thêm.

| # | Rủi ro | Mức | Cách giảm (điều kiện kích hoạt) |
|---|---|---|---|
| 1 | Chưa có ý tưởng/kịch bản 25 màn (Q6), LL-028 trễ hoặc thiếu màn | Cao | Trả lời Câu 4. Hạn viết ý tưởng hết thứ Ba; tối thứ Ba còn < 15 ý tưởng thì họp 30' chọn từ nguồn có sẵn; hết thứ Tư vẫn thiếu thì ghi "25 màn" chưa đạt và chuyển Sprint 2, không kéo dài sprint |
| 2 | Chưa biết đội hình (Q2), có thể thiếu người làm 3D/đồ họa | Cao | Trả lời Câu 3. Mỗi người ≤ 1 ngày công/ngày. Thứ tự nhường: LL-001 → LL-014 → LL-028 → LL-008 → LL-023 → LL-002 |
| 3 | Chưa có điện thoại thật để đo FPS (Q3) | Cao | Trả lời Câu 5. Chốt thiết bị trước chiều thứ Ba. Nếu không có: giả lập giảm CPU 4× trong Chrome DevTools, ghi rõ "chưa đo máy thật", đo thật đầu Sprint 2 |
| 4 | Three.js trong Next.js gặp lỗi SSR/hydration hoặc rò rỉ bộ nhớ, LL-014 trễ | Cao | Tích hợp chiều thứ Hai (tải động, tắt SSR), đo heap từ thứ Tư. Hết thứ Tư chưa có cảnh chạy ổn: báo PO, thả LL-002 và phần "trang mẫu" của LL-023 để giữ nguồn lực |
| 5 | LL-001 là điểm nghẽn đầu tuần (4 story phụ thuộc) | TB | Xong và được duyệt trước thứ Hai (xem rủi ro 9). Việc không cần dự án (chọn thư viện DB, DB local, moodboard, ý tưởng màn) làm trước |
| 6 | Năng lực 20 điểm chưa kiểm chứng, cam kết 90% | TB | Kiểm tra giữa sprint thứ Tư 16:30. Dưới 10 điểm xong thì sáng thứ Năm thả LL-002 (không chặn story nào trong sprint), rồi phần "trang mẫu" của LL-023. Ghi điểm xong thật làm velocity |
| 7 | PO chốt phong cách chậm (Q10), LL-023 trễ | TB | Chốt trước 17:00 thứ Ba. Chưa chốt thì dùng phong cách tối giản mặc định; đổi sau vẫn rẻ nhờ design token |
| 8 | Chưa có DoD (Q11), "xong" bị hiểu khác nhau. **Đã giảm 12/11:** bạn chọn DoD tạm (OPS-4), không còn chặn việc đặt *Xong* | Thấp | Chốt chính thức ở Retro thứ Sáu |
| 9 | **(mới)** "Duyệt từng task" khiến bạn thành nút thắt; lịch thứ Hai giả định LL-001 xong trước 10:00 và ngoại lệ "Mốc 1" không dùng được | Cao | Làm xong LL-001 (T02, T03) và duyệt trong 12–13/11; đặt giờ duyệt cố định mỗi ngày (ví dụ sáng và cuối ngày). Nếu 10:00 16/11 LL-001 chưa *Xong*: LL-002, LL-008, LL-014, LL-023 lùi tới khi *Xong*, tính lại từ mốc đó |
| 10 | **(mới)** LL-002-T01 phụ thuộc AI-T07 trong kế hoạch AI (HO_SO L4): thêm chuỗi T01 → T02 → T03 → AI-T07 trước khi LL-002 bắt đầu | TB | Quyết ở `/sprint` (Câu 2): kéo AI-T07 vào sprint (19/20 = 95%) hoặc gỡ phụ thuộc trong tasks.json (hỏi bạn trước khi sửa) |
| 11 | **(mới)** Tải 9,5 ngày công trong 5 ngày, trong khi nhóm có thể chỉ 1 người (G3) | TB | Chỉ hợp lý nếu AI lo FE/BE/DEV3D (≈ 7,25 ngày công) và bạn lo duyệt + LD/PO (≈ 2,25 ngày công, thêm 14 lần duyệt cho 14 task của 6 story). Kiểm chứng bằng velocity thật; thả LL-002 trước khi trễ |

## Story để ngoài sprint

| Mã | Điểm | Lý do chưa đưa vào | Khi nào vào |
|---|---|---|---|
| [LL-004] | 5 | "Có" và đứng ngay sau nhóm đã chọn, nhưng thêm vào lên 23/20 (115%) | Đầu Sprint 2 |
| [LL-003] | 3 | "Chưa": chờ Q4; kể cả có Q4 thì thêm vào lên 21/20 (105%) | Sprint 2 nếu có Q4 trước thứ Sáu |
| [LL-016] | 3 | Phụ thuộc LL-014 (xong thứ Năm), không đủ thời gian và vượt 90% | Đầu Sprint 2 |
| [LL-033] | 2 | Chờ LL-028 được duyệt (thứ Tư); thêm vào chạm 100%. Ứng viên kéo vào nếu rảnh và đúng tiến độ (không tính cam kết) | Sprint 2 |
| [LL-042] | 3 | Cần quyết định 2D của LL-008 (thứ Tư) | Sprint 2 |
| [LL-005], [LL-006] | 5 + 3 | Phụ thuộc LL-004 chưa có | Sprint 2 |
| [LL-029], [LL-010] | 5 + 5 | "Chưa": chờ Q6, Q10; còn phụ thuộc LL-028, LL-023, LL-009 | Sprint 3, sau khi Q6 và Q10 có trả lời |

## Nhật ký hằng ngày

Ghi bởi `/daily` (3 câu: hôm qua, hôm nay, vướng mắc). Mục mới nhất ở cuối.

### 2026-11-11 (Thứ Tư) — tiền sprint · ghi từ tài liệu, chưa qua `/daily`

- **Đã làm:** (10/11) backlog v2.1 và docs/sprint-1.md. (11/11) bắt đầu SP-00 của kế hoạch AI: LL-001-T01 (khung Next.js 16.4.6) làm xong; bạn chọn "duyệt từng task" và tắt `AGENTS.md` tự sinh; lượt kiểm chứng cuối lúc 20:40 đạt (`npm ci`, `npm run build`, Chrome production/dev, `npm audit`); 21:13 bạn commit `feat: init` trên nhánh `init`.
- **Tiếp theo:** bạn đọc docs/evidence/LL-001-T01.md và xác nhận *Xong*; trả lời 5 câu ở HO_SO.md mục 6; sau đó `/sprint` để chốt kế hoạch.
- **Vướng mắc:** (1) chưa có DoD và người duyệt chính thức (Q11) nên LL-001-T01 chưa thể *Xong*; (2) hai kế hoạch sprint lệch nhau (HO_SO L1–L4); (3) Q2, Q3, Q6 chưa có trả lời.
- **Thay đổi file:** tạo `scrum/` (4 file). Không sửa file nào khác.

### 2026-11-12 (Thứ Năm) — tiền sprint · ghi từ phiên orchestrator, chưa qua `/daily`

- **Đã làm:** khôi phục trạng thái từ `scrum/` và kế hoạch AI; `verify_plan.py` PASS ở HEAD `c8f53f0`; hash 8 file của LL-001-T01 khớp bằng chứng; tính lại admission: **0 task đủ điều kiện nhận** (6 task quyết định chờ Q1–Q11, LL-001-T02 chờ LL-001-T01 *Xong*).
- **Tiếp theo:** bạn đọc docs/evidence/LL-001-T01.md và xác nhận *Xong* (commit `feat: init` không tính là xác nhận); sau đó nhận LL-001-T02.
- **Vướng mắc:** đường găng vẫn là duyệt LL-001-T01. Còn 2 ngày làm việc (12–13/11) trước Sprint 1; sau T01 còn 2 lần duyệt nữa (T02, T03) mới mở khóa LL-002/008/014/023 (rủi ro 9).
- **Thay đổi file (lúc 06:20):** sửa dòng "Source" lỗi thời trong docs/ai-planning/PROGRESS.md, thêm mục nhật ký 06:20 và một dòng bảng verification (HO_SO L5); cập nhật `scrum/HO_SO.md` và `scrum/SPRINT.md`.

**Cập nhật 07:24 (cùng ngày):**

- **Đã làm:** bạn đặt LL-001-T01 *Xong* (07:10) và chọn DoD tạm (Câu 1, OPS-4). Tôi nhận và làm xong LL-001-T02 (lint, format, typecheck, script `check`), đang *Chờ duyệt* kèm `docs/evidence/LL-001-T02.md`. Đổi công cụ giữa chừng: ESLint 9.39.5 bị deprecated nên dùng ESLint 10.14.0 (có 3 cảnh báo peer, đã chứng minh plugin chạy đúng).
- **Tiếp theo:** bạn đọc `docs/evidence/LL-001-T02.md` (mục "Điểm cần người duyệt xem kỹ") và xác nhận *Xong*; sau đó nhận LL-001-T03 (README + clone sạch), task cuối của story LL-001.
- **Vướng mắc:** 4 điểm cần bạn quyết trong evidence T02: advisory `minimatch` ở công cụ dev (chấp nhận hay thêm `overrides`), phạm vi Prettier bỏ `*.md`, script `check` + `--max-warnings 0`, 4 file `.log` bằng chứng T01 chưa vào git. Còn 1 ngày làm việc (13/11) trước Sprint 1: T03 cần thêm một lần duyệt nữa.
- **Thay đổi file:** `package.json`, `package-lock.json`, `eslint.config.mjs`, `.prettierrc.json`, `docs/evidence/LL-001-T02.md` + `.artifacts/`, `docs/ai-planning/{tasks.json,BACKLOG.md,PROGRESS.md}`; `scrum/HO_SO.md`, `scrum/SPRINT.md`. Không sửa `README.md`, `docs/backlog.md`, `docs/sprint-1.md`, `src/`.
