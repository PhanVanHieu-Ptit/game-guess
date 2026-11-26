# Lắt Léo

Game đố mẹo tiếng Việt: 42 màn phiêu lưu, Đấu trí 60 giây và một bộ câu chung mỗi ngày. Mở link là chơi, không cần tài khoản.

## Chạy dự án

Dùng Node 22.22.3 và npm 10.9.8. Chạy `npm ci`, sau đó `npm run dev`. Sao chép `.env.example` thành `.env.local` nếu cần thay cấu hình.

Các kiểm tra: `npm run check`, `npm test`, `npm run test:growth-report`, `npm run test:e2e`. Bản production: `npm run build`, sau đó `npm start`.

## Đo hành vi và thử nghiệm người chơi

Production mặc định gửi sự kiện tới `/api/events`; máy chủ kiểm tra dữ liệu rồi ghi từng dòng `[analytics] {JSON}` vào runtime log. Development mặc định ghi `[track]` trong console trình duyệt. Có thể đặt `NEXT_PUBLIC_ANALYTICS=off` để tắt hoặc `http` để thử đường gửi thật trong development; biến được chốt lúc build.

Log ứng dụng chưa phải kho dữ liệu lâu dài. Khi đưa lên hosting, cần bật lưu hoặc xuất runtime log ít nhất 14 ngày để tính D1/D7. Repo chưa có cấu hình hosting hoặc dịch vụ lưu analytics bên ngoài.

Xuất runtime log thành một file rồi chạy:

```sh
npm run growth:report -- /tmp/latleo-events.log --exclude-source playtest
```

Mặc định báo cáo chỉ tính tới hết ngày hôm qua theo giờ Việt Nam; dùng `--through YYYY-MM-DD` để chọn ngày kết thúc đã có đủ dữ liệu. Kịch bản thử với người mới, cách tuyển nhóm đầu và định nghĩa chỉ số: [docs/PLAYER_VALIDATION.md](docs/PLAYER_VALIDATION.md).

## Link thách đấu

Sau mỗi lượt Rush hoặc Daily, chọn **Thách đấu bạn bè** hoặc **Sao chép lời thách đấu**. Link giữ phiên bản bộ sinh, seed, điểm mục tiêu và ngày của Daily. Người nhận chơi cùng câu và thứ tự lựa chọn, kể cả mở Daily sau ngày phát hành. Kỷ lục lưu trên thiết bị; điểm trong lời mời là điểm người gửi tự chia sẻ, không phải bảng xếp hạng xác thực.

Giữ bộ sinh v1 ổn định khi có link đang lưu hành; nếu thay thuật toán, thêm phiên bản mới và tiếp tục hỗ trợ v1. Link có phiên bản không hỗ trợ hoặc tham số hỏng sẽ báo rõ và cho chơi bộ câu hiện tại.
