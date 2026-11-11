# Product Backlog cho AI Agent

Ngày khảo sát: **2026-11-10**, múi giờ Asia/Ho_Chi_Minh. Kế hoạch đề xuất; implementation bắt đầu 2026-11-11 với SP-00 (trạng thái hiện hành ở PROGRESS.md).

<!-- plan-stats: tasks=147; sprints=12; points=201 -->

## Mô hình và ước lượng

**147 task / 201 SP task / 12 Sprint dự kiến**. Có 51 story sản phẩm nguồn (211 SP) và hai story enabler. Điểm task mới là ước lượng độc lập sau tách việc, **không cộng vào 211** và không đảm bảo cùng tổng. Tất cả task còn `todo`, không task coding đã được kiểm chứng hoàn thành.

Hierarchy: Epic → Feature → User Story → Task → Subtask. Feature dùng `F-001…F-051`, một feature mỗi capability source; `F-OPS` cho E0. Task ID `LL-NNN-TNN` hoặc `AI-TNN`; subtask ID `<TASK-ID>-SNN`. JSON chứa đầy đủ hierarchy và AC nguồn.

Ưu tiên P0 blocker, P1 Must, P2 Should, P3 Could. Complexity XS=1 SP, S=2, M=3; L/XL bắt buộc tách trước khi nhận. Target mỗi task ≤1 ngày làm việc; estimates của nội dung và 3D phải tính lại sau script/thiết bị. Đây không là cam kết thời gian; task có nhiều đầu vào chưa xác nhận chưa được admit.

Mỗi task bổ sung DoD chung D1–D4 dưới đây; bản Markdown ghi tham chiếu, JSON lặp đủ nội dung để agent đọc riêng được. Verification command là **contract tương lai**, scripts/test paths sẽ được tạo trong task sở hữu hoặc dependency; chưa có npm project tại thời điểm planning. Agent phải tạo các test paths được nêu, không chạy lệnh không có rồi ghi pass.

## Definition of Done chung

D1. Tất cả acceptance criteria của task có bằng chứng tại docs/evidence/<TASK-ID>.md (lệnh, exit code, môi trường, kết quả).
D2. Kiểm tra áp dụng đạt; không có skipped test bị tính là pass; không có secret hoặc thay đổi ngoài phạm vi.
D3. README/ADR/schema liên quan được cập nhật; đối chiếu acceptance criteria của story nguồn.
D4. Chỉ chuyển done khi dependencies done, gate có bằng chứng và review theo DoD đã xác nhận; thiếu bằng chứng giữ trạng thái chưa hoàn thành.

Tất cả task có evidence riêng; task chỉ sửa tài liệu/quyết định không chạy app tests không liên quan. Với task UI/logic/DB, test kiểm tra hành vi/contract, tránh test lặp implementation. Deploy/tag/manual actions chỉ thực hiện theo quyền và gate thực; task chưa được cho phép vẫn todo/blocked.

## Epic → Feature → User Story

### E0 — Điều phối AI, quyết định và chất lượng nền

