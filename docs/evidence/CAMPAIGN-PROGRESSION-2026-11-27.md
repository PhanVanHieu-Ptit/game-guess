# 42 màn: cấp bậc và mốc thưởng

**Ngày:** 27/11/2026 · **Trạng thái:** in_review

Chủ dự án yêu cầu làm 42 màn hấp dẫn hơn theo nhịp gameshow, sau đó chọn **giữ đố mẹo tương tác, thêm cấp bậc và mốc thưởng**.

## Kết quả

- Sắp lại 42 màn theo độ khó không giảm, giữ nguyên sáu màn Tết đầu và màn kiểm luật cuối. Mã màn, câu đố, tương tác và kết quả cũ được giữ; màn đã có kết quả vẫn chơi lại được sau khi đổi thứ tự.
- Bảy cấp, mỗi cấp sáu màn, có danh hiệu từ Tân binh đến Nhà vô địch, mô tả kỹ năng và độ khó rõ ràng. Màn chốt ở 6/12/18/24/30/36/42 nhận gấp đôi điểm.
- Tổng tối đa 19.600 điểm. Gợi ý nhẹ/rõ giữ 75%/50%; xem đáp án nhận 0 điểm và vẫn mở màn kế. Tính điểm từ kết quả tốt nhất, không cộng trùng khi chơi lại hoặc tải lại.
- Giải đủ sáu màn nhận danh hiệu của cấp; xem đáp án vẫn nhận dấu hành trình và có thể chơi lại để lấy điểm/danh hiệu.
- Trang chủ, chọn màn, khung chơi, gợi ý và kết quả hiển thị luật thưởng phù hợp. Nút tiếp tục nằm trong vùng nhìn thấy trên điện thoại thấp. Lời mời màn tiếp đã đồng bộ với thứ tự mới.

Thiết kế hiện hành và thứ tự chi tiết: [CAMPAIGN_PROGRESSION.md](../CAMPAIGN_PROGRESSION.md).

## Kiểm chứng

| Kiểm tra | Kết quả |
| --- | --- |
| `npm run check` | ESLint, Prettier và TypeScript qua |
| `npm test` | 36 tệp, 360 kiểm thử qua |
| Production build | Qua trong quá trình khởi chạy bộ E2E |
| `npx playwright test progression.spec.ts campaign-flow.spec.ts engagement.spec.ts hints-and-runs.spec.ts --workers=2` | 75/75 qua, 3 phút |
| Thiết bị E2E | iPhone SE/WebKit 320×568, Pixel 5/Chromium, cảm ứng 360×640 |
| Luồng chiến dịch | Giải liên tục đủ 42 màn theo thứ tự mới bằng chạm trên cả ba cấu hình |
| Bố cục và sự kiện | Không tràn ngang, chữ ≥16 px, vùng chạm ≥44 px; fixture kiểm console/mạng và chuỗi sự kiện bắt đầu/kết thúc |
| Mốc thưởng | Điểm gấp đôi, danh hiệu, xem đáp án/giải lại, điểm tốt nhất sau tải lại, tổng điểm màn 42 |
| `git diff --check` | Qua |

Bộ E2E nêu trên là các kịch bản liên quan tới thay đổi, không phải toàn bộ thư mục E2E.

## Ảnh kiểm tra

- [Màn chơi ở 320 px](CAMPAIGN-PROGRESSION-2026-11-27.artifacts/play-320.png)
- [Kết quả và nút tiếp màn ở 320 px](CAMPAIGN-PROGRESSION-2026-11-27.artifacts/result-320.png)

Không tự commit hoặc triển khai hosting.
