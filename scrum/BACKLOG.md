# Backlog — Lắt Léo

Bản làm việc của Scrum Master, khởi tạo **2026-11-11** từ [docs/backlog.md](../docs/backlog.md) v2.1 (cập nhật 2026-11-10, sha256 `3dda35d427a0`). File gốc giữ nguyên, không sửa; khi nó đổi, `/docmoi` so hash và đề xuất cập nhật ở đây. Mã story giữ ổn định: LL-001…LL-051 (story mới từ LL-052).

- **Cập nhật gần nhất:** 2026-11-24 (2D-35…39: Chờ duyệt, hồi quy production 546/546 đạt; catalog 42 màn: 39 2D + 3 3D).
- **Trạng thái story:** Chưa làm → Đang làm → Chờ duyệt → Xong (hoặc Chặn). *Xong* theo DoD tạm ở [HO_SO.md](HO_SO.md) mục 2.
- **Sẵn sàng = Có** khi đủ 4 điều kiện: mô tả rõ, có tiêu chí nghiệm thu kiểm tra được, đã ước lượng, không bị câu hỏi mở chặn. Thứ tự bảng là thứ tự làm, từ trên xuống.
- **Điểm:** 1-2-3-5-8-13, trên 8 phải chia nhỏ (hiện không story nào vượt 8). Thang tương đối, tạm quy 1 điểm ≈ ½ ngày công một người (giả định).
- **Trạng thái cấp task** (147 task của kế hoạch AI) nằm ở `docs/ai-planning/tasks.json` và `PROGRESS.md`, không chép lại ở đây.

## Tóm tắt

- **51 story · 211 điểm** · Must 44 (192 đ) · Should 6 (17 đ) · Could 1 (2 đ) · Won't 0 (đã chốt, không ước lượng).
- **Sẵn sàng:** 39 story "Có" (162 đ) · 12 story "Chưa" (49 đ).
- **Tiến độ:** Chưa làm 34 · Đang làm 2 · Chờ duyệt 15 · Xong 0 → **0 / 211 điểm xong**. 19 màn bổ sung theo yêu cầu trực tiếp được theo dõi riêng, chưa gán điểm story hoặc đổi baseline.
- **Dự báo thô (giả định, chưa có hạn chót — Q1):** 211 điểm ÷ 20 điểm/sprint ≈ 10,6 sprint; ÷ 18 điểm (cam kết 90%) ≈ 11,7 sprint. Nếu Sprint 1 bắt đầu thứ Hai 16/11/2026 thì xong sau 11–12 sprint, tức khoảng **29/01–05/02/2027**, chưa trừ nghỉ lễ và chưa tính lỗi phát sinh.

## Epic

- **E1 Nền tảng** — dự án chạy được, DB, link web (3 story · 8 điểm)
- **E2 Khung chơi** — nạp màn, vòng chơi, chọn màn, lưu tiến độ, xử lý lỗi (5 · 21)
- **E3 2D** — sân chơi, cơ chế dùng chung, so khớp đáp án tiếng Việt, 20 màn (8 · 40)
- **E4 3D** — khung Three.js, tương tác, trình nạp + ngân sách, 5 màn, tối ưu (9 · 58)
- **E5 Giao diện** — phong cách, trang chủ, responsive, hiệu ứng, màn hoàn tất (5 · 13)
- **E6 Nội dung** — danh sách 25 màn, kịch bản, đồ họa 2D, mô hình 3D, rà soát chữ (13 · 43)
- **E7 Chất lượng** — giấy phép, kiểm thử, sửa lỗi, tối ưu tải, đo lường, ghi công (8 · 28)

## 1. Bảng backlog

### Phạm vi 2D-35…39 được duyệt ngày 24/11/2026

Chủ dự án chọn đề xuất năm đề mới rồi xác nhận **“duyệt cả 5”**. Nội dung chuẩn ở LEVELS mục 9 được ghi trước triển khai. Đã nhắc lại đề/cơ chế/cách giải và làm lần lượt từng màn, kiểm riêng qua rồi mới sang màn kế.

| Mã | Tên | Trạng thái | Kiểm chứng hành vi |
|---|---|---|---|
| 2D-35 | Vượt ai rồi? | Chờ duyệt | Nhập 2/hai/thứ hai thắng; nhận không dấu/hoa thường/khoảng trắng; 1/3/chạm bạn chạy chưa thắng; chơi lại |
| 2D-36 | Màu nào mới đúng? | Chờ duyệt | Chỉ XANH tô đỏ thắng; ĐỎ tô xanh, VÀNG tô tím, TÍM tô vàng chưa thắng, câu đùa riêng |
| 2D-37 | Bánh và túi | Chờ duyệt | Nhập 500/năm trăm/đơn vị đồng và 0,5 nghìn thắng; 1000/10000/chạm bánh chưa thắng; NFD/không dấu |
| 2D-38 | Đong nước nấu chè | Chờ duyệt | Lời giải 6 và 8 bước đều thắng; nhận mọi chuỗi hợp lệ; rót nguồn rỗng/đích đầy không đổi nước hoặc số bước; Thử lại |
| 2D-39 | Lật thẻ kiểm luật | Chờ duyệt | Thử đủ 16 tập thẻ, chỉ A+7 rồi Kiểm tra thắng; sai giữ lựa chọn, sửa tại chỗ; không tự thắng khi chỉ chọn |

SVG tự vẽ trong code, nét tròn/màu tươi; không tài nguyên thương hiệu hoặc thư viện mới. Dùng nguyên khung, `PuzzleArt`, `ArtButton`, `Kid`, `usePuzzleFeedback`, `useAnswerInput`, `NumberPad` và CSS cuộn. Luật bình nước là TypeScript thuần; không sửa engine/hook/feature. Sai rung nhẹ và có câu đùa, không trừ điểm hoặc mất tiến triển. Ba gợi ý/giải thích khớp nguyên văn LEVELS. Đã nối đủ lời giải chạm vào chiến dịch **42 màn (39 2D + 3 3D)**. Ordinal tạm 38…42, vị trí thiết kế 40…44 khi đủ 3D-04/05.

Điểm cần thử với người chơi thật:

- **2D-35 (2):** có thể quá dễ hoặc đã quen câu đố; tình huống không đề cập chạy vòng hay đồng hạng.
- **2D-36 (2):** có thể dễ; phụ thuộc khả năng phân biệt màu. Chữ màu có tương phản trên thẻ sáng, nhãn trình đọc màn hình mô tả cả tên và mực; cần thử với người gặp khó khăn về thị giác màu.
- **2D-37 (3):** dễ nhập 1000 do đọc lướt. Tổng và chênh lệch luôn hiện; câu hỏi/ô nhập ghi rõ đơn vị đồng, nhận cả chữ và đơn vị đã nêu.
- **2D-38 (4):** nhiều bước; không có vạch chia hay quyền đổ một phần. Nêu rõ lấy nước không giới hạn, rót tới nguồn hết/đích đầy; nhận mọi chuỗi hợp lệ, không ép lời giải mẫu.
- **2D-39 (5):** có thể quá khó; dễ đọc luật theo hai chiều. Luật một chiều và việc chọn cả nhóm trước khi lật luôn hiện. Chọn thêm B/4 không đạt điều kiện ít thẻ nhất; sai không xóa lựa chọn.

Kiểm riêng theo thứ tự **12/9/12/15/15 ca Playwright**, đều đạt trước khi sang màn kế; `npm run check` và **320 unit/component** đạt. Hồi quy production **546/546 ca đạt** trên ba cấu hình, gồm chiến dịch 42 màn. Lượt đầu bị gián đoạn với nhiều timeout; đã lưu log/trace và chạy lại toàn bộ trên cùng mã, không tăng timeout hoặc tắt kiểm lỗi. [Bằng chứng, log và ảnh](../docs/evidence/E3-2D-35-39.md). Ngoài MVP, giữ nguyên baseline 51 story/211 điểm, 147 task, cam kết/velocity. Chưa thử người chơi thật/điện thoại vật lý hoặc đo 4G/FPS; không tự commit/đặt Xong.

Đề xuất commit: `feat: thêm năm màn 2D-35 đến 2D-39`.

### Đối soát yêu cầu năm màn 2D tiếp theo ngày 24/11/2026

