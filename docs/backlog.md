# Backlog sản phẩm — Lắt Léo

Game đố mẹo hack não kiểu Việt. Mục tiêu giai đoạn này: bản chơi thử 25 màn (20 màn 2D, 5 màn 3D) chạy trên web.

- **Phiên bản:** v2.1 (đã làm mịn) · **Cập nhật:** 2026-11-10
- **Kế hoạch sprint:** [sprint-1.md](sprint-1.md)
- **Nguồn chính:** bảng ở mục 1 (điểm, ưu tiên, phụ thuộc, trạng thái, sẵn sàng). Mục 2 bổ sung tiêu chí nghiệm thu, task và vai trò; khi hai nơi khác nhau thì theo bảng.

## Phạm vi và giả định

- Người dùng chính: học sinh, sinh viên, dân văn phòng 15–35 tuổi. Công nghệ: Next.js, Three.js, PostgreSQL.
- Won't giai đoạn này: chế độ nhiều người, thanh toán, ứng dụng tải về.
- Chưa có tài khoản đăng nhập. Nội dung màn nằm trong repo, nạp qua `LevelRepository`; PostgreSQL lưu tiến độ ẩn danh và sự kiện đo lường (xem Q8). Mọi màn mở sẵn (xem Q7).
- 20 màn 2D chia 4 lô × 5 màn; mỗi màn 3D là một story riêng.
- Ước lượng theo điểm 1, 2, 3, 5, 8, 13; mục trên 8 điểm phải chia nhỏ. Thang điểm là tương đối, tạm quy 1 điểm ≈ ½ ngày công của một người.
- Sprint 1 tuần (thứ Hai → thứ Sáu). Năng lực tạm ước 20 điểm/sprint, chưa có velocity thật.
- Ưu tiên theo MoSCoW. Mỗi story có 2–4 tiêu chí nghiệm thu kiểm tra được; mỗi task làm xong trong tối đa 1 ngày.
- Chưa có Định nghĩa Hoàn thành (Q11): tạm hiểu "xong" = tiêu chí nghiệm thu đạt + PO duyệt + mã đã vào nhánh chính.
- Mã vai trò: **FE** lập trình front-end · **BE** back-end, CSDL, triển khai · **DEV3D** lập trình Three.js · **LD** thiết kế màn và viết nội dung · **ART2D** đồ họa 2D, giao diện · **ART3D** mô hình 3D · **QA** kiểm thử · **PO** trưởng nhóm sản phẩm. Một người có thể kiêm nhiều vai.

## Cách đọc bảng

- **Sẵn sàng?** = "Có" khi đủ 4 điều kiện: mô tả rõ, có tiêu chí nghiệm thu kiểm tra được, đã ước lượng, không bị câu hỏi mở chặn. Phụ thuộc đã được xếp phía trên nên không tính là chặn, nhưng story chỉ bắt đầu khi phụ thuộc xong. "Chưa" = còn [CẦN LÀM RÕ] làm tiêu chí hoặc ước lượng đổi theo câu trả lời (xem mục 4).
- Thứ tự là thứ tự làm, từ trên xuống: việc rủi ro cao và việc mở khóa nhiều story làm trước. Should/Could nằm trước khối nghiệm thu cuối và là phần cắt đầu tiên khi thiếu thời gian.
- Mã story giữ ổn định; story mới từ LL-042 trở đi.

## Epic

- **E1 Nền tảng** — dự án chạy được, DB, link web (3 story · 8 điểm)
- **E2 Khung chơi** — nạp màn, vòng chơi, chọn màn, lưu tiến độ, xử lý lỗi (5 · 21)
- **E3 2D** — sân chơi, cơ chế dùng chung, so khớp đáp án tiếng Việt, 20 màn (8 · 40)
- **E4 3D** — khung Three.js, tương tác, trình nạp + ngân sách, 5 màn, tối ưu (9 · 58)
- **E5 Giao diện** — phong cách, trang chủ, responsive, hiệu ứng, màn hoàn tất (5 · 13)
- **E6 Nội dung** — danh sách 25 màn, kịch bản, đồ họa 2D, mô hình 3D, rà soát chữ (13 · 43)
- **E7 Chất lượng** — giấy phép, kiểm thử, sửa lỗi, tối ưu tải, đo lường, ghi công (8 · 28)

## 1. Bảng backlog

