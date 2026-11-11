# Requirements và truy vết nguồn

Ngày khảo sát: **2026-11-10**, múi giờ Asia/Ho_Chi_Minh. Kế hoạch đề xuất; implementation bắt đầu 2026-11-11 với SP-00 (trạng thái hiện hành ở PROGRESS.md).

<!-- plan-stats: tasks=147; sprints=12; points=201 -->

## Thứ tự ưu tiên nguồn

Yêu cầu trực tiếp của người dùng > quyết định được xác nhận sau khảo sát > bảng chính `docs/backlog.md:39–91` > AC chi tiết nguồn > giả định của kế hoạch mới. Tài liệu cũ đang ở working tree, chưa được commit. Không coi đề xuất kiến trúc hay acceptance criteria bổ sung trong task là sản phẩm đã được chấp nhận.

## Baseline sản phẩm

- R-01: Game web Lắt Léo, tiếng Việt, bản thử 25 màn gồm 20 2D và năm 3D; đối tượng 15–35 tuổi (backlog:3,11,14).
- R-02: Stack yêu cầu Next.js, Three.js, PostgreSQL; version/ORM/renderer 2D chưa chọn (backlog:11).
- R-03: Nội dung ở repo qua LevelRepository; PostgreSQL lưu tiến độ và events; không login, default mọi màn mở sẵn (backlog:13). Q7/Q8 còn mở: đây là baseline, thay đổi cần replan.
- R-04: Tap/drag/choice/text cho 2D; pick/drag/camera cho 3D. Luật đáp án tiếng Việt cấu hình theo màn (LL-009/015/043).
- R-05: Win/wrong/retry/reset/exit/next; save không chặn game khi lỗi; lỗi màn có recovery và banner offline (LL-005/007/048).
- R-06: Mỗi model/level 3D bám ngân sách duy nhất ở LL-016; ngưỡng cuối chưa được duyệt. Source có tạm ≥30 FPS cho 2D/spike, heap ≤10% sau 20 vòng, feedback ≤1s, layout bốn viewport (LL-008/014/042).
- R-07: UI có font dấu đúng, đề ≥16px, contrast ≥4.5:1, touch targets ≥44×44px (LL-023/025/015).
- R-08: Analytics Should gồm năm events, ba query; không lưu tên/email/IP thô và không chặn gameplay (LL-049). Attribution/notice/cách xóa theo LL-037/051. Retention chưa chốt.
- R-09: Release đủ 25 màn win + ≥3 thao tác sai/lạ mỗi màn, browser/low-end matrix, zero blocker; high chỉ được hoãn bằng văn bản; deployed smoke và DoD (LL-038/039/040/050).

## Phạm vi và ưu tiên

Giữ toàn bộ 51 story: Must→P1, Should→P2, Could→P3. P0 được dùng cho blocker nền tảng/quyết định mở khóa nhiều task; P0 task không có nghĩa đổi MoSCoW của story. E0 là engineering enabler mới, gồm quyết định và test/CI; không phải epic sản phẩm thứ tám đã có ở nguồn.

Không bao gồm multiplayer, thanh toán, native app. Login, hints, audio, sharing, khóa tuần tự và nội dung màn trong DB chưa được đưa vào task; hai mục cuối chỉ thêm nếu Q7/Q8 thay đổi. CI/testing là phần bổ sung kỹ thuật để đáp ứng yêu cầu agent kiểm chứng, chưa phải tính năng game mới.

## Câu hỏi chưa xác nhận

| Gate | Nội dung | Baseline/ảnh hưởng |
|---|---|---|
| Q1 | Ngày bắt đầu và deadline? | Chưa dùng ngày 16–20/11/2026 như cam kết. |
| Q2 | Ai chịu trách nhiệm sản phẩm, 3D, đồ họa, review và bao nhiêu giờ mỗi tuần? | Capacity 20 SP/sprint chỉ là giả định của nguồn. |
| Q3 | Thiết bị thấp nhất, browser/version và chiều màn hình? | ≥30 FPS chỉ là ngưỡng tạm cho 2D/spike. |
| Q4 | Ngân sách hosting/DB, public/private và tài khoản triển khai? | Chưa có nhà cung cấp hoặc credential. |
| Q5 | Nguồn câu đố/assets, retention, cách xóa và trường analytics được phép? | Chỉ lập kế hoạch kỹ thuật, không suy ra chấp thuận pháp lý. |
| Q6 | Ai cung cấp hoặc cho phép AI sáng tác 25 câu đố và ai duyệt? | Không có script/asset thực trong repo. |
| Q7 | Giữ mọi màn mở sẵn và đặt 5 màn 3D ở ordinal nào? | All-open là baseline đã viết; thay đổi cần task riêng. |
| Q8-data | Giữ PostgreSQL cho tiến độ/events và nội dung ở repo? | Baseline của đầu backlog, chưa có implementation. |
| Q8-grading | Đánh giá đáp án ở client hay server, xử lý offline ra sao? | Server-only có thể xung đột yêu cầu màn đã nạp vẫn chơi offline. |
| Q9 | Có sensor/nhấn giữ ngoài tap/drag/choice/text/pick/camera? | Chuẩn hóa chữ theo từng màn là baseline. |
| Q10 | Hình khối/emoji hay minh họa; model tự tạo hay nguồn nào? | Không giả định model đã sẵn hoặc AI có quyền mua. |
| Q11 | DoD, người review và quy tắc cho phép hoãn high severity? | DoD tài liệu này là bản nháp cần xác nhận. |

Các gate bằng chứng khác (catalog/script/renderer/budget/assets/thiết bị/license/release) nằm trong `tasks.json.decisions`. Gate có scope: duyệt lô 1 không đồng nghĩa lô 2–4 được duyệt; model hay script từng màn phải có bằng chứng riêng. Q7 baseline all-open không chặn scaffolding; ordinal chính thức chốt qua catalog. Nếu Q8 chọn grading server, phải giải quyết xung đột offline của LL-048 trước khi chốt evaluator.

## Catalog user story và AC gốc

AC dưới đây giữ nguyên văn nguồn cho truy vết. Các AC nhóm được gắn cho từng story liên quan; nguyên tắc bảng chính thắng khi có mâu thuẫn vẫn áp dụng. 211 điểm là ước lượng story nguồn, không cộng với điểm task mới.

### LL-001 — Có khung dự án next.js chạy được kèm quy ước chung

Là lập trình viên, tôi muốn có khung dự án Next.js chạy được kèm quy ước chung để cả nhóm bắt đầu làm tính năng ngay.