Khi nhận yêu cầu, cả **34/34 màn 2D** trong LEVELS (2D-01…34) đều có `meta.ts`, `scene.tsx`, spec Playwright và lời giải chiến dịch. Lúc đó không còn màn 2D chưa dựng trong tài liệu và chưa có nội dung 2D-35…39. Chủ dự án chọn đề xuất năm đề mới để duyệt trước, sau đó xác nhận **“duyệt cả 5”**. Phạm vi được duyệt là 2D-35…39 ở bảng trên; không thay đổi các màn đã có. Phần còn thiếu trong danh sách hiện tại là 3D-04/05, ngoài yêu cầu 2D.

### Phạm vi 2D-30…34 được duyệt ngày 23/11/2026

Chủ dự án chọn đề xuất thêm năm đề vì cả 29 màn 2D cũ đã có mã, rồi xác nhận **“Duyệt cả năm”**. Nội dung chuẩn đã ghi tại LEVELS mục 8 trước khi dựng. Đã triển khai và kiểm riêng lần lượt: 2D-30 đạt 9/9, 2D-31 đạt 15/15, 2D-32 đạt 12/12, 2D-33 đạt 39/39, 2D-34 đạt 15/15; mỗi màn qua rồi mới sang màn tiếp. **Chờ duyệt (`in_review`): log hồi quy toàn game đã kết thúc với 483/483 ca đạt.**

| Mã | Tên | Trạng thái | Kiểm chứng hành vi |
|---|---|---|---|
| 2D-30 | Thắp gì trước? | Chờ duyệt | Chạm diêm thắng; nến/đèn dầu chưa thắng; ba gợi ý, chơi lại |
| 2D-31 | Bánh còn trong giỏ | Chờ duyệt | Chia hai bánh rồi giỏ còn một bánh; nhận thứ tự khác, kéo hoặc chạm; giỏ nhiều bánh/bé đã có bánh/chia hết bánh riêng/kéo lệch chưa thắng |
| 2D-32 | Ốc sên leo tường | Chờ duyệt | Nhập 3/ba thắng; 5/2 và chạm tường chưa thắng; nhập rỗng không tính sai, bàn phím chạm, hoa/thường/khoảng trắng |
| 2D-33 | Chín viên bi | Chờ duyệt | Đủ chín vị trí bi nhẹ, suy từ kết quả tối đa hai lần cân; chọn sai/cân lần ba chưa thắng; lịch sử đọc lại được, Thử lại giữ bi nhẹ |
| 2D-34 | Chuyến đò của bác | Chờ duyệt | Hai lời giải bảy chuyến và chuỗi chín chuyến an toàn đều thắng; sai kiểm cả hai bờ và giữ tiến triển; unit tìm đủ 10 trạng thái an toàn |

SVG tự vẽ cùng nét tròn/màu tươi; nguồn cả năm là biến thể câu đố kinh điển. Dùng nguyên khung và hook có sẵn, không thêm thư viện. Sai rung nhẹ và câu đùa, không trừ điểm/mất lượt; đề/ba gợi ý/giải thích khớp nguyên văn LEVELS. Đã nối năm lời giải vào chiến dịch 37 màn. Ordinal tạm 33…37, vị trí thiết kế 35…39 khi đủ 3D-04/05. Không đổi baseline, điểm hoặc velocity; không tự commit/đặt Xong.

Điểm cần thử với người thật:

- **2D-30 (2):** có thể quá dễ với người biết câu đố.
- **2D-31 (3):** có thể tranh luận việc nhận giỏ là nhận bánh; hình và trạng thái cuối thể hiện rõ bánh còn trong giỏ đã giao.
- **2D-32 (3):** cần đọc điều kiện chạm đỉnh thì dừng; không tính thêm đêm trượt khi đã tới nơi.
- **2D-33 (4):** có thể quá khó khi chưa quen chia ba nhóm; đĩa ghi số bi, bảng chọn và lịch sử luôn có thể đọc lại. Cần cuộn trên màn hình thấp.
- **2D-34 (5):** khó nhất lô; luật chở tối đa một món và được đi một mình luôn hiện; cần chở dê quay lại, nhận mọi chuỗi an toàn.

Kiểm chứng hiện có: `npm run check`, 310 unit/component và 90 ca Playwright riêng của năm màn đạt. Log hồi quy production hiện có ghi **483/483 ca đạt**, gồm chiến dịch 37 màn trên ba cấu hình. Đối soát ngày 24/11 chạy lại 42 kiểm thử nội dung/catalog, đều đạt; không chạy lại Playwright trong lượt đối soát này. Các phạm vi kiểm chồng nhau, không cộng thành tổng độc lập. [Bằng chứng, log, ảnh và giới hạn](../docs/evidence/E3-2D-30-34.md). Chưa thử người chơi thật hoặc điện thoại vật lý; chưa đo 4G/FPS đợt này.

Đề xuất commit: `feat: thêm năm màn 2D-30 đến 2D-34`.

### Phạm vi 2D-25…29 được duyệt ngày 20/11/2026

**Trạng thái từng màn: Chờ duyệt (`in_review`).** Đã đối chiếu toàn bộ 24 màn 2D trong LEVELS đều có mã và kiểm thử. Chủ dự án chọn đề xuất năm đề mới trước khi triển khai, rồi duyệt cả năm bằng **“tat ca”**. Nội dung chuẩn được ghi tại LEVELS mục 7 trước khi dựng. Đã làm và chạy kiểm riêng lần lượt từng màn, qua rồi mới bắt đầu màn tiếp.

| Mã | Tên | Trạng thái | Kiểm chứng hành vi |
|---|---|---|---|
| 2D-25 | Ốc sên về nhà | Chờ duyệt | Chạm vỏ thắng; nhà, bụi cây và thân ốc chưa thắng; chơi lại khôi phục |
| 2D-26 | Cân cả chiếc rổ | Chờ duyệt | Trừ bì: nhập 2/hai thắng; 3/1 và chạm rổ chưa thắng; có bàn phím số chỉ bằng chạm |
| 2D-27 | Cắt một góc | Chờ duyệt | Nhập 5/năm thắng, nhận không dấu/NFD; 3/4 hoặc chạm mảnh rời chưa thắng; giấy gốc vuông, một đường cắt thẳng |
| 2D-28 | Ngày mai của hôm qua | Chờ duyệt | Thứ Sáu thắng; Thứ Năm/Thứ Bảy/Chủ nhật/lịch chưa thắng; luôn hiện lời bà |
| 2D-29 | Sáu cốc nước | Chờ duyệt | Kiểm đủ chín cặp rót đầy→rỗng, chỉ 2→5 thắng; sai cho xem kết quả và thử lại; không rót cốc thứ hai; kiểm kéo lệch/vào cốc đầy |

SVG tự vẽ cùng nét tròn/màu tươi; không tài nguyên hoặc nhân vật thương hiệu, không thêm thư viện. Dùng khung, `PuzzleArt`, `ArtButton`, `usePuzzleFeedback`, `useAnswerInput`, `NumberPad`, `useDrag` và CSS cuộn hiện có. Không viết lại hoặc sửa bộ máy/hook. Sai rung nhẹ, có câu đùa và thử lại không mất lượt; ba gợi ý/giải thích khớp nguyên văn LEVELS. 2D-27/29 ghi nguồn câu đố kinh điển, hình vẫn tự vẽ.

Đợt mới nằm ngoài 25 màn MVP, theo dõi riêng cùng 2D-21…24; giữ nguyên 51 story/211 điểm, 147 task và cam kết sprint. Catalog hiện có **32 màn: 29 màn 2D + 3 màn 3D**, còn 3D-04/05. Ordinal 2D-25…29 tạm là 28…32; vị trí thiết kế khi đủ nội dung là 30…34. Không tự ghi Xong, cộng velocity hoặc commit.

**Điểm cần thử với người chơi:**

