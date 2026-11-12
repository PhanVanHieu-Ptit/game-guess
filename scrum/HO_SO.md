# Hồ sơ dự án — Lắt Léo

> Khởi tạo 2026-11-11 (Thứ Tư) · Cập nhật gần nhất: 2026-11-12.
> Đây là bộ nhớ của dự án: mục tiêu, giả định, điểm lệch, câu hỏi chờ, quyết định. Backlog: [BACKLOG.md](BACKLOG.md) · Sprint: [SPRINT.md](SPRINT.md) · Lịch sử: [LICH_SU.md](LICH_SU.md).

## 1. Nguồn đã đọc (chỉ đọc, không sửa)

Đọc ngày 2026-11-11. `sha256` rút gọn 12 ký tự để `/docmoi` phát hiện file đổi. Ngoài các file `.md` còn đọc `docs/ai-planning/tasks.json` và `verify_plan.py` (kết quả `verify_plan.py`: PASS, hash nguồn không lệch).

| Nhóm | File | sha256 | Vai trò |
|---|---|---|---|
| Gốc | [README.md](../README.md) | `c75522d6c734` | chỉ có dòng "# game-guess" |
| Gốc | [docs/backlog.md](../docs/backlog.md) | `3dda35d427a0` | nguồn yêu cầu chính: v2.1, 51 story, 211 điểm |
| Gốc | [docs/sprint-1.md](../docs/sprint-1.md) | `c4d7e01d2dea` | kế hoạch Sprint 1 đề xuất (16–20/11/2026) |
| Kế hoạch AI | [docs/ai-planning/PROJECT_ANALYSIS.md](../docs/ai-planning/PROJECT_ANALYSIS.md) | `05394584422f` | khảo sát hiện trạng ngày 10/11 |
| Kế hoạch AI | [docs/ai-planning/REQUIREMENTS.md](../docs/ai-planning/REQUIREMENTS.md) | `a2a3314c23de` | truy vết yêu cầu, thứ tự ưu tiên nguồn |
| Kế hoạch AI | [docs/ai-planning/GAP_ANALYSIS.md](../docs/ai-planning/GAP_ANALYSIS.md) | `ea775e82b425` | 51 story đều MISSING khi khảo sát; DOC-BUG-01 |
| Kế hoạch AI | [docs/ai-planning/ARCHITECTURE.md](../docs/ai-planning/ARCHITECTURE.md) | `9a04b60a536b` | kiến trúc đề xuất |
| Kế hoạch AI | [docs/ai-planning/BACKLOG.md](../docs/ai-planning/BACKLOG.md) | `409ef98e01d7` | 147 task kỹ thuật (4650 dòng; đổi 12/11 do trạng thái T01/T02 và `affected_files` của T02) |
| Kế hoạch AI | [docs/ai-planning/SPRINT_PLAN.md](../docs/ai-planning/SPRINT_PLAN.md) | `44f23a90c58b` | 12 sprint SP-00…SP-11 |
| Kế hoạch AI | [docs/ai-planning/ROADMAP.md](../docs/ai-planning/ROADMAP.md) | `c1839e1960ba` | mốc và đồ thị phụ thuộc |
| Kế hoạch AI | [docs/ai-planning/RISKS.md](../docs/ai-planning/RISKS.md) | `2bc3033da75d` | 16 rủi ro R01–R16 |
| Kế hoạch AI | [docs/ai-planning/EXECUTION_RULES.md](../docs/ai-planning/EXECUTION_RULES.md) | `4215d3921fd6` | luật nhận/hoàn thành task |
| Kế hoạch AI | [docs/ai-planning/PROGRESS.md](../docs/ai-planning/PROGRESS.md) | `fd8b208b0b3a` | trạng thái task, nhật ký, quyết định mở (hash gốc 11/11 `6f4803a0c4e2`; đổi 12/11 do chính phiên orchestrator, xem mục 7) |
| Bằng chứng | [docs/evidence/LL-001-T01.md](../docs/evidence/LL-001-T01.md) | `e09ce9796490` | bằng chứng task đầu tiên (bạn đã duyệt *Xong* 12/11) |
| Bằng chứng | [docs/evidence/LL-001-T02.md](../docs/evidence/LL-001-T02.md) | `4d126b7c76bf` | bằng chứng task thứ hai (đang chờ bạn duyệt) |