Nguồn: [docs/backlog.md:41](../backlog.md#L41); AC chi tiết: `docs/backlog.md:99`. Epic E1; feature F-001; 2 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Máy mới clone repo, làm theo README là chạy được môi trường dev và mở trang mẫu, console không có lỗi.
- Một lệnh chạy lint và kiểm tra định dạng, không báo lỗi trên mã mẫu.
- README ghi cách cài/chạy, cấu trúc thư mục và quy ước nhánh/commit.

Task: [LL-001-T01](BACKLOG.md#ll-001-t01), [LL-001-T02](BACKLOG.md#ll-001-t02), [LL-001-T03](BACKLOG.md#ll-001-t03).

### LL-002 — Kết nối postgresql với migration có kiểm soát

Là lập trình viên, tôi muốn kết nối PostgreSQL với migration có kiểm soát để dữ liệu nhất quán giữa các môi trường.

Nguồn: [docs/backlog.md:46](../backlog.md#L46); AC chi tiết: `docs/backlog.md:111`. Epic E1; feature F-002; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Chạy migration trên DB rỗng thành công; chạy lại lần hai không lỗi, không nhân đôi dữ liệu.
- Một API route kiểm tra sức khỏe (health) ghi/đọc được một bản ghi thử và trả kết quả đúng.
- Chuỗi kết nối nằm trong biến môi trường, không có thông tin bí mật trong git.

Task: [LL-002-T01](BACKLOG.md#ll-002-t01), [LL-002-T02](BACKLOG.md#ll-002-t02).

### LL-003 — Mở game bằng một đường link trên web

Là người chơi, tôi muốn mở game bằng một đường link trên web để chơi thử mà không cần cài đặt. [CẦN LÀM RÕ: Q4]

Nguồn: [docs/backlog.md:47](../backlog.md#L47); AC chi tiết: `docs/backlog.md:123`. Epic E1; feature F-003; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- URL chạy thử mở được trang chính trên Chrome và Safari (điện thoại và máy tính).
- Triển khai bản mới bằng một lệnh hoặc tự động khi merge vào nhánh chính, không có bước thủ công nào khác.
- Môi trường chạy thử đọc/ghi được DB (kiểm tra bằng API health của LL-002).

Task: [LL-003-T01](BACKLOG.md#ll-003-t01), [LL-003-T02](BACKLOG.md#ll-003-t02).

### LL-004 — Mô tả mỗi màn theo một lược đồ chung và nạp theo mã số

Là lập trình viên, tôi muốn mô tả mỗi màn theo một lược đồ chung và nạp theo mã số để thêm 25 màn mà không viết lại khung chơi.

Nguồn: [docs/backlog.md:48](../backlog.md#L48); AC chi tiết: `docs/backlog.md:137`. Epic E2; feature F-004; 5 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Mỗi màn gồm số thứ tự, loại (2D/3D), đề bài, cơ chế tương tác, điều kiện thắng. Dữ liệu sai lược đồ bị từ chối khi nạp, thông báo nêu mã màn và tên trường sai.
- Mở màn theo số thứ tự trả đúng dữ liệu; số không tồn tại hiện trang "không tìm thấy màn", không crash.
- Nạp màn qua giao diện `LevelRepository`; có 1 adapter đọc tệp trong repo, và test với adapter giả chứng minh đổi nguồn dữ liệu (ví dụ PostgreSQL) không phải sửa khung chơi.

Task: [LL-004-T01](BACKLOG.md#ll-004-t01), [LL-004-T02](BACKLOG.md#ll-004-t02), [LL-004-T03](BACKLOG.md#ll-004-t03).

### LL-005 — Giải một màn và biết ngay đúng hay sai

Là người chơi, tôi muốn giải một màn và biết ngay đúng hay sai để sang màn kế tiếp.

Nguồn: [docs/backlog.md:49](../backlog.md#L49); AC chi tiết: `docs/backlog.md:149`. Epic E2; feature F-005; 5 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Hoàn thành điều kiện thắng thì trạng thái thắng hiện trong ≤ 1 giây kèm nút "Màn tiếp" (kể cả khi kiểm tra đáp án bất đồng bộ qua mạng 4G giả lập). Ở màn cuối nút này thành "Về chọn màn".
- Thao tác/đáp án sai hiện phản hồi sai và cho thử lại ngay, không tải lại trang.
- Nút "Chơi lại" và "Về chọn màn" có mặt suốt thời gian chơi và hoạt động đúng.
- Test liệt kê mọi trạng thái của vòng chơi (đang chơi, sai, thắng, lỗi nạp) và xác nhận mỗi trạng thái có ≥ 1 thao tác về chọn màn.

Task: [LL-005-T01](BACKLOG.md#ll-005-t01), [LL-005-T02](BACKLOG.md#ll-005-t02), [LL-005-T03](BACKLOG.md#ll-005-t03).

### LL-006 — Xem danh sách 25 màn và chọn màn muốn chơi

Là người chơi, tôi muốn xem danh sách 25 màn và chọn màn muốn chơi để vào chơi nhanh.

Nguồn: [docs/backlog.md:50](../backlog.md#L50); AC chi tiết: `docs/backlog.md:162`. Epic E2; feature F-006; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Hiển thị đủ 25 ô đánh số 1–25; bấm một ô mở đúng màn đó.
- Mặc định mọi màn đều mở; quy tắc mở/khóa nằm trong một cấu hình duy nhất và có test.
- Danh sách sinh từ dữ liệu màn (LL-004); thêm/bớt màn không phải sửa giao diện.

Task: [LL-006-T01](BACKLOG.md#ll-006-t01).

### LL-007 — Game nhớ các màn đã qua

Là người chơi, tôi muốn game nhớ các màn đã qua để lần sau chơi tiếp mà không làm lại từ đầu.

Nguồn: [docs/backlog.md:62](../backlog.md#L62); AC chi tiết: `docs/backlog.md:174`. Epic E2; feature F-007; 5 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Thắng màn n rồi tải lại trang thì màn n vẫn có dấu "đã hoàn thành" ở màn chọn màn.
- Người chơi mới (chưa có dữ liệu) vào game bình thường, mọi màn ở trạng thái chưa hoàn thành, không lỗi.
- Lưu thất bại (mất mạng/lỗi server) không chặn việc chơi; hiện thông báo không chặn và tiến độ vẫn giữ trong phiên hiện tại.

Task: [LL-007-T01](BACKLOG.md#ll-007-t01), [LL-007-T02](BACKLOG.md#ll-007-t02), [LL-007-T03](BACKLOG.md#ll-007-t03).

### LL-008 — Thử nhanh và chốt cách dựng màn 2d

Là lập trình viên, tôi muốn thử nhanh và chốt cách dựng màn 2D để không phải làm lại khi đã dựng nhiều màn.

Nguồn: [docs/backlog.md:43](../backlog.md#L43); AC chi tiết: `docs/backlog.md:201`. Epic E3; feature F-008; 2 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Có ghi chú quyết định ≤ 1 trang (phương án chọn, lý do, giới hạn); PO duyệt trước khi bắt đầu LL-042.
- Có prototype chạm + kéo-thả chạy bằng chuột và cảm ứng, thử trên ≥ 1 điện thoại thật và ≥ 1 máy tính.
- Prototype giữ ≥ 30 khung hình/giây khi kéo-thả trên điện thoại thử (ngưỡng tạm, theo Q3).

Task: [LL-008-T01](BACKLOG.md#ll-008-t01), [LL-008-T02](BACKLOG.md#ll-008-t02).

### LL-009 — Có các cơ chế tương tác 2d dùng chung (chạm, kéo-thả, chọn đáp án)

Là lập trình viên, tôi muốn có các cơ chế tương tác 2D dùng chung (chạm, kéo-thả, chọn đáp án) để dựng nhanh 20 màn.

Nguồn: [docs/backlog.md:53](../backlog.md#L53); AC chi tiết: `docs/backlog.md:237`. Epic E3; feature F-009; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Chạm/nhấn, kéo-thả, chọn đáp án: mỗi loại có màn demo chạy bằng chuột và cảm ứng.
- Mỗi cơ chế báo thắng/sai qua giao diện chung của LL-005 (có test).
- Kéo-thả: thả ngoài vùng hợp lệ thì vật về chỗ cũ, không mất vật.

Task: [LL-009-T01](BACKLOG.md#ll-009-t01), [LL-009-T02](BACKLOG.md#ll-009-t02), [LL-009-T03](BACKLOG.md#ll-009-t03).

### LL-010 — Chơi lô 1 (2d-01…05)

Là người chơi, tôi muốn chơi lô 1 (2D-01…05) để làm quen với lối đố mẹo qua các màn dễ. [CẦN LÀM RÕ: Q6]

Nguồn: [docs/backlog.md:55](../backlog.md#L55); AC chi tiết: `docs/backlog.md:249`. Epic E3; feature F-010; 5 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Cả 5 màn chơi được từ lúc mở tới lúc thắng bằng thao tác/đáp án đúng theo kịch bản. Thao tác sai cho phản hồi sai và thử lại được.
- Đề bài, hình ảnh, đáp án khớp kịch bản và đồ họa đã duyệt của lô.
- Hiển thị đúng, không tràn chữ hay vỡ bố cục ở 360×640 và 1366×768 px.

Task: [LL-010-T01](BACKLOG.md#ll-010-t01), [LL-010-T02](BACKLOG.md#ll-010-t02), [LL-010-T03](BACKLOG.md#ll-010-t03), [LL-010-T04](BACKLOG.md#ll-010-t04), [LL-010-T05](BACKLOG.md#ll-010-t05).

### LL-011 — Chơi lô 2 (2d-06…10)

Là người chơi, tôi muốn chơi lô 2 (2D-06…10) để gặp những mẹo khó dần, buộc phải nghĩ lệch hướng. [CẦN LÀM RÕ: Q6]

Nguồn: [docs/backlog.md:66](../backlog.md#L66); AC chi tiết: `docs/backlog.md:249`. Epic E3; feature F-011; 8 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Cả 5 màn chơi được từ lúc mở tới lúc thắng bằng thao tác/đáp án đúng theo kịch bản. Thao tác sai cho phản hồi sai và thử lại được.
- Đề bài, hình ảnh, đáp án khớp kịch bản và đồ họa đã duyệt của lô.
- Hiển thị đúng, không tràn chữ hay vỡ bố cục ở 360×640 và 1366×768 px.

Task: [LL-011-T01](BACKLOG.md#ll-011-t01), [LL-011-T02](BACKLOG.md#ll-011-t02), [LL-011-T03](BACKLOG.md#ll-011-t03), [LL-011-T04](BACKLOG.md#ll-011-t04), [LL-011-T05](BACKLOG.md#ll-011-t05).

### LL-012 — Chơi lô 3 (2d-11…15)

Là người chơi, tôi muốn chơi lô 3 (2D-11…15) để tiếp tục được thử thách bằng những mẹo mới, không lặp lại. [CẦN LÀM RÕ: Q6]

Nguồn: [docs/backlog.md:71](../backlog.md#L71); AC chi tiết: `docs/backlog.md:249`. Epic E3; feature F-012; 8 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Cả 5 màn chơi được từ lúc mở tới lúc thắng bằng thao tác/đáp án đúng theo kịch bản. Thao tác sai cho phản hồi sai và thử lại được.
- Đề bài, hình ảnh, đáp án khớp kịch bản và đồ họa đã duyệt của lô.
- Hiển thị đúng, không tràn chữ hay vỡ bố cục ở 360×640 và 1366×768 px.

Task: [LL-012-T01](BACKLOG.md#ll-012-t01), [LL-012-T02](BACKLOG.md#ll-012-t02), [LL-012-T03](BACKLOG.md#ll-012-t03), [LL-012-T04](BACKLOG.md#ll-012-t04), [LL-012-T05](BACKLOG.md#ll-012-t05).

### LL-013 — Chơi lô 4 (2d-16…20)

Là người chơi, tôi muốn chơi lô 4 (2D-16…20) để hoàn thành trọn bộ 20 màn 2D với những mẹo khó nhất phần 2D. [CẦN LÀM RÕ: Q6]

Nguồn: [docs/backlog.md:75](../backlog.md#L75); AC chi tiết: `docs/backlog.md:249`. Epic E3; feature F-013; 8 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Cả 5 màn chơi được từ lúc mở tới lúc thắng bằng thao tác/đáp án đúng theo kịch bản. Thao tác sai cho phản hồi sai và thử lại được.
- Đề bài, hình ảnh, đáp án khớp kịch bản và đồ họa đã duyệt của lô.
- Hiển thị đúng, không tràn chữ hay vỡ bố cục ở 360×640 và 1366×768 px.

Task: [LL-013-T01](BACKLOG.md#ll-013-t01), [LL-013-T02](BACKLOG.md#ll-013-t02), [LL-013-T03](BACKLOG.md#ll-013-t03), [LL-013-T04](BACKLOG.md#ll-013-t04), [LL-013-T05](BACKLOG.md#ll-013-t05).

### LL-014 — Có khung cảnh 3d three.js chạy ổn định trên một trang riêng, chưa cần vòng chơi,

Là lập trình viên, tôi muốn có khung cảnh 3D Three.js chạy ổn định trên một trang riêng, chưa cần vòng chơi, để kiểm chứng rủi ro 3D sớm.

Nguồn: [docs/backlog.md:44](../backlog.md#L44); AC chi tiết: `docs/backlog.md:265`. Epic E4; feature F-014; 5 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Cảnh mẫu (camera, ánh sáng, vài khối) hiển thị trên một trang riêng; chỉ chạy phía trình duyệt, build/render phía server không lỗi.
- Đổi kích thước hoặc xoay màn hình thì cảnh co giãn đúng tỉ lệ, không méo.
- Rời màn/chuyển màn giải phóng hình học, vật liệu, bộ render. Sau 20 lần mở–thoát màn, bộ nhớ heap tăng ≤ 10% (đo bằng DevTools).
- Thiết bị không hỗ trợ WebGL hiện thông báo thân thiện thay vì màn trắng.

Task: [LL-014-T01](BACKLOG.md#ll-014-t01), [LL-014-T02](BACKLOG.md#ll-014-t02), [LL-014-T03](BACKLOG.md#ll-014-t03).

### LL-015 — Chạm/kéo vật và xoay góc nhìn trong cảnh 3d

Là người chơi, tôi muốn chạm/kéo vật và xoay góc nhìn trong cảnh 3D để khám phá và giải đố.

Nguồn: [docs/backlog.md:59](../backlog.md#L59); AC chi tiết: `docs/backlog.md:278`. Epic E4; feature F-015; 5 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Chọn đúng vật khi bấm/chạm, vùng chọn tối thiểu 44×44 px dù vật nhỏ hơn, có phản hồi hiển thị khi chọn.
- Xoay/thu phóng camera bằng chuột (kéo/lăn) và cảm ứng (1 ngón xoay, 2 ngón thu phóng), giới hạn góc/khoảng cách cấu hình được theo từng màn.
- Kéo vật theo con trỏ/ngón tay không xung đột với xoay camera và không làm cuộn/thu phóng cả trang trên điện thoại.
- Thao tác đúng phát sự kiện thắng/sai về khung chơi (LL-005), có test.

Task: [LL-015-T01](BACKLOG.md#ll-015-t01), [LL-015-T02](BACKLOG.md#ll-015-t02), [LL-015-T03](BACKLOG.md#ll-015-t03).

### LL-016 — Có trình nạp tài nguyên, màn hình chờ và ngân sách hiệu năng/tài nguyên bằng số

Là lập trình viên 3D, tôi muốn có trình nạp tài nguyên, màn hình chờ và ngân sách hiệu năng/tài nguyên bằng số để mọi màn và mô hình 3D bám cùng một chuẩn.

Nguồn: [docs/backlog.md:56](../backlog.md#L56); AC chi tiết: `docs/backlog.md:291`. Epic E4; feature F-016; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Vào màn 3D hiện màn hình chờ kèm % tải, ẩn khi xong. Lỗi tải hiện thông báo kèm nút thử lại.
- Mô hình/texture nạp một lần và dùng lại khi chơi lại màn (không tải lại).
- Tài liệu ngân sách ghi giá trị cụ thể cho FPS tối thiểu, MB tài nguyên/màn, số đa giác, số draw call và được PO + ART3D duyệt.

Task: [LL-016-T01](BACKLOG.md#ll-016-t01), [LL-016-T02](BACKLOG.md#ll-016-t02), [LL-016-T03](BACKLOG.md#ll-016-t03).

### LL-017 — Chơi màn 3d-01

Là người chơi, tôi muốn chơi màn 3D-01 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6]

Nguồn: [docs/backlog.md:60](../backlog.md#L60); AC chi tiết: `docs/backlog.md:303`. Epic E4; feature F-017; 8 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Chơi được từ lúc mở tới lúc thắng bằng thao tác đúng theo kịch bản (LL-033/LL-044); thao tác sai cho phản hồi sai và thử lại được.
- Đạt ngân sách hiệu năng/tài nguyên của LL-016 trên thiết bị tham chiếu.
- Chơi lại/thoát về chọn màn ở bất kỳ thời điểm nào không để lại tài nguyên treo hay lỗi console.

Task: [LL-017-T01](BACKLOG.md#ll-017-t01), [LL-017-T02](BACKLOG.md#ll-017-t02), [LL-017-T03](BACKLOG.md#ll-017-t03).

### LL-018 — Chơi màn 3d-02

Là người chơi, tôi muốn chơi màn 3D-02 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6]

Nguồn: [docs/backlog.md:69](../backlog.md#L69); AC chi tiết: `docs/backlog.md:303`. Epic E4; feature F-018; 8 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Chơi được từ lúc mở tới lúc thắng bằng thao tác đúng theo kịch bản (LL-033/LL-044); thao tác sai cho phản hồi sai và thử lại được.
- Đạt ngân sách hiệu năng/tài nguyên của LL-016 trên thiết bị tham chiếu.
- Chơi lại/thoát về chọn màn ở bất kỳ thời điểm nào không để lại tài nguyên treo hay lỗi console.

Task: [LL-018-T01](BACKLOG.md#ll-018-t01), [LL-018-T02](BACKLOG.md#ll-018-t02), [LL-018-T03](BACKLOG.md#ll-018-t03).

### LL-019 — Chơi màn 3d-03

Là người chơi, tôi muốn chơi màn 3D-03 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6]

Nguồn: [docs/backlog.md:73](../backlog.md#L73); AC chi tiết: `docs/backlog.md:303`. Epic E4; feature F-019; 8 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Chơi được từ lúc mở tới lúc thắng bằng thao tác đúng theo kịch bản (LL-033/LL-044); thao tác sai cho phản hồi sai và thử lại được.
- Đạt ngân sách hiệu năng/tài nguyên của LL-016 trên thiết bị tham chiếu.
- Chơi lại/thoát về chọn màn ở bất kỳ thời điểm nào không để lại tài nguyên treo hay lỗi console.

Task: [LL-019-T01](BACKLOG.md#ll-019-t01), [LL-019-T02](BACKLOG.md#ll-019-t02), [LL-019-T03](BACKLOG.md#ll-019-t03).

### LL-020 — Chơi màn 3d-04

Là người chơi, tôi muốn chơi màn 3D-04 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6]

Nguồn: [docs/backlog.md:77](../backlog.md#L77); AC chi tiết: `docs/backlog.md:303`. Epic E4; feature F-020; 8 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Chơi được từ lúc mở tới lúc thắng bằng thao tác đúng theo kịch bản (LL-033/LL-044); thao tác sai cho phản hồi sai và thử lại được.
- Đạt ngân sách hiệu năng/tài nguyên của LL-016 trên thiết bị tham chiếu.
- Chơi lại/thoát về chọn màn ở bất kỳ thời điểm nào không để lại tài nguyên treo hay lỗi console.

Task: [LL-020-T01](BACKLOG.md#ll-020-t01), [LL-020-T02](BACKLOG.md#ll-020-t02), [LL-020-T03](BACKLOG.md#ll-020-t03).

### LL-021 — Chơi màn 3d-05

Là người chơi, tôi muốn chơi màn 3D-05 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6]

Nguồn: [docs/backlog.md:79](../backlog.md#L79); AC chi tiết: `docs/backlog.md:303`. Epic E4; feature F-021; 8 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Chơi được từ lúc mở tới lúc thắng bằng thao tác đúng theo kịch bản (LL-033/LL-044); thao tác sai cho phản hồi sai và thử lại được.
- Đạt ngân sách hiệu năng/tài nguyên của LL-016 trên thiết bị tham chiếu.
- Chơi lại/thoát về chọn màn ở bất kỳ thời điểm nào không để lại tài nguyên treo hay lỗi console.

Task: [LL-021-T01](BACKLOG.md#ll-021-t01), [LL-021-T02](BACKLOG.md#ll-021-t02), [LL-021-T03](BACKLOG.md#ll-021-t03).

### LL-022 — Màn 3d chạy mượt

Là người chơi dùng điện thoại tầm trung, tôi muốn màn 3D chạy mượt để chơi không bị giật. [CẦN LÀM RÕ: Q3]

Nguồn: [docs/backlog.md:61](../backlog.md#L61); AC chi tiết: `docs/backlog.md:317`. Epic E4; feature F-022; 5 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Đo màn 3D-01 so với ngân sách LL-016 trên ≥ 3 thiết bị (≥ 1 máy yếu); chỉ số nào vượt ngân sách thì có hạng mục tối ưu.
- Màn 3D-01 đạt ngân sách trên thiết bị mục tiêu thấp nhất (theo Q3); các màn sau đo lại bằng cùng cách.
- Quy trình nén/tối ưu tài nguyên được ghi lại để ART3D dùng cho các màn sau.

Task: [LL-022-T01](BACKLOG.md#ll-022-t01), [LL-022-T02](BACKLOG.md#ll-022-t02).

### LL-023 — Giao diện thống nhất và hiển thị đúng tiếng việt có dấu

Là người chơi, tôi muốn giao diện thống nhất và hiển thị đúng tiếng Việt có dấu để đọc đề không bị nhầm chữ.

Nguồn: [docs/backlog.md:45](../backlog.md#L45); AC chi tiết: `docs/backlog.md:331`. Epic E5; feature F-023; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Bảng màu, phông chữ, cỡ chữ tối thiểu, nút, hộp thoại được ghi lại và dùng làm thành phần chung trong mã.
- Chuỗi thử đủ các tổ hợp dấu tiếng Việt (ví dụ "ỡ", "ặ", "ự") hiển thị đúng bằng phông đã chọn, không rơi về phông dự phòng.
- Chữ đề bài ≥ 16 px, tương phản chữ/nền ≥ 4,5:1.

Task: [LL-023-T01](BACKLOG.md#ll-023-t01), [LL-023-T02](BACKLOG.md#ll-023-t02).

### LL-024 — Có trang chủ với nút chơi/chơi tiếp

Là người chơi, tôi muốn có trang chủ với nút Chơi/Chơi tiếp để bắt đầu nhanh.

Nguồn: [docs/backlog.md:82](../backlog.md#L82); AC chi tiết: `docs/backlog.md:343`. Epic E5; feature F-024; 2 SP nguồn; Should; implementation **MISSING**.

AC nguồn:

- Trang chủ hiện tên game và nút "Chơi" dẫn tới màn chọn màn.
- Người đã có tiến độ thấy nút "Chơi tiếp" dẫn thẳng tới màn chưa hoàn thành đầu tiên.

Task: [LL-024-T01](BACKLOG.md#ll-024-t01).

### LL-025 — Trang chọn màn và khung chơi dùng thoải mái trên cả điện thoại lẫn máy tính

Là người chơi, tôi muốn trang chọn màn và khung chơi dùng thoải mái trên cả điện thoại lẫn máy tính để chơi ở bất cứ đâu.

Nguồn: [docs/backlog.md:64](../backlog.md#L64); AC chi tiết: `docs/backlog.md:354`. Epic E5; feature F-025; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Khung chơi và màn chọn màn dùng được ở độ rộng 360–1920 px, không cuộn ngang, không tràn chữ.
- Vùng chạm của nút và ô chọn màn ≥ 44×44 px trên điện thoại.
- Xoay dọc↔ngang không làm mất trạng thái màn đang chơi.

Task: [LL-025-T01](BACKLOG.md#ll-025-t01).

### LL-026 — Thấy hiệu ứng khi đúng/sai và khi chuyển màn

Là người chơi, tôi muốn thấy hiệu ứng khi đúng/sai và khi chuyển màn để rõ kết quả mỗi lần giải.

Nguồn: [docs/backlog.md:83](../backlog.md#L83); AC chi tiết: `docs/backlog.md:366`. Epic E5; feature F-026; 3 SP nguồn; Should; implementation **MISSING**.

AC nguồn:

- Mỗi lần thắng/sai có hiệu ứng riêng ≤ 1 giây, không chặn thao tác tiếp theo quá thời lượng đó.
- Chuyển màn có chuyển cảnh ≤ 500 ms, không giật trên điện thoại thử.

Task: [LL-026-T01](BACKLOG.md#ll-026-t01).

### LL-027 — Thấy màn hình hoàn tất khi xong cả 25 màn

Là người chơi, tôi muốn thấy màn hình hoàn tất khi xong cả 25 màn để biết mình đã chơi hết bản thử.

Nguồn: [docs/backlog.md:87](../backlog.md#L87); AC chi tiết: `docs/backlog.md:377`. Epic E5; feature F-027; 2 SP nguồn; Could; implementation **MISSING**.

AC nguồn:

- Khi cả 25 màn đã hoàn thành, hiện màn hình hoàn tất kèm lời cảm ơn. Chưa đủ 25 màn thì không hiện.
- Nút "Về chọn màn" trên màn hình này hoạt động đúng.

Task: [LL-027-T01](BACKLOG.md#ll-027-t01).

### LL-028 — Có danh sách 25 màn (loại, ý tưởng mẹo, độ khó, thứ tự)

Là trưởng nhóm sản phẩm, tôi muốn có danh sách 25 màn (loại, ý tưởng mẹo, độ khó, thứ tự) để cả nhóm thống nhất khối lượng trước khi làm.

Nguồn: [docs/backlog.md:42](../backlog.md#L42); AC chi tiết: `docs/backlog.md:390`. Epic E6; feature F-028; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Bảng 25 dòng gồm số thứ tự, loại (20 màn 2D / 5 màn 3D), ý tưởng mẹo một dòng, cơ chế tương tác, điểm độ khó 1–3.
- Điểm độ khó trung bình của mỗi nhóm 5 màn không thấp hơn nhóm trước; vị trí 5 màn 3D được ghi rõ.
- Mỗi màn dùng cơ chế thuộc danh mục (chạm, kéo-thả, chọn đáp án, nhập chữ, chọn/kéo/xoay 3D) hoặc được đánh dấu "cơ chế mới" để ước lượng lại. PO duyệt bảng.

Task: [LL-028-T01](BACKLOG.md#ll-028-t01), [LL-028-T02](BACKLOG.md#ll-028-t02).

### LL-029 — Có kịch bản chi tiết và đồ họa cho 5 màn 2d lô 1

Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 1 để dựng màn mà không phải đoán ý. [CẦN LÀM RÕ: Q6, Q10]

Nguồn: [docs/backlog.md:54](../backlog.md#L54); AC chi tiết: `docs/backlog.md:402`. Epic E6; feature F-029; 5 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Mỗi màn có kịch bản gồm đề bài tiếng Việt, thao tác/đáp án đúng, các đáp án sai thường gặp kèm phản hồi, lời giải "mẹo", cơ chế dùng.
- Đồ họa của 5 màn giao đủ ở định dạng web, đạt checklist phong cách của LL-023 và đặt tên theo quy ước.
- PO duyệt kịch bản cả lô (theo checklist) trước khi lập trình dựng màn.

Task: [LL-029-T01](BACKLOG.md#ll-029-t01), [LL-029-T02](BACKLOG.md#ll-029-t02), [LL-029-T03](BACKLOG.md#ll-029-t03), [LL-029-T04](BACKLOG.md#ll-029-t04), [LL-029-T05](BACKLOG.md#ll-029-t05).

### LL-030 — Có kịch bản chi tiết và đồ họa cho 5 màn 2d lô 2

Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 2 để dựng màn mà không phải đoán ý. [CẦN LÀM RÕ: Q6, Q10]

Nguồn: [docs/backlog.md:65](../backlog.md#L65); AC chi tiết: `docs/backlog.md:402`. Epic E6; feature F-030; 5 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Mỗi màn có kịch bản gồm đề bài tiếng Việt, thao tác/đáp án đúng, các đáp án sai thường gặp kèm phản hồi, lời giải "mẹo", cơ chế dùng.
- Đồ họa của 5 màn giao đủ ở định dạng web, đạt checklist phong cách của LL-023 và đặt tên theo quy ước.
- PO duyệt kịch bản cả lô (theo checklist) trước khi lập trình dựng màn.

Task: [LL-030-T01](BACKLOG.md#ll-030-t01), [LL-030-T02](BACKLOG.md#ll-030-t02), [LL-030-T03](BACKLOG.md#ll-030-t03), [LL-030-T04](BACKLOG.md#ll-030-t04), [LL-030-T05](BACKLOG.md#ll-030-t05).

### LL-031 — Có kịch bản chi tiết và đồ họa cho 5 màn 2d lô 3

Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 3 để dựng màn mà không phải đoán ý. [CẦN LÀM RÕ: Q6, Q10]

Nguồn: [docs/backlog.md:70](../backlog.md#L70); AC chi tiết: `docs/backlog.md:402`. Epic E6; feature F-031; 5 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Mỗi màn có kịch bản gồm đề bài tiếng Việt, thao tác/đáp án đúng, các đáp án sai thường gặp kèm phản hồi, lời giải "mẹo", cơ chế dùng.
- Đồ họa của 5 màn giao đủ ở định dạng web, đạt checklist phong cách của LL-023 và đặt tên theo quy ước.
- PO duyệt kịch bản cả lô (theo checklist) trước khi lập trình dựng màn.

Task: [LL-031-T01](BACKLOG.md#ll-031-t01), [LL-031-T02](BACKLOG.md#ll-031-t02), [LL-031-T03](BACKLOG.md#ll-031-t03), [LL-031-T04](BACKLOG.md#ll-031-t04), [LL-031-T05](BACKLOG.md#ll-031-t05).

### LL-032 — Có kịch bản chi tiết và đồ họa cho 5 màn 2d lô 4

Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 4 để dựng màn mà không phải đoán ý. [CẦN LÀM RÕ: Q6, Q10]

Nguồn: [docs/backlog.md:74](../backlog.md#L74); AC chi tiết: `docs/backlog.md:402`. Epic E6; feature F-032; 5 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Mỗi màn có kịch bản gồm đề bài tiếng Việt, thao tác/đáp án đúng, các đáp án sai thường gặp kèm phản hồi, lời giải "mẹo", cơ chế dùng.
- Đồ họa của 5 màn giao đủ ở định dạng web, đạt checklist phong cách của LL-023 và đặt tên theo quy ước.
- PO duyệt kịch bản cả lô (theo checklist) trước khi lập trình dựng màn.

Task: [LL-032-T01](BACKLOG.md#ll-032-t01), [LL-032-T02](BACKLOG.md#ll-032-t02), [LL-032-T03](BACKLOG.md#ll-032-t03), [LL-032-T04](BACKLOG.md#ll-032-t04), [LL-032-T05](BACKLOG.md#ll-032-t05).

### LL-033 — Có kịch bản chi tiết màn 3d-01

Là lập trình viên 3D, tôi muốn có kịch bản chi tiết màn 3D-01 để dựng lát cắt 3D đầu tiên và ước lượng lại chính xác.

Nguồn: [docs/backlog.md:57](../backlog.md#L57); AC chi tiết: `docs/backlog.md:416`. Epic E6; feature F-033; 2 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Mô tả cảnh, danh sách vật thể cần mô hình (kèm mức chi tiết), tương tác cho phép, điều kiện thắng/sai và phản hồi của 3D-01.
- Tài nguyên 3D cần có của 3D-01 được gom thành một bảng (tên, độ phức tạp, nguồn: tự làm/có sẵn).
- DEV3D xác nhận khả thi trên thiết bị mục tiêu và ước lượng lại LL-017.

Task: [LL-033-T01](BACKLOG.md#ll-033-t01).

### LL-034 — Có mô hình 3d đã tối ưu cho web của màn 3d-01

Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-01 để không phải tự làm. [CẦN LÀM RÕ: Q10]

Nguồn: [docs/backlog.md:58](../backlog.md#L58); AC chi tiết: `docs/backlog.md:440`. Epic E6; feature F-034; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Mô hình giao ở định dạng web (ví dụ glTF/GLB), nằm trong ngân sách của LL-016 và mở được trong cảnh thử (LL-014).
- Vật thể khớp bảng tài nguyên của kịch bản; tên đối tượng/hoạt ảnh đặt theo quy ước để mã gọi được.
- Mỗi tài nguyên ghi nguồn và giấy phép (đầu vào cho LL-037).

Task: [LL-034-T01](BACKLOG.md#ll-034-t01), [LL-034-T02](BACKLOG.md#ll-034-t02).

### LL-035 — Có mô hình 3d đã tối ưu cho web của màn 3d-04

Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-04 để không phải tự làm. [CẦN LÀM RÕ: Q10]

Nguồn: [docs/backlog.md:76](../backlog.md#L76); AC chi tiết: `docs/backlog.md:440`. Epic E6; feature F-035; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Mô hình giao ở định dạng web (ví dụ glTF/GLB), nằm trong ngân sách của LL-016 và mở được trong cảnh thử (LL-014).
- Vật thể khớp bảng tài nguyên của kịch bản; tên đối tượng/hoạt ảnh đặt theo quy ước để mã gọi được.
- Mỗi tài nguyên ghi nguồn và giấy phép (đầu vào cho LL-037).

Task: [LL-035-T01](BACKLOG.md#ll-035-t01), [LL-035-T02](BACKLOG.md#ll-035-t02).

### LL-036 — Đề bài và phản hồi đúng chính tả, đúng dấu

Là người chơi, tôi muốn đề bài và phản hồi đúng chính tả, đúng dấu để không nhầm đáp án vì lỗi chữ.

Nguồn: [docs/backlog.md:84](../backlog.md#L84); AC chi tiết: `docs/backlog.md:454`. Epic E6; feature F-036; 2 SP nguồn; Should; implementation **MISSING**.

AC nguồn:

- Mọi văn bản hiển thị của 25 màn (đề bài, phản hồi, lời giải) được một người khác tác giả đọc soát, danh sách sửa được đóng hết.
- Các câu chơi chữ phụ thuộc dấu thanh được kiểm lại: gõ có dấu/không dấu cho kết quả đúng theo cấu hình từng màn (LL-043).

Task: [LL-036-T01](BACKLOG.md#ll-036-t01), [LL-036-T02](BACKLOG.md#ll-036-t02).

### LL-037 — Có bảng kê nguồn và giấy phép của mọi tài nguyên, câu đố

Là trưởng nhóm sản phẩm, tôi muốn có bảng kê nguồn và giấy phép của mọi tài nguyên, câu đố để yên tâm đưa bản chơi thử ra công khai. [CẦN LÀM RÕ: Q5]

Nguồn: [docs/backlog.md:80](../backlog.md#L80); AC chi tiết: `docs/backlog.md:467`. Epic E7; feature F-037; 2 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Mọi tài nguyên trong bản phát hành (phông, hình, mô hình 3D, thư viện) có một dòng ghi nguồn, giấy phép, yêu cầu ghi công.
- Mục không rõ giấy phép bị gỡ hoặc thay trước khi phát hành.
- Mỗi câu đố ghi nguồn: tự sáng tác hay lấy từ đâu.

Task: [LL-037-T01](BACKLOG.md#ll-037-t01), [LL-037-T02](BACKLOG.md#ll-037-t02).

### LL-038 — Mọi màn đều thắng được và không có lỗi chặn

Là người chơi, tôi muốn mọi màn đều thắng được và không có lỗi chặn để không bị kẹt giữa chừng.

Nguồn: [docs/backlog.md:88](../backlog.md#L88); AC chi tiết: `docs/backlog.md:479`. Epic E7; feature F-038; 5 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Có bảng kiểm 25 dòng; mỗi màn được chơi hết bằng đáp án đúng và thử ≥ 3 thao tác sai/lạ, ghi đạt/không đạt.
- Mỗi lỗi ghi rõ màn, bước tái hiện, thiết bị, ảnh/video.
- Mọi lỗi được phân mức (chặn/cao/thường/thấp) và gán người phụ trách; lỗi mức chặn chuyển sang LL-040.

Task: [LL-038-T01](BACKLOG.md#ll-038-t01), [LL-038-T02](BACKLOG.md#ll-038-t02), [LL-038-T03](BACKLOG.md#ll-038-t03).

### LL-039 — Game chạy đúng trên thiết bị và trình duyệt của mình

Là người chơi, tôi muốn game chạy đúng trên thiết bị và trình duyệt của mình để không phải đổi máy. [CẦN LÀM RÕ: Q3]

Nguồn: [docs/backlog.md:90](../backlog.md#L90); AC chi tiết: `docs/backlog.md:491`. Epic E7; feature F-039; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Ma trận thiết bị/trình duyệt phổ thông (theo Q3) được chốt; mỗi ô ghi đạt/không đạt cho màn chọn màn, ≥ 1 màn 2D mỗi cơ chế và ≥ 1 màn 3D.
- Lỗi phát hiện được ghi theo mẫu và phân mức; lỗi chặn chuyển sang LL-040.
- Kiểm chứng thông báo của LL-014 trên 1 thiết bị/giả lập không có WebGL.

Task: [LL-039-T01](BACKLOG.md#ll-039-t01), [LL-039-T02](BACKLOG.md#ll-039-t02).

### LL-040 — Sửa lỗi ưu tiên cao và chốt một bản chơi thử ổn định

Là trưởng nhóm sản phẩm, tôi muốn sửa lỗi ưu tiên cao và chốt một bản chơi thử ổn định để phát hành đúng hạn. [CẦN LÀM RÕ: Q11]

Nguồn: [docs/backlog.md:91](../backlog.md#L91); AC chi tiết: `docs/backlog.md:503`. Epic E7; feature F-040; 5 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- 0 lỗi mức chặn; mọi lỗi mức cao đã đóng hoặc được PO ghi nhận hoãn bằng văn bản.
- Bản phát hành gắn phiên bản (tag), triển khai lên URL chạy thử (LL-003) và qua smoke test đủ 25 màn trên bản đã triển khai.
- Có ghi chú phát hành: lỗi đã biết và thiết bị không hỗ trợ.
- Từng mục trong Định nghĩa Hoàn thành (DoD) được ghi đạt/không đạt.

Task: [LL-040-T01](BACKLOG.md#ll-040-t01), [LL-040-T02](BACKLOG.md#ll-040-t02), [LL-040-T03](BACKLOG.md#ll-040-t03).

### LL-041 — Trang tải nhanh và màn 2d mượt

Là người chơi, tôi muốn trang tải nhanh và màn 2D mượt để vào chơi ngay không phải chờ.

Nguồn: [docs/backlog.md:85](../backlog.md#L85); AC chi tiết: `docs/backlog.md:516`. Epic E7; feature F-041; 3 SP nguồn; Should; implementation **MISSING**.

AC nguồn:

- Màn chọn màn tải xong và dùng được ≤ 3 giây ở mạng 4G giả lập (ngưỡng tạm).
- Tài nguyên màn kế được tải trước, bấm "Màn tiếp" thì màn kế mở trong ≤ 1 giây.
- Dung lượng tải ban đầu của màn chọn màn ≤ 1 MB (ngưỡng tạm).

Task: [LL-041-T01](BACKLOG.md#ll-041-t01), [LL-041-T02](BACKLOG.md#ll-041-t02).

### LL-042 — Có sân chơi 2d tự co giãn theo màn hình và quy đổi đúng vị trí chạm/chuột

Là lập trình viên, tôi muốn có sân chơi 2D tự co giãn theo màn hình và quy đổi đúng vị trí chạm/chuột để mọi màn 2D chạy giống nhau trên điện thoại lẫn máy tính.

Nguồn: [docs/backlog.md:51](../backlog.md#L51); AC chi tiết: `docs/backlog.md:213`. Epic E3; feature F-042; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Sân chơi giữ tỉ lệ đã khai báo và co giãn đúng ở 360×640, 768×1024, 1366×768, 1920×1080, không méo hay tràn.
- Vị trí chạm/chuột quy đổi về tọa độ logic với sai lệch ≤ 2 đơn vị ở cả 4 kích thước.
- Trên điện thoại, thao tác trong sân chơi không làm cuộn hay thu phóng trang.

Task: [LL-042-T01](BACKLOG.md#ll-042-t01), [LL-042-T02](BACKLOG.md#ll-042-t02).

### LL-043 — Gõ đáp án tiếng việt theo cách mình quen (hoa/thường, có/không dấu, "hòa"/"hoà")

Là người chơi, tôi muốn gõ đáp án tiếng Việt theo cách mình quen (hoa/thường, có/không dấu, "hòa"/"hoà") để không bị tính sai vì cách gõ.

Nguồn: [docs/backlog.md:52](../backlog.md#L52); AC chi tiết: `docs/backlog.md:225`. Epic E3; feature F-043; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- So khớp bỏ qua hoa/thường và khoảng trắng thừa, chuẩn hóa Unicode (NFC/NFD) và vị trí dấu thanh ("hòa" = "hoà").
- Mỗi màn cấu hình được chế độ "bắt buộc dấu" hoặc "bỏ qua dấu" và danh sách đáp án chấp nhận (≥ 1 biến thể).
- ≥ 15 ca test, gồm đ/Đ, chữ nhiều dấu, chuỗi rỗng, chuỗi rất dài.

Task: [LL-043-T01](BACKLOG.md#ll-043-t01), [LL-043-T02](BACKLOG.md#ll-043-t02).

### LL-044 — Có kịch bản chi tiết 4 màn 3d còn lại (3d-02…05)

Là lập trình viên 3D, tôi muốn có kịch bản chi tiết 4 màn 3D còn lại (3D-02…05) để dựng đúng và ước lượng lại chính xác.

Nguồn: [docs/backlog.md:67](../backlog.md#L67); AC chi tiết: `docs/backlog.md:428`. Epic E6; feature F-044; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Mỗi màn 3D-02…05 có mô tả cảnh, danh sách vật thể cần mô hình, tương tác cho phép, điều kiện thắng/sai, phản hồi.
- Tài nguyên 3D cần có được gom vào bảng chung (tên, độ phức tạp, nguồn).
- DEV3D xác nhận khả thi và ước lượng lại LL-018…021.

Task: [LL-044-T01](BACKLOG.md#ll-044-t01), [LL-044-T02](BACKLOG.md#ll-044-t02), [LL-044-T03](BACKLOG.md#ll-044-t03), [LL-044-T04](BACKLOG.md#ll-044-t04).

### LL-045 — Có mô hình 3d đã tối ưu cho web của màn 3d-02

Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-02 để không phải tự làm. [CẦN LÀM RÕ: Q10]

Nguồn: [docs/backlog.md:68](../backlog.md#L68); AC chi tiết: `docs/backlog.md:440`. Epic E6; feature F-045; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Mô hình giao ở định dạng web (ví dụ glTF/GLB), nằm trong ngân sách của LL-016 và mở được trong cảnh thử (LL-014).
- Vật thể khớp bảng tài nguyên của kịch bản; tên đối tượng/hoạt ảnh đặt theo quy ước để mã gọi được.
- Mỗi tài nguyên ghi nguồn và giấy phép (đầu vào cho LL-037).

Task: [LL-045-T01](BACKLOG.md#ll-045-t01), [LL-045-T02](BACKLOG.md#ll-045-t02).

### LL-046 — Có mô hình 3d đã tối ưu cho web của màn 3d-03

Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-03 để không phải tự làm. [CẦN LÀM RÕ: Q10]

Nguồn: [docs/backlog.md:72](../backlog.md#L72); AC chi tiết: `docs/backlog.md:440`. Epic E6; feature F-046; 2 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Mô hình giao ở định dạng web (ví dụ glTF/GLB), nằm trong ngân sách của LL-016 và mở được trong cảnh thử (LL-014).
- Vật thể khớp bảng tài nguyên của kịch bản; tên đối tượng/hoạt ảnh đặt theo quy ước để mã gọi được.
- Mỗi tài nguyên ghi nguồn và giấy phép (đầu vào cho LL-037).

Task: [LL-046-T01](BACKLOG.md#ll-046-t01), [LL-046-T02](BACKLOG.md#ll-046-t02).

### LL-047 — Có mô hình 3d đã tối ưu cho web của màn 3d-05

Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-05 để không phải tự làm. [CẦN LÀM RÕ: Q10]

Nguồn: [docs/backlog.md:78](../backlog.md#L78); AC chi tiết: `docs/backlog.md:440`. Epic E6; feature F-047; 2 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Mô hình giao ở định dạng web (ví dụ glTF/GLB), nằm trong ngân sách của LL-016 và mở được trong cảnh thử (LL-014).
- Vật thể khớp bảng tài nguyên của kịch bản; tên đối tượng/hoạt ảnh đặt theo quy ước để mã gọi được.
- Mỗi tài nguyên ghi nguồn và giấy phép (đầu vào cho LL-037).

Task: [LL-047-T01](BACKLOG.md#ll-047-t01), [LL-047-T02](BACKLOG.md#ll-047-t02).

### LL-048 — Khi có lỗi (mạng, dữ liệu, lỗi trong màn) game báo rõ và cho thử lại hoặc về chọn màn

Là người chơi, tôi muốn khi có lỗi (mạng, dữ liệu, lỗi trong màn) game báo rõ và cho thử lại hoặc về chọn màn để không gặp trang trắng.

Nguồn: [docs/backlog.md:63](../backlog.md#L63); AC chi tiết: `docs/backlog.md:186`. Epic E2; feature F-048; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Lỗi khi dựng một màn bị error boundary chặn: hiện thông báo kèm "Chơi lại"/"Về chọn màn", các màn khác không bị ảnh hưởng.
- Nạp dữ liệu màn thất bại thì hiện "Thử lại"; thử lại thành công thì vào được màn.
- Mất mạng khi đang chơi thì hiện banner ngoại tuyến, màn đã nạp vẫn chơi tiếp được.
- Lỗi chưa bắt được hiện trang lỗi chung có nút về chọn màn, không trang trắng.

Task: [LL-048-T01](BACKLOG.md#ll-048-t01), [LL-048-T02](BACKLOG.md#ll-048-t02).

### LL-049 — Thu số liệu chơi ẩn danh (tỉ lệ thắng, số lần sai, tỉ lệ bỏ dở từng màn)

Là trưởng nhóm sản phẩm, tôi muốn thu số liệu chơi ẩn danh (tỉ lệ thắng, số lần sai, tỉ lệ bỏ dở từng màn) để chỉnh độ khó từ bản chơi thử. [CẦN LÀM RÕ: Q5]

Nguồn: [docs/backlog.md:81](../backlog.md#L81); AC chi tiết: `docs/backlog.md:528`. Epic E7; feature F-049; 5 SP nguồn; Should; implementation **MISSING**.

AC nguồn:

- Ghi 5 sự kiện ẩn danh (mở màn, thắng, sai, thoát giữa chừng, lỗi) kèm mã màn, thời điểm, mã người chơi ẩn danh, loại thiết bị.
- Không ghi dữ liệu định danh (tên, email, IP thô); danh sách trường được ghi nằm trong tài liệu.
- Có sẵn 3 truy vấn: tỉ lệ thắng, số lần sai trung bình, tỉ lệ bỏ dở theo từng màn.
- Gửi sự kiện thất bại không ảnh hưởng việc chơi.

Task: [LL-049-T01](BACKLOG.md#ll-049-t01), [LL-049-T02](BACKLOG.md#ll-049-t02), [LL-049-T03](BACKLOG.md#ll-049-t03), [LL-049-T04](BACKLOG.md#ll-049-t04).

### LL-050 — Cả 25 màn vẫn chơi được

Là người chơi dùng điện thoại yếu, tôi muốn cả 25 màn vẫn chơi được để không bị loại khỏi bản chơi thử vì cấu hình máy. [CẦN LÀM RÕ: Q3]

Nguồn: [docs/backlog.md:89](../backlog.md#L89); AC chi tiết: `docs/backlog.md:541`. Epic E7; feature F-050; 3 SP nguồn; Must; implementation **MISSING**.

AC nguồn:

- Chốt thiết bị yếu tham chiếu (theo Q3) và ghi FPS, thời gian tải của cả 25 màn.
- Mọi màn 2D chơi được ở ≥ 30 FPS (ngưỡng tạm). Màn 3D đạt ngân sách LL-016, hoặc có hạng mục tối ưu, hoặc được PO chấp nhận bằng văn bản.
- Lặp lại bằng giả lập giảm CPU 4× và mạng 4G, ghi kết quả.

Task: [LL-050-T01](BACKLOG.md#ll-050-t01), [LL-050-T02](BACKLOG.md#ll-050-t02).

### LL-051 — Biết dữ liệu nào được lưu và tài nguyên được ghi công ra sao

Là người chơi, tôi muốn biết dữ liệu nào được lưu và tài nguyên được ghi công ra sao để yên tâm khi chơi. [CẦN LÀM RÕ: Q5]

Nguồn: [docs/backlog.md:86](../backlog.md#L86); AC chi tiết: `docs/backlog.md:553`. Epic E7; feature F-051; 2 SP nguồn; Should; implementation **MISSING**.

AC nguồn:

- Trang thông tin liệt kê ghi công của mọi tài nguyên có yêu cầu (lấy từ bảng kê LL-037).
- Thông báo ngắn nêu dữ liệu ẩn danh được lưu (mã người chơi, sự kiện) và cách xóa.
- Mở được từ chân trang ở mọi màn hình chính.

Task: [LL-051-T01](BACKLOG.md#ll-051-t01), [LL-051-T02](BACKLOG.md#ll-051-t02).