- **2D-25 (khó 2):** có thể quá dễ; “vỏ là nhà” là cách nói ví von, cần kiểm người chơi có chấp nhận không.
- **2D-26 (khó 2):** phép trừ bì đơn giản; có thể gần mức 1. Thông tin rổ rỗng đặt ngay dưới hình, không giấu bằng chữ nhỏ.
- **2D-27 (khó 3):** dễ tranh cãi nếu hình cắt không rõ. Giấy gốc đúng hình vuông, đoạn cắt nối hai cạnh kề, mảnh rời tách xa; chỉ đếm phần lớn còn lại.
- **2D-28 (khó 3):** người đọc nhanh dễ hiểu nhầm mốc “hôm qua”; câu nói luôn hiện để đọc lại, không kiểm trí nhớ hoặc ngày thực trên máy.
- **2D-29 (khó 4):** khó nhất lô; phải nêu rõ được rót hết và đặt lại, không đổi chỗ cốc. Sau một lần rót sai phải Thử lại, không cộng dồn nhiều cốc thành lời giải khác.

Kiểm chứng: `npm run check` và **300 unit/component** đạt; hồi quy production **393/393 ca** đạt, gồm chiến dịch 32 màn trên ba cấu hình. Bằng chứng, log kiểm riêng và hồi quy, ảnh và giới hạn: [E3-2D-25-29.md](../docs/evidence/E3-2D-25-29.md). Chưa thử với người chơi hoặc điện thoại vật lý; chưa chốt lại độ khó.

**Giới hạn còn mở:** kiểm thêm next dev (Turbopack và Webpack) đều 54/57 ca: ba ca chín cặp rót đã giải đúng nhưng fixture console bắt cảnh báo CSS trang lỗi/not-found được preload mà chưa dùng. Không che cảnh báo hoặc đổi bộ máy/CSS chung; bản production 393/393 không gặp. Theo dõi xử lý CSS của khung/trang lỗi riêng.

Đề xuất commit: `feat: thêm năm màn 2D-25 đến 2D-29`.

### Phạm vi 2D-20…24 được thống nhất ngày 19/11/2026

**Trạng thái từng màn: Chờ duyệt (`in_review`).** Khi nhận việc đã có 2D-01…19, nên trong LEVELS chỉ còn 2D-20 chưa dựng. Chủ dự án chọn **“Làm 2D-20 và bổ sung 4 đề 2D mới sau khi thống nhất”**, rồi duyệt cả bốn đề bằng **“Duyệt cả bốn đề, triển khai lần lượt”**. Đã bổ sung đề/cách giải/ba gợi ý/giải thích của 2D-21…24 tại LEVELS mục 6 trước khi triển khai. Mỗi màn được kiểm riêng, đạt rồi mới sang màn tiếp.

| Mã | Tên | Trạng thái | Kiểm chứng hành vi |
|---|---|---|---|
| 2D-20 | Ba túi nhãn nhầm | Chờ duyệt | Hai cách xếp ngẫu nhiên; lấy đúng một quả ở túi nhãn hỗn hợp, đủ ba nhãn mới thắng; kéo sai hồi về; chơi lại có thể đổi cách xếp |
| 2D-21 | Tắt đèn cho bé ngủ | Chờ duyệt | Chạm chọn/kéo rèm che cửa sổ thắng; đèn, trăng, giường và kéo lệch chưa thắng; chơi lại mở rèm |
| 2D-22 | Cái bóng đi lạc | Chờ duyệt | Chỉ bóng nối chân và đổ sang trái thắng; hai bóng sai hướng, mặt trời hoặc bé chưa thắng |
| 2D-23 | Cốc nào nhiều nước hơn? | Chờ duyệt | Lấy đá bằng kéo/chạm làm mực nước hạ; chọn cốc phải thắng, kể cả suy luận ngay; chọn trái/bằng nhau/không thể biết chưa thắng |
| 2D-24 | Qua cổng hội chợ | Chờ duyệt | Ba biển dễ đọc; chỉ A làm đúng một biển đúng; B/C chưa thắng và được thử lại; giải được từ hình hoặc nút có nội dung biển |

SVG tự vẽ cùng nét tròn, màu tươi và nhân vật có sẵn của dự án; không ảnh/nhân vật thương hiệu, không thêm thư viện. Dùng `PuzzleArt`, `ArtButton`, `Kid`, `usePuzzleFeedback`, `useDrag` và khung chơi hiện có. Thêm CSS tùy chọn cho các màn mới: nền SVG cho vuốt dọc để tiếp cận điều khiển trên màn nhỏ, vật kéo vẫn khóa cuộn. Không viết lại khung/hook hoặc thay cách hoạt động của màn cũ.

**Trạng thái story:** LL-013/032 → Chờ duyệt vì đã đủ 2D-16…20. Bốn màn 2D-21…24 là đợt bổ sung được duyệt ngoài 25 màn MVP, không gộp vào lô 4 và không tự thêm điểm vào 51 story/211 điểm hay đổi 147 task baseline. Catalog tại thời điểm bàn giao lô này có **27 màn: 24 màn 2D + 3 màn 3D**; vẫn còn 3D-04/05. Không ghi Xong, cộng velocity hoặc tự commit.

**Điểm cần thử với người chơi:**

- **2D-20 (khó 5):** phải dùng đồng thời điều kiện “nhãn nào cũng sai” và một mẫu; có thể quá khó với người chưa quen suy luận loại trừ. Chỉ túi nhãn hỗn hợp bảo đảm suy ra được từ mọi mẫu; phản hồi ngay khi dán sai cũng có thể khiến người chơi đoán thử thay vì suy luận.
- **2D-21/22 (khó 3):** có thể quá dễ ở mức 3 vì rèm và hướng nắng là manh mối quen thuộc. Cần đo thời gian giải trước khi hạ mức; đây là đợt bổ sung riêng nên không sửa đường cong của 25 màn MVP.
- **2D-23 (khó 4, dễ hiểu khác giả định):** kết luận dựa trên cốc giống nhau, đá chìm hoàn toàn và không hút nước; điều kiện đã ghi rõ trong cảnh/tài liệu. Không buộc người đã suy luận đúng phải lấy đá ra trước.
- **2D-24 (khó 5):** hai câu phủ định cộng điều kiện “đúng một biển” có thể gây quá tải khi đọc nhanh. Đã ghi rõ chỉ có một cổng dẫn ra ngoài; trong mô hình này A là đáp án duy nhất.

Kiểm chứng: `npm run check` và **295 unit/component** đạt; **336 ca Playwright production** đạt trên ba cấu hình, gồm chiến dịch 27 màn. Sau chỉnh hình cuối, chạy lại **48/48 ca** của năm màn mới. Kiểm thêm cả 2D-16…24 ở 1366×768 trên ba cấu hình engine: **3/3 đạt**, đủ bằng chứng bố cục rộng cho lô 4. Các lượt kiểm chồng phạm vi, không cộng thành số ca riêng. Bằng chứng, thứ tự kiểm từng màn, ảnh và giới hạn ở [E3-2D-20-24.md](../docs/evidence/E3-2D-20-24.md). Chưa thử người chơi hoặc điện thoại vật lý; chưa tự duyệt độ khó cuối.

Đề xuất commit: `feat: hoàn thiện 2D-20 và thêm bốn màn 2D mới`.

### Phạm vi 2D-15…19 được giao ngày 19/11/2026

**Trạng thái từng màn: Chờ duyệt (`in_review`).** Yêu cầu trực tiếp làm 5 màn 2D tiếp theo theo `docs/LEVELS.md` là quyền triển khai nội dung và SVG trong phạm vi này. Kiểm riêng từng màn trên ba cấu hình điện thoại, qua rồi mới sang màn kế. Không sửa GDD/LEVELS, khung chơi hoặc hook dùng chung; không tự commit hoặc ghi Xong.

| Mã | Tên | Trạng thái | Kiểm chứng hành vi |
|---|---|---|---|
| 2D-15 | Học sinh học sinh học | Chờ duyệt | Chỉ khe 2 và 3 rồi Xong mới thắng; thiếu/thừa khe chưa thắng; sửa tại chỗ, chơi lại được |
| 2D-16 | Gánh hàng rong | Chờ duyệt | Chạm chọn vai rồi đặt 1/3; kéo kiểm vùng ±3% chiều dài; thúng/lệch điểm tựa chưa thắng |
| 2D-17 | Đồng hồ quán cà phê | Chờ duyệt | 3:40 chưa thắng; nhận 8:20, 8h20, 820, 08:20, 8 giờ 20; bàn phím số giải bằng chạm |
| 2D-18 | Chia trâu | Chờ duyệt | Mượn trâu mới chia 9–6–2; chưa thắng cho tới khi trả con dư; kéo sai hồi về |
| 2D-19 | Que diêm | Chờ duyệt | Dời que trên bên phải số 8 vào dấu trừ thành 6 + 3 = 9; sai số/dấu hoặc kéo lệch chưa thắng |