- **F-OPS → AI-ST-001**: Là người phụ trách sản phẩm, tôi muốn AI biết quyết định nào đã xác nhận để không tự biến giả định thành yêu cầu.
  Tasks: [AI-T01](BACKLOG.md#ai-t01), [AI-T02](BACKLOG.md#ai-t02), [AI-T03](BACKLOG.md#ai-t03), [AI-T04](BACKLOG.md#ai-t04), [AI-T05](BACKLOG.md#ai-t05), [AI-T06](BACKLOG.md#ai-t06).
- **F-OPS → AI-ST-002**: Là người bảo trì, tôi muốn kiểm tra tự động xác định pass/fail để agent tự kiểm chứng thay đổi độc lập.
  Tasks: [AI-T07](BACKLOG.md#ai-t07), [AI-T08](BACKLOG.md#ai-t08).

### E1 — Nền tảng

- **F-001 → LL-001**: Là lập trình viên, tôi muốn có khung dự án Next.js chạy được kèm quy ước chung để cả nhóm bắt đầu làm tính năng ngay.
  Tasks: [LL-001-T01](BACKLOG.md#ll-001-t01), [LL-001-T02](BACKLOG.md#ll-001-t02), [LL-001-T03](BACKLOG.md#ll-001-t03).
- **F-002 → LL-002**: Là lập trình viên, tôi muốn kết nối PostgreSQL với migration có kiểm soát để dữ liệu nhất quán giữa các môi trường.
  Tasks: [LL-002-T01](BACKLOG.md#ll-002-t01), [LL-002-T02](BACKLOG.md#ll-002-t02).
- **F-003 → LL-003**: Là người chơi, tôi muốn mở game bằng một đường link trên web để chơi thử mà không cần cài đặt. [CẦN LÀM RÕ: Q4]
  Tasks: [LL-003-T01](BACKLOG.md#ll-003-t01), [LL-003-T02](BACKLOG.md#ll-003-t02).

### E2 — Khung chơi

- **F-004 → LL-004**: Là lập trình viên, tôi muốn mô tả mỗi màn theo một lược đồ chung và nạp theo mã số để thêm 25 màn mà không viết lại khung chơi.
  Tasks: [LL-004-T01](BACKLOG.md#ll-004-t01), [LL-004-T02](BACKLOG.md#ll-004-t02), [LL-004-T03](BACKLOG.md#ll-004-t03).
- **F-005 → LL-005**: Là người chơi, tôi muốn giải một màn và biết ngay đúng hay sai để sang màn kế tiếp.
  Tasks: [LL-005-T01](BACKLOG.md#ll-005-t01), [LL-005-T02](BACKLOG.md#ll-005-t02), [LL-005-T03](BACKLOG.md#ll-005-t03).
- **F-006 → LL-006**: Là người chơi, tôi muốn xem danh sách 25 màn và chọn màn muốn chơi để vào chơi nhanh.
  Tasks: [LL-006-T01](BACKLOG.md#ll-006-t01).
- **F-007 → LL-007**: Là người chơi, tôi muốn game nhớ các màn đã qua để lần sau chơi tiếp mà không làm lại từ đầu.
  Tasks: [LL-007-T01](BACKLOG.md#ll-007-t01), [LL-007-T02](BACKLOG.md#ll-007-t02), [LL-007-T03](BACKLOG.md#ll-007-t03).
- **F-048 → LL-048**: Là người chơi, tôi muốn khi có lỗi (mạng, dữ liệu, lỗi trong màn) game báo rõ và cho thử lại hoặc về chọn màn để không gặp trang trắng.
  Tasks: [LL-048-T01](BACKLOG.md#ll-048-t01), [LL-048-T02](BACKLOG.md#ll-048-t02).

### E3 — 2D

- **F-008 → LL-008**: Là lập trình viên, tôi muốn thử nhanh và chốt cách dựng màn 2D để không phải làm lại khi đã dựng nhiều màn.
  Tasks: [LL-008-T01](BACKLOG.md#ll-008-t01), [LL-008-T02](BACKLOG.md#ll-008-t02).
- **F-009 → LL-009**: Là lập trình viên, tôi muốn có các cơ chế tương tác 2D dùng chung (chạm, kéo-thả, chọn đáp án) để dựng nhanh 20 màn.
  Tasks: [LL-009-T01](BACKLOG.md#ll-009-t01), [LL-009-T02](BACKLOG.md#ll-009-t02), [LL-009-T03](BACKLOG.md#ll-009-t03).
- **F-010 → LL-010**: Là người chơi, tôi muốn chơi lô 1 (2D-01…05) để làm quen với lối đố mẹo qua các màn dễ. [CẦN LÀM RÕ: Q6]
  Tasks: [LL-010-T01](BACKLOG.md#ll-010-t01), [LL-010-T02](BACKLOG.md#ll-010-t02), [LL-010-T03](BACKLOG.md#ll-010-t03), [LL-010-T04](BACKLOG.md#ll-010-t04), [LL-010-T05](BACKLOG.md#ll-010-t05).
- **F-011 → LL-011**: Là người chơi, tôi muốn chơi lô 2 (2D-06…10) để gặp những mẹo khó dần, buộc phải nghĩ lệch hướng. [CẦN LÀM RÕ: Q6]
  Tasks: [LL-011-T01](BACKLOG.md#ll-011-t01), [LL-011-T02](BACKLOG.md#ll-011-t02), [LL-011-T03](BACKLOG.md#ll-011-t03), [LL-011-T04](BACKLOG.md#ll-011-t04), [LL-011-T05](BACKLOG.md#ll-011-t05).
- **F-012 → LL-012**: Là người chơi, tôi muốn chơi lô 3 (2D-11…15) để tiếp tục được thử thách bằng những mẹo mới, không lặp lại. [CẦN LÀM RÕ: Q6]
  Tasks: [LL-012-T01](BACKLOG.md#ll-012-t01), [LL-012-T02](BACKLOG.md#ll-012-t02), [LL-012-T03](BACKLOG.md#ll-012-t03), [LL-012-T04](BACKLOG.md#ll-012-t04), [LL-012-T05](BACKLOG.md#ll-012-t05).
- **F-013 → LL-013**: Là người chơi, tôi muốn chơi lô 4 (2D-16…20) để hoàn thành trọn bộ 20 màn 2D với những mẹo khó nhất phần 2D. [CẦN LÀM RÕ: Q6]
  Tasks: [LL-013-T01](BACKLOG.md#ll-013-t01), [LL-013-T02](BACKLOG.md#ll-013-t02), [LL-013-T03](BACKLOG.md#ll-013-t03), [LL-013-T04](BACKLOG.md#ll-013-t04), [LL-013-T05](BACKLOG.md#ll-013-t05).
- **F-042 → LL-042**: Là lập trình viên, tôi muốn có sân chơi 2D tự co giãn theo màn hình và quy đổi đúng vị trí chạm/chuột để mọi màn 2D chạy giống nhau trên điện thoại lẫn máy tính.
  Tasks: [LL-042-T01](BACKLOG.md#ll-042-t01), [LL-042-T02](BACKLOG.md#ll-042-t02).
- **F-043 → LL-043**: Là người chơi, tôi muốn gõ đáp án tiếng Việt theo cách mình quen (hoa/thường, có/không dấu, "hòa"/"hoà") để không bị tính sai vì cách gõ.
  Tasks: [LL-043-T01](BACKLOG.md#ll-043-t01), [LL-043-T02](BACKLOG.md#ll-043-t02).

### E4 — 3D

- **F-014 → LL-014**: Là lập trình viên, tôi muốn có khung cảnh 3D Three.js chạy ổn định trên một trang riêng, chưa cần vòng chơi, để kiểm chứng rủi ro 3D sớm.
  Tasks: [LL-014-T01](BACKLOG.md#ll-014-t01), [LL-014-T02](BACKLOG.md#ll-014-t02), [LL-014-T03](BACKLOG.md#ll-014-t03).
- **F-015 → LL-015**: Là người chơi, tôi muốn chạm/kéo vật và xoay góc nhìn trong cảnh 3D để khám phá và giải đố.
  Tasks: [LL-015-T01](BACKLOG.md#ll-015-t01), [LL-015-T02](BACKLOG.md#ll-015-t02), [LL-015-T03](BACKLOG.md#ll-015-t03).
- **F-016 → LL-016**: Là lập trình viên 3D, tôi muốn có trình nạp tài nguyên, màn hình chờ và ngân sách hiệu năng/tài nguyên bằng số để mọi màn và mô hình 3D bám cùng một chuẩn.
  Tasks: [LL-016-T01](BACKLOG.md#ll-016-t01), [LL-016-T02](BACKLOG.md#ll-016-t02), [LL-016-T03](BACKLOG.md#ll-016-t03).
- **F-017 → LL-017**: Là người chơi, tôi muốn chơi màn 3D-01 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6]
  Tasks: [LL-017-T01](BACKLOG.md#ll-017-t01), [LL-017-T02](BACKLOG.md#ll-017-t02), [LL-017-T03](BACKLOG.md#ll-017-t03).
- **F-018 → LL-018**: Là người chơi, tôi muốn chơi màn 3D-02 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6]
  Tasks: [LL-018-T01](BACKLOG.md#ll-018-t01), [LL-018-T02](BACKLOG.md#ll-018-t02), [LL-018-T03](BACKLOG.md#ll-018-t03).
- **F-019 → LL-019**: Là người chơi, tôi muốn chơi màn 3D-03 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6]
  Tasks: [LL-019-T01](BACKLOG.md#ll-019-t01), [LL-019-T02](BACKLOG.md#ll-019-t02), [LL-019-T03](BACKLOG.md#ll-019-t03).
- **F-020 → LL-020**: Là người chơi, tôi muốn chơi màn 3D-04 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6]
  Tasks: [LL-020-T01](BACKLOG.md#ll-020-t01), [LL-020-T02](BACKLOG.md#ll-020-t02), [LL-020-T03](BACKLOG.md#ll-020-t03).
- **F-021 → LL-021**: Là người chơi, tôi muốn chơi màn 3D-05 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6]
  Tasks: [LL-021-T01](BACKLOG.md#ll-021-t01), [LL-021-T02](BACKLOG.md#ll-021-t02), [LL-021-T03](BACKLOG.md#ll-021-t03).
- **F-022 → LL-022**: Là người chơi dùng điện thoại tầm trung, tôi muốn màn 3D chạy mượt để chơi không bị giật. [CẦN LÀM RÕ: Q3]
  Tasks: [LL-022-T01](BACKLOG.md#ll-022-t01), [LL-022-T02](BACKLOG.md#ll-022-t02).

### E5 — Giao diện

- **F-023 → LL-023**: Là người chơi, tôi muốn giao diện thống nhất và hiển thị đúng tiếng Việt có dấu để đọc đề không bị nhầm chữ.
  Tasks: [LL-023-T01](BACKLOG.md#ll-023-t01), [LL-023-T02](BACKLOG.md#ll-023-t02).
- **F-024 → LL-024**: Là người chơi, tôi muốn có trang chủ với nút Chơi/Chơi tiếp để bắt đầu nhanh.
  Tasks: [LL-024-T01](BACKLOG.md#ll-024-t01).
- **F-025 → LL-025**: Là người chơi, tôi muốn trang chọn màn và khung chơi dùng thoải mái trên cả điện thoại lẫn máy tính để chơi ở bất cứ đâu.
  Tasks: [LL-025-T01](BACKLOG.md#ll-025-t01).
- **F-026 → LL-026**: Là người chơi, tôi muốn thấy hiệu ứng khi đúng/sai và khi chuyển màn để rõ kết quả mỗi lần giải.
  Tasks: [LL-026-T01](BACKLOG.md#ll-026-t01).
- **F-027 → LL-027**: Là người chơi, tôi muốn thấy màn hình hoàn tất khi xong cả 25 màn để biết mình đã chơi hết bản thử.
  Tasks: [LL-027-T01](BACKLOG.md#ll-027-t01).

### E6 — Nội dung

- **F-028 → LL-028**: Là trưởng nhóm sản phẩm, tôi muốn có danh sách 25 màn (loại, ý tưởng mẹo, độ khó, thứ tự) để cả nhóm thống nhất khối lượng trước khi làm.
  Tasks: [LL-028-T01](BACKLOG.md#ll-028-t01), [LL-028-T02](BACKLOG.md#ll-028-t02).
- **F-029 → LL-029**: Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 1 để dựng màn mà không phải đoán ý. [CẦN LÀM RÕ: Q6, Q10]
  Tasks: [LL-029-T01](BACKLOG.md#ll-029-t01), [LL-029-T02](BACKLOG.md#ll-029-t02), [LL-029-T03](BACKLOG.md#ll-029-t03), [LL-029-T04](BACKLOG.md#ll-029-t04), [LL-029-T05](BACKLOG.md#ll-029-t05).
- **F-030 → LL-030**: Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 2 để dựng màn mà không phải đoán ý. [CẦN LÀM RÕ: Q6, Q10]
  Tasks: [LL-030-T01](BACKLOG.md#ll-030-t01), [LL-030-T02](BACKLOG.md#ll-030-t02), [LL-030-T03](BACKLOG.md#ll-030-t03), [LL-030-T04](BACKLOG.md#ll-030-t04), [LL-030-T05](BACKLOG.md#ll-030-t05).
- **F-031 → LL-031**: Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 3 để dựng màn mà không phải đoán ý. [CẦN LÀM RÕ: Q6, Q10]
  Tasks: [LL-031-T01](BACKLOG.md#ll-031-t01), [LL-031-T02](BACKLOG.md#ll-031-t02), [LL-031-T03](BACKLOG.md#ll-031-t03), [LL-031-T04](BACKLOG.md#ll-031-t04), [LL-031-T05](BACKLOG.md#ll-031-t05).
- **F-032 → LL-032**: Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 4 để dựng màn mà không phải đoán ý. [CẦN LÀM RÕ: Q6, Q10]
  Tasks: [LL-032-T01](BACKLOG.md#ll-032-t01), [LL-032-T02](BACKLOG.md#ll-032-t02), [LL-032-T03](BACKLOG.md#ll-032-t03), [LL-032-T04](BACKLOG.md#ll-032-t04), [LL-032-T05](BACKLOG.md#ll-032-t05).
- **F-033 → LL-033**: Là lập trình viên 3D, tôi muốn có kịch bản chi tiết màn 3D-01 để dựng lát cắt 3D đầu tiên và ước lượng lại chính xác.
  Tasks: [LL-033-T01](BACKLOG.md#ll-033-t01).
- **F-034 → LL-034**: Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-01 để không phải tự làm. [CẦN LÀM RÕ: Q10]
  Tasks: [LL-034-T01](BACKLOG.md#ll-034-t01), [LL-034-T02](BACKLOG.md#ll-034-t02).
- **F-035 → LL-035**: Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-04 để không phải tự làm. [CẦN LÀM RÕ: Q10]
  Tasks: [LL-035-T01](BACKLOG.md#ll-035-t01), [LL-035-T02](BACKLOG.md#ll-035-t02).
- **F-036 → LL-036**: Là người chơi, tôi muốn đề bài và phản hồi đúng chính tả, đúng dấu để không nhầm đáp án vì lỗi chữ.
  Tasks: [LL-036-T01](BACKLOG.md#ll-036-t01), [LL-036-T02](BACKLOG.md#ll-036-t02).
- **F-044 → LL-044**: Là lập trình viên 3D, tôi muốn có kịch bản chi tiết 4 màn 3D còn lại (3D-02…05) để dựng đúng và ước lượng lại chính xác.
  Tasks: [LL-044-T01](BACKLOG.md#ll-044-t01), [LL-044-T02](BACKLOG.md#ll-044-t02), [LL-044-T03](BACKLOG.md#ll-044-t03), [LL-044-T04](BACKLOG.md#ll-044-t04).
- **F-045 → LL-045**: Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-02 để không phải tự làm. [CẦN LÀM RÕ: Q10]
  Tasks: [LL-045-T01](BACKLOG.md#ll-045-t01), [LL-045-T02](BACKLOG.md#ll-045-t02).
- **F-046 → LL-046**: Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-03 để không phải tự làm. [CẦN LÀM RÕ: Q10]
  Tasks: [LL-046-T01](BACKLOG.md#ll-046-t01), [LL-046-T02](BACKLOG.md#ll-046-t02).
- **F-047 → LL-047**: Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-05 để không phải tự làm. [CẦN LÀM RÕ: Q10]
  Tasks: [LL-047-T01](BACKLOG.md#ll-047-t01), [LL-047-T02](BACKLOG.md#ll-047-t02).

### E7 — Chất lượng

- **F-037 → LL-037**: Là trưởng nhóm sản phẩm, tôi muốn có bảng kê nguồn và giấy phép của mọi tài nguyên, câu đố để yên tâm đưa bản chơi thử ra công khai. [CẦN LÀM RÕ: Q5]
  Tasks: [LL-037-T01](BACKLOG.md#ll-037-t01), [LL-037-T02](BACKLOG.md#ll-037-t02).
- **F-038 → LL-038**: Là người chơi, tôi muốn mọi màn đều thắng được và không có lỗi chặn để không bị kẹt giữa chừng.
  Tasks: [LL-038-T01](BACKLOG.md#ll-038-t01), [LL-038-T02](BACKLOG.md#ll-038-t02), [LL-038-T03](BACKLOG.md#ll-038-t03).
- **F-039 → LL-039**: Là người chơi, tôi muốn game chạy đúng trên thiết bị và trình duyệt của mình để không phải đổi máy. [CẦN LÀM RÕ: Q3]
  Tasks: [LL-039-T01](BACKLOG.md#ll-039-t01), [LL-039-T02](BACKLOG.md#ll-039-t02).
- **F-040 → LL-040**: Là trưởng nhóm sản phẩm, tôi muốn sửa lỗi ưu tiên cao và chốt một bản chơi thử ổn định để phát hành đúng hạn. [CẦN LÀM RÕ: Q11]
  Tasks: [LL-040-T01](BACKLOG.md#ll-040-t01), [LL-040-T02](BACKLOG.md#ll-040-t02), [LL-040-T03](BACKLOG.md#ll-040-t03).
- **F-041 → LL-041**: Là người chơi, tôi muốn trang tải nhanh và màn 2D mượt để vào chơi ngay không phải chờ.
  Tasks: [LL-041-T01](BACKLOG.md#ll-041-t01), [LL-041-T02](BACKLOG.md#ll-041-t02).
- **F-049 → LL-049**: Là trưởng nhóm sản phẩm, tôi muốn thu số liệu chơi ẩn danh (tỉ lệ thắng, số lần sai, tỉ lệ bỏ dở từng màn) để chỉnh độ khó từ bản chơi thử. [CẦN LÀM RÕ: Q5]
  Tasks: [LL-049-T01](BACKLOG.md#ll-049-t01), [LL-049-T02](BACKLOG.md#ll-049-t02), [LL-049-T03](BACKLOG.md#ll-049-t03), [LL-049-T04](BACKLOG.md#ll-049-t04).
- **F-050 → LL-050**: Là người chơi dùng điện thoại yếu, tôi muốn cả 25 màn vẫn chơi được để không bị loại khỏi bản chơi thử vì cấu hình máy. [CẦN LÀM RÕ: Q3]
  Tasks: [LL-050-T01](BACKLOG.md#ll-050-t01), [LL-050-T02](BACKLOG.md#ll-050-t02).
- **F-051 → LL-051**: Là người chơi, tôi muốn biết dữ liệu nào được lưu và tài nguyên được ghi công ra sao để yên tâm khi chơi. [CẦN LÀM RÕ: Q5]
  Tasks: [LL-051-T01](BACKLOG.md#ll-051-t01), [LL-051-T02](BACKLOG.md#ll-051-t02).

## Chi tiết task

### AI-T01 — Chốt năng lực và DoD

Epic E0 → Feature F-OPS → Story AI-ST-001. **P0 · XS · 1 SP** · SP-00 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Ghi ngày bắt đầu, người phụ trách, năng lực thực và DoD; lịch cũ chỉ là giả định. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** Không có. **Decision/evidence gates:** `Q1`, `Q2`, `Q11`.

**Affected files (dự kiến):** `docs/decisions/delivery.md`.

**Implementation steps / subtasks:**

1. `AI-T01-S01` — Ghi ngày bắt đầu, người phụ trách, năng lực thực và DoD; lịch cũ chỉ là giả định.
2. `AI-T01-S02` — Lưu quyết định, người xác nhận, thời điểm và tác động backlog; cập nhật gate tương ứng.

**Acceptance criteria:**

- PO xác nhận ngày, capacity và quy tắc review; không quy đổi story point thành ngày cam kết.
- Gate vẫn unresolved nếu mới có đề xuất, chưa có câu trả lời.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
python3 docs/ai-planning/verify_plan.py
```

**Manual verification:**

- Đọc quyết định và đối chiếu xác nhận thực của PO/người sở hữu.

### AI-T02 — Chốt ma trận thiết bị

Epic E0 → Feature F-OPS → Story AI-ST-001. **P0 · XS · 1 SP** · SP-00 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đề xuất thiết bị thấp nhất, browser, chiều màn hình và cách đo; xác nhận thiết bị có thể mượn. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** Không có. **Decision/evidence gates:** `Q3`.

**Affected files (dự kiến):** `docs/decisions/devices.md`.

**Implementation steps / subtasks:**

1. `AI-T02-S01` — Đề xuất thiết bị thấp nhất, browser, chiều màn hình và cách đo; xác nhận thiết bị có thể mượn.
2. `AI-T02-S02` — Lưu quyết định, người xác nhận, thời điểm và tác động backlog; cập nhật gate tương ứng.

**Acceptance criteria:**

- Có model máy, OS/browser, ít nhất một máy yếu và cách đo FPS; chỉ số chưa đo không ghi đạt.
- Gate vẫn unresolved nếu mới có đề xuất, chưa có câu trả lời.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
python3 docs/ai-planning/verify_plan.py
```

**Manual verification:**

- Đọc quyết định và đối chiếu xác nhận thực của PO/người sở hữu.

### AI-T03 — Chốt môi trường triển khai

Epic E0 → Feature F-OPS → Story AI-ST-001. **P0 · XS · 1 SP** · SP-00 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Ghi ngân sách hosting/DB, public/private và người sở hữu tài khoản; chưa provision tài nguyên. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** Không có. **Decision/evidence gates:** `Q4`.

**Affected files (dự kiến):** `docs/decisions/hosting.md`.

**Implementation steps / subtasks:**

1. `AI-T03-S01` — Ghi ngân sách hosting/DB, public/private và người sở hữu tài khoản; chưa provision tài nguyên.
2. `AI-T03-S02` — Lưu quyết định, người xác nhận, thời điểm và tác động backlog; cập nhật gate tương ứng.

**Acceptance criteria:**

- Có ngân sách, môi trường staging, quản lý secrets, rollback và phạm vi cho phép triển khai.
- Gate vẫn unresolved nếu mới có đề xuất, chưa có câu trả lời.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
python3 docs/ai-planning/verify_plan.py
```

**Manual verification:**

- Đọc quyết định và đối chiếu xác nhận thực của PO/người sở hữu.

### AI-T04 — Chốt dữ liệu ẩn danh và vòng đời

Epic E0 → Feature F-OPS → Story AI-ST-001. **P0 · XS · 1 SP** · SP-00 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Xác nhận trường dữ liệu, retention, cách xóa tiến độ/sự kiện, quyền dùng tài nguyên và chính sách logging. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** Không có. **Decision/evidence gates:** `Q5`, `Q8-data`.

**Affected files (dự kiến):** `docs/decisions/data.md`.

**Implementation steps / subtasks:**

1. `AI-T04-S01` — Xác nhận trường dữ liệu, retention, cách xóa tiến độ/sự kiện, quyền dùng tài nguyên và chính sách logging.
2. `AI-T04-S02` — Lưu quyết định, người xác nhận, thời điểm và tác động backlog; cập nhật gate tương ứng.

**Acceptance criteria:**

- Không thu tên/email/IP thô trong event; có thời hạn lưu/xóa và nguồn giấy phép cần kiểm.
- Gate vẫn unresolved nếu mới có đề xuất, chưa có câu trả lời.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
python3 docs/ai-planning/verify_plan.py
```

**Manual verification:**

- Đọc quyết định và đối chiếu xác nhận thực của PO/người sở hữu.

### AI-T05 — Chốt nơi kiểm tra đáp án

Epic E0 → Feature F-OPS → Story AI-ST-001. **P0 · XS · 1 SP** · SP-00 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Chốt đánh giá ở client hoặc server và tập tương tác; nêu rõ hệ quả offline và lộ đáp án. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** Không có. **Decision/evidence gates:** `Q8-grading`, `Q9`.

**Affected files (dự kiến):** `docs/decisions/grading.md`.

**Implementation steps / subtasks:**

1. `AI-T05-S01` — Chốt đánh giá ở client hoặc server và tập tương tác; nêu rõ hệ quả offline và lộ đáp án.
2. `AI-T05-S02` — Lưu quyết định, người xác nhận, thời điểm và tác động backlog; cập nhật gate tương ứng.

**Acceptance criteria:**

- Có contract async, luật Unicode theo màn, offline behavior và quyết định sensor nằm ngoài hay trong scope.
- Gate vẫn unresolved nếu mới có đề xuất, chưa có câu trả lời.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
python3 docs/ai-planning/verify_plan.py
```

**Manual verification:**

- Đọc quyết định và đối chiếu xác nhận thực của PO/người sở hữu.

### AI-T06 — Chốt phong cách và nguồn đồ họa

Epic E0 → Feature F-OPS → Story AI-ST-001. **P0 · XS · 1 SP** · SP-00 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Chốt hình khối hay minh họa, nguồn GLB/font và chủ thể cung cấp hoặc tạo asset. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** Không có. **Decision/evidence gates:** `Q10`.

**Affected files (dự kiến):** `docs/decisions/art.md`.

**Implementation steps / subtasks:**

1. `AI-T06-S01` — Chốt hình khối hay minh họa, nguồn GLB/font và chủ thể cung cấp hoặc tạo asset.
2. `AI-T06-S02` — Lưu quyết định, người xác nhận, thời điểm và tác động backlog; cập nhật gate tương ứng.

**Acceptance criteria:**

- Có checklist phong cách, nguồn asset hợp lệ và người duyệt; không tự mua tài nguyên.
- Gate vẫn unresolved nếu mới có đề xuất, chưa có câu trả lời.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
python3 docs/ai-planning/verify_plan.py
```

**Manual verification:**

- Đọc quyết định và đối chiếu xác nhận thực của PO/người sở hữu.

### LL-001-T01 — Khởi tạo ứng dụng và khóa runtime

Epic E1 → Feature F-001 → Story LL-001. **P0 · XS · 1 SP** · SP-00 (đã nhận) · `in_review` / `ready`.

**Description:** Chọn phiên bản tương thích ở thời điểm thực thi, pin Node/package manager và Next.js; sinh lockfile. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** Không có. **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `package.json`, `package-lock.json`, `.nvmrc`, `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx`, `tsconfig.json`, `next.config.ts`.

**Implementation steps / subtasks:**

1. `LL-001-T01-S01` — Chọn phiên bản tương thích ở thời điểm thực thi, pin Node/package manager và Next.js; sinh lockfile.
2. `LL-001-T01-S02` — Tạo App Router TypeScript tối thiểu; metadata và html lang=vi; bỏ file mẫu không dùng.

**Acceptance criteria:**

- npm ci tái tạo dependency theo lockfile; build production thành công.
- Mở trang mẫu không có lỗi server/hydration; chưa tải Three.js.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm ci
npm run build
```

### LL-001-T02 — Thiết lập lint, format và typecheck

Epic E1 → Feature F-001 → Story LL-001. **P0 · XS · 1 SP** · SP-00 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Thêm lint, format:check, typecheck và scripts chạy không tương tác. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-001-T01](BACKLOG.md#ll-001-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `package.json`, `eslint.config.mjs`, `.prettierrc.json`.

**Implementation steps / subtasks:**

1. `LL-001-T02-S01` — Thêm lint, format:check, typecheck và scripts chạy không tương tác.
2. `LL-001-T02-S02` — Chạy trên scaffold và sửa lỗi cấu hình, tránh bỏ qua toàn bộ source.

**Acceptance criteria:**

- Ba script trả exit 0 trên scaffold.
- Một fixture lỗi tạm chứng minh lint/typecheck phát hiện lỗi; xóa fixture trước hoàn tất.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run format:check
npm run typecheck
```

### LL-001-T03 — Viết hướng dẫn clone sạch và env

Epic E1 → Feature F-001 → Story LL-001. **P0 · XS · 1 SP** · SP-00 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Viết cách cài/chạy/build, cấu trúc, nhánh/commit, public/server env; không chứa secret. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-001-T02](BACKLOG.md#ll-001-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `README.md`, `.env.example`, `docs/conventions.md`.

**Implementation steps / subtasks:**

1. `LL-001-T03-S01` — Viết cách cài/chạy/build, cấu trúc, nhánh/commit, public/server env; không chứa secret.
2. `LL-001-T03-S02` — Thử hướng dẫn từ bản sao sạch giữ nguyên lockfile; ghi lệnh và kết quả.

**Acceptance criteria:**

- Máy hoặc thư mục sạch chạy được theo README.
- README nêu script kiểm tra, biến môi trường và đường dẫn source có thật.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm ci
npm run build
npm run lint
npm run format:check
```

### AI-T07 — Khởi tạo test runner và fixture nghiệp vụ

Epic E0 → Feature F-OPS → Story AI-ST-002. **P0 · XS · 1 SP** · SP-00 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Cấu hình unit/component runner và test:unit; tạo fixture hợp lệ/sai cho contract màn. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-001-T03](BACKLOG.md#ll-001-t03). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `package.json`, `vitest.config.ts`, `tests/unit/setup.ts`, `tests/fixtures/levels.ts`.

**Implementation steps / subtasks:**

1. `AI-T07-S01` — Cấu hình unit/component runner và test:unit; tạo fixture hợp lệ/sai cho contract màn.
2. `AI-T07-S02` — Có test smoke của runner và fixture, không áp đặt phần trăm coverage chưa đo.

**Acceptance criteria:**

- Runner chạy không watch và fail khi assertion sai.
- Fixture không bị đóng gói thành nội dung production.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:unit -- --run
```

### AI-T08 — Thiết lập E2E và CI

Epic E0 → Feature F-OPS → Story AI-ST-002. **P0 · S · 2 SP** · SP-00 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Tạo test:e2e khởi động production app tự động; smoke trang mẫu. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T07](BACKLOG.md#ai-t07). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `package.json`, `playwright.config.ts`, `tests/e2e/shell.spec.ts`, `.github/workflows/ci.yml`.

**Implementation steps / subtasks:**

1. `AI-T08-S01` — Tạo test:e2e khởi động production app tự động; smoke trang mẫu.
2. `AI-T08-S02` — CI npm ci, lint, format, typecheck, unit, build, E2E; xuất report khi thất bại.

**Acceptance criteria:**

- CI hoặc chạy local tương đương đạt đủ bước; artifact lỗi truy cập được.
- Test E2E fail nếu server không chạy hoặc trang mẫu lỗi.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run format:check
npm run typecheck
npm run test:unit -- --run
npm run build
npm run test:e2e -- tests/e2e/shell.spec.ts
```

### LL-002-T01 — Cấu hình PostgreSQL và migration

Epic E1 → Feature F-002 → Story LL-002. **P0 · S · 2 SP** · SP-00 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Chọn một thư viện DB/migration bằng ADR ngắn; DB local qua compose, secrets qua env. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T07](BACKLOG.md#ai-t07), [LL-001-T03](BACKLOG.md#ll-001-t03). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `compose.yaml`, `src/server/db/client.ts`, `db/migrations/`, `package.json`, `.env.example`, `tests/integration/migrations.test.ts`.

**Implementation steps / subtasks:**

1. `LL-002-T01-S01` — Chọn một thư viện DB/migration bằng ADR ngắn; DB local qua compose, secrets qua env.
2. `LL-002-T01-S02` — Tạo migration probe, script db:migrate và test:integration với DB test riêng; kiểm tra chạy migration hai lần.

**Acceptance criteria:**

- DB rỗng migrate được và chạy lại không nhân đôi đối tượng.
- DB chỉ dùng ở server; test không chạm production.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
docker compose up -d db
npm run db:migrate
npm run db:migrate
npm run test:integration -- --run tests/integration/migrations.test.ts
```

### LL-002-T02 — Tạo health route kiểm tra DB

Epic E1 → Feature F-002 → Story LL-002. **P1 · XS · 1 SP** · SP-00 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Tạo health read/write có timeout, probe được dọn trong transaction. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-002-T01](BACKLOG.md#ll-002-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/app/api/health/route.ts`, `src/server/db/health.ts`, `tests/integration/health.test.ts`, `.github/workflows/ci.yml`.

**Implementation steps / subtasks:**

1. `LL-002-T02-S01` — Tạo health read/write có timeout, probe được dọn trong transaction.
2. `LL-002-T02-S02` — Trả ok hoặc 503 với lỗi đã che thông tin nhạy cảm; health không tích lũy bản ghi.
3. `LL-002-T02-S03` — Thêm CI integration với PostgreSQL test riêng, migration và health; pipeline không bỏ qua DB tests.

**Acceptance criteria:**

- DB sẵn sàng trả 200 sau read/write; DB mất kết nối trả 503.
- Không trả credentials/stack; probe không để lại dữ liệu.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:integration -- --run tests/integration/health.test.ts
npm run build
```

### LL-003-T01 — Chuẩn bị pipeline staging và rollback

Epic E1 → Feature F-003 → Story LL-003. **P1 · XS · 1 SP** · SP-03 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo pipeline theo hosting đã chốt, env template, migration trước app và rollback app. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T03](BACKLOG.md#ai-t03), [AI-T08](BACKLOG.md#ai-t08), [LL-001-T03](BACKLOG.md#ll-001-t03), [LL-002-T02](BACKLOG.md#ll-002-t02). **Decision/evidence gates:** `DEPLOY_ACCESS`.

**Affected files (dự kiến):** `docs/deployment.md`, `scripts/deploy-staging.mjs`, `.github/workflows/staging.yml`, `scripts/verify-deployed.mjs`.

**Implementation steps / subtasks:**

1. `LL-003-T01-S01` — Tạo pipeline theo hosting đã chốt, env template, migration trước app và rollback app.
2. `LL-003-T01-S02` — Document backup/khả năng rollback schema; không chạy lệnh deploy production hoặc mua dịch vụ.
3. `LL-003-T01-S03` — Tạo deployed verifier smoke/all-levels; khi staging đầu chỉ smoke app/DB, all-levels dùng khi đã có 25 màn.

**Acceptance criteria:**

- Một lệnh hoặc workflow triển khai tái lập; secrets qua môi trường.
- Dry run validate cấu hình và rollback; deployment thật cần quyền đã ghi.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run build
node scripts/deploy-staging.mjs --dry-run
```

### LL-003-T02 — Triển khai staging và smoke DB

Epic E1 → Feature F-003 → Story LL-003. **P1 · XS · 1 SP** · SP-03 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Dùng tài khoản được cấp triển khai staging và migration, ghi URL/revision. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-003-T01](BACKLOG.md#ll-003-t01). **Decision/evidence gates:** `DEPLOY_ACCESS`.

**Affected files (dự kiến):** `docs/evidence/LL-003-T02.md`, `docs/deployment.md`.

**Implementation steps / subtasks:**

1. `LL-003-T02-S01` — Dùng tài khoản được cấp triển khai staging và migration, ghi URL/revision.
2. `LL-003-T02-S02` — Thử trang chính Chrome/Safari mobile/desktop và API health; thử rollback ứng dụng.

**Acceptance criteria:**

- URL thực, DB read/write đạt và mapping revision tồn tại.
- Không đánh dấu done khi chỉ dry run hoặc chưa có Safari/thiết bị thật.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
node scripts/deploy-staging.mjs --execute
node scripts/verify-deployed.mjs --suite smoke
```

**Manual verification:**

- Mở URL trên Chrome/Safari máy tính và điện thoại; ghi model/browser.

### LL-004-T01 — Định nghĩa schema màn và validation

Epic E2 → Feature F-004 → Story LL-004. **P1 · S · 2 SP** · SP-01 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Định nghĩa id, ordinal, kind, prompt, mechanic, win condition và phiên bản schema theo discriminator 2D/3D. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T07](BACKLOG.md#ai-t07), [LL-001-T03](BACKLOG.md#ll-001-t03). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/domain/levels/schema.ts`, `src/domain/levels/types.ts`, `tests/unit/level-schema.test.ts`.

**Implementation steps / subtasks:**

1. `LL-004-T01-S01` — Định nghĩa id, ordinal, kind, prompt, mechanic, win condition và phiên bản schema theo discriminator 2D/3D.
2. `LL-004-T01-S02` — Validate trùng id/order, asset path, cấu hình đáp án; lỗi nêu id và field; fixture không phải màn thật.

**Acceptance criteria:**

- Dữ liệu hợp lệ qua, thiếu/sai loại/trùng ordinal bị từ chối với field cụ thể.
- Domain không import React, Next.js hay DB.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run typecheck
npm run test:unit -- --run
```

### LL-004-T02 — Viết LevelRepository và adapter repo

Epic E2 → Feature F-004 → Story LL-004. **P1 · S · 2 SP** · SP-01 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Tạo list/get với typed missing/invalid errors và adapter đọc file nội dung trong repo. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-004-T01](BACKLOG.md#ll-004-t01), [AI-T05](BACKLOG.md#ai-t05). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/domain/levels/repository.ts`, `src/server/levels/file-repository.ts`, `tests/unit/level-repository.test.ts`.

**Implementation steps / subtasks:**

1. `LL-004-T02-S01` — Tạo list/get với typed missing/invalid errors và adapter đọc file nội dung trong repo.
2. `LL-004-T02-S02` — Test adapter giả cùng contract, đảm bảo thay nguồn không sửa game domain.

**Acceptance criteria:**

- Get ordinal/id đúng, không có trả not-found phân biệt schema invalid.
- Hai adapter cùng contract; payload client không lộ lời giải khi quyết định server-grading.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run typecheck
npm run test:unit -- --run
```

### LL-004-T03 — Tạo route màn và mechanic registry

Epic E2 → Feature F-004 → Story LL-004. **P1 · XS · 1 SP** · SP-01 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Đăng ký mechanic theo kind/id, dùng lazy boundary cho 3D; route validate ordinal. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-004-T02](BACKLOG.md#ll-004-t02), [AI-T08](BACKLOG.md#ai-t08). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/app/levels/[ordinal]/page.tsx`, `src/app/levels/[ordinal]/not-found.tsx`, `src/features/game/mechanic-registry.ts`, `tests/e2e/level-routing.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-004-T03-S01` — Đăng ký mechanic theo kind/id, dùng lazy boundary cho 3D; route validate ordinal.
2. `LL-004-T03-S02` — Dùng hai fixture mechanic cho kiểm thử route; reject mechanic lạ; không công bố fixture như màn đã giao.

**Acceptance criteria:**

- Ordinal âm/NaN/không tồn tại hiện not-found; dữ liệu lỗi có recovery.
- Hai fixture khác cơ chế render qua registry; route 2D không kéo bundle 3D.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:unit -- --run
npm run test:e2e -- tests/e2e/level-routing.spec.ts
npm run build
```

### LL-005-T01 — Tạo máy trạng thái và contract đánh giá

Epic E2 → Feature F-005 → Story LL-005. **P1 · S · 2 SP** · SP-02 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Mô hình loading/playing/evaluating/wrong/won/error và transition reset/exit. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T05](BACKLOG.md#ai-t05), [AI-T07](BACKLOG.md#ai-t07), [LL-004-T03](BACKLOG.md#ll-004-t03). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/domain/game/machine.ts`, `src/domain/game/evaluator.ts`, `tests/unit/game-machine.test.ts`.

**Implementation steps / subtasks:**

1. `LL-005-T01-S01` — Mô hình loading/playing/evaluating/wrong/won/error và transition reset/exit.
2. `LL-005-T01-S02` — Evaluator hỗ trợ Promise; hủy/ignore response cũ khi reset, đổi màn hoặc unmount.

**Acceptance criteria:**

- Mỗi trạng thái có đường exit; sai cho retry, thắng không bị submit lặp.
- Race response từ màn cũ không làm thắng màn mới; async failure đi error.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run typecheck
npm run test:unit -- --run
```

### LL-005-T02 — Dựng khung chơi và controls

Epic E2 → Feature F-005 → Story LL-005. **P1 · S · 2 SP** · SP-02 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Nối state machine với prompt, ordinal, loading, chơi lại và về chọn màn. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-005-T01](BACKLOG.md#ll-005-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/game/GameShell.tsx`, `src/features/game/useGameSession.ts`, `tests/e2e/game-controls.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-005-T02-S01` — Nối state machine với prompt, ordinal, loading, chơi lại và về chọn màn.
2. `LL-005-T02-S02` — Giữ trạng thái qua resize; controls vẫn truy cập được khi evaluating/error.

**Acceptance criteria:**

- Chơi lại reset trạng thái mechanic; thoát hoạt động ở mọi trạng thái.
- Không reload trang khi thử sai; test bằng fixture độc lập nội dung.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/game-controls.spec.ts
npm run typecheck
```

### LL-005-T03 — Nối kết quả và điều hướng màn kế

Epic E2 → Feature F-005 → Story LL-005. **P1 · XS · 1 SP** · SP-02 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Hiện đúng/sai, màn kế theo ordinal repository, màn cuối về chọn màn. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-005-T02](BACKLOG.md#ll-005-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/game/ResultPanel.tsx`, `src/features/game/navigation.ts`, `tests/e2e/game-results.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-005-T03-S01` — Hiện đúng/sai, màn kế theo ordinal repository, màn cuối về chọn màn.
2. `LL-005-T03-S02` — Đo từ submit tới feedback với evaluator stub/async và profile 4G, ghi ràng buộc đã chốt.

**Acceptance criteria:**

- Sai thử lại ngay; thắng thấy feedback ≤1 giây trong profile đã thống nhất.
- Màn cuối không sinh route 26; callback thắng chỉ emit một lần.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/game-results.spec.ts
```

### LL-006-T01 — Tạo lưới chọn màn từ catalog

Epic E2 → Feature F-006 → Story LL-006. **P1 · S · 2 SP** · SP-02 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Sinh ô từ metadata repository, default all-open tại một policy. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-028-T02](BACKLOG.md#ll-028-t02), [AI-T08](BACKLOG.md#ai-t08), [LL-004-T03](BACKLOG.md#ll-004-t03). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/app/levels/page.tsx`, `src/features/levels/LevelGrid.tsx`, `src/domain/levels/access-policy.ts`, `tests/e2e/level-selection.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-006-T01-S01` — Sinh ô từ metadata repository, default all-open tại một policy.
2. `LL-006-T01-S02` — Kiểm tra fixtures thêm/bớt màn và catalog 25 dòng đã duyệt; không đánh dấu màn thiếu là chơi được.

**Acceptance criteria:**

- Catalog chính thức có 25 ordinal duy nhất và link đúng; policy all-open có test.
- Fixtures thay đổi số màn không đòi sửa JSX; màn chưa triển khai có trạng thái rõ ở staging.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/level-selection.spec.ts
```

### LL-007-T01 — Tạo định danh ẩn danh và bảng tiến độ

Epic E2 → Feature F-007 → Story LL-007. **P1 · XS · 1 SP** · SP-02 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Tạo player token ngẫu nhiên qua cookie server và bảng completed_levels với unique(player,level). Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T04](BACKLOG.md#ai-t04), [LL-002-T02](BACKLOG.md#ll-002-t02), [LL-005-T03](BACKLOG.md#ll-005-t03), [LL-006-T01](BACKLOG.md#ll-006-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `db/migrations/`, `src/server/progress/identity.ts`, `tests/integration/progress-schema.test.ts`.

**Implementation steps / subtasks:**

1. `LL-007-T01-S01` — Tạo player token ngẫu nhiên qua cookie server và bảng completed_levels với unique(player,level).
2. `LL-007-T01-S02` — Xác định retention và deletion cascade theo quyết định data; không tin player id tùy ý từ request body.

**Acceptance criteria:**

- Migration lặp an toàn, upsert cùng màn không tạo duplicate.
- Hai cookie player có dữ liệu tách biệt; không cần tài khoản.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run db:migrate
npm run test:integration -- --run tests/integration/progress-schema.test.ts
```

### LL-007-T02 — Tạo API tiến độ có validation

Epic E2 → Feature F-007 → Story LL-007. **P1 · S · 2 SP** · SP-02 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Implement GET và ghi completion idempotent; validate màn, payload, cookie, lỗi DB. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-007-T01](BACKLOG.md#ll-007-t01), [AI-T05](BACKLOG.md#ai-t05). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/app/api/progress/route.ts`, `src/server/progress/service.ts`, `tests/integration/progress-api.test.ts`.

**Implementation steps / subtasks:**

1. `LL-007-T02-S01` — Implement GET và ghi completion idempotent; validate màn, payload, cookie, lỗi DB.
2. `LL-007-T02-S02` — Nếu grading server: ghi thắng từ evaluator đáng tin; nếu client: ghi rõ không chống gian lận.

**Acceptance criteria:**

- Body sai/màn không tồn tại bị từ chối; DB lỗi trả typed status.
- Player A không đọc/ghi tiến độ B; POST lặp không nhân đôi completion.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:integration -- --run tests/integration/progress-api.test.ts
```

### LL-007-T03 — Đồng bộ tiến độ không chặn game

Epic E2 → Feature F-007 → Story LL-007. **P1 · S · 2 SP** · SP-02 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Fetch khi mở game, ghi khi thắng và cập nhật optimistic session cache. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-007-T02](BACKLOG.md#ll-007-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/progress/useProgress.ts`, `src/features/levels/LevelGrid.tsx`, `tests/e2e/progress.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-007-T03-S01` — Fetch khi mở game, ghi khi thắng và cập nhật optimistic session cache.
2. `LL-007-T03-S02` — Mạng lỗi giữ tiến độ trong phiên và banner không chặn; retry idempotent; không hứa lưu offline qua reload.

**Acceptance criteria:**

- Thắng rồi reload online còn dấu hoàn thành; player mới rỗng.
- POST fail không chặn màn kế, session vẫn hiện completed và retry không lặp dữ liệu.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/progress.spec.ts
```

### LL-008-T01 — So sánh prototype DOM/SVG và Canvas

Epic E3 → Feature F-008 → Story LL-008. **P1 · XS · 1 SP** · SP-01 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo hai prototype cùng tap/drag để so sánh chi phí, precision và FPS. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T08](BACKLOG.md#ai-t08), [LL-001-T03](BACKLOG.md#ll-001-t03). **Decision/evidence gates:** `DEVICE_ACCESS`.

**Affected files (dự kiến):** `src/app/lab/2d/page.tsx`, `src/features/lab/Prototype2D.tsx`, `docs/evidence/LL-008-T01.md`, `tests/e2e/prototype-2d.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-008-T01-S01` — Tạo hai prototype cùng tap/drag để so sánh chi phí, precision và FPS.
2. `LL-008-T01-S02` — Đo trên desktop và một điện thoại thật; đánh dấu lab không phải màn sản phẩm.

**Acceptance criteria:**

- Cả chuột và touch thao tác được; có model máy, browser, sai số và FPS.
- Chưa có máy thật thì giữ evidence thiếu và task chưa done.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run build
npm run test:e2e -- tests/e2e/prototype-2d.spec.ts
```

**Manual verification:**

- Thử drag/tap thực trên điện thoại và desktop; ngưỡng tạm ≥30 FPS.

### LL-008-T02 — Chốt ADR renderer 2D

Epic E3 → Feature F-008 → Story LL-008. **P1 · XS · 1 SP** · SP-01 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tổng hợp prototype thành ADR tối đa một trang: lựa chọn, lý do, hạn chế và cách đổi tọa độ. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-008-T01](BACKLOG.md#ll-008-t01). **Decision/evidence gates:** `RENDERER_APPROVAL`.

**Affected files (dự kiến):** `docs/adr/002-2d-renderer.md`.

**Implementation steps / subtasks:**

1. `LL-008-T02-S01` — Tổng hợp prototype thành ADR tối đa một trang: lựa chọn, lý do, hạn chế và cách đổi tọa độ.
2. `LL-008-T02-S02` — Lưu PO review trước khi sân chơi dùng implementation đã chọn.

**Acceptance criteria:**

- ADR dựa trên số đo và có PO xác nhận.
- Không coi DOM/SVG hay Canvas là kiến trúc hiện hữu trước quyết định.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
python3 docs/ai-planning/verify_plan.py
```

**Manual verification:**

- Đọc ADR và xác nhận của PO.

### LL-042-T01 — Tạo phép đổi tọa độ logic

Epic E3 → Feature F-042 → Story LL-042. **P1 · XS · 1 SP** · SP-02 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Tạo transform viewport/letterbox/scale sang tọa độ logic theo ADR. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-008-T02](BACKLOG.md#ll-008-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/domain/2d/coordinates.ts`, `tests/unit/coordinates.test.ts`.

**Implementation steps / subtasks:**

1. `LL-042-T01-S01` — Tạo transform viewport/letterbox/scale sang tọa độ logic theo ADR.
2. `LL-042-T01-S02` — Test điểm góc/tâm/offset ở bốn kích thước và sau resize.

**Acceptance criteria:**

- Sai số ≤2 đơn vị ở 360×640,768×1024,1366×768,1920×1080.
- Đổi viewport không mutate state puzzle; pointer ngoài sân bị xử lý xác định.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run typecheck
npm run test:unit -- --run
```

### LL-042-T02 — Tạo Stage2D và pointer adapter

Epic E3 → Feature F-042 → Story LL-042. **P1 · XS · 1 SP** · SP-02 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Áp dụng aspect ratio, pointer capture, cancel, touch-action trong sân theo renderer ADR. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-042-T01](BACKLOG.md#ll-042-t01), [AI-T08](BACKLOG.md#ai-t08). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/2d/Stage2D.tsx`, `src/features/2d/useStagePointer.ts`, `tests/e2e/stage-2d.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-042-T02-S01` — Áp dụng aspect ratio, pointer capture, cancel, touch-action trong sân theo renderer ADR.
2. `LL-042-T02-S02` — Gắn trang thử bốn viewport, resize và tọa độ logic.

**Acceptance criteria:**

- Không méo/tràn và không cuộn/zoom trang do drag trong sân.
- pointercancel/unmount không để vật bị giữ hay listener treo.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/stage-2d.spec.ts
```

### LL-043-T01 — Tạo normalizer đáp án tiếng Việt

Epic E3 → Feature F-043 → Story LL-043. **P1 · XS · 1 SP** · SP-03 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Chuẩn hóa Unicode, whitespace, case và vị trí dấu thanh; cấu hình giữ/bỏ dấu theo màn. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T07](BACKLOG.md#ai-t07), [AI-T05](BACKLOG.md#ai-t05), [LL-005-T03](BACKLOG.md#ll-005-t03), [LL-008-T02](BACKLOG.md#ll-008-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/domain/answers/normalize.ts`, `tests/unit/answer-normalization.test.ts`.

**Implementation steps / subtasks:**

1. `LL-043-T01-S01` — Chuẩn hóa Unicode, whitespace, case và vị trí dấu thanh; cấu hình giữ/bỏ dấu theo màn.
2. `LL-043-T01-S02` — Tạo ≥15 case có đ/Đ, NFC/NFD, hòa/hoà, chuỗi rỗng/dài và đáp án âm tính.

**Acceptance criteria:**

- Cấu hình accent-sensitive không chấp nhận chuỗi mất dấu ngoài danh sách alias.
- ≥15 case pass; chuỗi dài có giới hạn rõ, không gây lỗi hay treo.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run typecheck
npm run test:unit -- --run
```

### LL-043-T02 — Tạo mechanic nhập chữ

Epic E3 → Feature F-043 → Story LL-043. **P1 · XS · 1 SP** · SP-03 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Tạo input có label, submit và feedback qua evaluator; xử lý IME composition. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-043-T01](BACKLOG.md#ll-043-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/2d/mechanics/TextAnswer.tsx`, `tests/e2e/text-answer.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-043-T02-S01` — Tạo input có label, submit và feedback qua evaluator; xử lý IME composition.
2. `LL-043-T02-S02` — Nối accepted aliases và luật normalization trong schema, không đánh giá giữa lúc gõ dấu.

**Acceptance criteria:**

- Enter/button đúng với IME, rỗng có phản hồi rõ.
- Đáp án theo cấu hình màn; reset xóa input và kết quả cũ.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/text-answer.spec.ts
```

### LL-009-T01 — Tạo mechanic chạm và chọn đáp án

Epic E3 → Feature F-009 → Story LL-009. **P1 · XS · 1 SP** · SP-03 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Tạo hai mechanic dựa vào schema và evaluator chung, không hardcode màn. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-005-T03](BACKLOG.md#ll-005-t03), [LL-028-T02](BACKLOG.md#ll-028-t02), [LL-042-T02](BACKLOG.md#ll-042-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/2d/mechanics/TapTarget.tsx`, `src/features/2d/mechanics/Choice.tsx`, `tests/unit/tap-choice.test.tsx`.

**Implementation steps / subtasks:**

1. `LL-009-T01-S01` — Tạo hai mechanic dựa vào schema và evaluator chung, không hardcode màn.
2. `LL-009-T01-S02` — Nối wrong/win/reset và hỗ trợ chuột/touch.

**Acceptance criteria:**

- Đúng/sai phát qua contract; reset không còn selection cũ.
- Có fixture tap và choice độc lập, không copy logic đánh giá.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run typecheck
npm run test:unit -- --run
```

### LL-009-T02 — Tạo mechanic kéo thả

Epic E3 → Feature F-009 → Story LL-009. **P1 · S · 2 SP** · SP-03 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Dùng Stage2D pointer và hit area logic; drop ngoài vùng hoàn nguyên vật. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T01](BACKLOG.md#ll-009-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/2d/mechanics/DragDrop.tsx`, `tests/e2e/drag-drop.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-009-T02-S01` — Dùng Stage2D pointer và hit area logic; drop ngoài vùng hoàn nguyên vật.
2. `LL-009-T02-S02` — Hỗ trợ cancel/multi-pointer policy/reset, không lẫn camera 3D.

**Acceptance criteria:**

- Sai vật về chỗ, không mất vật hoặc mắc dragging sau pointercancel.
- Chuột và touch có kết quả giống nhau ở viewport nhỏ/lớn.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/drag-drop.spec.ts
```

### LL-009-T03 — Đăng ký demo và kiểm tra các mechanic 2D

Epic E3 → Feature F-009 → Story LL-009. **P1 · XS · 1 SP** · SP-03 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đăng ký tap/choice/drag, chạy demo qua shell thay vì component rời. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T02](BACKLOG.md#ll-009-t02). **Decision/evidence gates:** `DEVICE_ACCESS`.

**Affected files (dự kiến):** `src/features/game/mechanic-registry.ts`, `tests/e2e/mechanics-2d.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-009-T03-S01` — Đăng ký tap/choice/drag, chạy demo qua shell thay vì component rời.
2. `LL-009-T03-S02` — Ghi bằng chứng từng mechanic báo wrong/win và hoạt động với touch thật.

**Acceptance criteria:**

- Ba demo qua shell, sai thử lại và reset/exit đúng.
- Bằng chứng touch thật ghi thiết bị; mô phỏng touch không tính là máy thật.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/mechanics-2d.spec.ts
```

**Manual verification:**

- Kiểm tra tap/drag/choice trên điện thoại.

### LL-010-T01 — Triển khai màn 2D-01

Epic E3 → Feature F-010 → Story LL-010. **P1 · S · 2 SP** · SP-04 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-01; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-029-T05](BACKLOG.md#ll-029-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-01.json`, `src/features/2d/levels/2d-01.tsx`, `tests/e2e/levels/2d-01.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-010-T01-S01` — Đọc kịch bản và asset đã duyệt cho 2d-01; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-010-T01-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-010-T01-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-01 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-01.spec.ts
```

### LL-010-T02 — Triển khai màn 2D-02

Epic E3 → Feature F-010 → Story LL-010. **P1 · S · 2 SP** · SP-04 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-02; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-029-T05](BACKLOG.md#ll-029-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-02.json`, `src/features/2d/levels/2d-02.tsx`, `tests/e2e/levels/2d-02.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-010-T02-S01` — Đọc kịch bản và asset đã duyệt cho 2d-02; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-010-T02-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-010-T02-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-02 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-02.spec.ts
```

### LL-010-T03 — Triển khai màn 2D-03

Epic E3 → Feature F-010 → Story LL-010. **P1 · S · 2 SP** · SP-04 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-03; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-029-T05](BACKLOG.md#ll-029-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-03.json`, `src/features/2d/levels/2d-03.tsx`, `tests/e2e/levels/2d-03.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-010-T03-S01` — Đọc kịch bản và asset đã duyệt cho 2d-03; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-010-T03-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-010-T03-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-03 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-03.spec.ts
```

### LL-010-T04 — Triển khai màn 2D-04

Epic E3 → Feature F-010 → Story LL-010. **P1 · S · 2 SP** · SP-04 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-04; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-029-T05](BACKLOG.md#ll-029-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-04.json`, `src/features/2d/levels/2d-04.tsx`, `tests/e2e/levels/2d-04.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-010-T04-S01` — Đọc kịch bản và asset đã duyệt cho 2d-04; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-010-T04-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-010-T04-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-04 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-04.spec.ts
```

### LL-010-T05 — Triển khai màn 2D-05

Epic E3 → Feature F-010 → Story LL-010. **P1 · S · 2 SP** · SP-04 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-05; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-029-T05](BACKLOG.md#ll-029-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-05.json`, `src/features/2d/levels/2d-05.tsx`, `tests/e2e/levels/2d-05.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-010-T05-S01` — Đọc kịch bản và asset đã duyệt cho 2d-05; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-010-T05-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-010-T05-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-05 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-05.spec.ts
```

### LL-011-T01 — Triển khai màn 2D-06

Epic E3 → Feature F-011 → Story LL-011. **P1 · S · 2 SP** · SP-06 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-06; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-030-T05](BACKLOG.md#ll-030-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-06.json`, `src/features/2d/levels/2d-06.tsx`, `tests/e2e/levels/2d-06.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-011-T01-S01` — Đọc kịch bản và asset đã duyệt cho 2d-06; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-011-T01-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-011-T01-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-06 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-06.spec.ts
```

### LL-011-T02 — Triển khai màn 2D-07

Epic E3 → Feature F-011 → Story LL-011. **P1 · S · 2 SP** · SP-06 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-07; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-030-T05](BACKLOG.md#ll-030-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-07.json`, `src/features/2d/levels/2d-07.tsx`, `tests/e2e/levels/2d-07.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-011-T02-S01` — Đọc kịch bản và asset đã duyệt cho 2d-07; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-011-T02-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-011-T02-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-07 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-07.spec.ts
```

### LL-011-T03 — Triển khai màn 2D-08

Epic E3 → Feature F-011 → Story LL-011. **P1 · S · 2 SP** · SP-06 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-08; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-030-T05](BACKLOG.md#ll-030-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-08.json`, `src/features/2d/levels/2d-08.tsx`, `tests/e2e/levels/2d-08.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-011-T03-S01` — Đọc kịch bản và asset đã duyệt cho 2d-08; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-011-T03-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-011-T03-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-08 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-08.spec.ts
```

### LL-011-T04 — Triển khai màn 2D-09

Epic E3 → Feature F-011 → Story LL-011. **P1 · S · 2 SP** · SP-06 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-09; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-030-T05](BACKLOG.md#ll-030-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-09.json`, `src/features/2d/levels/2d-09.tsx`, `tests/e2e/levels/2d-09.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-011-T04-S01` — Đọc kịch bản và asset đã duyệt cho 2d-09; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-011-T04-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-011-T04-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-09 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-09.spec.ts
```

### LL-011-T05 — Triển khai màn 2D-10

Epic E3 → Feature F-011 → Story LL-011. **P1 · S · 2 SP** · SP-06 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-10; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-030-T05](BACKLOG.md#ll-030-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-10.json`, `src/features/2d/levels/2d-10.tsx`, `tests/e2e/levels/2d-10.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-011-T05-S01` — Đọc kịch bản và asset đã duyệt cho 2d-10; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-011-T05-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-011-T05-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-10 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-10.spec.ts
```

### LL-012-T01 — Triển khai màn 2D-11

Epic E3 → Feature F-012 → Story LL-012. **P1 · S · 2 SP** · SP-07 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-11; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-031-T05](BACKLOG.md#ll-031-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-11.json`, `src/features/2d/levels/2d-11.tsx`, `tests/e2e/levels/2d-11.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-012-T01-S01` — Đọc kịch bản và asset đã duyệt cho 2d-11; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-012-T01-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-012-T01-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-11 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-11.spec.ts
```

### LL-012-T02 — Triển khai màn 2D-12

Epic E3 → Feature F-012 → Story LL-012. **P1 · S · 2 SP** · SP-07 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-12; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-031-T05](BACKLOG.md#ll-031-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-12.json`, `src/features/2d/levels/2d-12.tsx`, `tests/e2e/levels/2d-12.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-012-T02-S01` — Đọc kịch bản và asset đã duyệt cho 2d-12; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-012-T02-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-012-T02-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-12 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-12.spec.ts
```

### LL-012-T03 — Triển khai màn 2D-13

Epic E3 → Feature F-012 → Story LL-012. **P1 · S · 2 SP** · SP-07 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-13; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-031-T05](BACKLOG.md#ll-031-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-13.json`, `src/features/2d/levels/2d-13.tsx`, `tests/e2e/levels/2d-13.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-012-T03-S01` — Đọc kịch bản và asset đã duyệt cho 2d-13; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-012-T03-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-012-T03-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-13 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-13.spec.ts
```

### LL-012-T04 — Triển khai màn 2D-14

Epic E3 → Feature F-012 → Story LL-012. **P1 · S · 2 SP** · SP-07 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-14; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-031-T05](BACKLOG.md#ll-031-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-14.json`, `src/features/2d/levels/2d-14.tsx`, `tests/e2e/levels/2d-14.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-012-T04-S01` — Đọc kịch bản và asset đã duyệt cho 2d-14; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-012-T04-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-012-T04-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-14 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-14.spec.ts
```

### LL-012-T05 — Triển khai màn 2D-15

Epic E3 → Feature F-012 → Story LL-012. **P1 · S · 2 SP** · SP-07 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-15; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-031-T05](BACKLOG.md#ll-031-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-15.json`, `src/features/2d/levels/2d-15.tsx`, `tests/e2e/levels/2d-15.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-012-T05-S01` — Đọc kịch bản và asset đã duyệt cho 2d-15; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-012-T05-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-012-T05-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-15 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-15.spec.ts
```

### LL-013-T01 — Triển khai màn 2D-16

Epic E3 → Feature F-013 → Story LL-013. **P1 · S · 2 SP** · SP-09 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-16; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-032-T05](BACKLOG.md#ll-032-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-16.json`, `src/features/2d/levels/2d-16.tsx`, `tests/e2e/levels/2d-16.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-013-T01-S01` — Đọc kịch bản và asset đã duyệt cho 2d-16; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-013-T01-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-013-T01-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-16 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-16.spec.ts
```

### LL-013-T02 — Triển khai màn 2D-17

Epic E3 → Feature F-013 → Story LL-013. **P1 · S · 2 SP** · SP-09 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-17; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-032-T05](BACKLOG.md#ll-032-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-17.json`, `src/features/2d/levels/2d-17.tsx`, `tests/e2e/levels/2d-17.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-013-T02-S01` — Đọc kịch bản và asset đã duyệt cho 2d-17; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-013-T02-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-013-T02-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-17 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-17.spec.ts
```

### LL-013-T03 — Triển khai màn 2D-18

Epic E3 → Feature F-013 → Story LL-013. **P1 · S · 2 SP** · SP-09 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-18; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-032-T05](BACKLOG.md#ll-032-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-18.json`, `src/features/2d/levels/2d-18.tsx`, `tests/e2e/levels/2d-18.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-013-T03-S01` — Đọc kịch bản và asset đã duyệt cho 2d-18; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-013-T03-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-013-T03-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-18 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-18.spec.ts
```

### LL-013-T04 — Triển khai màn 2D-19

Epic E3 → Feature F-013 → Story LL-013. **P1 · S · 2 SP** · SP-09 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-19; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-032-T05](BACKLOG.md#ll-032-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-19.json`, `src/features/2d/levels/2d-19.tsx`, `tests/e2e/levels/2d-19.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-013-T04-S01` — Đọc kịch bản và asset đã duyệt cho 2d-19; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-013-T04-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-013-T04-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-19 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-19.spec.ts
```

### LL-013-T05 — Triển khai màn 2D-20

Epic E3 → Feature F-013 → Story LL-013. **P1 · S · 2 SP** · SP-09 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc kịch bản và asset đã duyệt cho 2d-20; cấu hình mechanic đã có, không tự nghĩ lời giải. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-009-T03](BACKLOG.md#ll-009-t03), [LL-032-T05](BACKLOG.md#ll-032-t05), [LL-043-T02](BACKLOG.md#ll-043-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/2d-20.json`, `src/features/2d/levels/2d-20.tsx`, `tests/e2e/levels/2d-20.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-013-T05-S01` — Đọc kịch bản và asset đã duyệt cho 2d-20; cấu hình mechanic đã có, không tự nghĩ lời giải.
2. `LL-013-T05-S02` — Nối registry, prompt, wrong/win/reset/exit; chỉ tạo component riêng nếu kịch bản cần.
3. `LL-013-T05-S03` — Kiểm tra đúng, ≥3 thao tác sai/lạ và viewport 360×640,1366×768; cơ chế mới cần task riêng.

**Acceptance criteria:**

- Màn 2d-20 thắng được theo kịch bản, sai thử lại, không tràn và đúng assets/đáp án.
- Reset/exit/màn kế qua shell; kết quả khớp script; không dùng placeholder như nội dung chính thức.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:e2e -- tests/e2e/levels/2d-20.spec.ts
```

### LL-014-T01 — Tạo scene Three.js chỉ chạy phía client

Epic E4 → Feature F-014 → Story LL-014. **P1 · S · 2 SP** · SP-01 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Tải động Three.js sau client boundary, cảnh mẫu camera/ánh sáng/khối. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T08](BACKLOG.md#ai-t08), [LL-001-T03](BACKLOG.md#ll-001-t03). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/app/lab/3d/page.tsx`, `src/features/3d/SceneHost.tsx`, `src/features/3d/create-scene.ts`, `tests/e2e/scene-host.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-014-T01-S01` — Tải động Three.js sau client boundary, cảnh mẫu camera/ánh sáng/khối.
2. `LL-014-T01-S02` — Render loop và resize theo container; phát hiện WebGL và UI thay thế.

**Acceptance criteria:**

- Build SSR không đọc window/document; client render không hydration error.
- Resize/xoay không méo; không WebGL có thông báo và đường thoát.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run build
npm run test:e2e -- tests/e2e/scene-host.spec.ts
```

### LL-014-T02 — Quản lý lifecycle và giải phóng 3D

Epic E4 → Feature F-014 → Story LL-014. **P1 · XS · 1 SP** · SP-01 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Hủy RAF/listener, dispose geometry/material/texture/renderer khi unmount; xác định ownership với cache. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-014-T01](BACKLOG.md#ll-014-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/3d/dispose-scene.ts`, `src/features/3d/SceneHost.tsx`, `tests/e2e/scene-lifecycle.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-014-T02-S01` — Hủy RAF/listener, dispose geometry/material/texture/renderer khi unmount; xác định ownership với cache.
2. `LL-014-T02-S02` — Đo heap sau warmup/GC cùng quy trình cho 20 vòng mount/unmount.

**Acceptance criteria:**

- 20 vòng heap tăng ≤10% theo quy trình ghi; không vòng render/listener nhân đôi.
- Không dispose asset dùng chung khi còn consumer, không che memory leak bằng reload trang.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/scene-lifecycle.spec.ts
```

### LL-014-T03 — Ghi số đo cảnh 3D trên thiết bị thật

Epic E4 → Feature F-014 → Story LL-014. **P1 · XS · 1 SP** · SP-01 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Chạy scene mẫu trên ≥1 điện thoại thật, ghi FPS, heap, browser, nhiệt/trạng thái chạy. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-014-T02](BACKLOG.md#ll-014-t02), [AI-T02](BACKLOG.md#ai-t02). **Decision/evidence gates:** `DEVICE_ACCESS`.

**Affected files (dự kiến):** `docs/evidence/LL-014-T03.md`, `tests/e2e/scene-host.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-014-T03-S01` — Chạy scene mẫu trên ≥1 điện thoại thật, ghi FPS, heap, browser, nhiệt/trạng thái chạy.
2. `LL-014-T03-S02` — Kiểm tra resize, WebGL fallback và đối chiếu giới hạn của đo DevTools.

**Acceptance criteria:**

- Có số đo thật và log 20 vòng lifecycle; không thay giả lập thành bằng chứng máy thật.
- Báo cáo chỉ kết luận scene mẫu, không suy ra 5 màn đã đạt.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run build
npm run test:e2e -- tests/e2e/scene-host.spec.ts
```

**Manual verification:**

- Đo scene mẫu trên điện thoại thật và lưu report.

### LL-015-T01 — Tạo picking và vùng chạm 3D

Epic E4 → Feature F-015 → Story LL-015. **P1 · XS · 1 SP** · SP-03 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Raycast chọn vật, tạo vùng hit tối thiểu 44×44px theo camera/viewport. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-005-T03](BACKLOG.md#ll-005-t03), [LL-014-T03](BACKLOG.md#ll-014-t03), [LL-028-T02](BACKLOG.md#ll-028-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/3d/interactions/picking.ts`, `tests/unit/picking.test.ts`.

**Implementation steps / subtasks:**

1. `LL-015-T01-S01` — Raycast chọn vật, tạo vùng hit tối thiểu 44×44px theo camera/viewport.
2. `LL-015-T01-S02` — Highlight selection, dùng object id từ manifest thay vì tên tùy ý.

**Acceptance criteria:**

- Chuột/touch chọn đúng vật, vật nhỏ vẫn đủ vùng hit.
- Object bị che/khuất tuân thủ rule ghi trong script.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run typecheck
npm run test:unit -- --run
```

### LL-015-T02 — Tạo điều khiển camera giới hạn

Epic E4 → Feature F-015 → Story LL-015. **P1 · XS · 1 SP** · SP-03 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Nối rotate/zoom với chuột và touch, góc/khoảng cách theo config màn. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-015-T01](BACKLOG.md#ll-015-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/3d/interactions/camera-controls.ts`, `tests/e2e/camera-controls.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-015-T02-S01` — Nối rotate/zoom với chuột và touch, góc/khoảng cách theo config màn.
2. `LL-015-T02-S02` — Chặn thao tác sân 3D làm cuộn/zoom trang; reset camera theo kịch bản.

**Acceptance criteria:**

- Một ngón xoay/hai ngón zoom, wheel/drag hoạt động.
- Không vượt góc/khoảng cách; listener dọn khi exit.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/camera-controls.spec.ts
```

### LL-015-T03 — Nối kéo vật 3D với game shell

Epic E4 → Feature F-015 → Story LL-015. **P1 · S · 2 SP** · SP-03 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo drag plane/quy tắc kéo vật ưu tiên camera; pointer cancel và reset. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-015-T02](BACKLOG.md#ll-015-t02). **Decision/evidence gates:** `DEVICE_ACCESS`.

**Affected files (dự kiến):** `src/features/3d/interactions/drag-controller.ts`, `src/features/3d/ThreeMechanic.tsx`, `tests/e2e/mechanics-3d.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-015-T03-S01` — Tạo drag plane/quy tắc kéo vật ưu tiên camera; pointer cancel và reset.
2. `LL-015-T03-S02` — Nối sự kiện tới evaluator async và shell, kiểm tra trên chuột/touch thật.

**Acceptance criteria:**

- Kéo vật không xoay camera ngoài ý muốn; sai cho retry, thắng qua shell.
- Thoát/reset không giữ vật và không còn event cũ; có touch evidence.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/mechanics-3d.spec.ts
```

**Manual verification:**

- Thử drag/pick/camera trên điện thoại và desktop.

### LL-016-T01 — Chốt ngân sách hiệu năng và tài nguyên 3D

Epic E4 → Feature F-016 → Story LL-016. **P1 · XS · 1 SP** · SP-02 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Dựa trên scene spike và thiết bị mục tiêu đề xuất FPS, MB/màn, polygons, draw calls, DPR. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T02](BACKLOG.md#ai-t02), [LL-014-T03](BACKLOG.md#ll-014-t03), [AI-T06](BACKLOG.md#ai-t06). **Decision/evidence gates:** `BUDGET_APPROVAL`.

**Affected files (dự kiến):** `docs/performance/3d-budget.json`, `docs/performance/3d-budget.md`.

**Implementation steps / subtasks:**

1. `LL-016-T01-S01` — Dựa trên scene spike và thiết bị mục tiêu đề xuất FPS, MB/màn, polygons, draw calls, DPR.
2. `LL-016-T01-S02` — Ghi giá trị số duy nhất trong JSON, PO + ART3D duyệt; chưa coi ≥30FPS tạm là ngân sách cuối.

**Acceptance criteria:**

- Tất cả chỉ số có số, đơn vị, profile đo và người duyệt.
- Các màn/models dùng cùng tệp budget; thiếu quyết định giữ gate.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
python3 -m json.tool docs/performance/3d-budget.json
```

**Manual verification:**

- PO + ART3D xác nhận ngân sách.

### LL-016-T02 — Tạo glTF loader, cache và ownership

Epic E4 → Feature F-016 → Story LL-016. **P1 · S · 2 SP** · SP-02 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Nạp glTF/GLB/texture, dedupe request và cache có ref count/eviction. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-016-T01](BACKLOG.md#ll-016-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/3d/assets/loader.ts`, `src/features/3d/assets/cache.ts`, `tests/unit/asset-cache.test.ts`, `scripts/check-assets.mjs`, `package.json`.

**Implementation steps / subtasks:**

1. `LL-016-T02-S01` — Nạp glTF/GLB/texture, dedupe request và cache có ref count/eviction.
2. `LL-016-T02-S02` — Quy định cloning/dispose để chơi lại không fetch lại và rời scene không leak.
3. `LL-016-T02-S03` — Thêm assets:check cho manifest 2D/3D; model task mở rộng GLB stats thay vì tạo script cạnh tranh.

**Acceptance criteria:**

- Replay cùng màn dùng cache, hai consumer không tải hai lần.
- Consumer cuối giải phóng/evict đúng chính sách; lỗi không cache vĩnh viễn.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run typecheck
npm run test:unit -- --run
```

### LL-016-T03 — Tạo loading progress và retry tài nguyên

Epic E4 → Feature F-016 → Story LL-016. **P1 · XS · 1 SP** · SP-02 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Hiển thị tiến trình có mẫu số đáng tin hoặc trạng thái indeterminate; ẩn khi ready. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-016-T02](BACKLOG.md#ll-016-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/3d/assets/LoadingPanel.tsx`, `tests/e2e/asset-loading.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-016-T03-S01` — Hiển thị tiến trình có mẫu số đáng tin hoặc trạng thái indeterminate; ẩn khi ready.
2. `LL-016-T03-S02` — Xử lý mạng chậm, 404, decode error, retry và exit trước khi load xong.

**Acceptance criteria:**

- Lỗi có retry/exit; retry thành công vào scene, stale load không remount scene đã thoát.
- Khi có byte total hiển thị % đúng, thiếu total không hiển thị % giả.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/asset-loading.spec.ts
```

### LL-017-T01 — Dựng cảnh màn 3D-01

Epic E4 → Feature F-017 → Story LL-017. **P1 · S · 2 SP** · SP-05 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc script/model đã duyệt, bố trí scene/camera/object ids theo manifest. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-015-T03](BACKLOG.md#ll-015-t03), [LL-016-T03](BACKLOG.md#ll-016-t03), [LL-034-T02](BACKLOG.md#ll-034-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/3d-01.json`, `src/features/3d/levels/3d-01.ts`.

**Implementation steps / subtasks:**

1. `LL-017-T01-S01` — Đọc script/model đã duyệt, bố trí scene/camera/object ids theo manifest.
2. `LL-017-T01-S02` — Nối loader và SceneHost, validate metadata và giới hạn camera; không thêm interaction mới ngầm.

**Acceptance criteria:**

- Bố trí đúng script, asset names khớp và không có model placeholder.
- Mở/thoát/replay không lỗi load, scene trong budget file.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check -- --level 3d-01
npm run build
```

### LL-017-T02 — Cài logic thắng sai màn 3D-01

Epic E4 → Feature F-017 → Story LL-017. **P1 · S · 2 SP** · SP-05 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Áp tương tác đã duyệt và điều kiện thắng/sai qua contract, dùng pick/drag/camera dùng chung. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-017-T01](BACKLOG.md#ll-017-t01). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `src/features/3d/levels/3d-01.ts`, `tests/unit/levels/3d-01.test.ts`.

**Implementation steps / subtasks:**

1. `LL-017-T02-S01` — Áp tương tác đã duyệt và điều kiện thắng/sai qua contract, dùng pick/drag/camera dùng chung.
2. `LL-017-T02-S02` — Bổ sung reset, cancel, stale async; mechanic mới phải chia task riêng trước khi code.

**Acceptance criteria:**

- Đúng/sai khớp script, không hardcode callback thắng ngoài evaluator.
- Reset hoàn nguyên vật/camera và tiến trình; không tạo lời giải mới.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run typecheck
npm run test:unit -- --run
```

### LL-017-T03 — Kiểm chứng và hiệu chỉnh màn 3D-01

Epic E4 → Feature F-017 → Story LL-017. **P1 · XS · 1 SP** · SP-05 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Chạy đúng/≥3 sai, reset/exit/màn kế, tinh chỉnh vùng chạm trên desktop/điện thoại. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-017-T02](BACKLOG.md#ll-017-t02). **Decision/evidence gates:** `DEVICE_ACCESS`.

**Affected files (dự kiến):** `tests/e2e/levels/3d-01.spec.ts`, `docs/evidence/LL-017-T03.md`.

**Implementation steps / subtasks:**

1. `LL-017-T03-S01` — Chạy đúng/≥3 sai, reset/exit/màn kế, tinh chỉnh vùng chạm trên desktop/điện thoại.
2. `LL-017-T03-S02` — Đo FPS/MB/poly/draw calls theo budget; ghi model máy, profile và kết quả.

**Acceptance criteria:**

- End-to-end thắng được, sai thử lại, không lỗi console và không tài nguyên treo.
- Budget đạt trên thiết bị tham chiếu; nếu chưa đạt tạo defect và task giữ chưa done.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/levels/3d-01.spec.ts
npm run assets:check -- --level 3d-01
```

**Manual verification:**

- Đo cảnh 3d-01 trên thiết bị tham chiếu thật.

### LL-018-T01 — Dựng cảnh màn 3D-02

Epic E4 → Feature F-018 → Story LL-018. **P1 · S · 2 SP** · SP-06 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc script/model đã duyệt, bố trí scene/camera/object ids theo manifest. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-015-T03](BACKLOG.md#ll-015-t03), [LL-016-T03](BACKLOG.md#ll-016-t03), [LL-045-T02](BACKLOG.md#ll-045-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/3d-02.json`, `src/features/3d/levels/3d-02.ts`.

**Implementation steps / subtasks:**

1. `LL-018-T01-S01` — Đọc script/model đã duyệt, bố trí scene/camera/object ids theo manifest.
2. `LL-018-T01-S02` — Nối loader và SceneHost, validate metadata và giới hạn camera; không thêm interaction mới ngầm.

**Acceptance criteria:**

- Bố trí đúng script, asset names khớp và không có model placeholder.
- Mở/thoát/replay không lỗi load, scene trong budget file.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check -- --level 3d-02
npm run build
```

### LL-018-T02 — Cài logic thắng sai màn 3D-02

Epic E4 → Feature F-018 → Story LL-018. **P1 · S · 2 SP** · SP-06 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Áp tương tác đã duyệt và điều kiện thắng/sai qua contract, dùng pick/drag/camera dùng chung. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-018-T01](BACKLOG.md#ll-018-t01). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `src/features/3d/levels/3d-02.ts`, `tests/unit/levels/3d-02.test.ts`.

**Implementation steps / subtasks:**

1. `LL-018-T02-S01` — Áp tương tác đã duyệt và điều kiện thắng/sai qua contract, dùng pick/drag/camera dùng chung.
2. `LL-018-T02-S02` — Bổ sung reset, cancel, stale async; mechanic mới phải chia task riêng trước khi code.

**Acceptance criteria:**

- Đúng/sai khớp script, không hardcode callback thắng ngoài evaluator.
- Reset hoàn nguyên vật/camera và tiến trình; không tạo lời giải mới.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run typecheck
npm run test:unit -- --run
```

### LL-018-T03 — Kiểm chứng và hiệu chỉnh màn 3D-02

Epic E4 → Feature F-018 → Story LL-018. **P1 · XS · 1 SP** · SP-06 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Chạy đúng/≥3 sai, reset/exit/màn kế, tinh chỉnh vùng chạm trên desktop/điện thoại. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-018-T02](BACKLOG.md#ll-018-t02). **Decision/evidence gates:** `DEVICE_ACCESS`.

**Affected files (dự kiến):** `tests/e2e/levels/3d-02.spec.ts`, `docs/evidence/LL-018-T03.md`.

**Implementation steps / subtasks:**

1. `LL-018-T03-S01` — Chạy đúng/≥3 sai, reset/exit/màn kế, tinh chỉnh vùng chạm trên desktop/điện thoại.
2. `LL-018-T03-S02` — Đo FPS/MB/poly/draw calls theo budget; ghi model máy, profile và kết quả.

**Acceptance criteria:**

- End-to-end thắng được, sai thử lại, không lỗi console và không tài nguyên treo.
- Budget đạt trên thiết bị tham chiếu; nếu chưa đạt tạo defect và task giữ chưa done.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/levels/3d-02.spec.ts
npm run assets:check -- --level 3d-02
```

**Manual verification:**

- Đo cảnh 3d-02 trên thiết bị tham chiếu thật.

### LL-019-T01 — Dựng cảnh màn 3D-03

Epic E4 → Feature F-019 → Story LL-019. **P1 · S · 2 SP** · SP-08 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc script/model đã duyệt, bố trí scene/camera/object ids theo manifest. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-015-T03](BACKLOG.md#ll-015-t03), [LL-016-T03](BACKLOG.md#ll-016-t03), [LL-046-T02](BACKLOG.md#ll-046-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/3d-03.json`, `src/features/3d/levels/3d-03.ts`.

**Implementation steps / subtasks:**

1. `LL-019-T01-S01` — Đọc script/model đã duyệt, bố trí scene/camera/object ids theo manifest.
2. `LL-019-T01-S02` — Nối loader và SceneHost, validate metadata và giới hạn camera; không thêm interaction mới ngầm.

**Acceptance criteria:**

- Bố trí đúng script, asset names khớp và không có model placeholder.
- Mở/thoát/replay không lỗi load, scene trong budget file.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check -- --level 3d-03
npm run build
```

### LL-019-T02 — Cài logic thắng sai màn 3D-03

Epic E4 → Feature F-019 → Story LL-019. **P1 · S · 2 SP** · SP-08 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Áp tương tác đã duyệt và điều kiện thắng/sai qua contract, dùng pick/drag/camera dùng chung. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-019-T01](BACKLOG.md#ll-019-t01). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `src/features/3d/levels/3d-03.ts`, `tests/unit/levels/3d-03.test.ts`.

**Implementation steps / subtasks:**

1. `LL-019-T02-S01` — Áp tương tác đã duyệt và điều kiện thắng/sai qua contract, dùng pick/drag/camera dùng chung.
2. `LL-019-T02-S02` — Bổ sung reset, cancel, stale async; mechanic mới phải chia task riêng trước khi code.

**Acceptance criteria:**

- Đúng/sai khớp script, không hardcode callback thắng ngoài evaluator.
- Reset hoàn nguyên vật/camera và tiến trình; không tạo lời giải mới.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run typecheck
npm run test:unit -- --run
```

### LL-019-T03 — Kiểm chứng và hiệu chỉnh màn 3D-03

Epic E4 → Feature F-019 → Story LL-019. **P1 · XS · 1 SP** · SP-08 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Chạy đúng/≥3 sai, reset/exit/màn kế, tinh chỉnh vùng chạm trên desktop/điện thoại. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-019-T02](BACKLOG.md#ll-019-t02). **Decision/evidence gates:** `DEVICE_ACCESS`.

**Affected files (dự kiến):** `tests/e2e/levels/3d-03.spec.ts`, `docs/evidence/LL-019-T03.md`.

**Implementation steps / subtasks:**

1. `LL-019-T03-S01` — Chạy đúng/≥3 sai, reset/exit/màn kế, tinh chỉnh vùng chạm trên desktop/điện thoại.
2. `LL-019-T03-S02` — Đo FPS/MB/poly/draw calls theo budget; ghi model máy, profile và kết quả.

**Acceptance criteria:**

- End-to-end thắng được, sai thử lại, không lỗi console và không tài nguyên treo.
- Budget đạt trên thiết bị tham chiếu; nếu chưa đạt tạo defect và task giữ chưa done.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/levels/3d-03.spec.ts
npm run assets:check -- --level 3d-03
```

**Manual verification:**

- Đo cảnh 3d-03 trên thiết bị tham chiếu thật.

### LL-020-T01 — Dựng cảnh màn 3D-04

Epic E4 → Feature F-020 → Story LL-020. **P1 · S · 2 SP** · SP-08 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc script/model đã duyệt, bố trí scene/camera/object ids theo manifest. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-015-T03](BACKLOG.md#ll-015-t03), [LL-016-T03](BACKLOG.md#ll-016-t03), [LL-035-T02](BACKLOG.md#ll-035-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/3d-04.json`, `src/features/3d/levels/3d-04.ts`.

**Implementation steps / subtasks:**

1. `LL-020-T01-S01` — Đọc script/model đã duyệt, bố trí scene/camera/object ids theo manifest.
2. `LL-020-T01-S02` — Nối loader và SceneHost, validate metadata và giới hạn camera; không thêm interaction mới ngầm.

**Acceptance criteria:**

- Bố trí đúng script, asset names khớp và không có model placeholder.
- Mở/thoát/replay không lỗi load, scene trong budget file.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check -- --level 3d-04
npm run build
```

### LL-020-T02 — Cài logic thắng sai màn 3D-04

Epic E4 → Feature F-020 → Story LL-020. **P1 · S · 2 SP** · SP-08 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Áp tương tác đã duyệt và điều kiện thắng/sai qua contract, dùng pick/drag/camera dùng chung. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-020-T01](BACKLOG.md#ll-020-t01). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `src/features/3d/levels/3d-04.ts`, `tests/unit/levels/3d-04.test.ts`.

**Implementation steps / subtasks:**

1. `LL-020-T02-S01` — Áp tương tác đã duyệt và điều kiện thắng/sai qua contract, dùng pick/drag/camera dùng chung.
2. `LL-020-T02-S02` — Bổ sung reset, cancel, stale async; mechanic mới phải chia task riêng trước khi code.

**Acceptance criteria:**

- Đúng/sai khớp script, không hardcode callback thắng ngoài evaluator.
- Reset hoàn nguyên vật/camera và tiến trình; không tạo lời giải mới.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run typecheck
npm run test:unit -- --run
```

### LL-020-T03 — Kiểm chứng và hiệu chỉnh màn 3D-04

Epic E4 → Feature F-020 → Story LL-020. **P1 · XS · 1 SP** · SP-08 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Chạy đúng/≥3 sai, reset/exit/màn kế, tinh chỉnh vùng chạm trên desktop/điện thoại. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-020-T02](BACKLOG.md#ll-020-t02). **Decision/evidence gates:** `DEVICE_ACCESS`.

**Affected files (dự kiến):** `tests/e2e/levels/3d-04.spec.ts`, `docs/evidence/LL-020-T03.md`.

**Implementation steps / subtasks:**

1. `LL-020-T03-S01` — Chạy đúng/≥3 sai, reset/exit/màn kế, tinh chỉnh vùng chạm trên desktop/điện thoại.
2. `LL-020-T03-S02` — Đo FPS/MB/poly/draw calls theo budget; ghi model máy, profile và kết quả.

**Acceptance criteria:**

- End-to-end thắng được, sai thử lại, không lỗi console và không tài nguyên treo.
- Budget đạt trên thiết bị tham chiếu; nếu chưa đạt tạo defect và task giữ chưa done.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/levels/3d-04.spec.ts
npm run assets:check -- --level 3d-04
```

**Manual verification:**

- Đo cảnh 3d-04 trên thiết bị tham chiếu thật.

### LL-021-T01 — Dựng cảnh màn 3D-05

Epic E4 → Feature F-021 → Story LL-021. **P1 · S · 2 SP** · SP-09 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đọc script/model đã duyệt, bố trí scene/camera/object ids theo manifest. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-015-T03](BACKLOG.md#ll-015-t03), [LL-016-T03](BACKLOG.md#ll-016-t03), [LL-047-T02](BACKLOG.md#ll-047-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `content/levels/3d-05.json`, `src/features/3d/levels/3d-05.ts`.

**Implementation steps / subtasks:**

1. `LL-021-T01-S01` — Đọc script/model đã duyệt, bố trí scene/camera/object ids theo manifest.
2. `LL-021-T01-S02` — Nối loader và SceneHost, validate metadata và giới hạn camera; không thêm interaction mới ngầm.

**Acceptance criteria:**

- Bố trí đúng script, asset names khớp và không có model placeholder.
- Mở/thoát/replay không lỗi load, scene trong budget file.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check -- --level 3d-05
npm run build
```

### LL-021-T02 — Cài logic thắng sai màn 3D-05

Epic E4 → Feature F-021 → Story LL-021. **P1 · S · 2 SP** · SP-09 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Áp tương tác đã duyệt và điều kiện thắng/sai qua contract, dùng pick/drag/camera dùng chung. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-021-T01](BACKLOG.md#ll-021-t01). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `src/features/3d/levels/3d-05.ts`, `tests/unit/levels/3d-05.test.ts`.

**Implementation steps / subtasks:**

1. `LL-021-T02-S01` — Áp tương tác đã duyệt và điều kiện thắng/sai qua contract, dùng pick/drag/camera dùng chung.
2. `LL-021-T02-S02` — Bổ sung reset, cancel, stale async; mechanic mới phải chia task riêng trước khi code.

**Acceptance criteria:**

- Đúng/sai khớp script, không hardcode callback thắng ngoài evaluator.
- Reset hoàn nguyên vật/camera và tiến trình; không tạo lời giải mới.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run typecheck
npm run test:unit -- --run
```

### LL-021-T03 — Kiểm chứng và hiệu chỉnh màn 3D-05

Epic E4 → Feature F-021 → Story LL-021. **P1 · XS · 1 SP** · SP-09 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Chạy đúng/≥3 sai, reset/exit/màn kế, tinh chỉnh vùng chạm trên desktop/điện thoại. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-021-T02](BACKLOG.md#ll-021-t02). **Decision/evidence gates:** `DEVICE_ACCESS`.

**Affected files (dự kiến):** `tests/e2e/levels/3d-05.spec.ts`, `docs/evidence/LL-021-T03.md`.

**Implementation steps / subtasks:**

1. `LL-021-T03-S01` — Chạy đúng/≥3 sai, reset/exit/màn kế, tinh chỉnh vùng chạm trên desktop/điện thoại.
2. `LL-021-T03-S02` — Đo FPS/MB/poly/draw calls theo budget; ghi model máy, profile và kết quả.

**Acceptance criteria:**

- End-to-end thắng được, sai thử lại, không lỗi console và không tài nguyên treo.
- Budget đạt trên thiết bị tham chiếu; nếu chưa đạt tạo defect và task giữ chưa done.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/levels/3d-05.spec.ts
npm run assets:check -- --level 3d-05
```

**Manual verification:**

- Đo cảnh 3d-05 trên thiết bị tham chiếu thật.

### LL-022-T01 — Đo baseline 3D-01 trên ba thiết bị

Epic E4 → Feature F-022 → Story LL-022. **P1 · XS · 1 SP** · SP-05 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đo ≥3 thiết bị, ≥1 máy yếu: FPS, heap, tải và budget counters. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T02](BACKLOG.md#ai-t02), [LL-017-T03](BACKLOG.md#ll-017-t03). **Decision/evidence gates:** `DEVICE_ACCESS`.

**Affected files (dự kiến):** `docs/performance/3d-baseline.md`.

**Implementation steps / subtasks:**

1. `LL-022-T01-S01` — Đo ≥3 thiết bị, ≥1 máy yếu: FPS, heap, tải và budget counters.
2. `LL-022-T01-S02` — Ghi tất cả chỉ số vượt budget và xác định điểm nghẽn bằng profiler.

**Acceptance criteria:**

- Có baseline ba máy thật và phương pháp so sánh tái lập.
- Không suy ra tối ưu cần thiết khi chưa profile; không sửa mức budget để đạt.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run assets:check -- --level 3d-01
```

**Manual verification:**

- Đo ba thiết bị có ít nhất một máy yếu.

### LL-022-T02 — Tối ưu điểm nghẽn 3D đã đo

Epic E4 → Feature F-022 → Story LL-022. **P1 · S · 2 SP** · SP-05 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Áp thay đổi nhỏ có căn cứ: DPR/shadows/texture/mesh; chỉ sửa điểm nghẽn baseline. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-022-T01](BACKLOG.md#ll-022-t01). **Decision/evidence gates:** `DEVICE_ACCESS`.

**Affected files (dự kiến):** `src/features/3d/quality.ts`, `scripts/check-assets.mjs`, `docs/performance/3d-optimization.md`, `tests/e2e/levels/3d-01.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-022-T02-S01` — Áp thay đổi nhỏ có căn cứ: DPR/shadows/texture/mesh; chỉ sửa điểm nghẽn baseline.
2. `LL-022-T02-S02` — Đo lại cùng profile, viết pipeline/checklist cho asset các màn còn lại.

**Acceptance criteria:**

- 3D-01 đạt budget thiết bị thấp nhất; report trước/sau có cùng profile.
- Checklist/pipeline không làm thay đổi logic puzzle; nếu scope vượt 1 ngày tạo task nhỏ hơn.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run assets:check -- --level 3d-01
npm run test:e2e -- tests/e2e/levels/3d-01.spec.ts
```

### LL-023-T01 — Định nghĩa visual tokens và font tiếng Việt

Epic E5 → Feature F-023 → Story LL-023. **P1 · XS · 1 SP** · SP-01 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Áp phong cách đã chốt, tokens màu/type/spacing và font local có giấy phép. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T06](BACKLOG.md#ai-t06), [LL-001-T03](BACKLOG.md#ll-001-t03). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `docs/design/style.md`, `src/app/globals.css`, `public/fonts/`, `docs/assets/ledger.json`.

**Implementation steps / subtasks:**

1. `LL-023-T01-S01` — Áp phong cách đã chốt, tokens màu/type/spacing và font local có giấy phép.
2. `LL-023-T01-S02` — Tạo chuỗi thử dấu nhiều tầng, kiểm tra glyph/font thực và tương phản.

**Acceptance criteria:**

- Đề bài ≥16px, chữ/nền ≥4.5:1; font thực render ỡ/ặ/ự không fallback.
- Nguồn font và quyền sử dụng ghi trong ledger.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run build
```

**Manual verification:**

- Đọc chuỗi dấu và kiểm tra computed/rendered fonts, tương phản.

### LL-023-T02 — Tạo nút, tiêu đề và hộp thoại chung

Epic E5 → Feature F-023 → Story LL-023. **P1 · S · 2 SP** · SP-01 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Dùng tokens cho UI chung với focus/label/dialog controls; trang mẫu trạng thái. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-023-T01](BACKLOG.md#ll-023-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/components/ui/Button.tsx`, `src/components/ui/Dialog.tsx`, `src/components/ui/Heading.tsx`, `src/app/lab/ui/page.tsx`, `tests/unit/ui.test.ts`.

**Implementation steps / subtasks:**

1. `LL-023-T02-S01` — Dùng tokens cho UI chung với focus/label/dialog controls; trang mẫu trạng thái.
2. `LL-023-T02-S02` — Kiểm tra tiếng Việt, disabled, focus restore và viewport nhỏ; không thêm animation clip/video.

**Acceptance criteria:**

- Các trạng thái UI dùng chung và không copy style riêng ở từng màn.
- Trang mẫu tiếng Việt không tràn; dialog đóng và phục hồi focus đúng.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run typecheck
npm run test:unit -- --run tests/unit/ui.test.tsx
```

### LL-024-T01 — Dựng trang chủ và Chơi tiếp

Epic E5 → Feature F-024 → Story LL-024. **P2 · XS · 1 SP** · SP-06 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Hiện tên Lắt Léo, Chơi → chọn màn và Chơi tiếp theo màn chưa hoàn thành đầu tiên. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-006-T01](BACKLOG.md#ll-006-t01), [LL-007-T03](BACKLOG.md#ll-007-t03), [LL-023-T02](BACKLOG.md#ll-023-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/app/page.tsx`, `tests/e2e/home.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-024-T01-S01` — Hiện tên Lắt Léo, Chơi → chọn màn và Chơi tiếp theo màn chưa hoàn thành đầu tiên.
2. `LL-024-T01-S02` — Xử lý progress đang tải/lỗi, người mới và đã hoàn thành toàn bộ.

**Acceptance criteria:**

- Người mới thấy Chơi; người có tiến độ vào đúng màn còn thiếu.
- Không tạo route không tồn tại khi hoàn thành 25/25.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/home.spec.ts
```

### LL-025-T01 — Hoàn thiện layout responsive của shell và lưới

Epic E5 → Feature F-025 → Story LL-025. **P1 · S · 2 SP** · SP-03 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Chỉnh 360–1920px, safe-area, vùng nút ≥44×44px; không sửa math Stage2D. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-005-T03](BACKLOG.md#ll-005-t03), [LL-006-T01](BACKLOG.md#ll-006-t01), [LL-023-T02](BACKLOG.md#ll-023-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/game/GameShell.tsx`, `src/features/levels/LevelGrid.tsx`, `src/app/globals.css`, `tests/e2e/responsive.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-025-T01-S01` — Chỉnh 360–1920px, safe-area, vùng nút ≥44×44px; không sửa math Stage2D.
2. `LL-025-T01-S02` — Thử resize/xoay giữ state playing/wrong/won và không tràn chữ.

**Acceptance criteria:**

- Không scroll ngang ở 360/768/1920px; nút/ô đủ hit size.
- Xoay dọc/ngang không reset puzzle hoặc mất progress.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/responsive.spec.ts
```

### LL-026-T01 — Thêm hiệu ứng phản hồi và chuyển màn

Epic E5 → Feature F-026 → Story LL-026. **P2 · XS · 1 SP** · SP-07 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Thêm hiệu ứng đúng/sai và transition bằng CSS, dựa trên tokens đã chốt. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-005-T03](BACKLOG.md#ll-005-t03), [LL-023-T02](BACKLOG.md#ll-023-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/game/ResultPanel.tsx`, `src/app/globals.css`, `tests/e2e/feedback.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-026-T01-S01` — Thêm hiệu ứng đúng/sai và transition bằng CSS, dựa trên tokens đã chốt.
2. `LL-026-T01-S02` — Giới hạn thời lượng và tôn trọng reduced-motion; không tạo video hoặc asset animation mới.

**Acceptance criteria:**

- Đúng/sai ≤1 giây, chuyển màn ≤500ms và không khóa thao tác lâu hơn.
- Không phát kết quả hai lần, reduced-motion vẫn thấy feedback.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/feedback.spec.ts
```

### LL-027-T01 — Hiện hoàn tất khi đủ 25 màn

Epic E5 → Feature F-027 → Story LL-027. **P3 · XS · 1 SP** · SP-08 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Tính complete từ tập id catalog chính thức, không dựa độ dài mảng request. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-028-T02](BACKLOG.md#ll-028-t02), [LL-005-T03](BACKLOG.md#ll-005-t03), [LL-007-T03](BACKLOG.md#ll-007-t03). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/app/completed/page.tsx`, `src/features/progress/completion.ts`, `tests/e2e/completion.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-027-T01-S01` — Tính complete từ tập id catalog chính thức, không dựa độ dài mảng request.
2. `LL-027-T01-S02` — Tạo lời cảm ơn và nút về chọn màn; test thiếu/màn lạ/trùng id.

**Acceptance criteria:**

- Chỉ 25 id hợp lệ completed mới hiện trang hoàn tất.
- 24/25, duplicate hoặc id lạ không hoàn tất; nút về chọn màn hoạt động.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/completion.spec.ts
```

### LL-028-T01 — Soạn catalog ý tưởng 25 màn

Epic E6 → Feature F-028 → Story LL-028. **P0 · S · 2 SP** · SP-01 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Soạn 25 ý tưởng tự sáng tác hoặc từ nguồn được cấp, ghi ordinal/kind/mechanic/difficulty/nguồn. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-001-T03](BACKLOG.md#ll-001-t03). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `docs/content/catalog.json`, `docs/content/catalog.md`, `scripts/validate-content.mjs`, `package.json`.

**Implementation steps / subtasks:**

1. `LL-028-T01-S01` — Soạn 25 ý tưởng tự sáng tác hoặc từ nguồn được cấp, ghi ordinal/kind/mechanic/difficulty/nguồn.
2. `LL-028-T01-S02` — Tạo content:validate cho catalog và schema content khi có; 20 2D +5 3D, ordinal độc nhất, difficulty trung bình theo nhóm không giảm.

**Acceptance criteria:**

- Catalog có đúng 25 dòng, 20/5 và vị trí 3D rõ; cơ chế ngoài tập chuẩn đánh dấu new.
- Validator fail khi duplicate, thiếu trường, sai số lượng hoặc giảm độ khó nhóm.
- Validator có chế độ catalog/scripts/production; release bắt buộc production đủ 25 màn, dev chưa có level không bị coi là hoàn thành.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

### LL-028-T02 — Duyệt catalog và tái ước lượng cơ chế mới

Epic E6 → Feature F-028 → Story LL-028. **P0 · XS · 1 SP** · SP-01 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Trình PO duyệt thứ tự, nội dung và độ khó; ghi cơ chế mới cần tách task. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-028-T01](BACKLOG.md#ll-028-t01). **Decision/evidence gates:** `CATALOG_APPROVAL`.

**Affected files (dự kiến):** `docs/content/catalog.md`, `docs/content/reviews.md`.

**Implementation steps / subtasks:**

1. `LL-028-T02-S01` — Trình PO duyệt thứ tự, nội dung và độ khó; ghi cơ chế mới cần tách task.
2. `LL-028-T02-S02` — Cập nhật mapping ordinal ↔ id và estimates của level tasks, không thay story IDs nguồn.

**Acceptance criteria:**

- PO xác nhận 25 ý tưởng và mapping; chưa có xác nhận thì chưa done.
- Cơ chế mới có task hữu hạn, AC/verification/dependencies trước khi task màn bắt đầu.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

**Manual verification:**

- PO đọc và duyệt catalog.

### LL-029-T01 — Viết kịch bản 2d-01, 2d-02, 2d-03

Epic E6 → Feature F-029 → Story LL-029. **P1 · XS · 1 SP** · SP-04 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-01, 2d-02, 2d-03. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-023-T02](BACKLOG.md#ll-023-t02), [LL-028-T02](BACKLOG.md#ll-028-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `docs/content/levels/2d-01.md`, `docs/content/levels/2d-02.md`, `docs/content/levels/2d-03.md`.

**Implementation steps / subtasks:**

1. `LL-029-T01-S01` — Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-01, 2d-02, 2d-03.
2. `LL-029-T01-S02` — Ghi cơ chế, aliases/dấu, asset list và nguồn câu đố; đối chiếu catalog.

**Acceptance criteria:**

- Mỗi màn có đầy đủ prompt, điều kiện đúng/sai, ≥3 sai/lạ và cách reset.
- Không tự sửa ý tưởng đã duyệt; mechanic mới phải ghi blocker trước code.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

### LL-029-T02 — Viết kịch bản 2d-04, 2d-05

Epic E6 → Feature F-029 → Story LL-029. **P1 · XS · 1 SP** · SP-04 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-04, 2d-05. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-023-T02](BACKLOG.md#ll-023-t02), [LL-028-T02](BACKLOG.md#ll-028-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `docs/content/levels/2d-04.md`, `docs/content/levels/2d-05.md`.

**Implementation steps / subtasks:**

1. `LL-029-T02-S01` — Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-04, 2d-05.
2. `LL-029-T02-S02` — Ghi cơ chế, aliases/dấu, asset list và nguồn câu đố; đối chiếu catalog.

**Acceptance criteria:**

- Mỗi màn có đầy đủ prompt, điều kiện đúng/sai, ≥3 sai/lạ và cách reset.
- Không tự sửa ý tưởng đã duyệt; mechanic mới phải ghi blocker trước code.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

### LL-029-T03 — Giao tài nguyên web 2d-01, 2d-02, 2d-03

Epic E6 → Feature F-029 → Story LL-029. **P1 · XS · 1 SP** · SP-04 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-01, 2d-02, 2d-03. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-029-T01](BACKLOG.md#ll-029-t01), [LL-016-T02](BACKLOG.md#ll-016-t02). **Decision/evidence gates:** `Q10-assets`.

**Affected files (dự kiến):** `public/assets/levels/2d-01/`, `public/assets/levels/2d-02/`, `public/assets/levels/2d-03/`, `docs/assets/ledger.json`.

**Implementation steps / subtasks:**

1. `LL-029-T03-S01` — Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-01, 2d-02, 2d-03.
2. `LL-029-T03-S02` — Xuất định dạng web, tên nhất quán, font/asset license, không mua hoặc tải nguồn chưa xác nhận.

**Acceptance criteria:**

- Asset list script đủ file, không placeholder và đúng phong cách.
- Ledger ghi nguồn/giấy phép/ghi công từng asset, file có thể dùng trực tiếp trên web.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check
```

**Manual verification:**

- Đối chiếu hình với script và style checklist.

### LL-029-T04 — Giao tài nguyên web 2d-04, 2d-05

Epic E6 → Feature F-029 → Story LL-029. **P1 · XS · 1 SP** · SP-04 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-04, 2d-05. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-029-T02](BACKLOG.md#ll-029-t02), [LL-016-T02](BACKLOG.md#ll-016-t02). **Decision/evidence gates:** `Q10-assets`.

**Affected files (dự kiến):** `public/assets/levels/2d-04/`, `public/assets/levels/2d-05/`, `docs/assets/ledger.json`.

**Implementation steps / subtasks:**

1. `LL-029-T04-S01` — Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-04, 2d-05.
2. `LL-029-T04-S02` — Xuất định dạng web, tên nhất quán, font/asset license, không mua hoặc tải nguồn chưa xác nhận.

**Acceptance criteria:**

- Asset list script đủ file, không placeholder và đúng phong cách.
- Ledger ghi nguồn/giấy phép/ghi công từng asset, file có thể dùng trực tiếp trên web.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check
```

**Manual verification:**

- Đối chiếu hình với script và style checklist.

### LL-029-T05 — Nghiệm thu nội dung và đồ họa 2D lô 1

Epic E6 → Feature F-029 → Story LL-029. **P1 · XS · 1 SP** · SP-04 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đối chiếu đủ năm script và assets của lô 1 với PO. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-029-T01](BACKLOG.md#ll-029-t01), [LL-029-T02](BACKLOG.md#ll-029-t02), [LL-029-T03](BACKLOG.md#ll-029-t03), [LL-029-T04](BACKLOG.md#ll-029-t04). **Decision/evidence gates:** `CONTENT_APPROVAL`.

**Affected files (dự kiến):** `docs/content/reviews.md`, `docs/content/levels/`.

**Implementation steps / subtasks:**

1. `LL-029-T05-S01` — Đối chiếu đủ năm script và assets của lô 1 với PO.
2. `LL-029-T05-S02` — Chốt đáp án/biến thể, asset path và feedback; lưu duyệt trước khi triển khai các màn.

**Acceptance criteria:**

- PO duyệt năm màn, sources/asset manifest đầy đủ.
- Mọi script đáp ứng AC story nguồn; chưa có nội dung thật không đóng task.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check
```

**Manual verification:**

- PO duyệt script và assets cả lô.

### LL-030-T01 — Viết kịch bản 2d-06, 2d-07, 2d-08

Epic E6 → Feature F-030 → Story LL-030. **P1 · XS · 1 SP** · SP-05 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-06, 2d-07, 2d-08. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-023-T02](BACKLOG.md#ll-023-t02), [LL-028-T02](BACKLOG.md#ll-028-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `docs/content/levels/2d-06.md`, `docs/content/levels/2d-07.md`, `docs/content/levels/2d-08.md`.

**Implementation steps / subtasks:**

1. `LL-030-T01-S01` — Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-06, 2d-07, 2d-08.
2. `LL-030-T01-S02` — Ghi cơ chế, aliases/dấu, asset list và nguồn câu đố; đối chiếu catalog.

**Acceptance criteria:**

- Mỗi màn có đầy đủ prompt, điều kiện đúng/sai, ≥3 sai/lạ và cách reset.
- Không tự sửa ý tưởng đã duyệt; mechanic mới phải ghi blocker trước code.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

### LL-030-T02 — Viết kịch bản 2d-09, 2d-10

Epic E6 → Feature F-030 → Story LL-030. **P1 · XS · 1 SP** · SP-05 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-09, 2d-10. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-023-T02](BACKLOG.md#ll-023-t02), [LL-028-T02](BACKLOG.md#ll-028-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `docs/content/levels/2d-09.md`, `docs/content/levels/2d-10.md`.

**Implementation steps / subtasks:**

1. `LL-030-T02-S01` — Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-09, 2d-10.
2. `LL-030-T02-S02` — Ghi cơ chế, aliases/dấu, asset list và nguồn câu đố; đối chiếu catalog.

**Acceptance criteria:**

- Mỗi màn có đầy đủ prompt, điều kiện đúng/sai, ≥3 sai/lạ và cách reset.
- Không tự sửa ý tưởng đã duyệt; mechanic mới phải ghi blocker trước code.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

### LL-030-T03 — Giao tài nguyên web 2d-06, 2d-07, 2d-08

Epic E6 → Feature F-030 → Story LL-030. **P1 · XS · 1 SP** · SP-05 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-06, 2d-07, 2d-08. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-030-T01](BACKLOG.md#ll-030-t01), [LL-016-T02](BACKLOG.md#ll-016-t02). **Decision/evidence gates:** `Q10-assets`.

**Affected files (dự kiến):** `public/assets/levels/2d-06/`, `public/assets/levels/2d-07/`, `public/assets/levels/2d-08/`, `docs/assets/ledger.json`.

**Implementation steps / subtasks:**

1. `LL-030-T03-S01` — Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-06, 2d-07, 2d-08.
2. `LL-030-T03-S02` — Xuất định dạng web, tên nhất quán, font/asset license, không mua hoặc tải nguồn chưa xác nhận.

**Acceptance criteria:**

- Asset list script đủ file, không placeholder và đúng phong cách.
- Ledger ghi nguồn/giấy phép/ghi công từng asset, file có thể dùng trực tiếp trên web.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check
```

**Manual verification:**

- Đối chiếu hình với script và style checklist.

### LL-030-T04 — Giao tài nguyên web 2d-09, 2d-10

Epic E6 → Feature F-030 → Story LL-030. **P1 · XS · 1 SP** · SP-05 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-09, 2d-10. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-030-T02](BACKLOG.md#ll-030-t02), [LL-016-T02](BACKLOG.md#ll-016-t02). **Decision/evidence gates:** `Q10-assets`.

**Affected files (dự kiến):** `public/assets/levels/2d-09/`, `public/assets/levels/2d-10/`, `docs/assets/ledger.json`.

**Implementation steps / subtasks:**

1. `LL-030-T04-S01` — Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-09, 2d-10.
2. `LL-030-T04-S02` — Xuất định dạng web, tên nhất quán, font/asset license, không mua hoặc tải nguồn chưa xác nhận.

**Acceptance criteria:**

- Asset list script đủ file, không placeholder và đúng phong cách.
- Ledger ghi nguồn/giấy phép/ghi công từng asset, file có thể dùng trực tiếp trên web.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check
```

**Manual verification:**

- Đối chiếu hình với script và style checklist.

### LL-030-T05 — Nghiệm thu nội dung và đồ họa 2D lô 2

Epic E6 → Feature F-030 → Story LL-030. **P1 · XS · 1 SP** · SP-05 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đối chiếu đủ năm script và assets của lô 2 với PO. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-030-T01](BACKLOG.md#ll-030-t01), [LL-030-T02](BACKLOG.md#ll-030-t02), [LL-030-T03](BACKLOG.md#ll-030-t03), [LL-030-T04](BACKLOG.md#ll-030-t04). **Decision/evidence gates:** `CONTENT_APPROVAL`.

**Affected files (dự kiến):** `docs/content/reviews.md`, `docs/content/levels/`.

**Implementation steps / subtasks:**

1. `LL-030-T05-S01` — Đối chiếu đủ năm script và assets của lô 2 với PO.
2. `LL-030-T05-S02` — Chốt đáp án/biến thể, asset path và feedback; lưu duyệt trước khi triển khai các màn.

**Acceptance criteria:**

- PO duyệt năm màn, sources/asset manifest đầy đủ.
- Mọi script đáp ứng AC story nguồn; chưa có nội dung thật không đóng task.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check
```

**Manual verification:**

- PO duyệt script và assets cả lô.

### LL-031-T01 — Viết kịch bản 2d-11, 2d-12, 2d-13

Epic E6 → Feature F-031 → Story LL-031. **P1 · XS · 1 SP** · SP-07 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-11, 2d-12, 2d-13. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-023-T02](BACKLOG.md#ll-023-t02), [LL-028-T02](BACKLOG.md#ll-028-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `docs/content/levels/2d-11.md`, `docs/content/levels/2d-12.md`, `docs/content/levels/2d-13.md`.

**Implementation steps / subtasks:**

1. `LL-031-T01-S01` — Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-11, 2d-12, 2d-13.
2. `LL-031-T01-S02` — Ghi cơ chế, aliases/dấu, asset list và nguồn câu đố; đối chiếu catalog.

**Acceptance criteria:**

- Mỗi màn có đầy đủ prompt, điều kiện đúng/sai, ≥3 sai/lạ và cách reset.
- Không tự sửa ý tưởng đã duyệt; mechanic mới phải ghi blocker trước code.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

### LL-031-T02 — Viết kịch bản 2d-14, 2d-15

Epic E6 → Feature F-031 → Story LL-031. **P1 · XS · 1 SP** · SP-07 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-14, 2d-15. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-023-T02](BACKLOG.md#ll-023-t02), [LL-028-T02](BACKLOG.md#ll-028-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `docs/content/levels/2d-14.md`, `docs/content/levels/2d-15.md`.

**Implementation steps / subtasks:**

1. `LL-031-T02-S01` — Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-14, 2d-15.
2. `LL-031-T02-S02` — Ghi cơ chế, aliases/dấu, asset list và nguồn câu đố; đối chiếu catalog.

**Acceptance criteria:**

- Mỗi màn có đầy đủ prompt, điều kiện đúng/sai, ≥3 sai/lạ và cách reset.
- Không tự sửa ý tưởng đã duyệt; mechanic mới phải ghi blocker trước code.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

### LL-031-T03 — Giao tài nguyên web 2d-11, 2d-12, 2d-13

Epic E6 → Feature F-031 → Story LL-031. **P1 · XS · 1 SP** · SP-07 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-11, 2d-12, 2d-13. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-031-T01](BACKLOG.md#ll-031-t01), [LL-016-T02](BACKLOG.md#ll-016-t02). **Decision/evidence gates:** `Q10-assets`.

**Affected files (dự kiến):** `public/assets/levels/2d-11/`, `public/assets/levels/2d-12/`, `public/assets/levels/2d-13/`, `docs/assets/ledger.json`.

**Implementation steps / subtasks:**

1. `LL-031-T03-S01` — Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-11, 2d-12, 2d-13.
2. `LL-031-T03-S02` — Xuất định dạng web, tên nhất quán, font/asset license, không mua hoặc tải nguồn chưa xác nhận.

**Acceptance criteria:**

- Asset list script đủ file, không placeholder và đúng phong cách.
- Ledger ghi nguồn/giấy phép/ghi công từng asset, file có thể dùng trực tiếp trên web.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check
```

**Manual verification:**

- Đối chiếu hình với script và style checklist.

### LL-031-T04 — Giao tài nguyên web 2d-14, 2d-15

Epic E6 → Feature F-031 → Story LL-031. **P1 · XS · 1 SP** · SP-07 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-14, 2d-15. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-031-T02](BACKLOG.md#ll-031-t02), [LL-016-T02](BACKLOG.md#ll-016-t02). **Decision/evidence gates:** `Q10-assets`.

**Affected files (dự kiến):** `public/assets/levels/2d-14/`, `public/assets/levels/2d-15/`, `docs/assets/ledger.json`.

**Implementation steps / subtasks:**

1. `LL-031-T04-S01` — Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-14, 2d-15.
2. `LL-031-T04-S02` — Xuất định dạng web, tên nhất quán, font/asset license, không mua hoặc tải nguồn chưa xác nhận.

**Acceptance criteria:**

- Asset list script đủ file, không placeholder và đúng phong cách.
- Ledger ghi nguồn/giấy phép/ghi công từng asset, file có thể dùng trực tiếp trên web.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check
```

**Manual verification:**

- Đối chiếu hình với script và style checklist.

### LL-031-T05 — Nghiệm thu nội dung và đồ họa 2D lô 3

Epic E6 → Feature F-031 → Story LL-031. **P1 · XS · 1 SP** · SP-07 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đối chiếu đủ năm script và assets của lô 3 với PO. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-031-T01](BACKLOG.md#ll-031-t01), [LL-031-T02](BACKLOG.md#ll-031-t02), [LL-031-T03](BACKLOG.md#ll-031-t03), [LL-031-T04](BACKLOG.md#ll-031-t04). **Decision/evidence gates:** `CONTENT_APPROVAL`.

**Affected files (dự kiến):** `docs/content/reviews.md`, `docs/content/levels/`.

**Implementation steps / subtasks:**

1. `LL-031-T05-S01` — Đối chiếu đủ năm script và assets của lô 3 với PO.
2. `LL-031-T05-S02` — Chốt đáp án/biến thể, asset path và feedback; lưu duyệt trước khi triển khai các màn.

**Acceptance criteria:**

- PO duyệt năm màn, sources/asset manifest đầy đủ.
- Mọi script đáp ứng AC story nguồn; chưa có nội dung thật không đóng task.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check
```

**Manual verification:**

- PO duyệt script và assets cả lô.

### LL-032-T01 — Viết kịch bản 2d-16, 2d-17, 2d-18

Epic E6 → Feature F-032 → Story LL-032. **P1 · XS · 1 SP** · SP-08 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-16, 2d-17, 2d-18. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-023-T02](BACKLOG.md#ll-023-t02), [LL-028-T02](BACKLOG.md#ll-028-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `docs/content/levels/2d-16.md`, `docs/content/levels/2d-17.md`, `docs/content/levels/2d-18.md`.

**Implementation steps / subtasks:**

1. `LL-032-T01-S01` — Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-16, 2d-17, 2d-18.
2. `LL-032-T01-S02` — Ghi cơ chế, aliases/dấu, asset list và nguồn câu đố; đối chiếu catalog.

**Acceptance criteria:**

- Mỗi màn có đầy đủ prompt, điều kiện đúng/sai, ≥3 sai/lạ và cách reset.
- Không tự sửa ý tưởng đã duyệt; mechanic mới phải ghi blocker trước code.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

### LL-032-T02 — Viết kịch bản 2d-19, 2d-20

Epic E6 → Feature F-032 → Story LL-032. **P1 · XS · 1 SP** · SP-08 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-19, 2d-20. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-023-T02](BACKLOG.md#ll-023-t02), [LL-028-T02](BACKLOG.md#ll-028-t02). **Decision/evidence gates:** `Q6`.

**Affected files (dự kiến):** `docs/content/levels/2d-19.md`, `docs/content/levels/2d-20.md`.

**Implementation steps / subtasks:**

1. `LL-032-T02-S01` — Viết đề, câu sai hay gặp/feedback, lời giải mẹo và đúng/sai cho 2d-19, 2d-20.
2. `LL-032-T02-S02` — Ghi cơ chế, aliases/dấu, asset list và nguồn câu đố; đối chiếu catalog.

**Acceptance criteria:**

- Mỗi màn có đầy đủ prompt, điều kiện đúng/sai, ≥3 sai/lạ và cách reset.
- Không tự sửa ý tưởng đã duyệt; mechanic mới phải ghi blocker trước code.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

### LL-032-T03 — Giao tài nguyên web 2d-16, 2d-17, 2d-18

Epic E6 → Feature F-032 → Story LL-032. **P1 · XS · 1 SP** · SP-08 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-16, 2d-17, 2d-18. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-032-T01](BACKLOG.md#ll-032-t01), [LL-016-T02](BACKLOG.md#ll-016-t02). **Decision/evidence gates:** `Q10-assets`.

**Affected files (dự kiến):** `public/assets/levels/2d-16/`, `public/assets/levels/2d-17/`, `public/assets/levels/2d-18/`, `docs/assets/ledger.json`.

**Implementation steps / subtasks:**

1. `LL-032-T03-S01` — Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-16, 2d-17, 2d-18.
2. `LL-032-T03-S02` — Xuất định dạng web, tên nhất quán, font/asset license, không mua hoặc tải nguồn chưa xác nhận.

**Acceptance criteria:**

- Asset list script đủ file, không placeholder và đúng phong cách.
- Ledger ghi nguồn/giấy phép/ghi công từng asset, file có thể dùng trực tiếp trên web.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check
```

**Manual verification:**

- Đối chiếu hình với script và style checklist.

### LL-032-T04 — Giao tài nguyên web 2d-19, 2d-20

Epic E6 → Feature F-032 → Story LL-032. **P1 · XS · 1 SP** · SP-08 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-19, 2d-20. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-032-T02](BACKLOG.md#ll-032-t02), [LL-016-T02](BACKLOG.md#ll-016-t02). **Decision/evidence gates:** `Q10-assets`.

**Affected files (dự kiến):** `public/assets/levels/2d-19/`, `public/assets/levels/2d-20/`, `docs/assets/ledger.json`.

**Implementation steps / subtasks:**

1. `LL-032-T04-S01` — Tạo hoặc dùng asset đã có theo script, phong cách và nguồn cho 2d-19, 2d-20.
2. `LL-032-T04-S02` — Xuất định dạng web, tên nhất quán, font/asset license, không mua hoặc tải nguồn chưa xác nhận.

**Acceptance criteria:**

- Asset list script đủ file, không placeholder và đúng phong cách.
- Ledger ghi nguồn/giấy phép/ghi công từng asset, file có thể dùng trực tiếp trên web.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check
```

**Manual verification:**

- Đối chiếu hình với script và style checklist.

### LL-032-T05 — Nghiệm thu nội dung và đồ họa 2D lô 4

Epic E6 → Feature F-032 → Story LL-032. **P1 · XS · 1 SP** · SP-08 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đối chiếu đủ năm script và assets của lô 4 với PO. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-032-T01](BACKLOG.md#ll-032-t01), [LL-032-T02](BACKLOG.md#ll-032-t02), [LL-032-T03](BACKLOG.md#ll-032-t03), [LL-032-T04](BACKLOG.md#ll-032-t04). **Decision/evidence gates:** `CONTENT_APPROVAL`.

**Affected files (dự kiến):** `docs/content/reviews.md`, `docs/content/levels/`.

**Implementation steps / subtasks:**

1. `LL-032-T05-S01` — Đối chiếu đủ năm script và assets của lô 4 với PO.
2. `LL-032-T05-S02` — Chốt đáp án/biến thể, asset path và feedback; lưu duyệt trước khi triển khai các màn.

**Acceptance criteria:**

- PO duyệt năm màn, sources/asset manifest đầy đủ.
- Mọi script đáp ứng AC story nguồn; chưa có nội dung thật không đóng task.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run assets:check
```

**Manual verification:**

- PO duyệt script và assets cả lô.

### LL-033-T01 — Viết và rà soát khả thi kịch bản 3D-01

Epic E6 → Feature F-033 → Story LL-033. **P1 · XS · 1 SP** · SP-04 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Viết cảnh/vật thể/mức chi tiết/camera/tương tác và điều kiện thắng/sai/feedback của 3d-01. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-028-T02](BACKLOG.md#ll-028-t02). **Decision/evidence gates:** `Q6`, `SCRIPT_3D_REVIEW`.

**Affected files (dự kiến):** `docs/content/levels/3d-01.md`, `docs/content/3d-manifest.json`.

**Implementation steps / subtasks:**

1. `LL-033-T01-S01` — Viết cảnh/vật thể/mức chi tiết/camera/tương tác và điều kiện thắng/sai/feedback của 3d-01.
2. `LL-033-T01-S02` — Ghi object/animation names và nguồn dự kiến; DEV3D/ART3D rà khả thi, cập nhật estimate cảnh/logic/QA.

**Acceptance criteria:**

- Script có asset manifest và ≥3 sai/lạ; ý tưởng khớp catalog.
- Có review khả thi, scope mechanic mới được tách trước khi triển khai; không tự thiết kế câu đố chưa được phép.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

**Manual verification:**

- DEV3D + ART3D review và PO xác nhận nội dung.

### LL-044-T01 — Viết và rà soát khả thi kịch bản 3D-02

Epic E6 → Feature F-044 → Story LL-044. **P1 · XS · 1 SP** · SP-05 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Viết cảnh/vật thể/mức chi tiết/camera/tương tác và điều kiện thắng/sai/feedback của 3d-02. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-028-T02](BACKLOG.md#ll-028-t02). **Decision/evidence gates:** `Q6`, `SCRIPT_3D_REVIEW`.

**Affected files (dự kiến):** `docs/content/levels/3d-02.md`, `docs/content/3d-manifest.json`.

**Implementation steps / subtasks:**

1. `LL-044-T01-S01` — Viết cảnh/vật thể/mức chi tiết/camera/tương tác và điều kiện thắng/sai/feedback của 3d-02.
2. `LL-044-T01-S02` — Ghi object/animation names và nguồn dự kiến; DEV3D/ART3D rà khả thi, cập nhật estimate cảnh/logic/QA.

**Acceptance criteria:**

- Script có asset manifest và ≥3 sai/lạ; ý tưởng khớp catalog.
- Có review khả thi, scope mechanic mới được tách trước khi triển khai; không tự thiết kế câu đố chưa được phép.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

**Manual verification:**

- DEV3D + ART3D review và PO xác nhận nội dung.

### LL-044-T02 — Viết và rà soát khả thi kịch bản 3D-03

Epic E6 → Feature F-044 → Story LL-044. **P1 · XS · 1 SP** · SP-05 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Viết cảnh/vật thể/mức chi tiết/camera/tương tác và điều kiện thắng/sai/feedback của 3d-03. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-028-T02](BACKLOG.md#ll-028-t02). **Decision/evidence gates:** `Q6`, `SCRIPT_3D_REVIEW`.

**Affected files (dự kiến):** `docs/content/levels/3d-03.md`, `docs/content/3d-manifest.json`.

**Implementation steps / subtasks:**

1. `LL-044-T02-S01` — Viết cảnh/vật thể/mức chi tiết/camera/tương tác và điều kiện thắng/sai/feedback của 3d-03.
2. `LL-044-T02-S02` — Ghi object/animation names và nguồn dự kiến; DEV3D/ART3D rà khả thi, cập nhật estimate cảnh/logic/QA.

**Acceptance criteria:**

- Script có asset manifest và ≥3 sai/lạ; ý tưởng khớp catalog.
- Có review khả thi, scope mechanic mới được tách trước khi triển khai; không tự thiết kế câu đố chưa được phép.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

**Manual verification:**

- DEV3D + ART3D review và PO xác nhận nội dung.

### LL-044-T03 — Viết và rà soát khả thi kịch bản 3D-04

Epic E6 → Feature F-044 → Story LL-044. **P1 · XS · 1 SP** · SP-05 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Viết cảnh/vật thể/mức chi tiết/camera/tương tác và điều kiện thắng/sai/feedback của 3d-04. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-028-T02](BACKLOG.md#ll-028-t02). **Decision/evidence gates:** `Q6`, `SCRIPT_3D_REVIEW`.

**Affected files (dự kiến):** `docs/content/levels/3d-04.md`, `docs/content/3d-manifest.json`.

**Implementation steps / subtasks:**

1. `LL-044-T03-S01` — Viết cảnh/vật thể/mức chi tiết/camera/tương tác và điều kiện thắng/sai/feedback của 3d-04.
2. `LL-044-T03-S02` — Ghi object/animation names và nguồn dự kiến; DEV3D/ART3D rà khả thi, cập nhật estimate cảnh/logic/QA.

**Acceptance criteria:**

- Script có asset manifest và ≥3 sai/lạ; ý tưởng khớp catalog.
- Có review khả thi, scope mechanic mới được tách trước khi triển khai; không tự thiết kế câu đố chưa được phép.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

**Manual verification:**

- DEV3D + ART3D review và PO xác nhận nội dung.

### LL-044-T04 — Viết và rà soát khả thi kịch bản 3D-05

Epic E6 → Feature F-044 → Story LL-044. **P1 · XS · 1 SP** · SP-05 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Viết cảnh/vật thể/mức chi tiết/camera/tương tác và điều kiện thắng/sai/feedback của 3d-05. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-028-T02](BACKLOG.md#ll-028-t02). **Decision/evidence gates:** `Q6`, `SCRIPT_3D_REVIEW`.

**Affected files (dự kiến):** `docs/content/levels/3d-05.md`, `docs/content/3d-manifest.json`.

**Implementation steps / subtasks:**

1. `LL-044-T04-S01` — Viết cảnh/vật thể/mức chi tiết/camera/tương tác và điều kiện thắng/sai/feedback của 3d-05.
2. `LL-044-T04-S02` — Ghi object/animation names và nguồn dự kiến; DEV3D/ART3D rà khả thi, cập nhật estimate cảnh/logic/QA.

**Acceptance criteria:**

- Script có asset manifest và ≥3 sai/lạ; ý tưởng khớp catalog.
- Có review khả thi, scope mechanic mới được tách trước khi triển khai; không tự thiết kế câu đố chưa được phép.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

**Manual verification:**

- DEV3D + ART3D review và PO xác nhận nội dung.

### LL-034-T01 — Chuẩn bị mô hình web 3D-01

Epic E6 → Feature F-034 → Story LL-034. **P1 · XS · 1 SP** · SP-04 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo hoặc chọn model theo manifest 3d-01 và nguồn được phép; đối chiếu object/material/animation names. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-016-T03](BACKLOG.md#ll-016-t03), [LL-033-T01](BACKLOG.md#ll-033-t01). **Decision/evidence gates:** `Q10-assets`.

**Affected files (dự kiến):** `public/assets/levels/3d-01/`, `docs/assets/ledger.json`.

**Implementation steps / subtasks:**

1. `LL-034-T01-S01` — Tạo hoặc chọn model theo manifest 3d-01 và nguồn được phép; đối chiếu object/material/animation names.
2. `LL-034-T01-S02` — Xuất GLB/glTF và texture tối ưu; ghi license/attribution; không mua hoặc bịa asset đã có.

**Acceptance criteria:**

- Model đủ vật thể đúng script, tên object/animation ổn định.
- Nguồn/giấy phép từng tài nguyên rõ, chưa có file thật thì chưa done.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run assets:check -- --level 3d-01
```

**Manual verification:**

- ART3D kiểm tra vật thể và hình thức.

### LL-034-T02 — Kiểm chứng model 3D-01 trong scene mẫu

Epic E6 → Feature F-034 → Story LL-034. **P1 · XS · 1 SP** · SP-04 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Tạo/mở rộng assets:check cho GLB/glTF/texture và tham chiếu budget JSON, không dùng ngưỡng hardcode khác. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-034-T01](BACKLOG.md#ll-034-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `scripts/check-assets.mjs`, `docs/evidence/LL-034-T02.md`, `package.json`.

**Implementation steps / subtasks:**

1. `LL-034-T02-S01` — Tạo/mở rộng assets:check cho GLB/glTF/texture và tham chiếu budget JSON, không dùng ngưỡng hardcode khác.
2. `LL-034-T02-S02` — Nạp model trong scene mẫu, kiểm MB/poly/draw calls, camera/object ids và lỗi decode.

**Acceptance criteria:**

- Asset checker có exit code không-zero khi vượt budget/thiếu file/name.
- Model render đúng trên scene host và nằm trong budget; ledger đủ nguồn.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run assets:check -- --level 3d-01
npm run build
```

**Manual verification:**

- Mở scene mẫu và đối chiếu manifest/hình thức.

### LL-045-T01 — Chuẩn bị mô hình web 3D-02

Epic E6 → Feature F-045 → Story LL-045. **P1 · XS · 1 SP** · SP-06 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo hoặc chọn model theo manifest 3d-02 và nguồn được phép; đối chiếu object/material/animation names. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-016-T03](BACKLOG.md#ll-016-t03), [LL-044-T01](BACKLOG.md#ll-044-t01), [LL-044-T02](BACKLOG.md#ll-044-t02), [LL-044-T03](BACKLOG.md#ll-044-t03), [LL-044-T04](BACKLOG.md#ll-044-t04), [LL-022-T02](BACKLOG.md#ll-022-t02). **Decision/evidence gates:** `Q10-assets`.

**Affected files (dự kiến):** `public/assets/levels/3d-02/`, `docs/assets/ledger.json`.

**Implementation steps / subtasks:**

1. `LL-045-T01-S01` — Tạo hoặc chọn model theo manifest 3d-02 và nguồn được phép; đối chiếu object/material/animation names.
2. `LL-045-T01-S02` — Xuất GLB/glTF và texture tối ưu; ghi license/attribution; không mua hoặc bịa asset đã có.

**Acceptance criteria:**

- Model đủ vật thể đúng script, tên object/animation ổn định.
- Nguồn/giấy phép từng tài nguyên rõ, chưa có file thật thì chưa done.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run assets:check -- --level 3d-02
```

**Manual verification:**

- ART3D kiểm tra vật thể và hình thức.

### LL-045-T02 — Kiểm chứng model 3D-02 trong scene mẫu

Epic E6 → Feature F-045 → Story LL-045. **P1 · XS · 1 SP** · SP-06 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Tạo/mở rộng assets:check cho GLB/glTF/texture và tham chiếu budget JSON, không dùng ngưỡng hardcode khác. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-045-T01](BACKLOG.md#ll-045-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `scripts/check-assets.mjs`, `docs/evidence/LL-045-T02.md`, `package.json`.

**Implementation steps / subtasks:**

1. `LL-045-T02-S01` — Tạo/mở rộng assets:check cho GLB/glTF/texture và tham chiếu budget JSON, không dùng ngưỡng hardcode khác.
2. `LL-045-T02-S02` — Nạp model trong scene mẫu, kiểm MB/poly/draw calls, camera/object ids và lỗi decode.

**Acceptance criteria:**

- Asset checker có exit code không-zero khi vượt budget/thiếu file/name.
- Model render đúng trên scene host và nằm trong budget; ledger đủ nguồn.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run assets:check -- --level 3d-02
npm run build
```

**Manual verification:**

- Mở scene mẫu và đối chiếu manifest/hình thức.

### LL-046-T01 — Chuẩn bị mô hình web 3D-03

Epic E6 → Feature F-046 → Story LL-046. **P1 · XS · 1 SP** · SP-07 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo hoặc chọn model theo manifest 3d-03 và nguồn được phép; đối chiếu object/material/animation names. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-016-T03](BACKLOG.md#ll-016-t03), [LL-044-T01](BACKLOG.md#ll-044-t01), [LL-044-T02](BACKLOG.md#ll-044-t02), [LL-044-T03](BACKLOG.md#ll-044-t03), [LL-044-T04](BACKLOG.md#ll-044-t04), [LL-022-T02](BACKLOG.md#ll-022-t02). **Decision/evidence gates:** `Q10-assets`.

**Affected files (dự kiến):** `public/assets/levels/3d-03/`, `docs/assets/ledger.json`.

**Implementation steps / subtasks:**

1. `LL-046-T01-S01` — Tạo hoặc chọn model theo manifest 3d-03 và nguồn được phép; đối chiếu object/material/animation names.
2. `LL-046-T01-S02` — Xuất GLB/glTF và texture tối ưu; ghi license/attribution; không mua hoặc bịa asset đã có.

**Acceptance criteria:**

- Model đủ vật thể đúng script, tên object/animation ổn định.
- Nguồn/giấy phép từng tài nguyên rõ, chưa có file thật thì chưa done.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run assets:check -- --level 3d-03
```

**Manual verification:**

- ART3D kiểm tra vật thể và hình thức.

### LL-046-T02 — Kiểm chứng model 3D-03 trong scene mẫu

Epic E6 → Feature F-046 → Story LL-046. **P1 · XS · 1 SP** · SP-07 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Tạo/mở rộng assets:check cho GLB/glTF/texture và tham chiếu budget JSON, không dùng ngưỡng hardcode khác. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-046-T01](BACKLOG.md#ll-046-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `scripts/check-assets.mjs`, `docs/evidence/LL-046-T02.md`, `package.json`.

**Implementation steps / subtasks:**

1. `LL-046-T02-S01` — Tạo/mở rộng assets:check cho GLB/glTF/texture và tham chiếu budget JSON, không dùng ngưỡng hardcode khác.
2. `LL-046-T02-S02` — Nạp model trong scene mẫu, kiểm MB/poly/draw calls, camera/object ids và lỗi decode.

**Acceptance criteria:**

- Asset checker có exit code không-zero khi vượt budget/thiếu file/name.
- Model render đúng trên scene host và nằm trong budget; ledger đủ nguồn.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run assets:check -- --level 3d-03
npm run build
```

**Manual verification:**

- Mở scene mẫu và đối chiếu manifest/hình thức.

### LL-035-T01 — Chuẩn bị mô hình web 3D-04

Epic E6 → Feature F-035 → Story LL-035. **P1 · XS · 1 SP** · SP-08 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo hoặc chọn model theo manifest 3d-04 và nguồn được phép; đối chiếu object/material/animation names. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-016-T03](BACKLOG.md#ll-016-t03), [LL-044-T01](BACKLOG.md#ll-044-t01), [LL-044-T02](BACKLOG.md#ll-044-t02), [LL-044-T03](BACKLOG.md#ll-044-t03), [LL-044-T04](BACKLOG.md#ll-044-t04), [LL-022-T02](BACKLOG.md#ll-022-t02). **Decision/evidence gates:** `Q10-assets`.

**Affected files (dự kiến):** `public/assets/levels/3d-04/`, `docs/assets/ledger.json`.

**Implementation steps / subtasks:**

1. `LL-035-T01-S01` — Tạo hoặc chọn model theo manifest 3d-04 và nguồn được phép; đối chiếu object/material/animation names.
2. `LL-035-T01-S02` — Xuất GLB/glTF và texture tối ưu; ghi license/attribution; không mua hoặc bịa asset đã có.

**Acceptance criteria:**

- Model đủ vật thể đúng script, tên object/animation ổn định.
- Nguồn/giấy phép từng tài nguyên rõ, chưa có file thật thì chưa done.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run assets:check -- --level 3d-04
```

**Manual verification:**

- ART3D kiểm tra vật thể và hình thức.

### LL-035-T02 — Kiểm chứng model 3D-04 trong scene mẫu

Epic E6 → Feature F-035 → Story LL-035. **P1 · XS · 1 SP** · SP-08 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Tạo/mở rộng assets:check cho GLB/glTF/texture và tham chiếu budget JSON, không dùng ngưỡng hardcode khác. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-035-T01](BACKLOG.md#ll-035-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `scripts/check-assets.mjs`, `docs/evidence/LL-035-T02.md`, `package.json`.

**Implementation steps / subtasks:**

1. `LL-035-T02-S01` — Tạo/mở rộng assets:check cho GLB/glTF/texture và tham chiếu budget JSON, không dùng ngưỡng hardcode khác.
2. `LL-035-T02-S02` — Nạp model trong scene mẫu, kiểm MB/poly/draw calls, camera/object ids và lỗi decode.

**Acceptance criteria:**

- Asset checker có exit code không-zero khi vượt budget/thiếu file/name.
- Model render đúng trên scene host và nằm trong budget; ledger đủ nguồn.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run assets:check -- --level 3d-04
npm run build
```

**Manual verification:**

- Mở scene mẫu và đối chiếu manifest/hình thức.

### LL-047-T01 — Chuẩn bị mô hình web 3D-05

Epic E6 → Feature F-047 → Story LL-047. **P1 · XS · 1 SP** · SP-09 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo hoặc chọn model theo manifest 3d-05 và nguồn được phép; đối chiếu object/material/animation names. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-016-T03](BACKLOG.md#ll-016-t03), [LL-044-T01](BACKLOG.md#ll-044-t01), [LL-044-T02](BACKLOG.md#ll-044-t02), [LL-044-T03](BACKLOG.md#ll-044-t03), [LL-044-T04](BACKLOG.md#ll-044-t04), [LL-022-T02](BACKLOG.md#ll-022-t02). **Decision/evidence gates:** `Q10-assets`.

**Affected files (dự kiến):** `public/assets/levels/3d-05/`, `docs/assets/ledger.json`.

**Implementation steps / subtasks:**

1. `LL-047-T01-S01` — Tạo hoặc chọn model theo manifest 3d-05 và nguồn được phép; đối chiếu object/material/animation names.
2. `LL-047-T01-S02` — Xuất GLB/glTF và texture tối ưu; ghi license/attribution; không mua hoặc bịa asset đã có.

**Acceptance criteria:**

- Model đủ vật thể đúng script, tên object/animation ổn định.
- Nguồn/giấy phép từng tài nguyên rõ, chưa có file thật thì chưa done.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run assets:check -- --level 3d-05
```

**Manual verification:**

- ART3D kiểm tra vật thể và hình thức.

### LL-047-T02 — Kiểm chứng model 3D-05 trong scene mẫu

Epic E6 → Feature F-047 → Story LL-047. **P1 · XS · 1 SP** · SP-09 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Tạo/mở rộng assets:check cho GLB/glTF/texture và tham chiếu budget JSON, không dùng ngưỡng hardcode khác. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-047-T01](BACKLOG.md#ll-047-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `scripts/check-assets.mjs`, `docs/evidence/LL-047-T02.md`, `package.json`.

**Implementation steps / subtasks:**

1. `LL-047-T02-S01` — Tạo/mở rộng assets:check cho GLB/glTF/texture và tham chiếu budget JSON, không dùng ngưỡng hardcode khác.
2. `LL-047-T02-S02` — Nạp model trong scene mẫu, kiểm MB/poly/draw calls, camera/object ids và lỗi decode.

**Acceptance criteria:**

- Asset checker có exit code không-zero khi vượt budget/thiếu file/name.
- Model render đúng trên scene host và nằm trong budget; ledger đủ nguồn.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run assets:check -- --level 3d-05
npm run build
```

**Manual verification:**

- Mở scene mẫu và đối chiếu manifest/hình thức.

### LL-036-T01 — Rà toàn bộ văn bản bằng người khác tác giả

Epic E6 → Feature F-036 → Story LL-036. **P2 · XS · 1 SP** · SP-10 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Trích prompt/feedback/lời giải 25 màn thành checklist, gắn tác giả và người đọc khác tác giả. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-029-T05](BACKLOG.md#ll-029-t05), [LL-030-T05](BACKLOG.md#ll-030-t05), [LL-031-T05](BACKLOG.md#ll-031-t05), [LL-032-T05](BACKLOG.md#ll-032-t05), [LL-033-T01](BACKLOG.md#ll-033-t01), [LL-044-T01](BACKLOG.md#ll-044-t01), [LL-044-T02](BACKLOG.md#ll-044-t02), [LL-044-T03](BACKLOG.md#ll-044-t03), [LL-044-T04](BACKLOG.md#ll-044-t04). **Decision/evidence gates:** `COPY_REVIEW`.

**Affected files (dự kiến):** `docs/content/copy-review.md`, `docs/content/levels/`.

**Implementation steps / subtasks:**

1. `LL-036-T01-S01` — Trích prompt/feedback/lời giải 25 màn thành checklist, gắn tác giả và người đọc khác tác giả.
2. `LL-036-T01-S02` — Ghi mọi lỗi chính tả/giọng văn, các câu chơi chữ nhạy dấu và cách sửa.

**Acceptance criteria:**

- 25 màn được đọc bởi reviewer khác tác giả, có danh sách sửa/nhận xét.
- Không dùng AI tự duyệt làm bằng chứng người khác tác giả đã review.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
```

**Manual verification:**

- Reviewer khác tác giả ký nhận từng màn.

### LL-036-T02 — Đồng bộ bản sửa và kiểm đáp án nhạy dấu

Epic E6 → Feature F-036 → Story LL-036. **P2 · XS · 1 SP** · SP-10 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Áp sửa đã duyệt vào dữ liệu game, không thay luật thắng ngầm. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-036-T01](BACKLOG.md#ll-036-t01), [LL-043-T02](BACKLOG.md#ll-043-t02), [LL-010-T05](BACKLOG.md#ll-010-t05), [LL-011-T05](BACKLOG.md#ll-011-t05), [LL-012-T05](BACKLOG.md#ll-012-t05), [LL-013-T05](BACKLOG.md#ll-013-t05), [LL-017-T02](BACKLOG.md#ll-017-t02), [LL-018-T02](BACKLOG.md#ll-018-t02), [LL-019-T02](BACKLOG.md#ll-019-t02), [LL-020-T02](BACKLOG.md#ll-020-t02), [LL-021-T02](BACKLOG.md#ll-021-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `content/levels/`, `tests/unit/answer-cases.test.ts`, `docs/content/copy-review.md`.

**Implementation steps / subtasks:**

1. `LL-036-T02-S01` — Áp sửa đã duyệt vào dữ liệu game, không thay luật thắng ngầm.
2. `LL-036-T02-S02` — Chạy có/không dấu cho câu chơi chữ theo config và đối chiếu toàn bộ text hiển thị.

**Acceptance criteria:**

- Mọi mục sửa đóng với diff/evidence; không mất text khi đồng bộ.
- Câu nhạy dấu đúng với accent policy từng màn; không alias sai làm thắng.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run content:validate
npm run test:unit -- --run tests/unit/answer-cases.test.ts
```

### LL-037-T01 — Tổng hợp ledger tài nguyên và câu đố

Epic E7 → Feature F-037 → Story LL-037. **P1 · XS · 1 SP** · SP-10 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Gộp font, hình, model, câu đố và thư viện theo file/id/source/license/attribution. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T04](BACKLOG.md#ai-t04), [LL-029-T05](BACKLOG.md#ll-029-t05), [LL-030-T05](BACKLOG.md#ll-030-t05), [LL-031-T05](BACKLOG.md#ll-031-t05), [LL-032-T05](BACKLOG.md#ll-032-t05), [LL-034-T02](BACKLOG.md#ll-034-t02), [LL-035-T02](BACKLOG.md#ll-035-t02), [LL-045-T02](BACKLOG.md#ll-045-t02), [LL-046-T02](BACKLOG.md#ll-046-t02), [LL-047-T02](BACKLOG.md#ll-047-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `docs/assets/ledger.json`, `scripts/check-licenses.mjs`, `package.json`.

**Implementation steps / subtasks:**

1. `LL-037-T01-S01` — Gộp font, hình, model, câu đố và thư viện theo file/id/source/license/attribution.
2. `LL-037-T01-S02` — Tạo licenses:check so khớp manifest/bundle/lockfile với ledger, không xác nhận giấy phép chỉ theo tên.

**Acceptance criteria:**

- Mọi tài nguyên dự kiến phát hành có nguồn, giấy phép và ghi công tương ứng.
- Checker fail khi asset/nguồn thiếu, câu đố chưa rõ hoặc license không được phép.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run licenses:check
```

### LL-037-T02 — Rà giấy phép và thay hoặc gỡ nguồn chưa rõ

Epic E7 → Feature F-037 → Story LL-037. **P1 · XS · 1 SP** · SP-10 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Đối chiếu giấy phép thực của từng nguồn, xác nhận attribution cần giữ. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-037-T01](BACKLOG.md#ll-037-t01). **Decision/evidence gates:** `LICENSE_REVIEW`.

**Affected files (dự kiến):** `docs/assets/ledger.json`, `docs/assets/license-review.md`, `public/assets/`.

**Implementation steps / subtasks:**

1. `LL-037-T02-S01` — Đối chiếu giấy phép thực của từng nguồn, xác nhận attribution cần giữ.
2. `LL-037-T02-S02` — Gỡ/thay tài nguyên không rõ quyền, chạy lại affected level tests và ledger checker.

**Acceptance criteria:**

- Không còn unknown license trong bản release; người có quyền xác nhận review.
- Asset thay không đổi lời giải hoặc làm mất object id; ghi phạm vi test lại.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run licenses:check
npm run assets:check
npm run content:validate
```

**Manual verification:**

- PO/người quản lý asset xác nhận quyền sử dụng và ghi công.

### LL-038-T01 — Kiểm thử nội bộ 2D-01…10

Epic E7 → Feature F-038 → Story LL-038. **P1 · S · 2 SP** · SP-11 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Chạy từng màn 2D-01…10 trên thiết bị chuẩn, đúng/≥3 sai/lạ/reset/exit/progress. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-007-T03](BACKLOG.md#ll-007-t03), [LL-010-T01](BACKLOG.md#ll-010-t01), [LL-010-T02](BACKLOG.md#ll-010-t02), [LL-010-T03](BACKLOG.md#ll-010-t03), [LL-010-T04](BACKLOG.md#ll-010-t04), [LL-010-T05](BACKLOG.md#ll-010-t05), [LL-011-T01](BACKLOG.md#ll-011-t01), [LL-011-T02](BACKLOG.md#ll-011-t02), [LL-011-T03](BACKLOG.md#ll-011-t03), [LL-011-T04](BACKLOG.md#ll-011-t04), [LL-011-T05](BACKLOG.md#ll-011-t05), [LL-012-T01](BACKLOG.md#ll-012-t01), [LL-012-T02](BACKLOG.md#ll-012-t02), [LL-012-T03](BACKLOG.md#ll-012-t03), [LL-012-T04](BACKLOG.md#ll-012-t04), [LL-012-T05](BACKLOG.md#ll-012-t05), [LL-013-T01](BACKLOG.md#ll-013-t01), [LL-013-T02](BACKLOG.md#ll-013-t02), [LL-013-T03](BACKLOG.md#ll-013-t03), [LL-013-T04](BACKLOG.md#ll-013-t04), [LL-013-T05](BACKLOG.md#ll-013-t05), [LL-017-T03](BACKLOG.md#ll-017-t03), [LL-018-T03](BACKLOG.md#ll-018-t03), [LL-019-T03](BACKLOG.md#ll-019-t03), [LL-020-T03](BACKLOG.md#ll-020-t03), [LL-021-T03](BACKLOG.md#ll-021-t03), [LL-025-T01](BACKLOG.md#ll-025-t01), [LL-048-T02](BACKLOG.md#ll-048-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `tests/e2e/levels/`, `docs/qa/playthrough-01.md`, `docs/qa/defects.json`, `tests/e2e/levels/2d-01.spec.ts`, `tests/e2e/levels/2d-02.spec.ts`, `tests/e2e/levels/2d-03.spec.ts`, `tests/e2e/levels/2d-04.spec.ts`, `tests/e2e/levels/2d-05.spec.ts`, `tests/e2e/levels/2d-06.spec.ts`, `tests/e2e/levels/2d-07.spec.ts`, `tests/e2e/levels/2d-08.spec.ts`, `tests/e2e/levels/2d-09.spec.ts`, `tests/e2e/levels/2d-10.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-038-T01-S01` — Chạy từng màn 2D-01…10 trên thiết bị chuẩn, đúng/≥3 sai/lạ/reset/exit/progress.
2. `LL-038-T01-S02` — Ghi kết quả từng id, bước tái hiện, thiết bị và ảnh khi lỗi; phân severity và owner.

**Acceptance criteria:**

- Mỗi id trong nhóm có pass/fail thực, không bỏ màn hoặc tính skipped thành pass.
- Lỗi được gán owner, repro và evidence; không suy ra zero bug từ test chưa chạy.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/levels/2d-01.spec.ts tests/e2e/levels/2d-02.spec.ts tests/e2e/levels/2d-03.spec.ts tests/e2e/levels/2d-04.spec.ts tests/e2e/levels/2d-05.spec.ts tests/e2e/levels/2d-06.spec.ts tests/e2e/levels/2d-07.spec.ts tests/e2e/levels/2d-08.spec.ts tests/e2e/levels/2d-09.spec.ts tests/e2e/levels/2d-10.spec.ts
```

**Manual verification:**

- Playthrough trên thiết bị chuẩn đã chốt, ghi mọi sai khác.

### LL-038-T02 — Kiểm thử nội bộ 2D-11…20

Epic E7 → Feature F-038 → Story LL-038. **P1 · S · 2 SP** · SP-11 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Chạy từng màn 2D-11…20 trên thiết bị chuẩn, đúng/≥3 sai/lạ/reset/exit/progress. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-007-T03](BACKLOG.md#ll-007-t03), [LL-010-T01](BACKLOG.md#ll-010-t01), [LL-010-T02](BACKLOG.md#ll-010-t02), [LL-010-T03](BACKLOG.md#ll-010-t03), [LL-010-T04](BACKLOG.md#ll-010-t04), [LL-010-T05](BACKLOG.md#ll-010-t05), [LL-011-T01](BACKLOG.md#ll-011-t01), [LL-011-T02](BACKLOG.md#ll-011-t02), [LL-011-T03](BACKLOG.md#ll-011-t03), [LL-011-T04](BACKLOG.md#ll-011-t04), [LL-011-T05](BACKLOG.md#ll-011-t05), [LL-012-T01](BACKLOG.md#ll-012-t01), [LL-012-T02](BACKLOG.md#ll-012-t02), [LL-012-T03](BACKLOG.md#ll-012-t03), [LL-012-T04](BACKLOG.md#ll-012-t04), [LL-012-T05](BACKLOG.md#ll-012-t05), [LL-013-T01](BACKLOG.md#ll-013-t01), [LL-013-T02](BACKLOG.md#ll-013-t02), [LL-013-T03](BACKLOG.md#ll-013-t03), [LL-013-T04](BACKLOG.md#ll-013-t04), [LL-013-T05](BACKLOG.md#ll-013-t05), [LL-017-T03](BACKLOG.md#ll-017-t03), [LL-018-T03](BACKLOG.md#ll-018-t03), [LL-019-T03](BACKLOG.md#ll-019-t03), [LL-020-T03](BACKLOG.md#ll-020-t03), [LL-021-T03](BACKLOG.md#ll-021-t03), [LL-025-T01](BACKLOG.md#ll-025-t01), [LL-048-T02](BACKLOG.md#ll-048-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `tests/e2e/levels/`, `docs/qa/playthrough-02.md`, `docs/qa/defects.json`, `tests/e2e/levels/2d-11.spec.ts`, `tests/e2e/levels/2d-12.spec.ts`, `tests/e2e/levels/2d-13.spec.ts`, `tests/e2e/levels/2d-14.spec.ts`, `tests/e2e/levels/2d-15.spec.ts`, `tests/e2e/levels/2d-16.spec.ts`, `tests/e2e/levels/2d-17.spec.ts`, `tests/e2e/levels/2d-18.spec.ts`, `tests/e2e/levels/2d-19.spec.ts`, `tests/e2e/levels/2d-20.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-038-T02-S01` — Chạy từng màn 2D-11…20 trên thiết bị chuẩn, đúng/≥3 sai/lạ/reset/exit/progress.
2. `LL-038-T02-S02` — Ghi kết quả từng id, bước tái hiện, thiết bị và ảnh khi lỗi; phân severity và owner.

**Acceptance criteria:**

- Mỗi id trong nhóm có pass/fail thực, không bỏ màn hoặc tính skipped thành pass.
- Lỗi được gán owner, repro và evidence; không suy ra zero bug từ test chưa chạy.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/levels/2d-11.spec.ts tests/e2e/levels/2d-12.spec.ts tests/e2e/levels/2d-13.spec.ts tests/e2e/levels/2d-14.spec.ts tests/e2e/levels/2d-15.spec.ts tests/e2e/levels/2d-16.spec.ts tests/e2e/levels/2d-17.spec.ts tests/e2e/levels/2d-18.spec.ts tests/e2e/levels/2d-19.spec.ts tests/e2e/levels/2d-20.spec.ts
```

**Manual verification:**

- Playthrough trên thiết bị chuẩn đã chốt, ghi mọi sai khác.

### LL-038-T03 — Kiểm thử nội bộ 3D-01…05

Epic E7 → Feature F-038 → Story LL-038. **P1 · S · 2 SP** · SP-11 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Chạy từng màn 3D-01…05 trên thiết bị chuẩn, đúng/≥3 sai/lạ/reset/exit/progress. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-007-T03](BACKLOG.md#ll-007-t03), [LL-010-T01](BACKLOG.md#ll-010-t01), [LL-010-T02](BACKLOG.md#ll-010-t02), [LL-010-T03](BACKLOG.md#ll-010-t03), [LL-010-T04](BACKLOG.md#ll-010-t04), [LL-010-T05](BACKLOG.md#ll-010-t05), [LL-011-T01](BACKLOG.md#ll-011-t01), [LL-011-T02](BACKLOG.md#ll-011-t02), [LL-011-T03](BACKLOG.md#ll-011-t03), [LL-011-T04](BACKLOG.md#ll-011-t04), [LL-011-T05](BACKLOG.md#ll-011-t05), [LL-012-T01](BACKLOG.md#ll-012-t01), [LL-012-T02](BACKLOG.md#ll-012-t02), [LL-012-T03](BACKLOG.md#ll-012-t03), [LL-012-T04](BACKLOG.md#ll-012-t04), [LL-012-T05](BACKLOG.md#ll-012-t05), [LL-013-T01](BACKLOG.md#ll-013-t01), [LL-013-T02](BACKLOG.md#ll-013-t02), [LL-013-T03](BACKLOG.md#ll-013-t03), [LL-013-T04](BACKLOG.md#ll-013-t04), [LL-013-T05](BACKLOG.md#ll-013-t05), [LL-017-T03](BACKLOG.md#ll-017-t03), [LL-018-T03](BACKLOG.md#ll-018-t03), [LL-019-T03](BACKLOG.md#ll-019-t03), [LL-020-T03](BACKLOG.md#ll-020-t03), [LL-021-T03](BACKLOG.md#ll-021-t03), [LL-025-T01](BACKLOG.md#ll-025-t01), [LL-048-T02](BACKLOG.md#ll-048-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `tests/e2e/levels/`, `docs/qa/playthrough-03.md`, `docs/qa/defects.json`, `tests/e2e/levels/3d-01.spec.ts`, `tests/e2e/levels/3d-02.spec.ts`, `tests/e2e/levels/3d-03.spec.ts`, `tests/e2e/levels/3d-04.spec.ts`, `tests/e2e/levels/3d-05.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-038-T03-S01` — Chạy từng màn 3D-01…05 trên thiết bị chuẩn, đúng/≥3 sai/lạ/reset/exit/progress.
2. `LL-038-T03-S02` — Ghi kết quả từng id, bước tái hiện, thiết bị và ảnh khi lỗi; phân severity và owner.

**Acceptance criteria:**

- Mỗi id trong nhóm có pass/fail thực, không bỏ màn hoặc tính skipped thành pass.
- Lỗi được gán owner, repro và evidence; không suy ra zero bug từ test chưa chạy.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/levels/3d-01.spec.ts tests/e2e/levels/3d-02.spec.ts tests/e2e/levels/3d-03.spec.ts tests/e2e/levels/3d-04.spec.ts tests/e2e/levels/3d-05.spec.ts
```

**Manual verification:**

- Playthrough trên thiết bị chuẩn đã chốt, ghi mọi sai khác.

### LL-039-T01 — Chạy ma trận browser và WebGL fallback

Epic E7 → Feature F-039 → Story LL-039. **P1 · XS · 1 SP** · SP-11 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Cấu hình browser projects theo matrix, kiểm selector/≥1 mỗi mechanic 2D/≥1 3D. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T02](BACKLOG.md#ai-t02), [LL-025-T01](BACKLOG.md#ll-025-t01), [LL-038-T01](BACKLOG.md#ll-038-t01), [LL-038-T02](BACKLOG.md#ll-038-t02), [LL-038-T03](BACKLOG.md#ll-038-t03). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `playwright.config.ts`, `tests/e2e/compatibility.spec.ts`, `docs/qa/browser-matrix.md`.

**Implementation steps / subtasks:**

1. `LL-039-T01-S01` — Cấu hình browser projects theo matrix, kiểm selector/≥1 mỗi mechanic 2D/≥1 3D.
2. `LL-039-T01-S02` — Test no-WebGL, loading error, orientation và banner offline; ghi pass/fail mỗi ô.

**Acceptance criteria:**

- Ma trận có kết quả và defect links, no-WebGL không trắng trang.
- Playwright WebKit chỉ là mô phỏng, không ghi như Safari máy thật.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/compatibility.spec.ts
```

### LL-039-T02 — Kiểm chứng ma trận trên thiết bị thật

Epic E7 → Feature F-039 → Story LL-039. **P1 · S · 2 SP** · SP-11 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Chạy các ô thiết bị thật theo Q3 trên selector, các mechanic và 3D; đối chiếu simulator. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-039-T01](BACKLOG.md#ll-039-t01). **Decision/evidence gates:** `DEVICE_ACCESS`.

**Affected files (dự kiến):** `docs/qa/browser-matrix.md`, `docs/qa/defects.json`, `tests/e2e/compatibility.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-039-T02-S01` — Chạy các ô thiết bị thật theo Q3 trên selector, các mechanic và 3D; đối chiếu simulator.
2. `LL-039-T02-S02` — Ghi OS/browser/version, touch/camera/resize và phân loại lỗi.

**Acceptance criteria:**

- Các ô bắt buộc có evidence thực; thiếu máy giữ task chưa done.
- Mọi blocker/high có task khắc phục hoặc quyết định ghi hoãn hợp lệ theo release AC.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/compatibility.spec.ts
```

**Manual verification:**

- Chạy Safari/Chrome trên matrix thiết bị thật đã xác nhận.

### LL-040-T01 — Triage release defects và tạo task sửa độc lập

Epic E7 → Feature F-040 → Story LL-040. **P1 · XS · 1 SP** · SP-11 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Đối chiếu báo cáo 25 màn, matrix/low-end/license với DoD; tạo task DEF-NNN cho lỗi đã xác nhận. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-003-T02](BACKLOG.md#ll-003-t02), [AI-T01](BACKLOG.md#ai-t01), [LL-036-T02](BACKLOG.md#ll-036-t02), [LL-051-T02](BACKLOG.md#ll-051-t02), [LL-041-T02](BACKLOG.md#ll-041-t02), [LL-022-T02](BACKLOG.md#ll-022-t02), [LL-049-T04](BACKLOG.md#ll-049-t04), [LL-037-T02](BACKLOG.md#ll-037-t02), [LL-038-T01](BACKLOG.md#ll-038-t01), [LL-038-T02](BACKLOG.md#ll-038-t02), [LL-038-T03](BACKLOG.md#ll-038-t03), [LL-039-T02](BACKLOG.md#ll-039-t02), [LL-050-T01](BACKLOG.md#ll-050-t01), [LL-050-T02](BACKLOG.md#ll-050-t02), [LL-024-T01](BACKLOG.md#ll-024-t01), [LL-026-T01](BACKLOG.md#ll-026-t01), [LL-027-T01](BACKLOG.md#ll-027-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `docs/qa/defects.json`, `docs/ai-planning/tasks.json`, `docs/qa/release-checklist.md`.

**Implementation steps / subtasks:**

1. `LL-040-T01-S01` — Đối chiếu báo cáo 25 màn, matrix/low-end/license với DoD; tạo task DEF-NNN cho lỗi đã xác nhận.
2. `LL-040-T01-S02` — Mỗi defect task chỉ một repro/module, ≤1 ngày, AC/test/regression và dependency vào release gate; nếu lớn tiếp tục chia.

**Acceptance criteria:**

- Mọi blocker/high có repro, owner, affected files, task ID và verify command cụ thể.
- Không bịa bug từ thiếu code; gate RC phụ thuộc tất cả defect blocker/high chưa được hoãn.
- Verifier release được tạo trong task RC kế tiếp; triage dùng báo cáo thực thay script chưa tồn tại.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
python3 docs/ai-planning/verify_plan.py
```

### LL-040-T02 — Chốt RC, release notes và DoD

Epic E7 → Feature F-040 → Story LL-040. **P1 · XS · 1 SP** · SP-11 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Tạo verify:release thu thập report thực, build/manifest và mọi AC DoD; không tự gán pass. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-040-T01](BACKLOG.md#ll-040-t01). **Decision/evidence gates:** `RELEASE_DEFECTS_RESOLVED`.

**Affected files (dự kiến):** `docs/releases/`, `docs/qa/release-checklist.md`, `scripts/verify-release.mjs`, `package.json`.

**Implementation steps / subtasks:**

1. `LL-040-T02-S01` — Tạo verify:release thu thập report thực, build/manifest và mọi AC DoD; không tự gán pass.
2. `LL-040-T02-S02` — Sau defect children được giải quyết, rerun affected regressions; ghi zero blocker, high còn lại chỉ khi PO ghi hoãn; chuẩn bị version/tag nhưng chưa publish.

**Acceptance criteria:**

- 0 blocker; high đã đóng hoặc PO hoãn bằng văn bản; toàn bộ DoD pass.
- RC chứa đúng 20 2D+5 3D, release notes ghi known issues/thiết bị không hỗ trợ.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run lint
npm run format:check
npm run typecheck
npm run test:unit -- --run
npm run test:integration -- --run
npm run build
npm run test:e2e
npm run content:validate
npm run assets:check
npm run licenses:check
npm run verify:release
```

### LL-040-T03 — Tag, triển khai bản duyệt và smoke đủ 25 màn

Epic E7 → Feature F-040 → Story LL-040. **P1 · XS · 1 SP** · SP-11 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Sau quyền release đã ghi, tag version đúng RC và triển khai artifact đã duyệt qua pipeline. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-040-T02](BACKLOG.md#ll-040-t02). **Decision/evidence gates:** `RELEASE_AUTHORIZATION`, `DEPLOY_ACCESS`.

**Affected files (dự kiến):** `scripts/verify-deployed.mjs`, `docs/releases/`, `docs/evidence/LL-040-T03.md`.

**Implementation steps / subtasks:**

1. `LL-040-T03-S01` — Sau quyền release đã ghi, tag version đúng RC và triển khai artifact đã duyệt qua pipeline.
2. `LL-040-T03-S02` — Dùng deployed verifier kiểm tra URL/revision, health và 25 màn đúng/sai/reset; ghi kết quả, rollback khi fail.

**Acceptance criteria:**

- URL có revision/tag khớp RC, health OK và 25 màn deployed đều qua smoke.
- Không dùng kết quả local thay deployed; fail thì rollback theo runbook, giữ task chưa done.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
node scripts/deploy-staging.mjs --execute
node scripts/verify-deployed.mjs --suite all-levels
```

**Manual verification:**

- Xác nhận quyền tag/publish/deploy và bản đã duyệt trước thao tác ngoài repo.

### LL-041-T01 — Đo tải ban đầu và thời gian chuyển màn

Epic E7 → Feature F-041 → Story LL-041. **P2 · XS · 1 SP** · SP-10 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Tạo perf:check đo production staging dưới profile 4G cố định, build hash và cold/warm cache. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T02](BACKLOG.md#ai-t02), [LL-003-T02](BACKLOG.md#ll-003-t02), [LL-010-T01](BACKLOG.md#ll-010-t01), [LL-010-T02](BACKLOG.md#ll-010-t02), [LL-010-T03](BACKLOG.md#ll-010-t03), [LL-010-T04](BACKLOG.md#ll-010-t04), [LL-010-T05](BACKLOG.md#ll-010-t05), [LL-011-T01](BACKLOG.md#ll-011-t01), [LL-011-T02](BACKLOG.md#ll-011-t02), [LL-011-T03](BACKLOG.md#ll-011-t03), [LL-011-T04](BACKLOG.md#ll-011-t04), [LL-011-T05](BACKLOG.md#ll-011-t05), [LL-012-T01](BACKLOG.md#ll-012-t01), [LL-012-T02](BACKLOG.md#ll-012-t02), [LL-012-T03](BACKLOG.md#ll-012-t03), [LL-012-T04](BACKLOG.md#ll-012-t04), [LL-012-T05](BACKLOG.md#ll-012-t05), [LL-013-T01](BACKLOG.md#ll-013-t01), [LL-013-T02](BACKLOG.md#ll-013-t02), [LL-013-T03](BACKLOG.md#ll-013-t03), [LL-013-T04](BACKLOG.md#ll-013-t04), [LL-013-T05](BACKLOG.md#ll-013-t05). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `scripts/measure-performance.mjs`, `docs/performance/web-baseline.md`, `package.json`.

**Implementation steps / subtasks:**

1. `LL-041-T01-S01` — Tạo perf:check đo production staging dưới profile 4G cố định, build hash và cold/warm cache.
2. `LL-041-T01-S02` — Ghi selector interactive, bytes initial và màn kế, bundle 3D tách khỏi đường 2D.
3. `LL-041-T01-S03` — Harness perf:check hỗ trợ profile 4g/low-end và kind 2d/3d; dùng cùng profile ID cho số đo trước/sau.

**Acceptance criteria:**

- Baseline có ≤3s selector, ≤1MB initial và ≤1s next dưới ngưỡng tạm; fail được ghi rõ.
- Không dùng dev server hoặc số đo một lần không profile làm kết luận release.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run perf:check -- --profile 4g
```

### LL-041-T02 — Tối ưu tải và prefetch màn kế

Epic E7 → Feature F-041 → Story LL-041. **P2 · XS · 1 SP** · SP-10 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Theo baseline giảm tải assets/bundle, lazy-load 3D và prefetch metadata/asset màn kế hữu hạn. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-041-T01](BACKLOG.md#ll-041-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/game/prefetch.ts`, `src/server/levels/file-repository.ts`, `src/features/levels/LevelGrid.tsx`, `docs/performance/web-after.md`, `tests/e2e/game-results.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-041-T02-S01` — Theo baseline giảm tải assets/bundle, lazy-load 3D và prefetch metadata/asset màn kế hữu hạn.
2. `LL-041-T02-S02` — Đo lại cùng profile, tránh prefetch toàn bộ 25 màn vượt ngân sách.

**Acceptance criteria:**

- Selector ≤3s, initial ≤1MB và next ≤1s theo ngưỡng tạm đã xác nhận hoặc rebaseline có PO duyệt.
- Prefetch lỗi không chặn game; 2D entry không tải Three.js.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run perf:check -- --profile 4g
npm run test:e2e -- tests/e2e/game-results.spec.ts
```

### LL-048-T01 — Xử lý lỗi màn và thử lại

Epic E2 → Feature F-048 → Story LL-048. **P1 · S · 2 SP** · SP-03 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Bọc lỗi render/nạp màn, typed repository errors, retry remount và đường về chọn màn. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-005-T03](BACKLOG.md#ll-005-t03). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/app/error.tsx`, `src/app/global-error.tsx`, `src/app/levels/[ordinal]/error.tsx`, `src/features/game/LevelErrorBoundary.tsx`, `tests/e2e/error-recovery.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-048-T01-S01` — Bọc lỗi render/nạp màn, typed repository errors, retry remount và đường về chọn màn.
2. `LL-048-T01-S02` — Global error có exit; không lộ stack hoặc secret; retry thành công phục hồi màn.

**Acceptance criteria:**

- Lỗi một màn không làm hỏng màn khác; không có trang trắng.
- Data failure/render exception có retry/exit, retry thành công và state reset đúng.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/error-recovery.spec.ts
```

### LL-048-T02 — Giữ màn đã nạp hoạt động khi mất mạng

Epic E2 → Feature F-048 → Story LL-048. **P1 · XS · 1 SP** · SP-03 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Hiện banner offline và dọn listener; màn đã tải tiếp tục thao tác theo grading decision. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-048-T01](BACKLOG.md#ll-048-t01), [AI-T05](BACKLOG.md#ai-t05). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/game/OfflineBanner.tsx`, `src/features/game/useOnlineStatus.ts`, `tests/e2e/offline.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-048-T02-S01` — Hiện banner offline và dọn listener; màn đã tải tiếp tục thao tác theo grading decision.
2. `LL-048-T02-S02` — Nếu server-grading được chọn, cache verifier được duyệt cho màn đang chơi hoặc giữ decision gate chưa giải quyết; không tự tuyên bố offline thắng được.

**Acceptance criteria:**

- Mất mạng không trắng trang, reset/exit và màn đã tải vẫn chơi theo contract Q8.
- Progress/event failures không chặn gameplay; retry online không double-submit.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/offline.spec.ts
```

### LL-049-T01 — Tạo bảng sự kiện và retention

Epic E7 → Feature F-049 → Story LL-049. **P2 · XS · 1 SP** · SP-10 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Thiết kế 5 event mở/thắng/sai/thoát/lỗi với event id, session, level, time, anonymous player, device class. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T04](BACKLOG.md#ai-t04), [LL-002-T02](BACKLOG.md#ll-002-t02), [LL-005-T03](BACKLOG.md#ll-005-t03), [LL-007-T03](BACKLOG.md#ll-007-t03). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `db/migrations/`, `src/server/analytics/schema.ts`, `tests/integration/analytics-schema.test.ts`.

**Implementation steps / subtasks:**

1. `LL-049-T01-S01` — Thiết kế 5 event mở/thắng/sai/thoát/lỗi với event id, session, level, time, anonymous player, device class.
2. `LL-049-T01-S02` — Thêm retention/index/delete theo data decision; không có tên/email/IP thô hoặc raw answer.

**Acceptance criteria:**

- Migration an toàn, event type/level validate; idempotency event id.
- Trường dữ liệu đúng quyết định Q5 và có cách xóa/retention.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run db:migrate
npm run test:integration -- --run tests/integration/analytics-schema.test.ts
```

### LL-049-T02 — Tạo API nhận sự kiện có kiểm soát

Epic E7 → Feature F-049 → Story LL-049. **P2 · S · 2 SP** · SP-10 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Validate allowlist fields/event types/level/cookie và giới hạn payload/batch theo contract. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-049-T01](BACKLOG.md#ll-049-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/app/api/events/route.ts`, `src/server/analytics/service.ts`, `tests/integration/events.test.ts`.

**Implementation steps / subtasks:**

1. `LL-049-T02-S01` — Validate allowlist fields/event types/level/cookie và giới hạn payload/batch theo contract.
2. `LL-049-T02-S02` — Deduplicate event id, typed DB errors, log không có body định danh.

**Acceptance criteria:**

- Body không hợp lệ bị reject, retry không đếm hai lần.
- Identity server-bound; lỗi ingest không làm lộ dữ liệu hay secrets.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:integration -- --run tests/integration/events.test.ts
```

### LL-049-T03 — Tạo ba truy vấn đo lường và fixture đối soát

Epic E7 → Feature F-049 → Story LL-049. **P2 · XS · 1 SP** · SP-10 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Định nghĩa mẫu số session cho win/fail/abandon, cách dedupe và khoảng thời gian. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-049-T02](BACKLOG.md#ll-049-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/server/analytics/queries.ts`, `tests/integration/analytics-queries.test.ts`, `docs/analytics.md`.

**Implementation steps / subtasks:**

1. `LL-049-T03-S01` — Định nghĩa mẫu số session cho win/fail/abandon, cách dedupe và khoảng thời gian.
2. `LL-049-T03-S02` — Viết win rate, avg wrong và abandon rate theo màn; fixture có session reopen/retry.

**Acceptance criteria:**

- Ba kết quả khớp fixture tính tay, tránh chia zero và event trùng.
- Không có UI dashboard mới ngoài scope; xuất query/documentation để PO đọc.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:integration -- --run tests/integration/analytics-queries.test.ts
```

### LL-049-T04 — Phát sự kiện không chặn vòng chơi

Epic E7 → Feature F-049 → Story LL-049. **P2 · XS · 1 SP** · SP-10 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Gắn 5 event vào vòng chơi qua queue giới hạn, abort/reset/exit đúng session. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-049-T03](BACKLOG.md#ll-049-t03). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/features/analytics/client.ts`, `src/features/game/useGameSession.ts`, `tests/e2e/analytics.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-049-T04-S01` — Gắn 5 event vào vòng chơi qua queue giới hạn, abort/reset/exit đúng session.
2. `LL-049-T04-S02` — Dùng best-effort flush/exit, retry idempotent; document mất sự kiện do unload không thể bảo đảm.

**Acceptance criteria:**

- Năm loại event đúng contract, không duplicate khi replay/reset hoặc retry.
- Ingest offline/timeout không đổi kết quả hoặc khóa tương tác, queue không tăng vô hạn.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:e2e -- tests/e2e/analytics.spec.ts
```

### LL-050-T01 — Đo máy yếu toàn bộ màn 2D

Epic E7 → Feature F-050 → Story LL-050. **P1 · XS · 1 SP** · SP-11 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Chạy 20 màn 2D trên máy yếu tham chiếu, ghi FPS và tải từng màn. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T02](BACKLOG.md#ai-t02), [LL-010-T01](BACKLOG.md#ll-010-t01), [LL-010-T02](BACKLOG.md#ll-010-t02), [LL-010-T03](BACKLOG.md#ll-010-t03), [LL-010-T04](BACKLOG.md#ll-010-t04), [LL-010-T05](BACKLOG.md#ll-010-t05), [LL-011-T01](BACKLOG.md#ll-011-t01), [LL-011-T02](BACKLOG.md#ll-011-t02), [LL-011-T03](BACKLOG.md#ll-011-t03), [LL-011-T04](BACKLOG.md#ll-011-t04), [LL-011-T05](BACKLOG.md#ll-011-t05), [LL-012-T01](BACKLOG.md#ll-012-t01), [LL-012-T02](BACKLOG.md#ll-012-t02), [LL-012-T03](BACKLOG.md#ll-012-t03), [LL-012-T04](BACKLOG.md#ll-012-t04), [LL-012-T05](BACKLOG.md#ll-012-t05), [LL-013-T01](BACKLOG.md#ll-013-t01), [LL-013-T02](BACKLOG.md#ll-013-t02), [LL-013-T03](BACKLOG.md#ll-013-t03), [LL-013-T04](BACKLOG.md#ll-013-t04), [LL-013-T05](BACKLOG.md#ll-013-t05), [LL-017-T03](BACKLOG.md#ll-017-t03), [LL-018-T03](BACKLOG.md#ll-018-t03), [LL-019-T03](BACKLOG.md#ll-019-t03), [LL-020-T03](BACKLOG.md#ll-020-t03), [LL-021-T03](BACKLOG.md#ll-021-t03), [LL-022-T02](BACKLOG.md#ll-022-t02). **Decision/evidence gates:** `DEVICE_ACCESS`.

**Affected files (dự kiến):** `docs/performance/low-end-2d.md`, `docs/qa/defects.json`.

**Implementation steps / subtasks:**

1. `LL-050-T01-S01` — Chạy 20 màn 2D trên máy yếu tham chiếu, ghi FPS và tải từng màn.
2. `LL-050-T01-S02` — Lặp lại CPU4x/4G và ghi riêng mô phỏng; tạo defect cho budget không đạt.

**Acceptance criteria:**

- Mỗi màn có số đo thật; 2D ≥30FPS tạm, 3D theo budget JSON.
- Vượt ngưỡng không ghi pass; xử lý tối ưu hoặc PO chấp nhận bằng văn bản theo source AC.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run perf:check -- --profile low-end --kind 2d
```

**Manual verification:**

- Đo trên thiết bị yếu thật và chạy lại mô phỏng CPU4x/4G.

### LL-050-T02 — Đo máy yếu toàn bộ màn 3D

Epic E7 → Feature F-050 → Story LL-050. **P1 · XS · 1 SP** · SP-11 (ứng viên) · `todo` / `decision_blocked`.

**Description:** Chạy 5 màn 3D trên máy yếu tham chiếu, ghi FPS và tải từng màn. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T02](BACKLOG.md#ai-t02), [LL-010-T01](BACKLOG.md#ll-010-t01), [LL-010-T02](BACKLOG.md#ll-010-t02), [LL-010-T03](BACKLOG.md#ll-010-t03), [LL-010-T04](BACKLOG.md#ll-010-t04), [LL-010-T05](BACKLOG.md#ll-010-t05), [LL-011-T01](BACKLOG.md#ll-011-t01), [LL-011-T02](BACKLOG.md#ll-011-t02), [LL-011-T03](BACKLOG.md#ll-011-t03), [LL-011-T04](BACKLOG.md#ll-011-t04), [LL-011-T05](BACKLOG.md#ll-011-t05), [LL-012-T01](BACKLOG.md#ll-012-t01), [LL-012-T02](BACKLOG.md#ll-012-t02), [LL-012-T03](BACKLOG.md#ll-012-t03), [LL-012-T04](BACKLOG.md#ll-012-t04), [LL-012-T05](BACKLOG.md#ll-012-t05), [LL-013-T01](BACKLOG.md#ll-013-t01), [LL-013-T02](BACKLOG.md#ll-013-t02), [LL-013-T03](BACKLOG.md#ll-013-t03), [LL-013-T04](BACKLOG.md#ll-013-t04), [LL-013-T05](BACKLOG.md#ll-013-t05), [LL-017-T03](BACKLOG.md#ll-017-t03), [LL-018-T03](BACKLOG.md#ll-018-t03), [LL-019-T03](BACKLOG.md#ll-019-t03), [LL-020-T03](BACKLOG.md#ll-020-t03), [LL-021-T03](BACKLOG.md#ll-021-t03), [LL-022-T02](BACKLOG.md#ll-022-t02). **Decision/evidence gates:** `DEVICE_ACCESS`.

**Affected files (dự kiến):** `docs/performance/low-end-3d.md`, `docs/qa/defects.json`.

**Implementation steps / subtasks:**

1. `LL-050-T02-S01` — Chạy 5 màn 3D trên máy yếu tham chiếu, ghi FPS và tải từng màn.
2. `LL-050-T02-S02` — Lặp lại CPU4x/4G và ghi riêng mô phỏng; tạo defect cho budget không đạt.

**Acceptance criteria:**

- Mỗi màn có số đo thật; 2D ≥30FPS tạm, 3D theo budget JSON.
- Vượt ngưỡng không ghi pass; xử lý tối ưu hoặc PO chấp nhận bằng văn bản theo source AC.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run perf:check -- --profile low-end --kind 3d
```

**Manual verification:**

- Đo trên thiết bị yếu thật và chạy lại mô phỏng CPU4x/4G.

### LL-051-T01 — Tạo trang ghi công và thông báo dữ liệu

Epic E7 → Feature F-051 → Story LL-051. **P2 · XS · 1 SP** · SP-10 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Sinh credits từ ledger đã review; mô tả dữ liệu thực đang lưu, retention và cách xóa. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [AI-T04](BACKLOG.md#ai-t04), [LL-007-T02](BACKLOG.md#ll-007-t02), [LL-049-T04](BACKLOG.md#ll-049-t04), [LL-023-T02](BACKLOG.md#ll-023-t02), [LL-037-T02](BACKLOG.md#ll-037-t02). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/app/about/page.tsx`, `src/components/layout/Footer.tsx`, `tests/e2e/about.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-051-T01-S01` — Sinh credits từ ledger đã review; mô tả dữ liệu thực đang lưu, retention và cách xóa.
2. `LL-051-T01-S02` — Link footer mọi màn hình chính; nội dung không gọi pseudonymous là hoàn toàn không nhận diện nếu quyết định đã ghi khác.

**Acceptance criteria:**

- Credits đủ attribution; notice đúng trường thực trong progress/events.
- Footer truy cập từ home/selector/game và link thông tin hoạt động.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run licenses:check
npm run test:e2e -- tests/e2e/about.spec.ts
```

### LL-051-T02 — Thực thi xóa dữ liệu người chơi hiện tại

Epic E7 → Feature F-051 → Story LL-051. **P2 · S · 2 SP** · SP-10 (ứng viên) · `todo` / `dependency_blocked`.

**Description:** Cho người chơi xóa progress/events của cookie hiện tại theo data decision; nếu policy chọn quy trình hỗ trợ thì có quy trình xác minh cụ thể thay API. Phạm vi chỉ gồm các file/khối trách nhiệm được liệt kê; file hiện chưa tồn tại là đường dẫn dự kiến.

**Dependencies:** [LL-051-T01](BACKLOG.md#ll-051-t01). **Decision/evidence gates:** Không có gate riêng; vẫn áp dụng DoD.

**Affected files (dự kiến):** `src/app/api/player/route.ts`, `src/server/progress/delete-player.ts`, `src/app/about/page.tsx`, `tests/integration/player-deletion.test.ts`, `tests/e2e/about.spec.ts`.

**Implementation steps / subtasks:**

1. `LL-051-T02-S01` — Cho người chơi xóa progress/events của cookie hiện tại theo data decision; nếu policy chọn quy trình hỗ trợ thì có quy trình xác minh cụ thể thay API.
2. `LL-051-T02-S02` — Reset cookie/session và UI, test lặp yêu cầu/DB lỗi/player khác; notice phản ánh cách đã thực hiện.

**Acceptance criteria:**

- Dữ liệu player hiện tại xóa đúng scope; player khác còn nguyên.
- DB lỗi không báo xóa thành công; reload player mới không còn progress cũ.

**Definition of Done:** D1–D4; các AC trên đạt và mọi manual check/gate dưới đây có bằng chứng đúng scope.

**Verification commands** (chạy từ repo root sau implementation/dependencies):

```sh
npm run test:integration -- --run tests/integration/player-deletion.test.ts
npm run test:e2e -- tests/e2e/about.spec.ts
```