| Mã | Epic | User Story | Điểm | Ưu tiên | Phụ thuộc | Trạng thái | Sẵn sàng? |
|---|---|---|---|---|---|---|---|
| [LL-001] | E1 Nền tảng | Là lập trình viên, tôi muốn có khung dự án Next.js chạy được kèm quy ước chung để cả nhóm bắt đầu làm tính năng ngay. | 2 | Must | — | Chưa làm | Có |
| [LL-028] | E6 Nội dung | Là trưởng nhóm sản phẩm, tôi muốn có danh sách 25 màn (loại, ý tưởng mẹo, độ khó, thứ tự) để cả nhóm thống nhất khối lượng trước khi làm. | 3 | Must | — | Chưa làm | Có |
| [LL-008] | E3 2D | Là lập trình viên, tôi muốn thử nhanh và chốt cách dựng màn 2D để không phải làm lại khi đã dựng nhiều màn. | 2 | Must | LL-001 | Chưa làm | Có |
| [LL-014] | E4 3D | Là lập trình viên, tôi muốn có khung cảnh 3D Three.js chạy ổn định trên một trang riêng, chưa cần vòng chơi, để kiểm chứng rủi ro 3D sớm. | 5 | Must | LL-001 | Chưa làm | Có |
| [LL-023] | E5 Giao diện | Là người chơi, tôi muốn giao diện thống nhất và hiển thị đúng tiếng Việt có dấu để đọc đề không bị nhầm chữ. | 3 | Must | LL-001 | Chưa làm | Có |
| [LL-002] | E1 Nền tảng | Là lập trình viên, tôi muốn kết nối PostgreSQL với migration có kiểm soát để dữ liệu nhất quán giữa các môi trường. | 3 | Must | LL-001 | Chưa làm | Có |
| [LL-003] | E1 Nền tảng | Là người chơi, tôi muốn mở game bằng một đường link trên web để chơi thử mà không cần cài đặt. [CẦN LÀM RÕ: Q4] | 3 | Must | LL-001, LL-002 | Chưa làm | Chưa |
| [LL-004] | E2 Khung chơi | Là lập trình viên, tôi muốn mô tả mỗi màn theo một lược đồ chung và nạp theo mã số để thêm 25 màn mà không viết lại khung chơi. | 5 | Must | LL-001 | Chưa làm | Có |
| [LL-005] | E2 Khung chơi | Là người chơi, tôi muốn giải một màn và biết ngay đúng hay sai để sang màn kế tiếp. | 5 | Must | LL-004 | Chưa làm | Có |
| [LL-006] | E2 Khung chơi | Là người chơi, tôi muốn xem danh sách 25 màn và chọn màn muốn chơi để vào chơi nhanh. | 3 | Must | LL-004 | Chưa làm | Có |
| [LL-042] | E3 2D | Là lập trình viên, tôi muốn có sân chơi 2D tự co giãn theo màn hình và quy đổi đúng vị trí chạm/chuột để mọi màn 2D chạy giống nhau trên điện thoại lẫn máy tính. | 3 | Must | LL-008 | Chưa làm | Có |
| [LL-043] | E3 2D | Là người chơi, tôi muốn gõ đáp án tiếng Việt theo cách mình quen (hoa/thường, có/không dấu, "hòa"/"hoà") để không bị tính sai vì cách gõ. | 3 | Must | LL-005, LL-008 | Chưa làm | Có |
| [LL-009] | E3 2D | Là lập trình viên, tôi muốn có các cơ chế tương tác 2D dùng chung (chạm, kéo-thả, chọn đáp án) để dựng nhanh 20 màn. | 3 | Must | LL-005, LL-028, LL-042 | Chưa làm | Có |
| [LL-029] | E6 Nội dung | Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 1 để dựng màn mà không phải đoán ý. [CẦN LÀM RÕ: Q6, Q10] | 5 | Must | LL-023, LL-028 | Chưa làm | Chưa |
| [LL-010] | E3 2D | Là người chơi, tôi muốn chơi lô 1 (2D-01…05) để làm quen với lối đố mẹo qua các màn dễ. [CẦN LÀM RÕ: Q6] | 5 | Must | LL-009, LL-029, LL-043 | Chưa làm | Chưa |
| [LL-016] | E4 3D | Là lập trình viên 3D, tôi muốn có trình nạp tài nguyên, màn hình chờ và ngân sách hiệu năng/tài nguyên bằng số để mọi màn và mô hình 3D bám cùng một chuẩn. | 3 | Must | LL-014 | Chưa làm | Có |
| [LL-033] | E6 Nội dung | Là lập trình viên 3D, tôi muốn có kịch bản chi tiết màn 3D-01 để dựng lát cắt 3D đầu tiên và ước lượng lại chính xác. | 2 | Must | LL-028 | Chưa làm | Có |
| [LL-034] | E6 Nội dung | Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-01 để không phải tự làm. [CẦN LÀM RÕ: Q10] | 3 | Must | LL-016, LL-033 | Chưa làm | Chưa |
| [LL-015] | E4 3D | Là người chơi, tôi muốn chạm/kéo vật và xoay góc nhìn trong cảnh 3D để khám phá và giải đố. | 5 | Must | LL-005, LL-014, LL-028 | Chưa làm | Có |
| [LL-017] | E4 3D | Là người chơi, tôi muốn chơi màn 3D-01 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6] | 8 | Must | LL-015, LL-016, LL-034 | Chưa làm | Chưa |
| [LL-022] | E4 3D | Là người chơi dùng điện thoại tầm trung, tôi muốn màn 3D chạy mượt để chơi không bị giật. [CẦN LÀM RÕ: Q3] | 5 | Must | LL-017 | Chưa làm | Chưa |
| [LL-007] | E2 Khung chơi | Là người chơi, tôi muốn game nhớ các màn đã qua để lần sau chơi tiếp mà không làm lại từ đầu. | 5 | Must | LL-002, LL-005, LL-006 | Chưa làm | Có |
| [LL-048] | E2 Khung chơi | Là người chơi, tôi muốn khi có lỗi (mạng, dữ liệu, lỗi trong màn) game báo rõ và cho thử lại hoặc về chọn màn để không gặp trang trắng. | 3 | Must | LL-005 | Chưa làm | Có |
| [LL-025] | E5 Giao diện | Là người chơi, tôi muốn trang chọn màn và khung chơi dùng thoải mái trên cả điện thoại lẫn máy tính để chơi ở bất cứ đâu. | 3 | Must | LL-005, LL-006, LL-023 | Chưa làm | Có |
| [LL-030] | E6 Nội dung | Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 2 để dựng màn mà không phải đoán ý. [CẦN LÀM RÕ: Q6, Q10] | 5 | Must | LL-023, LL-028 | Chưa làm | Chưa |
| [LL-011] | E3 2D | Là người chơi, tôi muốn chơi lô 2 (2D-06…10) để gặp những mẹo khó dần, buộc phải nghĩ lệch hướng. [CẦN LÀM RÕ: Q6] | 8 | Must | LL-009, LL-030, LL-043 | Chưa làm | Chưa |
| [LL-044] | E6 Nội dung | Là lập trình viên 3D, tôi muốn có kịch bản chi tiết 4 màn 3D còn lại (3D-02…05) để dựng đúng và ước lượng lại chính xác. | 3 | Must | LL-028 | Chưa làm | Có |
| [LL-045] | E6 Nội dung | Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-02 để không phải tự làm. [CẦN LÀM RÕ: Q10] | 3 | Must | LL-016, LL-044 | Chưa làm | Chưa |
| [LL-018] | E4 3D | Là người chơi, tôi muốn chơi màn 3D-02 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6] | 8 | Must | LL-015, LL-016, LL-045 | Chưa làm | Chưa |
| [LL-031] | E6 Nội dung | Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 3 để dựng màn mà không phải đoán ý. [CẦN LÀM RÕ: Q6, Q10] | 5 | Must | LL-023, LL-028 | Chưa làm | Chưa |
| [LL-012] | E3 2D | Là người chơi, tôi muốn chơi lô 3 (2D-11…15) để tiếp tục được thử thách bằng những mẹo mới, không lặp lại. [CẦN LÀM RÕ: Q6] | 8 | Must | LL-009, LL-031, LL-043 | Chưa làm | Chưa |
| [LL-046] | E6 Nội dung | Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-03 để không phải tự làm. [CẦN LÀM RÕ: Q10] | 2 | Must | LL-016, LL-044 | Chưa làm | Chưa |
| [LL-019] | E4 3D | Là người chơi, tôi muốn chơi màn 3D-03 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6] | 8 | Must | LL-015, LL-016, LL-046 | Chưa làm | Chưa |
| [LL-032] | E6 Nội dung | Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 4 để dựng màn mà không phải đoán ý. [CẦN LÀM RÕ: Q6, Q10] | 5 | Must | LL-023, LL-028 | Chưa làm | Chưa |
| [LL-013] | E3 2D | Là người chơi, tôi muốn chơi lô 4 (2D-16…20) để hoàn thành trọn bộ 20 màn 2D với những mẹo khó nhất phần 2D. [CẦN LÀM RÕ: Q6] | 8 | Must | LL-009, LL-032, LL-043 | Chưa làm | Chưa |
| [LL-035] | E6 Nội dung | Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-04 để không phải tự làm. [CẦN LÀM RÕ: Q10] | 3 | Must | LL-016, LL-044 | Chưa làm | Chưa |
| [LL-020] | E4 3D | Là người chơi, tôi muốn chơi màn 3D-04 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6] | 8 | Must | LL-015, LL-016, LL-035 | Chưa làm | Chưa |
| [LL-047] | E6 Nội dung | Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-05 để không phải tự làm. [CẦN LÀM RÕ: Q10] | 2 | Must | LL-016, LL-044 | Chưa làm | Chưa |
| [LL-021] | E4 3D | Là người chơi, tôi muốn chơi màn 3D-05 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6] | 8 | Must | LL-015, LL-016, LL-047 | Chưa làm | Chưa |
| [LL-037] | E7 Chất lượng | Là trưởng nhóm sản phẩm, tôi muốn có bảng kê nguồn và giấy phép của mọi tài nguyên, câu đố để yên tâm đưa bản chơi thử ra công khai. [CẦN LÀM RÕ: Q5] | 2 | Must | LL-029…032, LL-034, LL-035, LL-045…047 | Chưa làm | Chưa |
| [LL-049] | E7 Chất lượng | Là trưởng nhóm sản phẩm, tôi muốn thu số liệu chơi ẩn danh (tỉ lệ thắng, số lần sai, tỉ lệ bỏ dở từng màn) để chỉnh độ khó từ bản chơi thử. [CẦN LÀM RÕ: Q5] | 5 | Should | LL-002, LL-005, LL-007 | Chưa làm | Chưa |
| [LL-024] | E5 Giao diện | Là người chơi, tôi muốn có trang chủ với nút Chơi/Chơi tiếp để bắt đầu nhanh. | 2 | Should | LL-006, LL-007, LL-023 | Chưa làm | Có |
| [LL-026] | E5 Giao diện | Là người chơi, tôi muốn thấy hiệu ứng khi đúng/sai và khi chuyển màn để rõ kết quả mỗi lần giải. | 3 | Should | LL-005, LL-023 | Chưa làm | Có |
| [LL-036] | E6 Nội dung | Là người chơi, tôi muốn đề bài và phản hồi đúng chính tả, đúng dấu để không nhầm đáp án vì lỗi chữ. | 2 | Should | LL-029…033, LL-044 | Chưa làm | Có |
| [LL-041] | E7 Chất lượng | Là người chơi, tôi muốn trang tải nhanh và màn 2D mượt để vào chơi ngay không phải chờ. | 3 | Should | LL-003, LL-010…013 | Chưa làm | Có |
| [LL-051] | E7 Chất lượng | Là người chơi, tôi muốn biết dữ liệu nào được lưu và tài nguyên được ghi công ra sao để yên tâm khi chơi. [CẦN LÀM RÕ: Q5] | 2 | Should | LL-023, LL-037 | Chưa làm | Chưa |
| [LL-027] | E5 Giao diện | Là người chơi, tôi muốn thấy màn hình hoàn tất khi xong cả 25 màn để biết mình đã chơi hết bản thử. | 2 | Could | LL-005, LL-007 | Chưa làm | Có |
| [LL-038] | E7 Chất lượng | Là người chơi, tôi muốn mọi màn đều thắng được và không có lỗi chặn để không bị kẹt giữa chừng. | 5 | Must | LL-007, LL-010…013, LL-017…021, LL-025, LL-048 | Chưa làm | Có |
| [LL-050] | E7 Chất lượng | Là người chơi dùng điện thoại yếu, tôi muốn cả 25 màn vẫn chơi được để không bị loại khỏi bản chơi thử vì cấu hình máy. [CẦN LÀM RÕ: Q3] | 3 | Must | LL-010…013, LL-017…022 | Chưa làm | Chưa |
| [LL-039] | E7 Chất lượng | Là người chơi, tôi muốn game chạy đúng trên thiết bị và trình duyệt của mình để không phải đổi máy. [CẦN LÀM RÕ: Q3] | 3 | Must | LL-025, LL-038 | Chưa làm | Chưa |
| [LL-040] | E7 Chất lượng | Là trưởng nhóm sản phẩm, tôi muốn sửa lỗi ưu tiên cao và chốt một bản chơi thử ổn định để phát hành đúng hạn. [CẦN LÀM RÕ: Q11] | 5 | Must | LL-037, LL-038, LL-039, LL-050 | Chưa làm | Chưa |