**Trạng thái story tại thời điểm kết thúc đợt 2D-15…19:** LL-012/031 chuyển Chờ duyệt vì 2D-11…14 đã tồn tại và nay bổ sung 2D-15. LL-013/032 chỉ Đang làm: 4/5 màn 2D-16…20 đã có, 2D-20 chưa thuộc phạm vi được giao. Hai cổng nội dung/phong cách chỉ áp dụng cho các màn được giao; giữ nguyên ID, điểm và phụ thuộc của baseline, không thay cam kết sprint hoặc trạng thái 147 task kế hoạch AI. Chưa cộng điểm Xong.

**Điểm cần thử với người chơi:**

- **2D-15 (khó 4):** câu chơi chữ cần đọc soát độc lập; người chơi có thể hiểu ngắt câu thay cho tách từ. Chưa khẳng định đây là cách tách có nghĩa duy nhất ngoài quy ước trong tài liệu.
- **2D-16 (khó 3):** khái niệm mô-men có thể khó với người chưa học đòn bẩy; cho phép chạm các vị trí để thử. Dung sai ±3% giữ theo tài liệu, cần thử ngón tay thật trước khi chốt.
- **2D-17 (khó 4):** cần quen mặt đồng hồ kim; người đọc đồng hồ điện tử dễ bí. Số và kim đều phản chiếu bằng SVG để có manh mối thị giác.
- **2D-18 (khó 4, dễ tranh luận nhất):** 1/2 + 1/3 + 1/9 = 17/18; các phần 9–6–2 tính trên đàn tạm 18 con, không phải phân số chính xác của 17 con ban đầu. Giữ nguyên đề/lời giải được yêu cầu, ghi rõ hạn chế này để chủ dự án đọc soát.
- **2D-19 (khó 4):** cần hiểu số dạng bảy đoạn và giữ phép đẳng thức; người chơi có thể thử biến dấu bằng thành dấu khác. Không tự kết luận tính duy nhất cho các cách viết số hoặc ký hiệu ngoài quy ước.

Kiểm chứng cuối: `npm run check` đạt, **290 unit/component**, **288 ca Playwright production** trên iPhone SE, Pixel 5 và 360 px, gồm 45 ca cho năm màn mới và chiến dịch 22 màn.

Bằng chứng, lệnh và giới hạn kiểm chứng: [E3-2D-15-19.md](../docs/evidence/E3-2D-15-19.md). Chưa thử người chơi hoặc điện thoại vật lý; giả lập WebKit không được tính là Safari trên máy thật.

Đề xuất commit: `feat: thêm 5 màn 2D-15 đến 2D-19 của Lắt Léo`.

### Lô 2D-06…10 được giao ngày 18/11/2026

**Trạng thái: Chờ duyệt (`in_review`).** Thực hiện 5 màn 2D tiếp theo theo `docs/LEVELS.md`, vẽ SVG trong code với phong cách nét tròn, màu tươi đồng bộ với các màn trước, dùng lại khung màn chơi và hook thao tác có sẵn. LL-011 (dựng màn lô 2) và LL-030 (kịch bản/đồ họa lô 2) chuyển sang Chờ duyệt; không tự cộng điểm hoàn thành hoặc đổi baseline.

| Mã | Tên | Trạng thái | Kiểm chứng hành vi |
|---|---|---|---|
| 2D-06 | Chạm vào con cá | Chờ duyệt | Chạm ao/sen/cần câu không thắng và có phản hồi riêng; chạm chữ "các" ở dòng đề thì thắng |
| 2D-07 | Hai quả cam | Chờ duyệt | Chọn quả trái/phải/không biết chưa thắng; kéo chồng quả trái lên quả phải vừa khít, chọn Bằng nhau thì thắng |
| 2D-08 | Bật mí bí mật | Chờ duyệt | Gõ bí mật/mật bí hoặc chạm rương chưa thắng; gõ bật mí (chấp nhận không dấu, hoa/thường) thì thắng |
| 2D-09 | Bài kiểm tra 5 phút | Chờ duyệt | Điền câu 1-6 rồi nộp bị báo làm thừa và làm lại; chạm Nộp bài ngay khi chưa điền gì thì thắng |
| 2D-10 | Đàn vịt | Chờ duyệt | Gõ 6 báo đếm trùng, gõ số khác hoặc chạm vịt chưa thắng; gõ 4 (hoặc bốn/4 con) thì thắng |

Đã làm và kiểm thử riêng từng màn với Playwright trên iPhone SE (WebKit 320×568), Pixel 5 và mobile 360 trước khi chuyển màn tiếp theo. Mọi đề bài, 3 gợi ý và câu giải thích khớp 100% với `docs/LEVELS.md`. Bộ hồi quy chiến dịch (`campaign-flow.spec.ts`) đã cập nhật và chạy thông suốt cả 13 màn hiện có.

**Đánh giá độ khó và điểm cần lưu ý:**
- **2D-06 (Chạm vào con cá) dễ gây tranh cãi nhất:** Trong tranh không có cá, đáp án nằm ở chữ "các" trên dòng đề bài (chữ "cá" nằm trong chữ "các"). Người chơi có thể cảm thấy bất ngờ hoặc "bị lừa" vì tương tác nằm ngoài khung tranh; tuy nhiên đây là màn chơi chữ/đố mẹo phá vỡ quy ước kinh điển ("đề bài cũng là một phần của sân chơi").
- **2D-09 (Bài kiểm tra 5 phút) có thể gây ức chế nếu không đọc kỹ:** Đòi hỏi người chơi kiềm chế thói quen làm bài ngay từ câu đầu; ai vội vàng điền đáp án sẽ bị báo "Làm thừa rồi!". Rất đúng với tinh thần "đọc kỹ đề".
- **2D-07 (Hai quả cam):** Dựa trên ảo giác Ebbinghaus nổi tiếng. Việc cho phép kéo chồng quả trái lên quả phải để thấy vừa khít giúp người chơi tự kiểm chứng trước khi chọn "Bằng nhau".
- **2D-08 (Bật mí bí mật):** Nói lái dân gian thân thuộc, ô nhập chữ hỗ trợ không dấu, hoa/thường và khoảng trắng.
- **2D-10 (Đàn vịt):** Câu đố dân gian quen thuộc, người đã biết sẽ giải được ngay; người chưa biết thường đếm thành 6.

Đề xuất commit: `feat: thêm 5 màn 2D tiếp theo (2D-06...2D-10) của Lắt Léo`.

### Riêng 3D-03 được duyệt ngày 17/11/2026

**Trạng thái: Chờ duyệt (`in_review`).** Người dùng trả lời **“oke”** sau phương án; chỉ thêm 3D-03. LL-046 (mô hình bằng code) và LL-019 (màn chơi) Chờ duyệt; LL-044 Đang làm một phần, đã có kịch bản 3D-02/03, còn 3D-04/05.

| Hạng mục | Kết quả |
|---|---|
| Đề / cách giải | Nồi bánh chưng ngày Tết; chạm mở nắp thấy bốn, kéo nghiêng thấy bánh thứ năm dưới đáy, nhập 5; nhập 4 báo “Nhìn kỹ lại tầng dưới” |
| Mô hình chung | CookingPot/PotLid, BanhChung, BrickBase; trụ 12 cạnh, hộp, vòng và chi tiết lạt/quai instancing bằng code |
| Camera / manh mối | Góc đầu cao khoảng 61°, nắp kín; núm nắp và quai rõ. Bánh dưới và lá lót tồn tại từ đầu, dùng vật che thật; không sinh bánh theo trạng thái |
| Bộ máy | Scene3D giới hạn/reset/tự hạ chất lượng; DragObject3D khóa camera khi kéo và phục hồi khi hủy/mất capture; TapTarget3D ≥44 px; NumberPad thêm nhãn Số bánh |
| Kiểm chứng | 254 unit/component, 9 ca dev và 15 ca production riêng màn đạt; hồi quy cuối 185/186, ca máy chậm 3D-02 còn lại đạt khi kiểm riêng. Hình học 0→4→5, kéo/hủy/reset, sai/đúng/chơi lại và quét góc có log/ảnh ở [E4-3D-03.md](../docs/evidence/E4-3D-03.md) |
| Ngân sách | 34 draw call/frame gồm bóng; cao nhất **260.485 byte ≈0,260 MB** tải 3D đầu tiên gồm gói chung; 126 mẫu/cấu hình |