## 2. Hồ sơ dự án

| Mục | Nội dung | Nguồn / giả định |
|---|---|---|
| Mục tiêu | Bản chơi thử 25 màn (20 màn 2D + 5 màn 3D) của **Lắt Léo**, game đố mẹo hack não kiểu Việt, chạy trên web. | docs/backlog.md:3 |
| Phạm vi (trong) | 7 Epic (E1 Nền tảng, E2 Khung chơi, E3 2D, E4 3D, E5 Giao diện, E6 Nội dung, E7 Chất lượng), 51 story, 211 điểm. Chưa có đăng nhập; nội dung màn nằm trong repo (nạp qua `LevelRepository`); PostgreSQL lưu tiến độ ẩn danh và sự kiện đo lường; mọi màn mở sẵn. | docs/backlog.md:13, 27–35, 565–577. Ý sau cùng là giả định của backlog (Q7, Q8) → G4 |
| Ngoài phạm vi | **Won't:** chế độ nhiều người, thanh toán, ứng dụng tải về. **Chưa làm, chờ bạn duyệt:** gợi ý từng màn, phản hồi trong game, màn hướng dẫn, âm thanh, test tự động/CI, chia sẻ mạng xã hội, tài khoản/đồng bộ. **Có điều kiện:** khóa màn tuần tự (≈ 2 điểm, nếu Q7), adapter PostgreSQL cho nội dung màn (≈ 3 điểm, nếu Q8). | docs/backlog.md:12, 597–614 |
| Người dùng | Học sinh, sinh viên, dân văn phòng 15–35 tuổi. Pháp lý với nhóm 15–17 tuổi chưa chốt (Q5). | docs/backlog.md:11, 587 |
| Nhóm | Chưa có tên/giờ làm (Q2). Mã vai trò: FE, BE, DEV3D, LD, ART2D, ART3D, QA, PO; một người có thể kiêm nhiều vai. | docs/backlog.md:19; docs/sprint-1.md:11. **Giả định G3** |
| Công nghệ | Yêu cầu: Next.js, Three.js, PostgreSQL. Đã dựng khung: Node 22.22.3, npm 10.9.8, Next.js 16.4.6, React 19.3.1, TypeScript 5.9.3, ESLint 10.14.0 + eslint-config-next 16.4.6, Prettier 3.10.0 (ghim phiên bản chính xác). Chưa cài Three.js và PostgreSQL. | docs/backlog.md:11; package.json; docs/evidence/LL-001-T01.md mục 2 |
| Ràng buộc | Tiếng Việt có dấu đúng; chữ đề ≥ 16 px, tương phản ≥ 4,5:1 (LL-023). Vùng chạm ≥ 44×44 px, bố cục 360–1920 px (LL-025). Màn 3D: heap tăng ≤ 10% sau 20 lần mở–thoát (LL-014). Phản hồi đúng/sai ≤ 1 giây (LL-005). Ngưỡng tạm chờ Q3: ≥ 30 FPS (LL-008, LL-050); tải ≤ 3 giây và ≤ 1 MB trên 4G giả lập (LL-041). **Chưa có:** hạn chót (Q1), ngân sách hosting/DB (Q4), pháp lý và bản quyền (Q5), thiết bị tối thiểu (Q3). | docs/backlog.md (các story nêu ở từng ngưỡng), 581–595 |
| Definition of Done | **Chưa có chính thức (Q11).** Tạm hiểu: tiêu chí nghiệm thu đạt + PO duyệt + mã đã vào nhánh chính. Kế hoạch AI thêm quy tắc bằng chứng cho từng task (D1–D4): bằng chứng ở `docs/evidence/<TASK>.md`; kiểm tra đạt, không bí mật, không đổi ngoài phạm vi; README/ADR liên quan cập nhật; chỉ *Xong* khi review theo DoD. | docs/backlog.md:18; docs/sprint-1.md:12; docs/ai-planning/EXECUTION_RULES.md:38–40. **Giả định G6**, chờ Câu 1 |
| Ước lượng và nhịp | Điểm 1-2-3-5-8-13 (trên 8 chia nhỏ), 1 điểm ≈ ½ ngày công; MoSCoW; mỗi story 2–4 tiêu chí nghiệm thu; mỗi task ≤ 1 ngày; sprint 1 tuần (thứ Hai → thứ Sáu); năng lực tạm 20 điểm, cam kết ≤ 90%. | docs/backlog.md:15–17; docs/sprint-1.md:10. Trùng mặc định của Scrum Master → **G1, G2, G5** |
| Hạn chót | Chưa có (Q1). Dự báo thô **29/01–05/02/2027** nếu Sprint 1 bắt đầu 16/11/2026 và giữ 18–20 điểm/sprint (chưa trừ nghỉ lễ, chưa tính lỗi phát sinh). | Tính từ 211 điểm; xem [BACKLOG.md](BACKLOG.md) mục Tóm tắt |