## 2. Chi tiết story

Các story cùng khuôn gộp một khối cho đỡ lặp; mỗi story vẫn tính điểm và theo dõi riêng. Mọi task làm xong trong tối đa 1 ngày. "Chờ" là câu hỏi mở đang chặn story (xem mục 4).

### E1 — Nền tảng & triển khai

#### [LL-001] Khung dự án Next.js & quy ước chung

Vai trò: FE

Tiêu chí nghiệm thu:

1. Máy mới clone repo, làm theo README là chạy được môi trường dev và mở trang mẫu, console không có lỗi.
2. Một lệnh chạy lint và kiểm tra định dạng, không báo lỗi trên mã mẫu.
3. README ghi cách cài/chạy, cấu trúc thư mục và quy ước nhánh/commit.

Task: Khởi tạo Next.js, chốt phiên bản Node · Cấu hình ESLint/Prettier và lệnh lint · Dựng cấu trúc thư mục và trang mẫu · Viết README và `.env.example`

#### [LL-002] Kết nối PostgreSQL & migration

Vai trò: BE. Bảng nghiệp vụ (tiến độ, sự kiện) do LL-007 và LL-049 tự tạo; LL-002 chỉ lo kết nối, công cụ migration và API health.

Tiêu chí nghiệm thu:

1. Chạy migration trên DB rỗng thành công; chạy lại lần hai không lỗi, không nhân đôi dữ liệu.
2. Một API route kiểm tra sức khỏe (health) ghi/đọc được một bản ghi thử và trả kết quả đúng.
3. Chuỗi kết nối nằm trong biến môi trường, không có thông tin bí mật trong git.

Task: Chọn thư viện truy cập DB · Cấu hình DB local và hướng dẫn trong README · Cấu hình công cụ migration và migration kiểm tra · API route health và test

#### [LL-003] Triển khai bản chạy thử lên web

Vai trò: BE. Chờ: Q4.

Tiêu chí nghiệm thu:

1. URL chạy thử mở được trang chính trên Chrome và Safari (điện thoại và máy tính).
2. Triển khai bản mới bằng một lệnh hoặc tự động khi merge vào nhánh chính, không có bước thủ công nào khác.
3. Môi trường chạy thử đọc/ghi được DB (kiểm tra bằng API health của LL-002).

Task: Chọn hosting và DB theo ngân sách · Tạo DB và biến môi trường cho môi trường chạy thử · Thiết lập quy trình triển khai · Chạy migration và smoke test URL

### E2 — Khung chơi & điều hướng

#### [LL-004] Mô hình màn chơi & trình nạp màn

Vai trò: FE (thêm BE nếu Q8 chọn lưu nội dung màn trong DB). Adapter PostgreSQL (≈ 3 điểm) chỉ thêm khi đó.

Tiêu chí nghiệm thu:

1. Mỗi màn gồm số thứ tự, loại (2D/3D), đề bài, cơ chế tương tác, điều kiện thắng. Dữ liệu sai lược đồ bị từ chối khi nạp, thông báo nêu mã màn và tên trường sai.
2. Mở màn theo số thứ tự trả đúng dữ liệu; số không tồn tại hiện trang "không tìm thấy màn", không crash.
3. Nạp màn qua giao diện `LevelRepository`; có 1 adapter đọc tệp trong repo, và test với adapter giả chứng minh đổi nguồn dữ liệu (ví dụ PostgreSQL) không phải sửa khung chơi.

Task: Thiết kế lược đồ màn và kiểu dữ liệu · Viết bộ kiểm tra lược đồ · Viết giao diện LevelRepository và adapter đọc tệp · Route theo số màn và trang "không tìm thấy" · Đăng ký cơ chế (mechanic registry) cho 2D/3D · Test đơn vị và 2 màn mẫu thuộc 2 cơ chế khác nhau

#### [LL-005] Vòng chơi cơ bản: vào màn → thao tác → thắng/sai → màn kế

Vai trò: FE

Tiêu chí nghiệm thu:

1. Hoàn thành điều kiện thắng thì trạng thái thắng hiện trong ≤ 1 giây kèm nút "Màn tiếp" (kể cả khi kiểm tra đáp án bất đồng bộ qua mạng 4G giả lập). Ở màn cuối nút này thành "Về chọn màn".
2. Thao tác/đáp án sai hiện phản hồi sai và cho thử lại ngay, không tải lại trang.
3. Nút "Chơi lại" và "Về chọn màn" có mặt suốt thời gian chơi và hoạt động đúng.
4. Test liệt kê mọi trạng thái của vòng chơi (đang chơi, sai, thắng, lỗi nạp) và xác nhận mỗi trạng thái có ≥ 1 thao tác về chọn màn.

Task: Máy trạng thái màn (đang chơi/thắng/sai) · Khung màn: số màn, chơi lại, thoát · Hộp thoại kết quả, điều hướng màn kế/màn cuối · Giao diện chung để cơ chế báo thắng/sai (hỗ trợ bất đồng bộ) · Test các luồng thắng/sai/chơi lại/thoát

#### [LL-006] Màn hình chọn màn