Mã `3d-03`, thứ tự tạm 8/8 của bản hiện có; thiết kế đủ 25 màn vẫn #17 và độ khó 3. Chưa đo điện thoại thật hoặc thử độ khó với người chơi. Đề xuất commit: `feat: thêm màn 3D-03 Nồi bánh chưng`. Không tự đặt Xong hoặc commit.

### Riêng 3D-02 được duyệt ngày 17/11/2026

**Trạng thái: Chờ duyệt (`in_review`).** Người dùng trả lời **“oke”** sau phương án cảnh. LL-045 (mô hình bằng code) và LL-018 (màn chơi) chuyển sang Chờ duyệt; LL-044 Đang làm một phần, chỉ kịch bản 3D-02. Không nhận 3D-03…05 hoặc thay ID, điểm, phụ thuộc của baseline.

| Hạng mục | Kết quả |
|---|---|
| Đề / cách giải | “Sắp trễ giờ! Chìa khóa xe máy đâu rồi?”; xoay khám phá, chạm đôi dép ở cửa để lật rồi chạm chìa dính kẹo cao su dưới đế |
| Mô hình chung | TownhouseRoom, Sofa/Cushion, LowTable, Basket, Slipper, MotorbikeKey trong `engine/stage3d/models/`; hình khối bằng code, chi tiết hộp dùng instancing |
| Camera / manh mối | Góc trước-trái nhìn phòng cắt mở và dép lệch ở ngưỡng cửa; chìa dưới đế bị che; hướng dẫn kéo 5 giây và lời nhắc chạm đồ vật |
| Bộ máy | Scene3D giới hạn xoay/zoom, reset, kiểm góc, demand rendering và tự hạ chất lượng; TapTarget3D mở rộng vùng chạm ≥44 px, kiểm vật che, kéo qua dép không lật |
| Nghiệm thu | 247 unit/component, 171 ca Playwright production và 6 ca dev/StrictMode đạt; tải/reset/sai/đúng/chơi lại/chạm lệch tâm/máy chậm có log và ảnh ở [E4-3D-02.md](../docs/evidence/E4-3D-02.md) |
| Hiệu năng | Cao nhất **29 draw call/frame** gồm bóng, **258.110 byte ≈0,258 MB** tải 3D đầu tiên gồm HTML và gói Three/R3F/drei; 96 mẫu mỗi trình duyệt qua hai trạng thái và ba độ cao camera |

Mã `3d-02`, thứ tự tạm 7/7 của bản đang có; thiết kế đủ 25 màn vẫn #13, độ khó 3. Chưa đo điện thoại thật hoặc thử độ khó với người chơi. Đề xuất commit: `feat: thêm màn 3D-02 Tìm chìa khóa xe máy`. Chưa tự commit hoặc đặt Xong.

### Riêng 3D-01 được giao ngày 16/11/2026

**Trạng thái: Chờ duyệt (`in_review`).** Người dùng đã xem phương án và trả lời “tiếp tục”. LL-033 (kịch bản), LL-034 (mô hình) và LL-017 (màn chơi) chuyển sang Chờ duyệt; hai cổng Q6/Q10 chỉ mở trong phạm vi màn này. Giữ nguyên ID, điểm, phụ thuộc và 147 task baseline; chưa tính điểm Xong.

| Hạng mục | Kết quả |
|---|---|
| Đề / lời giải | Shipper tìm số nhà; xoay ra sau, nhìn sân thượng thấy 36 trên bồn nước, nhập 36 |
| Mô hình chung | `engine/stage3d/models/`: Townhouse, WaterTank, Planter; hộp/trụ/đa diện dựng trong code, nét số bằng khối hộp; chi tiết lặp dùng instancing |
| Camera / manh mối | Góc đầu nhìn mặt tiền và bồn không có số; ống nước bên hông, khoảng sân bên cạnh và hướng dẫn kéo gợi khám phá; giới hạn xoay/zoom và reset từ Scene3D |
| Hướng dẫn | Bàn tay mờ trong 5 giây tính từ lúc Canvas sẵn sàng; ẩn khi thao tác, tắt chuyển động theo hệ thống; dùng lại cho màn 3D thứ hai khi dựng sau |
| Kiểm chứng | 239 unit/component và 153 ca Playwright production đạt; có kiểm sai/đúng, chơi lại, camera/reset, bố cục, đo lường và tự hạ chất lượng |
| Hiệu năng | Cao nhất **28 draw call/frame** (gồm bóng), **258.646 byte ≈0,259 MB** tải 3D đầu tiên (gồm HTML/Three/R3F/drei); 15 ca dev, 9 ca ví dụ và 15 ca production cuối đạt. Log trong [E4-3D-01.md](../docs/evidence/E4-3D-01.md) |

Mã màn giữ `3d-01`; bản hiện có hiển thị thứ tự 6/6 theo hợp đồng catalog liên tục, vị trí trong bộ đủ 25 màn là #8. Chưa đo trên điện thoại thật hoặc thử độ khó với người chơi. Đề xuất commit: `feat: thêm màn 3D-01 Nhà số mấy`. Không dựng 3D-02 hoặc nội dung màn khác trong lượt này.

### Lô 2D-01…05 được giao ngày 16/11/2026

**Trạng thái: Chờ duyệt (`in_review`).** Yêu cầu trực tiếp dùng `docs/LEVELS.md`, SVG nét tròn/màu tươi và bộ máy hiện có là phạm vi thực thi của lô này. LL-010 (dựng màn) và LL-029 (kịch bản/đồ họa lô 1) chuyển sang Chờ duyệt; không cộng điểm hoàn thành hoặc thay đổi phụ thuộc của baseline.

| Mã | Tên | Trạng thái | Kiểm chứng hành vi |
|---|---|---|---|
| 2D-01 | Lì xì cho đứa nhỏ nhất | Chờ duyệt | Kéo/chạm dời bao rồi chạm bé ẩn mới thắng; chọn bé khác chưa thắng; kéo sai trả bao về, chơi lại che bé |
| 2D-02 | Con gì càng to càng nhỏ? | Chờ duyệt | Nhận cua/con cua/cua bể/cua đồng, không dấu và hoa/thường; cá/tôm/chạm nước chưa thắng |
| 2D-03 | Qua đường an toàn | Chờ duyệt | Chạm đèn → xe dừng → bé qua vạch; chạm bé/xe trước đó chưa thắng |
| 2D-04 | Hái xoài cho bé | Chờ duyệt | Ba chạm trong 2 giây; từ chối cảm biến vẫn giải được; hai chạm hoặc chạm thưa chưa thắng; kiểm thêm mẫu cảm biến giả lập |
| 2D-05 | Gà trống đẻ trứng | Chờ duyệt | Ba hướng lăn đều sai và có câu đùa riêng; chọn gà trống không đẻ trứng thì thắng |

Mỗi màn đã được làm và kiểm riêng trước khi sang màn tiếp theo. SVG tự vẽ trong mã, dùng lại Stage2D/LevelShell, useDrag, useAnswerInput, useShake/SensorControls và ChooseScene. Đã thay hai màn mẫu bằng năm màn thật trong catalog và chuyển các ca hồi quy sang nội dung thật. Ba gợi ý, đề và giải thích được kiểm tự động với bảng LEVELS. Bằng chứng và kết quả chạy: [E3-2D-01-05.md](../docs/evidence/E3-2D-01-05.md).

**Cần xem khi duyệt độ khó/nội dung:**

