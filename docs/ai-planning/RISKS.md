# Risk Register

Ngày khảo sát: **2026-11-10**, múi giờ Asia/Ho_Chi_Minh. Kế hoạch đề xuất; implementation bắt đầu 2026-11-11 với SP-00 (trạng thái hiện hành ở PROGRESS.md).

<!-- plan-stats: tasks=147; sprints=12; points=201 -->

Rủi ro là điều kiện chưa chắc xảy ra; khác bug đã xác nhận và khác missing implementation. Mức xác suất/tác động là đánh giá planning, chưa là số đo. Owner dùng vai trò vì Q2 chưa có tên.

| ID | Rủi ro / bằng chứng | Xác suất / tác động | Trigger | Giảm thiểu / fallback | Owner / task |
|---|---|---|---|---|---|
| R01 | Chưa có 25 script và nguồn ý tưởng (Q6; inventory chỉ docs) | Cao / Cao | LL-028 không đủ 25 ý tưởng được duyệt, hoặc cơ chế mới xuất hiện | Catalog trước content; tách mechanic mới; giữ task màn blocked, không tự lấp placeholder như hoàn thành | PO/LD; LL-028, LL-029…032, LL-033/044 |
| R02 | Chưa có capacity/năng lực 3D/art/QA (Q1/Q2) | Cao / Cao | Một người kiêm nhiều vai hoặc 18 SP không vừa tuần | Xác nhận AI-T01; đo velocity thực từ DoD; replan thay cam kết 12 tuần; không tự quy SP sang ngày | PO; AI-T01 |
| R03 | Thiếu thiết bị thật và ma trận tối thiểu (Q3) | Cao / Cao | Không đo được smartphone hoặc ba thiết bị của LL-022 | Ghi số đo giả lập riêng; task manual vẫn chưa done; đặt lịch mượn thiết bị trước spike | QA/DEV3D; AI-T02, LL-008/014/022/039/050 |
| R04 | Cảnh 3D SSR/hydration/memory/input lỗi | Trung bình / Cao | Spike không build, heap >10% sau 20 vòng, drag xung đột camera | Client boundary sớm, ownership/refcount, lifecycle measurement; chỉ tối ưu theo baseline; tách defect có repro | DEV3D; LL-014/015/016/022 |
| R05 | Model/web assets không sẵn hoặc vượt budget (Q10) | Cao / Cao | Chưa có GLB/texture hợp lệ hay license/name/stats fail | Chốt budget trước model; chuẩn hóa export và asset checker; giảm hình thức theo quyết định, không nới budget tùy tiện | ART3D/PO; AI-T06, LL-016, model stories |
| R06 | Server grading xung đột offline và ≤1s feedback | Trung bình / Cao | PO yêu cầu giấu đáp án và chơi offline không giới hạn | AI-T05 quyết định client/hybrid/server với tradeoff; thiết kế task endpoint/verifier nếu cần, cập nhật scope/estimates | FE/BE/PO; AI-T05, LL-005/048 |
| R07 | Retention/xóa/nguồn tài nguyên chưa quyết định (Q5) | Cao / Cao | Asset không rõ quyền hoặc analytics có trường ngoài allowlist | Quyết định data; ledger từ lúc giao asset; review sources; implementation xóa và notice khớp thực tế; không đưa ra kết luận pháp lý khi chưa có quyết định | PO/BE; AI-T04, LL-037/049/051 |
| R08 | Tiến độ trùng/lẫn player hoặc mất mạng chặn game | Trung bình / Cao | Retry duplicate, sửa player id, POST timeout | Cookie server-bound, unique upsert, validation và optimistic cache; chỉ hứa giữ trong phiên khi offline theo source | BE/FE; LL-007 |
| R09 | Unicode/IME làm câu chơi chữ sai | Trung bình / Cao | hòa/hoà, NFC/NFD, đ/Đ, accent-sensitive lẫn lộn | ≥15 positive/negative cases; luật theo từng màn; review khác tác giả; không submit giữa IME composition | FE/LD; LL-043, LL-036 |
| R10 | Chưa biết hosting/budget/credentials (Q4) | Cao / Cao | Không deploy được staging, DB health fail, thiếu quyền rollback | Chuẩn bị pipeline/runbook dry-run trước; deploy khi có quyền được ghi; thiếu quyền giữ gate, không chọn mua dịch vụ mặc định | BE/owner; AI-T03, LL-003 |
| R11 | Tự đánh dấu xong hoặc lệnh chưa tồn tại bị tính pass | Trung bình / Cao | Chỉ nhìn UI/fixture, skipped tests, chưa có report/PO review | Evidence per task, verifier metadata; manual evidence đúng scope; future commands không là kết quả; fixture khác production | AI/QA; EXECUTION_RULES, AI-T07/T08 |
| R12 | Backlog cũ và mới drift, source docs chưa commit | Trung bình / Cao | Nguồn đổi hash, dependency/capacity thay mà JSON/Markdown không đổi | Giữ hash snapshot; verify_plan fail khi drift; regenerate/sync docs trước tiếp tục; không tự commit file của user | Tech lead; verifier |
| R13 | Scope creep từ gợi ý/login/sensor/khóa màn | Trung bình / Trung bình | Agent thêm feature ngoài 51 stories hoặc Q7/Q8 đổi | Giữ scope exclusions; tạo change request + task/AC/deps sau khi chốt; không âm thầm làm thêm | PO/AI; AI-T05, LL-028 |
| R14 | Defect cuối kỳ làm trễ release chưa có estimate | Cao / Cao | QA mở blocker/high | Tạo DEF-NNN từng lỗi có repro, ≤1 ngày hoặc chia; gắn RC dependency, cập nhật tổng task/SP/sprint; dự phòng capacity không là cam kết sửa xong | Tech lead/QA; LL-040-T01/T02 |
| R15 | Story Should có nghĩa vụ kèm dữ liệu/asset Must | Trung bình / Cao | Cắt LL-049/051/036/041 không sửa notice/release deps | Cắt scope theo PO với impact analysis; attribution và notice phản ánh dữ liệu thực vẫn là release gate; xóa dependency chỉ khi yêu cầu được đổi minh bạch | PO; ROADMAP |
| R16 | Event thoát không giao được làm sai đo abandon | Trung bình / Trung bình | Đóng tab/offline khiến flush fail | Session denominator rõ, event-id dedupe, best-effort queue và giới hạn; document bias không hứa telemetry chính xác tuyệt đối | BE; LL-049 |

## Blocker hiện tại

Business code chưa có là điểm xuất phát, không là lý do dừng planning. Trước coding có thể khởi tạo scaffold theo task LL-001-T01 khi người dùng yêu cầu triển khai. Các quyết định Q1/Q2/Q3/Q4/Q5/Q6/Q8/Q10/Q11 và bằng chứng tài nguyên/thiết bị chặn từng task tương ứng, không chặn việc lập kế hoạch đã hoàn tất.

## Quy tắc escalation

Sau một lần nhận thấy thiếu input, ghi vào PROGRESS gồm task/gate, evidence thiếu và phần có thể làm độc lập. Không lặp request đã được trả lời, không tự coi thời gian chờ là chấp thuận. Với bug thật, lưu repro trước sửa; với thay đổi phạm vi, cập nhật DAG và sprint trước bắt đầu. Không tự gửi thông tin/trao đổi với người ngoài.
