# Thử nghiệm người chơi và đo sức hút Lắt Léo

Mục tiêu đợt đầu là kiểm tra người mới có tự chơi được, muốn thử lại và rủ bạn hay không. Ưu tiên Rush và Daily cho lượt chơi ngắn; dùng sáu màn đầu để kiểm tra sức hút của hành trình. Sửa những điểm quan sát được hoặc được số liệu xác nhận trước khi mở rộng nội dung.

## Chuẩn bị bản thử

1. Chạy bản production trên địa chỉ HTTPS truy cập được từ điện thoại. Không bật `NEXT_PUBLIC_UNLOCK_ALL`.
2. Giữ `NEXT_PUBLIC_ANALYTICS` trống để dùng HTTP mặc định, hoặc đặt `http` trước khi build. Development cần đặt `http` nếu muốn thử đường thu thật.
3. Hoàn thành một lượt, chơi lại và sao chép lời mời. Kiểm tra runtime log có `page_view`, `rush_start`, `rush_complete`, `rush_share`, cùng installId, runId đúng lượt, rồi mở link trên thiết bị khác.
4. Bật lưu hoặc xuất runtime log ít nhất 14 ngày. Không chỉ dùng build log. Xác nhận cách tải log của hosting trước khi tuyển người.
5. Dùng `?src=playtest` cho người thử có hướng dẫn. Kênh cộng đồng dùng `?src=community`; clip ngắn dùng `?src=short_video`. Link thách đấu tự thêm `src=friend`.

Không thêm email, số điện thoại hoặc tên người chơi vào query. Ứng dụng chỉ gửi mã thiết bị ẩn danh, mã phiên và dữ liệu chơi trong danh sách cho phép; không gửi toàn bộ URL, referrer hoặc nội dung đáp án. API từ chối trường lạ và nội dung lớn hơn 4 KiB. Runtime log của nền tảng hosting có chính sách riêng.

## Phiên quan sát 10 phút

Mời 5–10 người chưa từng thấy game, ngoài nhóm phát triển. Mỗi người dùng điện thoại cá nhân; ưu tiên có cả iPhone và Android. Người điều phối không giải thích luật trước và ghi chú bằng mã P01, P02… Không ghi hình hoặc ghi âm nếu chưa được đồng ý.

Lời mời có thể dùng:

> Mình đang thử một game đố mẹo tiếng Việt, mỗi lượt khoảng một phút. Bạn dành 10 phút chơi trên điện thoại và nói giúp chỗ nào khó hiểu nhé? Mình đang kiểm tra game, không đánh giá khả năng của bạn. Link: [địa chỉ bản thử]/rush?src=playtest

Kịch bản:

1. Đưa link Rush và nói: “Bạn cứ chơi như khi được bạn bè gửi link.” Quan sát họ có tìm được nút bắt đầu và hiểu cách chọn đáp án không.
2. Để họ tự chơi hết lượt đầu. Ghi câu làm họ dừng lại và lý do họ nói ra. Không gợi ý cách giải.
3. Sau kết quả, im lặng khoảng 10 giây. Ghi họ tự chơi lại, thách đấu hay thoát; phân biệt với hành động được nhắc làm.
4. Sau đó mới yêu cầu thử gửi một link thách đấu qua cách họ thường dùng. Kiểm tra người nhận thấy điểm cần vượt và cùng bộ câu; lượt làm theo yêu cầu không được tính là chia sẻ tự nhiên.
5. Cho thử tối đa ba màn phiêu lưu đầu. Ghi lỗi thao tác riêng với việc chưa tìm được mẹo.
6. Hỏi: “Chỗ nào khó hiểu nhất?”, “Có câu nào bạn thấy vui hoặc thấy vô lý?”, “Bạn có tự mở lại vào ngày mai không, vì sao?”. Ý định nói ra chưa được tính là quay lại thật.

Nếu người chơi bị kẹt, ghi lại trước khi hỗ trợ. Phân loại: không hiểu giao diện, không hiểu yêu cầu, không tìm được mẹo, hoặc lỗi kỹ thuật. Nếu nhiều người cùng không hiểu một thao tác, ưu tiên sửa thao tác đó.

## Mẫu ghi kết quả quan sát

| Mã | Thiết bị và trình duyệt | Tự bắt đầu | Hoàn thành lượt đầu | Tự chơi lại | Tự chia sẻ | Chỗ mắc kẹt và lời nói nguyên văn | Sửa gì |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P01 | | | | | | | |
| P02 | | | | | | | |
| P03 | | | | | | | |
| P04 | | | | | | | |
| P05 | | | | | | | |

Chưa có phiên quan sát nào được ghi nhận trong bảng. Không điền kết quả suy đoán từ kiểm thử tự động.

## Đợt thu hút 100 người đầu tiên