- **2D-02 dễ gây tranh luận nhất:** câu “càng to càng nhỏ” dựa vào nghĩa của “càng”, không phải quy luật lớn lên của con vật; cần hai người khác tác giả đọc soát theo GDD. Chưa có thử với người thật để chốt mức 1.
- **2D-01 có thể khó hơn mức 1** nếu người chơi chưa quen kéo vật che; vùng trống nét đứt và đường chạm hai bước là manh mối sẵn có.
- **2D-04 có thể khó với thao tác chậm:** cửa sổ ba chạm/2 giây giữ đúng thiết kế; cần thử với người thật trước khi điều chỉnh. Cảm biến và quyền Safari chưa đo trên điện thoại thật.
- **2D-03 cần đọc soát thông điệp giao thông:** đèn trong câu đố là điều khiển giả lập; lời giải thích giữ nguyên LEVELS. Cần kiểm người chơi hiểu việc qua đường ngoài đời theo tín hiệu dành cho người đi bộ.
- **2D-05 có thể quá dễ** với người đã biết câu đố dân gian; phù hợp vai trò làm quen của lô đầu. Không đổi lời giải hoặc tăng độ khó trong lượt này.

Đề xuất commit: `feat: thêm 5 màn 2D đầu tiên của Lắt Léo`. Chưa tự commit hoặc đặt Xong; lô 2D-06…10 và các màn 3D chưa làm.

### Phạm vi Bộ máy màn chơi được giao ngày 15/11/2026

**Trạng thái: Chờ duyệt (`in_review`).** Phạm vi tám mục người dùng giao, dựa trên TECH và nền tảng hiện có. Không thay đổi ID, điểm hoặc phụ thuộc của baseline 51 story/147 task; không tự nhận toàn bộ LL-004/005/009/014/015/022/043 đã Xong.

| Hạng mục | Kết quả triển khai |
|---|---|
| Hợp đồng màn | LevelMeta thuần dữ liệu + Level.component nạp lười; SceneProps báo `onSolved()`; tự phát hiện `meta.ts` + `scene.tsx`, không sửa registry bằng tay |
| LevelShell | Đề trên, sân giữa, gợi ý/chơi lại dưới; ba cấp gợi ý, đồng hồ tab hiện, sự kiện và tiến trình dùng chung; dựng lại cảnh khi chơi lại |
| Đề chạm được | `word`, `tappableWords`, `usePromptWordTap`; mã riêng cho chữ lặp, nút ≥44 px; khóa chạm trước khi cảnh sẵn sàng |
| Thao tác | `useShake`, `useTilt` xin quyền sau chạm, có giải thích và nút thay; `useDrag` quy đổi CTM, chọn vật/chạm đích; `useAnswerInput` hỗ trợ nhiều đáp án, không dấu/hoa thường, IME |
| 3D và góc nhìn | Scene3D tải lười, giới hạn camera, nút xoay/zoom/reset, ánh sáng; demand rendering, DPR/bóng tự hạ; hàm thuần kiểm hướng và góc quỹ đạo có dung sai |
| Tài liệu và ví dụ | HOW_TO_ADD_LEVEL.md; hai màn mẫu chuyển sang callback; hai ví dụ chạm chữ/3D mỗi ví dụ đúng hai file |
| Kiểm chứng | 214 ca unit/component, 9 ca ví dụ production + 9 ca dev/StrictMode; kiểm tra mã/build và bộ hồi quy có log trong evidence |

**Bằng chứng:** [E2-BO-MAY-MAN-CHOI.md](../docs/evidence/E2-BO-MAY-MAN-CHOI.md). Chưa đo cảm biến/FPS trên điện thoại thật. Three và kiểu tương ứng ghim 0.182.0 để tương thích R3F 9.8.2; các thư viện khác giữ phiên bản. Không cộng điểm hoàn thành trước khi chủ dự án duyệt.

### Phạm vi Nền tảng được giao ngày 14/11/2026

**Trạng thái: Chờ duyệt (`in_review`).** Bảy mục người dùng giao là phạm vi nghiệm thu của lượt này. Theo yêu cầu trực tiếp và `docs/TECH.md`, dùng localStorage, React Three Fiber + drei và Zustand. PostgreSQL/triển khai hosting của E1 gốc nằm ngoài lượt này; các story và điểm gốc bên dưới được giữ để đối soát, chưa được tính *Xong*.

| Hạng mục | Kết quả |
|---|---|
| Next.js, TypeScript strict, ESLint, Prettier, Vitest, Playwright; R3F, drei, Zustand | Đã có và kiểm tra được bằng các script trong `package.json` |
| Cấu trúc theo TECH | Đủ các tầng và thư mục chờ; siêu dữ liệu màn tách khỏi bộ nạp cảnh phía trình duyệt |
| Trang chủ, chọn màn, màn chơi, kết quả | Giao diện dọc, chữ ≥ 16 px, vùng chạm ≥ 44 px; kiểm bố cục ở 320/360/393 px |
| Lưu tiến trình | localStorage có try/catch; dữ liệu hỏng/bị chặn/đầy dung lượng vẫn chơi được |
| Đo lường | `track(name, data)` có kiểu dữ liệu; console ở dev, thay dịch vụ qua `AnalyticsSink` |
| Luồng mẫu | Hai màn mẫu: vào màn → giải → kết quả → màn tiếp; tải lại vẫn nhớ tiến trình |
| Nghiệm thu | `check`, `build`, 145 unit test và 102 ca E2E đạt trên iPhone SE, Pixel 5, mobile 360 |

**Bằng chứng mới nhất:** [E1-NEN-TANG-RECHECK.md](../docs/evidence/E1-NEN-TANG-RECHECK.md). Đố mẹo mỗi ngày hiện có lối vào và trạng thái kho trống; nội dung ngày, 25 màn thật và dịch vụ nhận sự kiện là việc sau. Phần triển khai này bao phủ một phần LL-001/004/005/006/007/024/025/048/049 và công cụ kiểm thử; không coi các story gốc đã đạt toàn bộ AC. Giữ nguyên 147 task của kế hoạch AI cho tới khi đối soát thiết kế mới.

### Baseline 51 story

