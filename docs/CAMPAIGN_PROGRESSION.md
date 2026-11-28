# Thang chinh phục 42 màn

Áp dụng ngày 27/11/2026 theo lựa chọn của chủ dự án: **giữ đố mẹo tương tác, thêm cấp bậc và mốc thưởng**, lấy cảm hứng từ nhịp chinh phục của gameshow. Không thay câu đố bằng trắc nghiệm hoặc giá thị trường.

42 màn có sẵn được sắp từ độ khó 1 đến 5, không giảm độ khó giữa hai màn. Sáu màn Tết mở đầu và màn kiểm luật cuối cùng được giữ tại chỗ; màn ghép chữ chốt cấp 2. Mỗi cấp có sáu màn, màn thứ sáu là màn chốt với điểm gấp đôi. Màn chốt là một mốc thưởng, không áp giới hạn thời gian hay số lần thử.

| Cấp | Danh hiệu | Màn | Điểm tối đa của cấp | Màn chốt |
| --- | --- | --- | --- | --- |
| 1 | Tân binh | 1–6 | 700 | Cá trốn trong lời nhắn |
| 2 | Người quan sát | 7–12 | 1.400 | Bật mí bí mật |
| 3 | Thợ săn bẫy | 13–18 | 2.100 | Tìm chìa khóa xe máy |
| 4 | Cao thủ tương tác | 19–24 | 2.800 | Tắt đèn cho bé ngủ |
| 5 | Nhà suy luận | 25–30 | 3.500 | Bánh và túi |
| 6 | Bậc thầy logic | 31–36 | 4.200 | Sáu cốc nước |
| 7 | Nhà vô địch | 37–42 | 4.900 | Lật thẻ kiểm luật |

## Điểm và danh hiệu

- Điểm cơ bản một màn = cấp × 100, màn chốt × 2. Tổng tối đa **19.600 điểm**; đây là điểm trong trò chơi.
- Tự giải: 100%; gợi ý nhẹ: 75%; gợi ý rõ: 50%; xem đáp án: 0 điểm và vẫn mở màn kế.
- Mỗi cấp trao danh hiệu khi cả sáu màn có trạng thái `solved`; dùng gợi ý nhẹ/rõ vẫn nhận danh hiệu. Đủ sáu kết quả bất kể `solved`/`revealed` vẫn nhận dấu hành trình như trước.
- Tổng điểm tính từ kết quả tốt nhất theo mã màn, không tích lũy mỗi lượt. Chơi lại để giảm gợi ý hoặc giải màn từng xem đáp án có thể nâng điểm.
- Sai không trừ điểm, không giới hạn số lần thử. Hiện rõ điểm có thể nhận trước khi mở gợi ý.
- Điểm, cấp hiện tại và danh hiệu suy ra từ tiến trình hiện có; không đổi phiên bản lưu trữ. Mã màn, đường dẫn và kết quả cũ được giữ. Màn đã có kết quả luôn chơi lại được sau khi đổi vị trí; màn chưa chơi mở theo thứ tự mới.
- Tiến độ cấp và điểm cũ có thể đổi theo vị trí mới. Lời mời sang màn tiếp được đồng bộ theo thứ tự mới.

## Thứ tự chơi hiện hành