Vai trò: FE. Nếu Q7 chọn mở tuần tự thì thêm story "Khóa màn tuần tự" (xem mục 5).

Tiêu chí nghiệm thu:

1. Hiển thị đủ 25 ô đánh số 1–25; bấm một ô mở đúng màn đó.
2. Mặc định mọi màn đều mở; quy tắc mở/khóa nằm trong một cấu hình duy nhất và có test.
3. Danh sách sinh từ dữ liệu màn (LL-004); thêm/bớt màn không phải sửa giao diện.

Task: Dựng lưới ô màn từ dữ liệu · Điều hướng ô → màn · Cấu hình quy tắc mở/khóa · Test điều hướng và cấu hình

#### [LL-007] Lưu & khôi phục tiến độ chơi

Vai trò: BE + FE. Giả định không có tài khoản đăng nhập (Q8).

Tiêu chí nghiệm thu:

1. Thắng màn n rồi tải lại trang thì màn n vẫn có dấu "đã hoàn thành" ở màn chọn màn.
2. Người chơi mới (chưa có dữ liệu) vào game bình thường, mọi màn ở trạng thái chưa hoàn thành, không lỗi.
3. Lưu thất bại (mất mạng/lỗi server) không chặn việc chơi; hiện thông báo không chặn và tiến độ vẫn giữ trong phiên hiện tại.

Task: Thiết kế bảng tiến độ và mã người chơi ẩn danh (migration riêng) · API ghi/đọc tiến độ · Lưu khi thắng, đọc khi mở game · Dấu "đã hoàn thành" ở màn chọn màn · Xử lý lỗi mạng và test

#### [LL-048] Xử lý lỗi toàn cục

Vai trò: FE

Tiêu chí nghiệm thu:

1. Lỗi khi dựng một màn bị error boundary chặn: hiện thông báo kèm "Chơi lại"/"Về chọn màn", các màn khác không bị ảnh hưởng.
2. Nạp dữ liệu màn thất bại thì hiện "Thử lại"; thử lại thành công thì vào được màn.
3. Mất mạng khi đang chơi thì hiện banner ngoại tuyến, màn đã nạp vẫn chơi tiếp được.
4. Lỗi chưa bắt được hiện trang lỗi chung có nút về chọn màn, không trang trắng.

Task: Error boundary · Trang lỗi chung · Thử lại khi nạp màn · Banner ngoại tuyến · Test 3 kịch bản giả lập lỗi

### E3 — Màn chơi 2D

#### [LL-008] Spike: chốt cách dựng màn 2D

Vai trò: FE (PO duyệt quyết định)

Tiêu chí nghiệm thu:

1. Có ghi chú quyết định ≤ 1 trang (phương án chọn, lý do, giới hạn); PO duyệt trước khi bắt đầu LL-042.
2. Có prototype chạm + kéo-thả chạy bằng chuột và cảm ứng, thử trên ≥ 1 điện thoại thật và ≥ 1 máy tính.
3. Prototype giữ ≥ 30 khung hình/giây khi kéo-thả trên điện thoại thử (ngưỡng tạm, theo Q3).

Task: Prototype DOM/SVG · Prototype Canvas · Đo FPS và độ chính xác chạm trên điện thoại · Viết ghi chú quyết định, trình PO

#### [LL-042] Sân chơi 2D co giãn & quy đổi tọa độ

Vai trò: FE

Tiêu chí nghiệm thu:

1. Sân chơi giữ tỉ lệ đã khai báo và co giãn đúng ở 360×640, 768×1024, 1366×768, 1920×1080, không méo hay tràn.
2. Vị trí chạm/chuột quy đổi về tọa độ logic với sai lệch ≤ 2 đơn vị ở cả 4 kích thước.
3. Trên điện thoại, thao tác trong sân chơi không làm cuộn hay thu phóng trang.

Task: Hệ tọa độ logic và co giãn · Chuẩn hóa pointer events · Chặn cuộn/thu phóng · Trang thử 4 kích thước

#### [LL-043] Nhập chữ & so khớp đáp án tiếng Việt

Vai trò: FE

Tiêu chí nghiệm thu:

1. So khớp bỏ qua hoa/thường và khoảng trắng thừa, chuẩn hóa Unicode (NFC/NFD) và vị trí dấu thanh ("hòa" = "hoà").
2. Mỗi màn cấu hình được chế độ "bắt buộc dấu" hoặc "bỏ qua dấu" và danh sách đáp án chấp nhận (≥ 1 biến thể).
3. ≥ 15 ca test, gồm đ/Đ, chữ nhiều dấu, chuỗi rỗng, chuỗi rất dài.

Task: Chuẩn hóa chuỗi · Cấu hình theo màn · Bộ test · Ô nhập và phản hồi

#### [LL-009] Cơ chế tương tác 2D dùng chung (chạm, kéo-thả, chọn đáp án)

Vai trò: FE

Tiêu chí nghiệm thu:

1. Chạm/nhấn, kéo-thả, chọn đáp án: mỗi loại có màn demo chạy bằng chuột và cảm ứng.
2. Mỗi cơ chế báo thắng/sai qua giao diện chung của LL-005 (có test).
3. Kéo-thả: thả ngoài vùng hợp lệ thì vật về chỗ cũ, không mất vật.

Task: Cơ chế chạm · Cơ chế kéo-thả · Cơ chế chọn đáp án · Màn demo và test

#### [LL-010], [LL-011], [LL-012], [LL-013] · Dựng 20 màn 2D theo 4 lô

Lô 1 = 2D-01…05 (LL-010, 5 điểm, cần nội dung LL-029); lô 2 = 2D-06…10 (LL-011, 8 điểm, LL-030); lô 3 = 2D-11…15 (LL-012, 8 điểm, LL-031); lô 4 = 2D-16…20 (LL-013, 8 điểm, LL-032). Lô 1 dễ nhất nên 5 điểm; lô 2–4 cần ước lượng lại khi có kịch bản.

Vai trò: FE. Chờ: Q6.

Tiêu chí nghiệm thu (cho mỗi lô):

1. Cả 5 màn chơi được từ lúc mở tới lúc thắng bằng thao tác/đáp án đúng theo kịch bản. Thao tác sai cho phản hồi sai và thử lại được.
2. Đề bài, hình ảnh, đáp án khớp kịch bản và đồ họa đã duyệt của lô.
3. Hiển thị đúng, không tràn chữ hay vỡ bố cục ở 360×640 và 1366×768 px.

Task (mỗi lô): Dựng từng màn, mỗi màn 1 task gồm cảnh và logic thắng/sai (5 task) · Nhập dữ liệu 5 màn vào nguồn dữ liệu màn · Gắn đồ họa của lô · Kiểm thử cả lô trên điện thoại và máy tính, sửa lỗi

### E4 — Màn chơi 3D

#### [LL-014] Khung cảnh 3D Three.js trên trang riêng

Vai trò: DEV3D. Nối sự kiện thắng/sai vào khung chơi chuyển sang LL-015, nên LL-014 chỉ phụ thuộc LL-001.

Tiêu chí nghiệm thu:

1. Cảnh mẫu (camera, ánh sáng, vài khối) hiển thị trên một trang riêng; chỉ chạy phía trình duyệt, build/render phía server không lỗi.
2. Đổi kích thước hoặc xoay màn hình thì cảnh co giãn đúng tỉ lệ, không méo.
3. Rời màn/chuyển màn giải phóng hình học, vật liệu, bộ render. Sau 20 lần mở–thoát màn, bộ nhớ heap tăng ≤ 10% (đo bằng DevTools).
4. Thiết bị không hỗ trợ WebGL hiện thông báo thân thiện thay vì màn trắng.

