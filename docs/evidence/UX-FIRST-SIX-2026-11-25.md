# Cải tiến sáu màn mở đầu — 25/11/2026

Trạng thái: `in_review`, theo yêu cầu trực tiếp “cải tiến 6 màn đầu đi”. Chỉ thay sáu màn 2D-01…06 và phần khung hiển thị cần thiết cho chặng này. Không tự commit, không đặt task/story cũ thành `done`.

## Trải nghiệm mới

Chặng đầu mang tên **Tết nhà ngoại**. Lời dẫn sau mỗi màn nối các tình huống: lì xì → câu đố ở ao → đón bé út → hái xoài → gọi cả nhà → tìm cá trong lời nhắn. Hoàn tất màn 6 có đoạn kết riêng và lời mời ra chợ ở màn 7.

| Màn | Thay đổi đáng chú ý |
| --- | --- |
| 2D-01 | Hai bàn chân ló dưới bao làm manh mối. Bé được chọn phản ứng, lời thoại đổi theo thao tác. Giữ hai đường kéo hoặc chọn/chạm đích, rồi chạm bé út. |
| 2D-02 | Vẽ cá, tôm và cua hai càng khác cỡ; chọn trực tiếp trong ao, có lời nhân vật và chuyển động riêng. Bỏ phần phóng chữ TO/nhỏ không liên quan. Gõ đáp án trở thành lựa chọn mở thêm. |
| 2D-03 | Chạm đèn dừng xe rồi chủ động chạm bé để qua vạch. Chỉ đổi đèn chưa thắng. Bé và bác tài phản hồi theo cách thử. |
| 2D-04 | Phải chuẩn bị giỏ dưới quả trước khi rung cây. Rung sớm nhắc lại, không làm mất quả. Đặt giỏ khởi động lại bộ đếm chạm. Lắc bằng cảm biến, thân cây hoặc nút đều được; phần tùy chọn cảm biến thu gọn. |
| 2D-05 | Thay câu gà trống đẻ trứng bằng màn tự soạn: dời mây để nắng tới gà, rồi chạm gà gọi cả nhà. Có manh mối tia nắng; kéo sai trả mây về, dời đúng chưa tự thắng. |
| 2D-06 | Chạm đúng chữ “cá” trong lời nhắn cho cá xuất hiện; sau đó đưa cá vào giỏ bằng kéo hoặc chọn/chạm đích. Không còn mẹo lấy “cá” từ “các”. Tìm được cá chưa thắng; chạm lại chữ không nhân bản cá. |

Các mã màn và dữ liệu tiến trình đã lưu được giữ nguyên. Lượt chơi lại đặt lại cảnh và hủy timer của cảnh cũ bằng cơ chế epoch hiện có. Tất cả màn có đường giải chỉ bằng chạm. Hoạt ảnh bổ sung tôn trọng `prefers-reduced-motion`.

Khung chặng mở đầu dành thêm chỗ cho cảnh: tên chặng nằm dưới số màn, bỏ thanh chặng lặp lại và nút Chơi lại lặp ở đáy (nút trên vẫn có). Đề ngắn hơn, không lặp thêm đoạn dẫn sau cảnh. Chặng sau giữ bố cục cũ.

## Kiểm chứng

- `npm run check`: đạt lint, định dạng và TypeScript.
- `npm run test`: 31 file, **323 ca đạt**.
- Production build qua trong quy trình E2E.
- Kiểm thử trình duyệt cuối: đang chạy; kết quả sẽ ghi vào báo cáo sau khi kết thúc. Log: [e2e.txt](UX-FIRST-SIX-2026-11-25.artifacts/e2e.txt).
- `git diff --check`: đạt.
- `python3 docs/ai-planning/verify_plan.py`: đạt trước khi triển khai; không sửa baseline 147 task hoặc GDD.

Bộ E2E chọn sáu màn đầu, luồng toàn chiến dịch, hộ chiếu, gợi ý/chơi lại, lưu trữ và phục hồi khi tải cảnh lỗi, trên iPhone SE/WebKit 320×568, Pixel 5/Chromium 393×727 và Chromium 360×640. Fixture kiểm lỗi console/mạng, cấu trúc sự kiện và bố cục (vùng chạm ≥44 px, chữ ≥16 px, không tràn ngang).

Ở lượt đầu 123/129 ca qua, hai lỗi lặp trên ba cấu hình đã được tìm và sửa: giỏ che vùng chạm của bé ở 2D-04; giỏ 2D-06 mang `aria-disabled` dù cần phản hồi khi trống. Rà ảnh còn phát hiện cảnh nhỏ bị phần đề/thanh tiến độ chiếm chỗ; đã thu gọn khung và đề. Ảnh màn 5 được bổ sung đợi cảnh tải xong trước khi chụp.

## Giới hạn

Chưa có chơi thử với người mới hoặc thiết bị thật; các kiểm thử tự động xác nhận luật, khả năng thao tác và hồi quy, không chứng minh retention hoặc mức độ thích thú. Không thêm âm thanh, nội dung ngày, chia sẻ hay chế độ nhiều người trong phạm vi này.