| Màn | Mã ổn định | Tên | Độ khó | Cấp | Điểm tự giải |
| --- | --- | --- | --- | --- | --- |
| 1 | 2d-01 | Lì xì cho đứa nhỏ nhất | 1/5 | 1 | 100 |
| 2 | 2d-02 | Con gì càng to càng nhỏ? | 1/5 | 1 | 100 |
| 3 | 2d-03 | Qua đường an toàn | 1/5 | 1 | 100 |
| 4 | 2d-04 | Hái xoài đãi cả nhà | 1/5 | 1 | 100 |
| 5 | 2d-05 | Gọi gà dậy ăn Tết | 2/5 | 1 | 100 |
| 6 | 2d-06 | Cá trốn trong lời nhắn | 2/5 | 1 | 200 |
| 7 | 2d-07 | Hai quả cam | 2/5 | 2 | 200 |
| 8 | 3d-01 | Nhà số mấy? | 2/5 | 2 | 200 |
| 9 | 2d-09 | Bài kiểm tra 5 phút | 2/5 | 2 | 200 |
| 10 | 2d-10 | Đàn vịt | 2/5 | 2 | 200 |
| 11 | 2d-11 | Của mình, người khác dùng | 2/5 | 2 | 200 |
| 12 | 2d-08 | Bật mí bí mật | 2/5 | 2 | 400 |
| 13 | 2d-25 | Ốc sên về nhà | 2/5 | 3 | 300 |
| 14 | 2d-26 | Cân cả chiếc rổ | 2/5 | 3 | 300 |
| 15 | 2d-30 | Thắp gì trước? | 2/5 | 3 | 300 |
| 16 | 2d-35 | Vượt ai rồi? | 2/5 | 3 | 300 |
| 17 | 2d-36 | Màu nào mới đúng? | 2/5 | 3 | 300 |
| 18 | 3d-02 | Tìm chìa khóa xe máy | 3/5 | 3 | 600 |
| 19 | 2d-12 | Kẹt xe | 3/5 | 4 | 400 |
| 20 | 2d-13 | Cầu khỉ | 3/5 | 4 | 400 |
| 21 | 2d-14 | Bắt lươn | 3/5 | 4 | 400 |
| 22 | 3d-03 | Nồi bánh chưng có mấy cái? | 3/5 | 4 | 400 |
| 23 | 2d-16 | Gánh hàng rong | 3/5 | 4 | 400 |
| 24 | 2d-21 | Tắt đèn cho bé ngủ | 3/5 | 4 | 800 |
| 25 | 2d-22 | Cái bóng đi lạc | 3/5 | 5 | 500 |
| 26 | 2d-27 | Cắt một góc | 3/5 | 5 | 500 |
| 27 | 2d-28 | Ngày mai của hôm qua | 3/5 | 5 | 500 |
| 28 | 2d-31 | Bánh còn trong giỏ | 3/5 | 5 | 500 |
| 29 | 2d-32 | Ốc sên leo tường | 3/5 | 5 | 500 |
| 30 | 2d-37 | Bánh và túi | 3/5 | 5 | 1000 |
| 31 | 2d-15 | Học sinh học sinh học | 4/5 | 6 | 600 |
| 32 | 2d-17 | Đồng hồ quán cà phê | 4/5 | 6 | 600 |
| 33 | 2d-18 | Chia trâu | 4/5 | 6 | 600 |
| 34 | 2d-19 | Que diêm | 4/5 | 6 | 600 |
| 35 | 2d-23 | Cốc nào nhiều nước hơn? | 4/5 | 6 | 600 |
| 36 | 2d-29 | Sáu cốc nước | 4/5 | 6 | 1200 |
| 37 | 2d-33 | Chín viên bi | 4/5 | 7 | 700 |
| 38 | 2d-38 | Đong nước nấu chè | 4/5 | 7 | 700 |
| 39 | 2d-20 | Ba túi nhãn nhầm | 5/5 | 7 | 700 |
| 40 | 2d-24 | Qua cổng hội chợ | 5/5 | 7 | 700 |
| 41 | 2d-34 | Chuyến đò của bác | 5/5 | 7 | 700 |
| 42 | 2d-39 | Lật thẻ kiểm luật | 5/5 | 7 | 1400 |

## Kiểm chứng

Kiểm thử domain bảo vệ độ khó không giảm, đủ bảy cấp/sáu màn, đúng bảy màn chốt, luật điểm/gợi ý, nâng kết quả tốt nhất và quyền chơi lại sau đổi thứ tự. Kiểm thử trình duyệt `progression.spec.ts` kiểm bảng cấp bậc, danh hiệu, xem đáp án/giải lại, lưu điểm sau tải lại và màn 42. Luồng chiến dịch chạy theo ordinal để giải đủ 42 màn bằng chạm.