Task: Tích hợp Three.js (tải động, tắt SSR) · Dựng scene/camera/ánh sáng/vòng lặp render · Xử lý resize/xoay màn hình · Giải phóng tài nguyên khi rời màn · Phát hiện WebGL và thông báo thay thế · Test mở–thoát 20 lần, đo heap · Chạy cảnh mẫu trên ≥ 1 điện thoại thật, ghi FPS (task thêm khi lập kế hoạch Sprint 1, để kiểm chứng rủi ro 3D sớm)

#### [LL-015] Tương tác 3D: chọn, kéo, xoay camera (chuột + cảm ứng)

Vai trò: DEV3D

Tiêu chí nghiệm thu:

1. Chọn đúng vật khi bấm/chạm, vùng chọn tối thiểu 44×44 px dù vật nhỏ hơn, có phản hồi hiển thị khi chọn.
2. Xoay/thu phóng camera bằng chuột (kéo/lăn) và cảm ứng (1 ngón xoay, 2 ngón thu phóng), giới hạn góc/khoảng cách cấu hình được theo từng màn.
3. Kéo vật theo con trỏ/ngón tay không xung đột với xoay camera và không làm cuộn/thu phóng cả trang trên điện thoại.
4. Thao tác đúng phát sự kiện thắng/sai về khung chơi (LL-005), có test.

Task: Raycasting chọn vật và vùng chạm đủ lớn · Điều khiển camera có giới hạn · Kéo vật và quy tắc ưu tiên kéo vật/xoay camera · Chặn cuộn/thu phóng trang · Nối sự kiện thắng/sai vào khung chơi · Test trên chuột và cảm ứng thật

#### [LL-016] Trình nạp tài nguyên 3D, màn hình chờ & ngân sách

Vai trò: DEV3D (ART3D và PO duyệt ngân sách). Đây là nơi duy nhất định nghĩa ngân sách hiệu năng/tài nguyên; LL-017–021, LL-022, LL-034, LL-035, LL-045–047, LL-050 chỉ tham chiếu tới đây.

Tiêu chí nghiệm thu:

1. Vào màn 3D hiện màn hình chờ kèm % tải, ẩn khi xong. Lỗi tải hiện thông báo kèm nút thử lại.
2. Mô hình/texture nạp một lần và dùng lại khi chơi lại màn (không tải lại).
3. Tài liệu ngân sách ghi giá trị cụ thể cho FPS tối thiểu, MB tài nguyên/màn, số đa giác, số draw call và được PO + ART3D duyệt.

Task: Trình nạp glTF và bộ nhớ đệm · Màn hình chờ, xử lý lỗi/thử lại · Soạn ngân sách hiệu năng/tài nguyên, chốt cùng ART3D và PO · Test mạng chậm giả lập

#### [LL-017], [LL-018], [LL-019], [LL-020], [LL-021] · Từng màn 3D (3D-01…05)

Mỗi màn một story, 8 điểm: LL-017 = 3D-01 (mô hình LL-034), LL-018 = 3D-02 (LL-045), LL-019 = 3D-03 (LL-046), LL-020 = 3D-04 (LL-035), LL-021 = 3D-05 (LL-047). 8 điểm là giả định (mỗi màn có cảnh riêng và 1–2 tương tác mới), cần ước lượng lại sau LL-033/LL-044.

Vai trò: DEV3D (FE hỗ trợ giao diện). Chờ: Q6.

Tiêu chí nghiệm thu (cho mỗi màn):

1. Chơi được từ lúc mở tới lúc thắng bằng thao tác đúng theo kịch bản (LL-033/LL-044); thao tác sai cho phản hồi sai và thử lại được.
2. Đạt ngân sách hiệu năng/tài nguyên của LL-016 trên thiết bị tham chiếu.
3. Chơi lại/thoát về chọn màn ở bất kỳ thời điểm nào không để lại tài nguyên treo hay lỗi console.

Task (mỗi màn): Dựng cảnh và đặt vật thể theo kịch bản · Lập trình tương tác và điều kiện thắng/sai · Hiệu ứng phản hồi và chuyển màn · Tinh chỉnh camera/vùng chạm cho điện thoại · Đo hiệu năng, sửa lỗi

#### [LL-022] Tối ưu hiệu năng 3D trên thiết bị mục tiêu

Vai trò: DEV3D. Chờ: Q3.

Tiêu chí nghiệm thu:

1. Đo màn 3D-01 so với ngân sách LL-016 trên ≥ 3 thiết bị (≥ 1 máy yếu); chỉ số nào vượt ngân sách thì có hạng mục tối ưu.
2. Màn 3D-01 đạt ngân sách trên thiết bị mục tiêu thấp nhất (theo Q3); các màn sau đo lại bằng cùng cách.
3. Quy trình nén/tối ưu tài nguyên được ghi lại để ART3D dùng cho các màn sau.

Task: Đo cơ sở FPS/bộ nhớ/thời gian tải trên 2–3 thiết bị · Giới hạn pixel ratio, bóng đổ, ánh sáng theo thiết bị · Nén texture/mô hình, gộp draw call · Viết checklist áp dụng cho màn khác

### E5 — Giao diện & trải nghiệm

#### [LL-023] Phong cách hình ảnh & bộ giao diện hỗ trợ tiếng Việt

Vai trò: ART2D + FE (PO chốt phong cách)

Tiêu chí nghiệm thu:

1. Bảng màu, phông chữ, cỡ chữ tối thiểu, nút, hộp thoại được ghi lại và dùng làm thành phần chung trong mã.
2. Chuỗi thử đủ các tổ hợp dấu tiếng Việt (ví dụ "ỡ", "ặ", "ự") hiển thị đúng bằng phông đã chọn, không rơi về phông dự phòng.
3. Chữ đề bài ≥ 16 px, tương phản chữ/nền ≥ 4,5:1.

Task: Chốt phong cách (moodboard, bảng màu) với PO · Chọn phông hỗ trợ tiếng Việt và trang chuỗi thử · Dựng design token, nút/hộp thoại/tiêu đề · Trang mẫu các thành phần

#### [LL-024] Trang chủ

Vai trò: FE

Tiêu chí nghiệm thu:

1. Trang chủ hiện tên game và nút "Chơi" dẫn tới màn chọn màn.
2. Người đã có tiến độ thấy nút "Chơi tiếp" dẫn thẳng tới màn chưa hoàn thành đầu tiên.

Task: Dựng trang chủ · Nối với tiến độ (LL-007) · Test hai trạng thái (mới / đã có tiến độ)

#### [LL-025] Bố cục đáp ứng điện thoại & máy tính (màn chọn màn, khung chơi)

Vai trò: FE. Việc co giãn sân chơi 2D nằm ở LL-042.

Tiêu chí nghiệm thu:

1. Khung chơi và màn chọn màn dùng được ở độ rộng 360–1920 px, không cuộn ngang, không tràn chữ.
2. Vùng chạm của nút và ô chọn màn ≥ 44×44 px trên điện thoại.
3. Xoay dọc↔ngang không làm mất trạng thái màn đang chơi.

Task: Hệ lưới và breakpoint · Chỉnh vùng chạm/khoảng cách cho cảm ứng · Xử lý xoay màn hình và safe-area · Test ở 360/768/1920 px

#### [LL-026] Hiệu ứng đúng/sai & chuyển màn

Vai trò: FE + ART2D

Tiêu chí nghiệm thu:

1. Mỗi lần thắng/sai có hiệu ứng riêng ≤ 1 giây, không chặn thao tác tiếp theo quá thời lượng đó.
2. Chuyển màn có chuyển cảnh ≤ 500 ms, không giật trên điện thoại thử.