## 3. Giả định (chưa được bạn xác nhận)

| # | Giả định | Dựa trên | Tình trạng |
|---|---|---|---|
| G1 | Năng lực 20 điểm/sprint, cam kết ≤ 90% (18 điểm). Chưa có velocity thật; hiệu chỉnh sau Sprint 1. | docs/backlog.md:16 | Chờ xác nhận (Câu 3) |
| G2 | Sprint 1 từ thứ Hai 16/11 đến thứ Sáu 20/11/2026; mỗi sprint 1 tuần thứ Hai → thứ Sáu. | docs/sprint-1.md:9. REQUIREMENTS.md:33 và tasks.json coi đây chưa là cam kết | Chờ xác nhận (Câu 2) |
| G3 | Bạn là PO kiêm người duyệt duy nhất (theo quyết định "duyệt từng task" ngày 11/11) và kiêm các vai LD/ART/QA; AI agent làm task kỹ thuật FE/BE/DEV3D; chưa có ai khác. | PROGRESS.md:114; đề xuất của Scrum Master | Chờ xác nhận (Câu 3) |
| G4 | Không đăng nhập; mọi màn mở sẵn; nội dung màn trong repo qua `LevelRepository`; PostgreSQL chỉ lưu tiến độ ẩn danh và sự kiện. Chưa chốt kiểm tra đáp án ở client hay server. | docs/backlog.md:13 (Q7, Q8) | Dùng tạm; cần chốt trước Sprint 2 |
| G5 | 1 điểm ≈ ½ ngày công một người; thang tương đối, cần hiệu chỉnh khi AI agent làm phần lớn task. | docs/backlog.md:15 | Dùng tạm |
| G6 | DoD tạm: tiêu chí nghiệm thu đạt + bằng chứng + bạn duyệt + mã đã commit (quy ước nhánh sẽ ghi ở README, LL-001-T03). | docs/backlog.md:18; EXECUTION_RULES.md | **Đã xác nhận 2026-11-12** (OPS-4); áp dụng tạm tới Retro 20/11 |
| G7 | Ngưỡng tạm: ≥ 30 FPS; tải ≤ 3 giây và ≤ 1 MB trên 4G; phản hồi ≤ 1 giây. | docs/backlog.md (LL-005, 008, 041, 050) | Dùng tạm; chờ Q3 |
| G8 | Thứ tự làm là thứ tự bảng backlog (việc rủi ro cao và mở khóa nhiều story làm trước); Should/Could cắt trước khi thiếu thời gian. | docs/backlog.md:24 | Dùng |
| G9 | Quyền ghi: README.md, docs/backlog.md, docs/sprint-1.md luôn chỉ đọc. Khi `/task`, chỉ cập nhật file theo dõi của kế hoạch AI (PROGRESS.md, tasks.json, docs/evidence/*) theo EXECUTION_RULES; sửa gì khác trong `docs/` thì hỏi trước. | Yêu cầu "không sửa .md gốc"; EXECUTION_RULES.md:40 | **Đã xác nhận 2026-11-12** (cùng lựa chọn Câu 1) |
| G10 | Trạng thái cấp task giữ ở kế hoạch AI (tasks.json + PROGRESS.md); `scrum/` theo dõi cấp story, không chép lại để tránh hai nguồn sự thật. | Thiết kế của Scrum Master | Dùng |

## 4. Quy tắc làm việc

- Trả lời tiếng Việt, ngắn gọn; chỉ in phần thay đổi; cuối mỗi câu trả lời gợi ý đúng 1 lệnh nên dùng tiếp.
- Thiếu thông tin quan trọng → hỏi tối đa 5 câu, mỗi câu kèm đáp án gợi ý để bạn chỉ cần trả lời "ok" hoặc sửa. Không tự bịa ngày, tên, giờ làm, thiết bị cho mục còn thiếu.
- Mỗi lần cập nhật file trong `scrum/`, báo ngắn gọn đã đổi gì.
- `/task` chỉ làm trong phạm vi task; việc phát sinh ghi thành story mới (mục "Đề xuất thêm" của BACKLOG.md).
- **Duyệt từng task** (OPS-3, 2026-11-11): task kỹ thuật dừng ở *Chờ duyệt* kèm `docs/evidence/<TASK>.md`; chỉ bạn đặt *Xong*; task phụ thuộc chỉ được nhận sau đó; không tự commit.
- Trước mỗi `/task` chạy `python3 docs/ai-planning/verify_plan.py`. Nguồn đổi hash → đối soát rồi re-baseline có lý do, không chỉ sửa hash.
- Thứ tự ưu tiên nguồn khi mâu thuẫn (REQUIREMENTS.md:9): yêu cầu trực tiếp của bạn > quyết định đã xác nhận > bảng docs/backlog.md > tiêu chí nghiệm thu chi tiết > giả định của kế hoạch.

## 5. Điểm lệch giữa các tài liệu

| # | Điểm lệch | Xử lý tạm |
|---|---|---|
| L1 | **Hai kế hoạch sprint khác nhau.** docs/sprint-1.md: Sprint 1 = LL-001, LL-028, LL-008, LL-014, LL-023, LL-002 (18 điểm, 16–20/11). Kế hoạch AI (SPRINT_PLAN.md): SP-00 = nền tảng + 6 task chốt quyết định + test/CI + LL-001 + LL-002 (15 điểm, đã bắt đầu 11/11, không có ngày); SP-01 = LL-028, LL-008, LL-014, LL-023, LL-004 (17 điểm). SPRINT_PLAN.md:13 tự ghi "cả hai chưa cam kết". | Dùng docs/sprint-1.md làm Sprint 1 trong [SPRINT.md](SPRINT.md); hỏi ở Câu 2 |
| L2 | **Ngày bắt đầu.** sprint-1.md giả định 16/11; tasks.json và REQUIREMENTS.md:33 nói "chưa dùng như cam kết"; nhưng thực thi đã bắt đầu 11/11. | Coi 11–15/11 là tiền sprint; hỏi ở Câu 2 |
| L3 | **Quy tắc phụ thuộc.** sprint-1.md:13 cho phép story phụ thuộc bắt đầu khi khung Next.js vào nhánh chính ("Mốc 1") dù LL-001 chưa xong; backlog ("Cách đọc bảng"), EXECUTION_RULES và quyết định "duyệt từng task" đều đòi phụ thuộc phải *Xong*. Kế hoạch AI đã ghi đây là DOC-BUG-01 (GAP_ANALYSIS.md:82). | Áp dụng quy tắc chặt; hệ quả cho lịch thứ Hai: SPRINT.md rủi ro 9 |
| L4 | **Phụ thuộc của LL-002.** Backlog gốc: chỉ LL-001. Kế hoạch AI: LL-002-T01 phụ thuộc thêm AI-T07 (test runner, story enabler ngoài 51 story) → chuỗi LL-001-T01 → T02 → T03 → AI-T07 → LL-002-T01, bốn lần duyệt tuần tự. | Ghi ở BACKLOG.md mục 6; trình phương án ở `/sprint` (Câu 2) |
| L5 | **Tài liệu theo dõi lỗi thời.** PROGRESS.md:14 ghi "docs/ untracked, HEAD 666c413 trên main"; thực tế git đang ở nhánh `init`, commit `c8f53f0` "feat: init" (11/11 21:13) đã gồm docs, khung Next.js và kế hoạch AI, working tree sạch. | **Đã xử lý 2026-11-12:** dòng "Source" trong PROGRESS.md đã sửa theo thực tế, kèm mục nhật ký 06:20 (không đổi task, DAG, estimate) |

## 6. Câu hỏi chờ trả lời

**Câu 1 đã được trả lời "ok" ngày 2026-11-12** (dùng DoD tạm, xem mục 7). Trả **"ok"** nếu đồng ý cả 4 gợi ý còn lại (2–5), hoặc nêu số câu cần sửa. Chưa hỏi lần này, dùng giả định tới khi cần: Q4 ngân sách/hosting (cần trước LL-003, Sprint 2), Q5 pháp lý/dữ liệu, Q7 thứ tự mở khóa, Q8 dữ liệu và nơi kiểm đáp án, Q9 kiểu tương tác thêm (xem [BACKLOG.md](BACKLOG.md) mục 4).

| # | Câu hỏi | Gợi ý (trả "ok" để chấp nhận) | Mở khóa |
|---|---|---|---|
| ~~1~~ | ~~**DoD, người duyệt, quyền ghi file (Q11).**~~ **Đã trả lời 12/11: "ok".** | *Xong* = mọi tiêu chí nghiệm thu đạt và có bằng chứng ở `docs/evidence/` + không bí mật, không đổi ngoài phạm vi + bạn duyệt + mã đã commit. Người duyệt: bạn. Lỗi mức cao chỉ hoãn khi bạn ghi bằng văn bản. Khi `/task` tôi chỉ ghi vào PROGRESS.md, tasks.json, docs/evidence/; README.md, docs/backlog.md, docs/sprint-1.md chỉ đọc. | Đặt *Xong* cho LL-001-T01, mở LL-001-T02 |
| 2 | **Sprint 1 dùng kế hoạch nào, ngày nào (Q1, L1–L4).** | Dùng docs/sprint-1.md: 6 story, 18/20 điểm, thứ Hai 16/11 → thứ Sáu 20/11/2026; LL-001 làm sớm từ 11/11 vẫn tính vào Sprint 1. AI-T07/T08 (test runner, CI) để ở "Đề xuất thêm", chưa tính điểm; phụ thuộc LL-002-T01 ← AI-T07 tôi trình phương án ở `/sprint`. Hạn chót bản chơi thử: chưa đặt, theo dự báo velocity. | Chốt SPRINT.md |
| 3 | **Nhóm và năng lực (Q2).** | Chỉ mình bạn (PO, người duyệt, kiêm LD/ART/QA) + AI agent làm FE/BE/3D, không ai khác. Năng lực tạm 20 điểm/sprint, hiệu chỉnh bằng điểm xong thật sau Sprint 1. Nếu muốn tính lại năng lực, cho tôi số giờ/tuần bạn dành được. | Cam kết 18/20; bỏ cột "Người" theo vai |
| 4 | **Nội dung 25 màn và đồ họa (Q6, Q10, một phần Q5).** | AI soạn ≥ 25 ý tưởng sáng tác mới (kèm dự phòng) để bạn duyệt/loại; đồ họa tối giản (hình khối, emoji) cho bản chơi thử; màn 3D dựng bằng hình khối cơ bản viết trong mã, không mua/tải mô hình ngoài; mọi câu đố ghi nguồn "tự sáng tác". | LL-028, LL-023; 18 story (102 điểm ≈ 48%) đang chờ Q6/Q10 |
| 5 | **Thiết bị đo (Q3).** | Dùng điện thoại bạn đang có làm máy đo (cho tôi biết hãng/đời); nếu chưa có thì đo bằng giả lập (Chrome DevTools, giảm CPU 4×) và ghi rõ "chưa đo máy thật", đo lại khi có máy. Trình duyệt tối thiểu: Chrome và Safari bản mới nhất + 1 bản trước; ngưỡng ≥ 30 FPS giữ nguyên. | LL-008, LL-014 (đo FPS) |

## 7. Nhật ký quyết định

| Ngày | Quyết định / sự kiện | Nguồn |
|---|---|---|
| 2026-11-09 | Lập backlog v1 (41 story, 194 điểm). Các mục Q1–Q11 để trống, đã hỏi lại. | docs/backlog.md:618 |
| 2026-11-10 | Làm mịn backlog v2 (51 story, 211 điểm) và v2.1 (LL-014 thêm task đo FPS trên điện thoại thật). Lập docs/sprint-1.md đề xuất 16–20/11, cam kết 18/20. | docs/backlog.md:620–639; docs/sprint-1.md |
| 2026-11-10 | Lập kế hoạch kỹ thuật cho agent AI: 147 task, 12 sprint, 201 điểm task (211 điểm story, hai số không cộng nhau). | docs/ai-planning/PROJECT_ANALYSIS.md; tasks.json |
| 2026-11-11 | Bắt đầu thực thi theo SP-00. LL-001-T01 (khung Next.js 16.4.6) làm xong, trạng thái `in_review`. | PROGRESS.md |
| 2026-11-11 | Bạn chọn **duyệt từng task** (OPS-3): task dừng ở `in_review`, chỉ bạn đặt `done`, task phụ thuộc chỉ nhận sau đó. Không thay cho Q11. | PROGRESS.md:114 |
| 2026-11-11 | Bạn chọn tắt `AGENTS.md` tự sinh của `next dev` bằng `agentRules: false` trong `next.config.ts` (OPS-1). | PROGRESS.md:113 |
| 2026-11-11 | Bạn commit `c8f53f0` "feat: init" (21:13) trên nhánh `init`: docs, khung Next.js, kế hoạch AI. | git log |
| 2026-11-11 | Khởi tạo `scrum/` từ docs/backlog.md v2.1 và docs/sprint-1.md. Chưa đổi nội dung yêu cầu nào; chưa sửa file `.md` nào ngoài `scrum/`. | — |
| 2026-11-12 | Chạy lại orchestrator: `verify_plan.py` PASS ở HEAD `c8f53f0`; sha256 của cả 14 file ở mục 1 không đổi; 8/8 hash file LL-001-T01 khớp bằng chứng; tính lại admission: **0 task đủ điều kiện** (AI-T01…T06 chờ Q1–Q11; LL-001-T02 chờ LL-001-T01 *Xong*). Commit `feat: init` không tính là xác nhận *Xong*. Sửa dòng "Source" lỗi thời trong PROGRESS.md (L5); lúc 06:20 đó là file `.md` duy nhất ngoài `scrum/` được sửa. | PROGRESS.md (mục 2026-11-12 06:20) |
| 2026-11-12 | Bạn đặt **LL-001-T01 *Xong*** (07:10) và chọn **DoD tạm** (Câu 1) cho tới Retro 20/11/2026; người duyệt là bạn (OPS-4). Q11 chính thức vẫn mở. | PROGRESS.md (mục 07:10) |
| 2026-11-12 | LL-001-T02 (lint, format, typecheck) làm xong lúc 07:24, trạng thái *Chờ duyệt*. Đổi công cụ giữa chừng: ESLint 9.39.5 bị npm đánh dấu deprecated nên dùng ESLint 10.14.0. Phát sinh cần bạn quyết: advisory `minimatch` ở công cụ dev, phạm vi Prettier (bỏ `*.md`), script `check`, và 4 file `.log` bằng chứng T01 chưa vào git. | docs/evidence/LL-001-T02.md; PROGRESS.md (mục 07:24) |