Thông điệp thử: **Đấu trí 60 giây bằng tiếng Việt. Cùng bộ câu, bạn vượt được điểm bạn bè không?**

| Thời gian | Việc làm | Bằng chứng cần lấy |
| --- | --- | --- |
| Ngày 1–3 | Thu log thật; quan sát 5–10 người mới | Điểm gây khó hiểu, lượt đầu và hành động tự phát |
| Ngày 4–5 | Sửa 2–3 vấn đề lặp nhiều nhất; kiểm tra lại trên điện thoại | Người mới khác tự vượt qua chỗ từng mắc |
| Ngày 6–10 | Thử vài bài câu đố trong cộng đồng phù hợp và 3–5 clip ngắn; tuân theo quy định nhóm | Người bắt đầu và hoàn thành theo nguồn |
| Ngày 11–14 | Theo dõi quay lại và lượt chơi từ link thách đấu | D1, D7 của nhóm đã đủ ngày; quyết định bước tiếp |

Mốc 100 là số người bắt đầu chơi, không phải lượt xem clip hay lượt mở bài. Có thể thử bài đăng:

> Bạn vượt người đứng thứ 5 trong cuộc đua. Bạn đứng thứ mấy? Mình làm một game đố mẹo tiếng Việt, mỗi lượt 60 giây. Thử rồi gửi điểm để thách bạn bè: [địa chỉ bản thử]/rush?src=community

Việc đăng bài, nhắn lời mời hoặc mua quảng cáo chưa được thực hiện. Người vận hành chọn cộng đồng và người nhận phù hợp trước khi gửi.

## Đọc số liệu

Chạy `npm run growth:report -- events.log --through YYYY-MM-DD --exclude-source playtest` trên file runtime log đã xuất. Script nhận dòng `[analytics] {JSON}`, JSON sự kiện trực tiếp hoặc JSON của hosting có trường `message`, loại trùng theo eventId. Nếu hosting dùng định dạng khác, chuyển về từng JSON sự kiện trên một dòng trước.

| Chỉ số báo cáo | Cách hiểu |
| --- | --- |
| visitors | Số installId xuất hiện trong dữ liệu quan sát |
| players / visitors | Tỷ lệ người bắt đầu Rush hoặc Daily |
| completedPlayers / players | Tỷ lệ người hoàn thành ít nhất một lượt, gồm hết giờ hoặc hết mạng |
| replayedPlayers / completedPlayers | Người bắt đầu thêm lượt trong cùng session sau một lượt đã hoàn thành |
| runsStarted, runsCompleted, runsAbandoned | Số runId riêng biệt; lượt bị đóng cưỡng bức có thể thiếu sự kiện kết thúc |
| shareIntentPlayers | Người sao chép thành công hoặc hoàn tất hộp chia sẻ; không chứng minh lời mời đã được gửi hoặc được mở |
| manualCopyPlayers | Người được hiện văn bản để sao chép thủ công; không được tính là đã chia sẻ |
| challengedPlayers | Người bắt đầu từ link thách đấu hợp lệ |
| bySource | Nguồn page_view đầu tiên quan sát được trên mỗi installId; thiếu page_view được xếp unknown |
| d1, d7 | returned / eligible: người bắt đầu chơi đúng ngày thứ 1 hoặc thứ 7 sau ngày bắt đầu đầu tiên quan sát được, theo giờ Việt Nam |

D1/D7 loại người chưa đủ thời gian theo ngày `through`; mẫu số 0 trả về rate null. Mặc định chỉ tính tới hết ngày hôm qua để không đưa ngày đang dở vào báo cáo. Khi loại nguồn playtest, toàn bộ installId từng có page_view nguồn này trong cửa sổ dữ liệu sẽ bị loại.

Giữ log liên tục từ lúc mở thử nghiệm. Nếu file xuất bỏ mất các ngày đầu, “người mới” chỉ có nghĩa là lần đầu nhìn thấy trong file, D1/D7 không còn phản ánh đúng nhóm ban đầu. installId lưu trên thiết bị: đổi máy, xóa dữ liệu hoặc không lưu được sẽ làm một người bị tính thành nhiều người. Reload trang tạo session mới, nên không được tính là chơi lại trong cùng phiên. Đồng hồ trình duyệt và sự kiện thất lạc có thể ảnh hưởng thời điểm; dữ liệu hành vi do máy khách báo không dùng để xác thực điểm thi đấu.

Chưa đặt các tỷ lệ thành chuẩn thành công của thị trường. Trong đợt nhỏ, đọc số lượng tuyệt đối cùng tỷ lệ và đối chiếu quan sát: ít người bắt đầu thì xem thông điệp và nút vào chơi; nhiều người bắt đầu nhưng bỏ dở thì xem luật và thao tác; hoàn thành nhưng không chơi lại thì xem nội dung và cảm giác khi thắng/thua; chơi lại nhưng không quay lại thì xem giá trị của Daily.