Task: Thiết kế hiệu ứng đúng/sai · Cài hiệu ứng (CSS/thư viện hoạt ảnh) · Chuyển cảnh giữa màn · Test hiệu năng trên điện thoại

#### [LL-027] Màn hình hoàn tất bản chơi thử

Vai trò: FE

Tiêu chí nghiệm thu:

1. Khi cả 25 màn đã hoàn thành, hiện màn hình hoàn tất kèm lời cảm ơn. Chưa đủ 25 màn thì không hiện.
2. Nút "Về chọn màn" trên màn hình này hoạt động đúng.

Task: Dựng màn hình · Điều kiện hiển thị (đọc tiến độ) · Test

### E6 — Nội dung & thiết kế màn

#### [LL-028] Danh sách 25 màn & đường cong độ khó

Vai trò: LD (PO duyệt)

Tiêu chí nghiệm thu:

1. Bảng 25 dòng gồm số thứ tự, loại (20 màn 2D / 5 màn 3D), ý tưởng mẹo một dòng, cơ chế tương tác, điểm độ khó 1–3.
2. Điểm độ khó trung bình của mỗi nhóm 5 màn không thấp hơn nhóm trước; vị trí 5 màn 3D được ghi rõ.
3. Mỗi màn dùng cơ chế thuộc danh mục (chạm, kéo-thả, chọn đáp án, nhập chữ, chọn/kéo/xoay 3D) hoặc được đánh dấu "cơ chế mới" để ước lượng lại. PO duyệt bảng.

Task: Thu thập/viết ≥ 25 ý tưởng mẹo (kèm dự phòng) · Phân loại cơ chế và độ khó, xếp thứ tự · Đánh dấu chỗ cần cơ chế mới · Họp duyệt với PO

#### [LL-029], [LL-030], [LL-031], [LL-032] · Kịch bản + đồ họa 2D theo lô (lô 1…4)

Mỗi lô 5 điểm, ứng với 5 màn 2D của lô cùng số ở E3 (LL-029 → LL-010, LL-030 → LL-011, LL-031 → LL-012, LL-032 → LL-013).

Vai trò: LD + ART2D. Chờ: Q6, Q10.

Tiêu chí nghiệm thu (cho mỗi lô):

1. Mỗi màn có kịch bản gồm đề bài tiếng Việt, thao tác/đáp án đúng, các đáp án sai thường gặp kèm phản hồi, lời giải "mẹo", cơ chế dùng.
2. Đồ họa của 5 màn giao đủ ở định dạng web, đạt checklist phong cách của LL-023 và đặt tên theo quy ước.
3. PO duyệt kịch bản cả lô (theo checklist) trước khi lập trình dựng màn.

Task (mỗi lô): Viết kịch bản màn 1–3 · Viết kịch bản màn 4–5 · Vẽ đồ họa màn 1–3 · Vẽ đồ họa màn 4–5 · Xuất tệp, đặt tên theo quy ước · PO duyệt và sửa

#### [LL-033] Kịch bản màn 3D-01

Vai trò: LD

Tiêu chí nghiệm thu:

1. Mô tả cảnh, danh sách vật thể cần mô hình (kèm mức chi tiết), tương tác cho phép, điều kiện thắng/sai và phản hồi của 3D-01.
2. Tài nguyên 3D cần có của 3D-01 được gom thành một bảng (tên, độ phức tạp, nguồn: tự làm/có sẵn).
3. DEV3D xác nhận khả thi trên thiết bị mục tiêu và ước lượng lại LL-017.

Task: Viết kịch bản 3D-01 · Lập bảng tài nguyên 3D-01 · Họp rà soát khả thi với DEV3D và ART3D, cập nhật ước lượng

#### [LL-044] Kịch bản 4 màn 3D còn lại (3D-02…05)

Vai trò: LD

Tiêu chí nghiệm thu:

1. Mỗi màn 3D-02…05 có mô tả cảnh, danh sách vật thể cần mô hình, tương tác cho phép, điều kiện thắng/sai, phản hồi.
2. Tài nguyên 3D cần có được gom vào bảng chung (tên, độ phức tạp, nguồn).
3. DEV3D xác nhận khả thi và ước lượng lại LL-018…021.

Task: Viết kịch bản 3D-02…03 · Viết kịch bản 3D-04…05 · Bổ sung bảng tài nguyên 3D · Họp rà soát khả thi với DEV3D và ART3D, cập nhật ước lượng

#### [LL-034], [LL-045], [LL-046], [LL-035], [LL-047] · Mô hình 3D cho từng màn 3D

LL-034 = 3D-01 (3 điểm), LL-045 = 3D-02 (3), LL-046 = 3D-03 (2), LL-035 = 3D-04 (3), LL-047 = 3D-05 (2); tổng 13 điểm. Mỗi story phụ thuộc kịch bản tương ứng (LL-033 cho 3D-01, LL-044 cho các màn còn lại) và ngân sách ở LL-016.

Vai trò: ART3D. Chờ: Q10.

Tiêu chí nghiệm thu (cho mỗi story):

1. Mô hình giao ở định dạng web (ví dụ glTF/GLB), nằm trong ngân sách của LL-016 và mở được trong cảnh thử (LL-014).
2. Vật thể khớp bảng tài nguyên của kịch bản; tên đối tượng/hoạt ảnh đặt theo quy ước để mã gọi được.
3. Mỗi tài nguyên ghi nguồn và giấy phép (đầu vào cho LL-037).

Task (mỗi màn): Tạo hoặc chọn mô hình theo bảng · Gán vật liệu, giảm đa giác, nén texture · Xuất, đặt tên, nạp thử trong cảnh mẫu

#### [LL-036] Rà soát chính tả & giọng văn tiếng Việt

Vai trò: LD

Tiêu chí nghiệm thu:

1. Mọi văn bản hiển thị của 25 màn (đề bài, phản hồi, lời giải) được một người khác tác giả đọc soát, danh sách sửa được đóng hết.
2. Các câu chơi chữ phụ thuộc dấu thanh được kiểm lại: gõ có dấu/không dấu cho kết quả đúng theo cấu hình từng màn (LL-043).

Task: Trích toàn bộ chuỗi hiển thị ra một bảng · Đọc soát bởi người khác tác giả · Cập nhật nội dung và kiểm tra lại trong game

### E7 — Chất lượng, đo lường & nghiệm thu

#### [LL-037] Bảng kê nguồn & giấy phép tài nguyên

Vai trò: PO + LD. Chờ: Q5.

Tiêu chí nghiệm thu:

1. Mọi tài nguyên trong bản phát hành (phông, hình, mô hình 3D, thư viện) có một dòng ghi nguồn, giấy phép, yêu cầu ghi công.
2. Mục không rõ giấy phép bị gỡ hoặc thay trước khi phát hành.
3. Mỗi câu đố ghi nguồn: tự sáng tác hay lấy từ đâu.

Task: Lập bảng kê trong repo · Rà từng tài nguyên: nguồn và giấy phép · Thay/gỡ mục không hợp lệ · Rà nguồn câu đố

#### [LL-038] Kiểm thử chơi thử nội bộ 25 màn

Vai trò: QA. Phạm vi: đúng/sai chức năng trên một thiết bị chuẩn (LL-039 lo ma trận thiết bị phổ thông, LL-050 lo hiệu năng máy yếu).

Tiêu chí nghiệm thu:

1. Có bảng kiểm 25 dòng; mỗi màn được chơi hết bằng đáp án đúng và thử ≥ 3 thao tác sai/lạ, ghi đạt/không đạt.
2. Mỗi lỗi ghi rõ màn, bước tái hiện, thiết bị, ảnh/video.
3. Mọi lỗi được phân mức (chặn/cao/thường/thấp) và gán người phụ trách; lỗi mức chặn chuyển sang LL-040.