| Mã | Epic | User Story | Điểm | Ưu tiên | Phụ thuộc | Trạng thái | Sẵn sàng |
|---|---|---|---|---|---|---|---|
| [LL-001] | E1 Nền tảng | Là lập trình viên, tôi muốn có khung dự án Next.js chạy được kèm quy ước chung để cả nhóm bắt đầu làm tính năng ngay. | 2 | Must | — | Đang làm (T01 Xong; T02 chờ duyệt; khung epic có bằng chứng 14/11) | Có |
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
| [LL-029] | E6 Nội dung | Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 1 để dựng màn mà không phải đoán ý. | 5 | Must | LL-023, LL-028 | Chờ duyệt (lô 1, bằng chứng 16/11) | Có |
| [LL-010] | E3 2D | Là người chơi, tôi muốn chơi lô 1 (2D-01…05) để làm quen với lối đố mẹo qua các màn dễ. | 5 | Must | LL-009, LL-029, LL-043 | Chờ duyệt (lô 1, bằng chứng 16/11) | Có |
| [LL-016] | E4 3D | Là lập trình viên 3D, tôi muốn có trình nạp tài nguyên, màn hình chờ và ngân sách hiệu năng/tài nguyên bằng số để mọi màn và mô hình 3D bám cùng một chuẩn. | 3 | Must | LL-014 | Chưa làm | Có |
| [LL-033] | E6 Nội dung | Là lập trình viên 3D, tôi muốn có kịch bản chi tiết màn 3D-01 để dựng lát cắt 3D đầu tiên và ước lượng lại chính xác. | 2 | Must | LL-028 | Chờ duyệt (3D-01, bằng chứng 16/11) | Có |
| [LL-034] | E6 Nội dung | Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-01 để không phải tự làm. [CẦN LÀM RÕ: Q10] | 3 | Must | LL-016, LL-033 | Chờ duyệt (mô hình bằng code, 16/11) | Có |
| [LL-015] | E4 3D | Là người chơi, tôi muốn chạm/kéo vật và xoay góc nhìn trong cảnh 3D để khám phá và giải đố. | 5 | Must | LL-005, LL-014, LL-028 | Chưa làm | Có |
| [LL-017] | E4 3D | Là người chơi, tôi muốn chơi màn 3D-01 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6] | 8 | Must | LL-015, LL-016, LL-034 | Chờ duyệt (3D-01, bằng chứng 16/11) | Có |
| [LL-022] | E4 3D | Là người chơi dùng điện thoại tầm trung, tôi muốn màn 3D chạy mượt để chơi không bị giật. [CẦN LÀM RÕ: Q3] | 5 | Must | LL-017 | Chưa làm | Chưa |
| [LL-007] | E2 Khung chơi | Là người chơi, tôi muốn game nhớ các màn đã qua để lần sau chơi tiếp mà không làm lại từ đầu. | 5 | Must | LL-002, LL-005, LL-006 | Chưa làm | Có |
| [LL-048] | E2 Khung chơi | Là người chơi, tôi muốn khi có lỗi (mạng, dữ liệu, lỗi trong màn) game báo rõ và cho thử lại hoặc về chọn màn để không gặp trang trắng. | 3 | Must | LL-005 | Chưa làm | Có |
| [LL-025] | E5 Giao diện | Là người chơi, tôi muốn trang chọn màn và khung chơi dùng thoải mái trên cả điện thoại lẫn máy tính để chơi ở bất cứ đâu. | 3 | Must | LL-005, LL-006, LL-023 | Chưa làm | Có |
| [LL-030] | E6 Nội dung | Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 2 để dựng màn mà không phải đoán ý. [CẦN LÀM RÕ: Q6, Q10] | 5 | Must | LL-023, LL-028 | Chờ duyệt (lô 2, bằng chứng 18/11) | Có |
| [LL-011] | E3 2D | Là người chơi, tôi muốn chơi lô 2 (2D-06…10) để gặp những mẹo khó dần, buộc phải nghĩ lệch hướng. [CẦN LÀM RÕ: Q6] | 8 | Must | LL-009, LL-030, LL-043 | Chờ duyệt (lô 2, bằng chứng 18/11) | Có |
| [LL-044] | E6 Nội dung | Là lập trình viên 3D, tôi muốn có kịch bản chi tiết 4 màn 3D còn lại (3D-02…05) để dựng đúng và ước lượng lại chính xác. | 3 | Must | LL-028 | Đang làm (3D-02/03; 3D-04/05 chưa làm) | Có |
| [LL-045] | E6 Nội dung | Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-02 để không phải tự làm. [CẦN LÀM RÕ: Q10] | 3 | Must | LL-016, LL-044 | Chờ duyệt (mô hình bằng code, 17/11) | Có |
| [LL-018] | E4 3D | Là người chơi, tôi muốn chơi màn 3D-02 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6] | 8 | Must | LL-015, LL-016, LL-045 | Chờ duyệt (3D-02, bằng chứng 17/11) | Có |
| [LL-031] | E6 Nội dung | Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 3 để dựng màn mà không phải đoán ý. [CẦN LÀM RÕ: Q6, Q10] | 5 | Must | LL-023, LL-028 | Chờ duyệt (2D-11…14 đã có; bổ sung 2D-15, 19/11) | Có |
| [LL-012] | E3 2D | Là người chơi, tôi muốn chơi lô 3 (2D-11…15) để tiếp tục được thử thách bằng những mẹo mới, không lặp lại. [CẦN LÀM RÕ: Q6] | 8 | Must | LL-009, LL-031, LL-043 | Chờ duyệt (2D-11…14 đã có; bổ sung 2D-15, 19/11) | Có |
| [LL-046] | E6 Nội dung | Là lập trình viên 3D, tôi muốn có mô hình 3D đã tối ưu cho web của màn 3D-03 để không phải tự làm. [CẦN LÀM RÕ: Q10] | 2 | Must | LL-016, LL-044 | Chờ duyệt (mô hình bằng code, 17/11) | Có |
| [LL-019] | E4 3D | Là người chơi, tôi muốn chơi màn 3D-03 để giải một câu đố hack não trong không gian 3D. [CẦN LÀM RÕ: Q6] | 8 | Must | LL-015, LL-016, LL-046 | Chờ duyệt (3D-03, bằng chứng 17/11) | Có |
| [LL-032] | E6 Nội dung | Là lập trình viên, tôi muốn có kịch bản chi tiết và đồ họa cho 5 màn 2D lô 4 để dựng màn mà không phải đoán ý. | 5 | Must | LL-023, LL-028 | Chờ duyệt (đủ 2D-16…20, bằng chứng 19/11) | Có |
| [LL-013] | E3 2D | Là người chơi, tôi muốn chơi lô 4 (2D-16…20) để hoàn thành trọn bộ 20 màn 2D với những mẹo khó nhất phần 2D. | 8 | Must | LL-009, LL-032, LL-043 | Chờ duyệt (đủ 2D-16…20, bằng chứng 19/11) | Có |
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

## 2. Chi tiết story: tiêu chí nghiệm thu và task

Sao chép nguyên văn từ nguồn (mục 2) để mỗi story có tiêu chí nghiệm thu kiểm tra được ngay trong file làm việc. Các story cùng khuôn gộp một khối cho đỡ lặp; mỗi story vẫn tính điểm và theo dõi riêng ở bảng trên. Mọi task làm xong trong tối đa 1 ngày. "Chờ: Qn" là câu hỏi mở đang chặn story (xem mục 4).

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

| Epic | Story | Điểm |
|---|---|---|
| E1 | 3 | 8 |
| E2 | 5 | 21 |
| E3 | 8 | 40 |
| E4 | 9 | 58 |
| E5 | 5 | 13 |
| E6 | 13 | 43 |
| E7 | 8 | 28 |

- Còn 8 story 8 điểm (LL-011–013, LL-017–021), đều "Chưa"; tách tiếp khi có kịch bản (Q6). Không story nào vượt 8 điểm.
- Won't đã chốt: chế độ nhiều người, thanh toán, ứng dụng tải về.

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

**Trạng thái (2026-11-11):** cả 11 câu chưa có trả lời. Năm câu ưu tiên nhất được hỏi lại ở [HO_SO.md](HO_SO.md) mục 6, mỗi câu kèm đáp án gợi ý. Các câu còn lại dùng giả định ghi ở HO_SO mục 3 cho tới khi cần.

| Câu | Story đang bị chặn (điểm) | Cần trả lời trước (đề xuất) |
|---|---|---|
| Q1 | không gắn thẻ (chặn xếp sprint, dự báo hạn chót) | Sprint 1 (16/11) |
| Q2 | không gắn thẻ (chặn xếp sprint, năng lực) | Sprint 1 (16/11) |
| Q3 | LL-022 (5), LL-050 (3), LL-039 (3) | Chiều thứ Ba 17/11 (LL-008, LL-014 cần đo FPS) |
| Q4 | LL-003 (3) | Sprint 2 (trước LL-003) |
| Q5 | LL-037 (2), LL-049 (5), LL-051 (2) | Trước khi duyệt LL-028 (nguồn câu đố); sau đó LL-037, LL-049, LL-051 |
| Q6 | LL-029 (5), LL-010 (5), LL-017 (8), LL-030 (5), LL-011 (8), LL-018 (8), LL-031 (5), LL-012 (8), LL-019 (8), LL-032 (5), LL-013 (8), LL-020 (8), LL-021 (8) | Thứ Hai 16/11 (LD cần ≥25 ý tưởng cho LL-028; hạn hết thứ Ba 17/11) |
| Q7 | không gắn thẻ (LL-006 đang mặc định mở sẵn; thứ tự màn ở LL-028) | Sprint 2 |
| Q8 | không gắn thẻ (LL-004, LL-005, LL-007 dùng giả định) | Sprint 2 |
| Q9 | không gắn thẻ (LL-009, LL-043 cấu hình theo màn; danh mục cơ chế ở LL-028) | Sprint 2–3 |
| Q10 | LL-029 (5), LL-034 (3), LL-030 (5), LL-045 (3), LL-031 (5), LL-046 (2), LL-032 (5), LL-035 (3), LL-047 (2) | 17:00 thứ Ba 17/11 (LL-023); chưa chốt thì dùng phong cách tối giản mặc định |
| Q11 | LL-040 (5) | Ngay: chưa có DoD thì chưa task nào được đặt Xong, kể cả LL-001-T01 |

## 5. Story có điều kiện

Chỉ thêm vào backlog nếu câu trả lời yêu cầu; chưa tính vào tổng điểm.