Task: Lập bảng kiểm và mẫu báo lỗi · Chơi thử 2D-01…10 · Chơi thử 2D-11…20 · Chơi thử 3D-01…05 · Tổng hợp lỗi, phân mức ưu tiên

#### [LL-039] Kiểm thử tương thích thiết bị & trình duyệt

Vai trò: QA. Chờ: Q3.

Tiêu chí nghiệm thu:

1. Ma trận thiết bị/trình duyệt phổ thông (theo Q3) được chốt; mỗi ô ghi đạt/không đạt cho màn chọn màn, ≥ 1 màn 2D mỗi cơ chế và ≥ 1 màn 3D.
2. Lỗi phát hiện được ghi theo mẫu và phân mức; lỗi chặn chuyển sang LL-040.
3. Kiểm chứng thông báo của LL-014 trên 1 thiết bị/giả lập không có WebGL.

Task: Chốt ma trận, mượn/giả lập thiết bị · Chạy kịch bản kiểm trên từng ô · Ghi và phân loại lỗi

#### [LL-040] Sửa lỗi ưu tiên cao & chốt bản chơi thử

Vai trò: FE, BE, DEV3D, LD. Chờ: Q11.

Tiêu chí nghiệm thu:

1. 0 lỗi mức chặn; mọi lỗi mức cao đã đóng hoặc được PO ghi nhận hoãn bằng văn bản.
2. Bản phát hành gắn phiên bản (tag), triển khai lên URL chạy thử (LL-003) và qua smoke test đủ 25 màn trên bản đã triển khai.
3. Có ghi chú phát hành: lỗi đã biết và thiết bị không hỗ trợ.
4. Từng mục trong Định nghĩa Hoàn thành (DoD) được ghi đạt/không đạt.

Task: Phân loại và chia lỗi theo người · Sửa lỗi (mỗi lỗi ≤ 1 ngày, lỗi lớn hơn tách task) · Gắn tag, triển khai, smoke test 25 màn · Viết ghi chú phát hành

#### [LL-041] Tối ưu tốc độ tải & hiệu năng 2D

Vai trò: FE

Tiêu chí nghiệm thu:

1. Màn chọn màn tải xong và dùng được ≤ 3 giây ở mạng 4G giả lập (ngưỡng tạm).
2. Tài nguyên màn kế được tải trước, bấm "Màn tiếp" thì màn kế mở trong ≤ 1 giây.
3. Dung lượng tải ban đầu của màn chọn màn ≤ 1 MB (ngưỡng tạm).

Task: Đo cơ sở (Lighthouse/DevTools) · Nén ảnh và tải theo nhu cầu · Tải trước màn kế · Đo lại và ghi kết quả

#### [LL-049] Đo lường chơi ẩn danh

Vai trò: BE + FE. Chờ: Q5.

Tiêu chí nghiệm thu:

1. Ghi 5 sự kiện ẩn danh (mở màn, thắng, sai, thoát giữa chừng, lỗi) kèm mã màn, thời điểm, mã người chơi ẩn danh, loại thiết bị.
2. Không ghi dữ liệu định danh (tên, email, IP thô); danh sách trường được ghi nằm trong tài liệu.
3. Có sẵn 3 truy vấn: tỉ lệ thắng, số lần sai trung bình, tỉ lệ bỏ dở theo từng màn.
4. Gửi sự kiện thất bại không ảnh hưởng việc chơi.

Task: Bảng sự kiện và migration · API nhận sự kiện · Gắn sự kiện vào vòng chơi · Viết 3 truy vấn · Test lỗi gửi

#### [LL-050] Kiểm thử hiệu năng trên máy yếu (25 màn)

Vai trò: QA (DEV3D hỗ trợ). Chờ: Q3.

Tiêu chí nghiệm thu:

1. Chốt thiết bị yếu tham chiếu (theo Q3) và ghi FPS, thời gian tải của cả 25 màn.
2. Mọi màn 2D chơi được ở ≥ 30 FPS (ngưỡng tạm). Màn 3D đạt ngân sách LL-016, hoặc có hạng mục tối ưu, hoặc được PO chấp nhận bằng văn bản.
3. Lặp lại bằng giả lập giảm CPU 4× và mạng 4G, ghi kết quả.

Task: Chọn/mượn thiết bị · Chạy 2D · Chạy 3D · Giả lập CPU/mạng · Tổng hợp và tạo hạng mục sửa

#### [LL-051] Ghi công & thông báo dữ liệu

Vai trò: FE + PO. Chờ: Q5.

Tiêu chí nghiệm thu:

1. Trang thông tin liệt kê ghi công của mọi tài nguyên có yêu cầu (lấy từ bảng kê LL-037).
2. Thông báo ngắn nêu dữ liệu ẩn danh được lưu (mã người chơi, sự kiện) và cách xóa.
3. Mở được từ chân trang ở mọi màn hình chính.

Task: Dựng trang · Đưa nội dung từ bảng kê · Liên kết ở chân trang · Test

## 3. Tổng điểm theo ưu tiên

| Ưu tiên | Số story | Điểm | Tỉ lệ |
|---|---|---|---|
| Must | 44 | 192 | 91,0% |
| Should | 6 | 17 | 8,1% |
| Could | 1 | 2 | 0,9% |
| Won't | 0 | 0 | — |
| **Tổng** | **51** | **211** | 100% |

- Ở 20 điểm/sprint (giả định chưa kiểm chứng): Must ≈ 9,6 sprint, toàn bộ ≈ 10,6 sprint.
- Điểm theo Epic: E1 8 · E2 21 · E3 40 · E4 58 · E5 13 · E6 43 · E7 28.
- Sẵn sàng: 25 story "Có" (81 điểm) và 26 story "Chưa" (130 điểm). Nguyên nhân của "Chưa": Q6 hoặc Q10 chặn 18 story (102 điểm ≈ 48% tổng), Q3 chặn 3 story (11 điểm), Q5 chặn 3 story (9 điểm), Q4 chặn 1 story (3 điểm), Q11 chặn 1 story (5 điểm).
- Còn 8 story 8 điểm (LL-011–013, LL-017–021), đều "Chưa"; tách tiếp khi có kịch bản (Q6). Không story nào vượt 8 điểm.
- Won't đã chốt: chế độ nhiều người, thanh toán, ứng dụng tải về. Không ước lượng.

## 4. Câu hỏi cần làm rõ

★ = đã hỏi từ đầu, chưa có trả lời. Q1, Q2, Q6 chặn việc xếp sprint.

1. ★ **Hạn chót** bản chơi thử là ngày nào, và Sprint 1 bắt đầu thứ Hai nào? (Kế hoạch đang giả định 16/11–20/11/2026.)
2. ★ **Đội hình** (tên – vai trò – giờ/tuần): ai làm FE, BE, 3D, đồ họa 2D/3D, thiết kế màn, kiểm thử? Có ai kiêm nhiều vai không?
3. ★ **Thiết bị/trình duyệt tối thiểu** là gì? 3D có phải chạy mượt (≥ 30 FPS) trên điện thoại tầm trung không? Có màn nào bắt buộc chiều ngang không? (LL-008, 022, 039, 050)
4. ★ **Ngân sách** hosting/DB tối đa mỗi tháng? Bản chạy thử công khai hay chỉ người được mời? (LL-003)
5. ★ **Pháp lý**: có thu thập dữ liệu cá nhân của người chơi (nhất là 15–17 tuổi) không? Câu đố/tài nguyên có yêu cầu bản quyền hay ghi công gì? (LL-037, 049, 051; giấy phép mô hình ở LL-034, 035, 045–047)
6. ★ **Kịch bản 25 màn** đã có chưa (ai nghĩ ra các câu đố)? Các màn dùng chung vài khuôn mẫu tương tác hay mỗi màn một cơ chế riêng? Câu này ảnh hưởng lớn nhất tới LL-010–013, 017–021, 028–033, 044.
7. **Thứ tự và mở khóa màn**: mọi màn mở sẵn hay phải qua tuần tự? 5 màn 3D nằm ở vị trí nào trong 25 màn? (LL-006 đang mặc định mở sẵn; LL-028)
8. **Dữ liệu**: PostgreSQL lưu gì (nội dung màn, tiến độ ẩn danh, hay cả tài khoản)? Kiểm tra đáp án ở trình duyệt hay ở server (để không lộ đáp án trong mã tải về)? (LL-004, 005, 007)
9. **Kiểu tương tác và luật đáp án**: ngoài chạm, kéo-thả, gõ chữ, chọn đáp án còn kiểu nào (nhấn giữ, lắc/nghiêng máy; iOS cần xin quyền cảm biến)? Đáp án gõ chữ có chấp nhận không dấu và khác hoa/thường không? (LL-009 và LL-043 đang để cấu hình theo từng màn; LL-028)
10. **Mức đồ họa**: tối giản (hình khối/emoji) hay minh họa đầy đủ? Mô hình 3D tự làm, mua hay dùng nguồn miễn phí có giấy phép? (LL-023, 029–032, 034, 035, 045–047)
11. ★ **Định nghĩa Hoàn thành (DoD)**: chưa có. Dán DoD vào, hoặc soạn bản nháp cho game web này? (LL-040 và mọi story)

## 5. Story có điều kiện

Chỉ thêm vào backlog nếu câu trả lời yêu cầu; chưa tính vào tổng điểm.

- **Khóa màn tuần tự** (≈ 2 điểm): nếu Q7 chọn mở tuần tự.
- **Adapter PostgreSQL cho nội dung màn** (≈ 3 điểm): nếu Q8 chọn lưu nội dung màn trong DB.

## 6. Đề xuất thêm (ngoài phạm vi, không tính điểm)

- **Gợi ý cho từng màn**: game đố mẹo hay làm người chơi bí, gợi ý giúp họ không bỏ cuộc.
- **Nút/biểu mẫu gửi phản hồi trong game**: mục đích bản chơi thử là thu ý kiến người chơi 15–35 tuổi.
- **Màn làm quen/hướng dẫn chơi**: nếu màn đầu chưa đủ để giải thích cách chơi.
- **Âm thanh và nhạc nền**: tăng cảm xúc nhưng thêm tài nguyên và vấn đề giấy phép.
- **Kiểm thử tự động và CI**: chạy lint/test mỗi lần merge để tránh lỗi hồi quy khi thêm màn (chờ Q11).
- **Chia sẻ kết quả lên mạng xã hội**: tăng lan truyền ở nhóm 15–35 tuổi.
- **Tài khoản/đồng bộ tiến độ giữa thiết bị**: hiện tiến độ gắn với một trình duyệt.

"Số liệu chơi ẩn danh" từng nằm ở đây, nay đã thành LL-049.

## 7. Lịch sử thay đổi

**v1 — 2026-11-09.** Backlog đầu tiên: 41 story, 194 điểm.

**v2 — 2026-11-10 (làm mịn).** 51 story, 211 điểm.

1. Chia LL-009 thành LL-009, LL-042, LL-043 (5 → 3 + 3 + 3). *Lý do: bản cũ gộp ba việc khác bản chất và ước lượng thiếu, nên khó chia việc và khó kiểm thử riêng.*
2. Chia LL-033 thành LL-033 (3D-01; 3 → 2) và LL-044 (3D-02…05; 3). *Lý do: lát cắt 3D đầu tiên không phải chờ viết xong cả 5 màn.*
3. Chia LL-034/035 thành 5 story theo màn (LL-034, 045, 046, 035, 047; tổng vẫn 13). *Lý do: mỗi màn 3D chỉ chờ đúng mô hình của mình.*
4. Viết lại tiêu chí không đo được ở LL-004 (AC1), LL-005 (AC4), LL-014 (AC3), LL-015 (AC1), LL-016 (AC3), LL-028 (AC2), LL-029–032 (AC2), LL-040 (AC4). *Lý do: người kiểm thử không kết luận được đạt/không đạt với câu chữ cũ.*
5. Tách phần chưa rõ khỏi phần rõ: LL-004 (qua `LevelRepository`, chỉ phụ thuộc LL-001), LL-005 (kiểm tra đáp án bất đồng bộ), LL-006 (mặc định mọi màn mở), LL-002 (bỏ bảng nghiệp vụ và seed 25 màn). *Lý do: các story nền thôi bị Q7, Q8 chặn.*
6. Ngân sách hiệu năng/tài nguyên chỉ nằm ở LL-016; LL-017–021 và LL-022 tham chiếu tới đó. *Lý do: cùng một ngưỡng bị viết ở ba nơi, dễ mâu thuẫn.*
7. Bỏ task chốt ngân sách khỏi LL-034, 035, 045–047. *Lý do: LL-016 và LL-034 từng chờ nhau chốt cùng một ngân sách.*
8. LL-039 AC3 đổi thành kiểm chứng thông báo của LL-014. *Lý do: tránh làm hai lần cùng một việc.*
9. Chuyển "co giãn sân chơi 2D" từ LL-025 sang LL-042 (LL-025: 5 → 3). *Lý do: LL-010–013 cần co giãn nhưng không khai báo phụ thuộc vào LL-025.*
10. Chuyển "nối sự kiện thắng/sai vào khung chơi" từ LL-014 sang LL-015; LL-014 chỉ phụ thuộc LL-001. *Lý do: dựng và đo 3D được trước khi vòng chơi xong, nên rủi ro cao xử lý sớm.*
11. LL-009 và LL-015 thêm phụ thuộc LL-028; AC3 của LL-028 dùng "danh mục cơ chế". *Lý do: gỡ vòng mềm giữa danh sách màn và bộ cơ chế.*
12. LL-010–013 bỏ tiêu chí "không kẹt" (còn 3 tiêu chí). *Lý do: trùng với LL-005 AC4 và LL-038.*
13. Thêm LL-048 (xử lý lỗi toàn cục), LL-049 (đo lường chơi ẩn danh), LL-050 (kiểm thử máy yếu), LL-051 (ghi công và thông báo dữ liệu). *Lý do: backlog cũ thiếu bốn việc này dù các story khác đã nhắc tới.*
14. "Số liệu chơi ẩn danh" chuyển từ "Đề xuất thêm" thành LL-049. *Lý do: được nêu là story còn thiếu.*
15. Sắp xếp lại: LL-028, LL-014, LL-008, LL-023 lên đầu; lát cắt 2D trước, lát cắt 3D sau; xen cặp "nội dung → dựng màn"; Should/Could trước khối nghiệm thu cuối. *Lý do: làm việc rủi ro cao sớm, mở khóa nhiều story sớm, và để Should/Could là phần cắt đầu tiên khi thiếu thời gian.*
16. Đánh dấu "Sẵn sàng?": 25 "Có", 26 "Chưa"; bỏ thẻ [CẦN LÀM RÕ] khỏi story không còn bị chặn. *Lý do: "Chưa" chỉ dành cho story còn bị câu hỏi mở làm đổi tiêu chí hoặc ước lượng.*

**v2.1 — 2026-11-10 (lập kế hoạch Sprint 1).** LL-014 thêm task chạy cảnh mẫu trên ≥ 1 điện thoại thật, ghi FPS. *Lý do: mục tiêu Sprint 1 cần số đo FPS 3D trên máy thật.*