- **Khóa màn tuần tự** (≈ 2 điểm): nếu Q7 chọn mở tuần tự.
- **Adapter PostgreSQL cho nội dung màn** (≈ 3 điểm): nếu Q8 chọn lưu nội dung màn trong DB.

## 6. Đề xuất thêm (ngoài phạm vi, không tính điểm, chờ bạn duyệt)

- **Gợi ý cho từng màn**: game đố mẹo hay làm người chơi bí, gợi ý giúp họ không bỏ cuộc.
- **Nút/biểu mẫu gửi phản hồi trong game**: mục đích bản chơi thử là thu ý kiến người chơi 15–35 tuổi.
- **Màn làm quen/hướng dẫn chơi**: nếu màn đầu chưa đủ để giải thích cách chơi.
- **Âm thanh và nhạc nền**: tăng cảm xúc nhưng thêm tài nguyên và vấn đề giấy phép.
- **Kiểm thử tự động và CI**: chạy lint/test mỗi lần merge để tránh lỗi hồi quy khi thêm màn (chờ Q11).
- **Chia sẻ kết quả lên mạng xã hội**: tăng lan truyền ở nhóm 15–35 tuổi.
- **Tài khoản/đồng bộ tiến độ giữa thiết bị**: hiện tiến độ gắn với một trình duyệt.

"Số liệu chơi ẩn danh" từng nằm ở đây, nay đã thành LL-049.

### Phát sinh từ kế hoạch kỹ thuật của AI (`docs/ai-planning/`)

Chưa có mã story, chưa tính vào 51 story/211 điểm và chưa vào cam kết sprint nào cho tới khi bạn duyệt.

- **Test runner + E2E + CI** (AI-T07 1 điểm, AI-T08 2 điểm, tính theo task của kế hoạch AI). Trùng ý "Kiểm thử tự động và CI" ở trên. **Lưu ý lệch với backlog gốc:** trong kế hoạch AI, LL-002-T01 phụ thuộc AI-T07, còn ở backlog gốc LL-002 chỉ phụ thuộc LL-001. Nếu duyệt thì cấp story mới (mã LL-052) và đưa vào Sprint 1; nếu không thì phải gỡ phụ thuộc đó trong `tasks.json` (sẽ hỏi bạn trước khi sửa).
- **Ghi quyết định có truy vết** (AI-T01…AI-T06, 6 task × 1 điểm): ghi câu trả lời Q1–Q11 thành tệp `docs/decisions/*.md`. Scrum Master đã ghi quyết định ở [HO_SO.md](HO_SO.md) mục 7 nên chỉ cần story riêng nếu bạn muốn có các tệp đó trong `docs/`.

## 7. Nhật ký thay đổi (scrum/)

Ngày **2026-11-17**, người dùng duyệt “oke” phương án 3D-03: thêm riêng màn nồi bánh chưng, mô hình và cơ chế kéo 3D dùng chung. LL-046/019 → Chờ duyệt; LL-044 đã có 2/4 kịch bản. Tổng 33 story sẵn sàng/123 điểm; 40 chưa làm/2 đang làm/9 chờ duyệt, vẫn 0 điểm Xong. [Bằng chứng](../docs/evidence/E4-3D-03.md). Không đổi cam kết sprint hoặc tự commit.

Ngày **2026-11-17**, người dùng duyệt “oke”: thực hiện riêng 3D-02, thêm mô hình phòng/đồ đạc/dép/chìa và vùng chạm 3D dùng chung. LL-045/018 → Chờ duyệt; LL-044 → Đang làm một phần. Tổng 31 story sẵn sàng/113 điểm; 42 chưa làm/2 đang làm/7 chờ duyệt; vẫn 0 điểm Xong. [Bằng chứng](../docs/evidence/E4-3D-02.md). Giữ nguyên cam kết sprint và không tự commit.

Ngày **2026-11-16**, theo yêu cầu chỉ làm một màn 3D và phương án đã được duyệt bằng “tiếp tục”: thêm riêng 3D-01, thư viện ba mô hình, hướng dẫn kéo và bàn phím số dùng chung. LL-033/034/017 → Chờ duyệt; tổng 29 story sẵn sàng, 45 chưa làm/1 đang làm/5 chờ duyệt, vẫn 0 điểm Xong. [Bằng chứng](../docs/evidence/E4-3D-01.md). Không thay đổi cam kết sprint hoặc tự commit.

Lịch sử v1 → v2.1 của backlog gốc xem [docs/backlog.md](../docs/backlog.md) mục 7. Từ đây ghi mọi thay đổi do Scrum Master thực hiện:

- **2026-11-11** — Khởi tạo bản làm việc từ v2.1: giữ nguyên 51 story, điểm, ưu tiên, phụ thuộc, tiêu chí nghiệm thu, task (script đối chiếu khớp mọi tổng của nguồn). Đổi trạng thái LL-001: Chưa làm → Đang làm (LL-001-T01 làm xong lượt 2 lúc 20:40, chờ bạn duyệt). Thêm mục 6 "Phát sinh từ kế hoạch kỹ thuật của AI" và cột thời hạn cần trả lời ở mục 4. Chưa đổi điểm hay ưu tiên nào.
- **2026-11-16** — Theo yêu cầu trực tiếp, làm và kiểm riêng lần lượt 2D-01…05. LL-010/LL-029: Chưa làm → Chờ duyệt; Sẵn sàng → Có trong phạm vi lô 1. Cập nhật tổng 27 story sẵn sàng/24 chưa, 48 chưa làm/1 đang làm/2 chờ duyệt, vẫn 0 điểm Xong. Thay hai mẫu bằng nội dung thật; `check`, 219 unit/component, 138 ca Playwright production và 9 ca ví dụ đạt. Bằng chứng: [E3-2D-01-05.md](../docs/evidence/E3-2D-01-05.md). Ghi điểm cần thử/đọc soát, chưa đổi độ khó hoặc nội dung LEVELS, chưa commit.

- **2026-11-19** — Theo yêu cầu trực tiếp, thêm lần lượt 2D-15…19; từng màn Chờ duyệt. LL-012/031 Chờ duyệt, LL-013/032 Đang làm (còn 2D-20). Bổ sung luồng hồi quy 22 màn, kiểm nội dung và ba gợi ý. Bằng chứng tại [E3-2D-15-19.md](../docs/evidence/E3-2D-15-19.md). Không tự commit, thay baseline hoặc cộng điểm hoàn thành.

- **2026-11-19** — Chủ dự án duyệt 2D-20 cùng bốn đề bổ sung 2D-21…24, làm lần lượt và kiểm qua từng màn. LL-013/032 → Chờ duyệt; tổng 39 story sẵn sàng/162 điểm, 34 chưa làm/2 đang làm/15 chờ duyệt, vẫn 0 điểm Xong. Bốn màn bổ sung theo dõi riêng, không đổi baseline hoặc cam kết sprint. [Bằng chứng](../docs/evidence/E3-2D-20-24.md); chưa tự commit.

- **2026-11-20** — Chủ dự án duyệt cả năm đề mới bằng “tat ca”; triển khai và kiểm lần lượt 2D-25…29, bàn giao từng màn Chờ duyệt. Tổng catalog 32 màn; chín màn ngoài MVP theo dõi riêng, không đổi tổng story/điểm hoặc velocity. [Bằng chứng](../docs/evidence/E3-2D-25-29.md); chưa tự commit.

- **2026-11-24** — Chủ dự án duyệt 2D-35…39 bằng “duyệt cả 5”; nội dung ở LEVELS mục 9. Kiểm tuần tự 12/9/12/15/15 ca đạt; `check`/320 unit và hồi quy production 546/546 đạt; từng màn Chờ duyệt. Catalog 42 màn, 19 màn ngoài MVP theo dõi riêng; không đổi baseline/velocity. [Bằng chứng](../docs/evidence/E3-2D-35-39.md).
- **2026-11-23** — Chủ dự án duyệt cả năm đề 2D-30…34; nội dung ở LEVELS mục 8. Kiểm riêng từng màn đạt trước khi sang màn tiếp; log hồi quy đã kết thúc 483/483 đạt (đối soát 24/11). Catalog 37 màn, 14 màn ngoài MVP theo dõi riêng; giữ nguyên baseline/velocity. [Bằng chứng](../docs/evidence/E3-2D-30-34.md).
