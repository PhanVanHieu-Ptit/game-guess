# Bộ máy màn chơi — bằng chứng nghiệm thu

Ngày **15/11/2026** (giờ Việt Nam). Trạng thái **`in_review`**, chờ chủ dự án duyệt; chưa commit. Phạm vi là tám mục người dùng giao trực tiếp, không phải tuyên bố hoàn thành mọi AC của các story/147 task baseline.

## Cây mã và phạm vi

HEAD trước thay đổi: `9c5c624` + working tree. Khi bắt đầu đã có phần sửa chưa commit của `domain/levels/{types,validate,prompt}`, `domain/answers`, `domain/view` và ba file kiểm thử domain. Đã tích hợp, định dạng và bổ sung kiểm tra đầu vào; không reset hoặc xóa phần sửa đó. README, GDD, LEVELS, TECH, backlog/sprint gốc và baseline kế hoạch AI giữ nguyên.

- `engine/scene.ts`: `Level` = metadata + bộ nạp component; `SceneProps` có `onSolved`, `onWrong`, `onProgress`. Domain giữ thuần TypeScript.
- `features/game-shell/level-shell.tsx`: tái sử dụng `LevelRun` cho thời gian chỉ lúc tab hiện, ba gợi ý, số lần sai, kết quả, lưu tiến trình và sự kiện. Hai màn mẫu chuyển sang callback mới; thanh dưới có gợi ý/chơi lại.
- `engine/prompt-words.tsx`, `PromptText`: đánh dấu từng từ hoặc cả câu, mã riêng cho từ lặp, nút chạm ≥44 px, listener tự dọn khi chơi lại. Khóa đề khi cảnh chưa sẵn sàng để không mất thao tác; điều khiển 3D cũng chờ OrbitControls sẵn sàng.
- `engine/input/`: xin quyền cảm biến trong handler chạm, có lời giải thích, xử lý từ chối/lỗi/API thiếu/không có dữ liệu; nút Lắc/Nghiêng luôn dùng được. Kéo SVG qua CTM, pointer capture, hủy/trả vật, chọn vật rồi chạm đích. Nhập đáp án nhận alias, không dấu, NFC/NFD, hoa thường, khoảng trắng, không chấm giữa lúc IME ghép chữ.
- `engine/stage3d/`: Canvas R3F qua dynamic `ssr: false`, đèn mặc định, giới hạn góc/khoảng cách, nút xoay/zoom/reset. Demand rendering; khi 20 khoảng frame tương tác trung bình dưới 30 FPS thì hạ DPR xuống 1 và tắt bóng. Không tính khoảng nghỉ ngoài thao tác như FPS thấp.
- `domain/view/view-check.ts`: hướng nhìn camera, góc giữa vectơ, góc quỹ đạo và dung sai cấu hình; xử lý ±180°, cực, hướng rỗng, camera trùng đích và số không hợp lệ.
- `scripts/generate-levels.mjs`: nhận cặp `meta.ts` + `scene.tsx`, sinh riêng catalog metadata và bảng import động; kiểm tên thư mục/id, thứ tự và schema. Hooks npm trước dev/build/test/typecheck; không cần sửa đăng ký khi thêm màn.
- [HOW_TO_ADD_LEVEL.md](../HOW_TO_ADD_LEVEL.md): hướng dẫn, ví dụ nhập/kéo/cảm biến và đường dẫn hai ví dụ tự chứa [2d-word](../../examples/levels/2d-word/meta.ts), [3d-view](../../examples/levels/3d-view/meta.ts). Bộ test ví dụ lắp đúng hai file vào catalog thật, build/chạy, rồi dọn thư mục tạm và sinh lại catalog hai màn mẫu.

## Các lệnh nghiệm thu

Môi trường: macOS arm64; Node **22.22.3**, npm **10.9.8**, Next **16.4.6**, React **19.3.1**, R3F **9.8.2**, drei **10.7.9**, Three/@types **0.182.0**, Playwright **1.65.0**.

| Lệnh | Kết quả cuối | Log |
|---|---|---|
| `npm run check` | Exit 0; ESLint không cảnh báo, Prettier, TypeScript đạt | [01-check.txt](E2-BO-MAY-MAN-CHOI.artifacts/01-check.txt) |
| `npm run test` | Exit 0; **20 file, 214 ca đạt** | [02-unit.txt](E2-BO-MAY-MAN-CHOI.artifacts/02-unit.txt) |
| `npm run build` | Exit 0; production build và dựng tĩnh hai màn mẫu đạt | [03-build.txt](E2-BO-MAY-MAN-CHOI.artifacts/03-build.txt) |
| `npm run test:examples` | Exit 0; **9 ca đạt**, build với cả ví dụ chạm chữ và 3D trong catalog thật | [04-examples.txt](E2-BO-MAY-MAN-CHOI.artifacts/04-examples.txt) |
| `npm run test:e2e` | Exit 0; **102 ca đạt**, 20,4 giây; có build production riêng | [05-e2e.txt](E2-BO-MAY-MAN-CHOI.artifacts/05-e2e.txt) |
| `E2E_DEV=1 npm run test:examples` | Exit 0; **9 ca đạt**, kiểm hydration/vòng đời StrictMode | [10-examples-dev.txt](E2-BO-MAY-MAN-CHOI.artifacts/10-examples-dev.txt) |
| `python3 docs/ai-planning/verify_plan.py` | Exit 0; metadata/DAG/hash baseline khớp | [06-verify-plan.txt](E2-BO-MAY-MAN-CHOI.artifacts/06-verify-plan.txt) |

Unit/component kiểm đáp án Việt (alias, NFC/NFD, đ/Đ, dấu câu, giới hạn/rỗng/sai), góc nhìn ở biên dung sai và đầu vào sai; thêm permission theo user activation, từ chối/throw/không dữ liệu, gia tốc/trọng lực/chống lặp, nghiêng tương đối, tap fallback, cleanup, IME, kéo SVG co 2×/thả trượt/hủy, bus chạm chữ và thêm màn qua hai file. Các test vòng chơi/lưu trữ/đo lường cũ vẫn đạt.

Playwright chạy **WebKit iPhone SE 320×568**, **Chromium Pixel 5 393×727**, **Chromium mobile-360 360×640**. Bộ hồi quy 102 ca có 15 ca cố ý vi phạm để kiểm chính các cổng lỗi (`test.fail()`); chúng phải thất bại đúng dự kiến thì suite mới đạt. Bộ ví dụ thêm ba kịch bản × ba cấu hình:

1. Đề chạm được: chữ lặp có mã riêng, sai có phản hồi, chơi lại bằng thanh dưới, chạm đúng thì thắng; kiểm đúng số sự kiện bắt đầu/bỏ cuộc/hoàn thành.
2. WebGL2 thật trong trình duyệt: canvas, bố cục/vùng chạm, reset, xoay bằng nút chạm và thắng theo hướng. Bọc `drawElements` để chứng minh có vẽ khi tương tác và không phát sinh thêm lệnh vẽ lúc đứng yên.
3. Mô phỏng frame chậm bằng giới hạn RAF 60 ms, kéo camera qua lại; xác nhận tự sang chất lượng thấp và kích thước framebuffer về DPR 1. Đây là kiểm hành vi thích ứng, **không phải số đo FPS thiết bị thật**.

Ảnh [iPhone SE](E2-BO-MAY-MAN-CHOI.artifacts/screenshots/iphone-se-3d.png), [Pixel 5](E2-BO-MAY-MAN-CHOI.artifacts/screenshots/pixel-5-3d.png), [360 px](E2-BO-MAY-MAN-CHOI.artifacts/screenshots/mobile-360-3d.png). Đã xem ảnh iPhone SE: khối hộp thật, điều khiển và thanh dưới không tràn ngang; audit DOM ở cả ba cấu hình đạt chữ ≥16 px/vùng chạm ≥44 px.

## Phát hiện và điều chỉnh

- Lượt ví dụ đầu phát hiện có thể chạm đề trước khi cảnh nạp xong và mất thao tác; sửa bằng khóa nút tới `sceneReady`. Lượt cuối giải bằng chữ ngay khi nút sẵn sàng và sau chơi lại đều đạt.
- Three **0.187.0** phát cảnh báo Clock deprecated do R3F **9.8.2** còn khởi tạo `THREE.Clock`, cùng cảnh báo kiểu bóng cũ. Ghim `three` và `@types/three` về **0.182.0**, cập nhật lockfile; giữ nguyên các gói khác. Nguồn: [Three migration 182 → 183](https://github.com/mrdoob/three.js/wiki/Migration-Guide#182--183), [issue R3F #3741](https://github.com/pmndrs/react-three-fiber/issues/3741). Không lọc/che cảnh báo của thư viện trong mã ứng dụng. [Log cài](E2-BO-MAY-MAN-CHOI.artifacts/08-npm-install.txt).
- Không có lỗi JS, lỗi request hoặc cảnh báo ứng dụng ở các lượt cuối. Riêng Chromium headless có thông báo driver `GPU stall due to ReadPixels`; test ví dụ cho phép đúng mẫu này, không nới guard cho lỗi khác. WebKit không cần ngoại lệ driver. Riêng lượt dev, bài mô phỏng FPS thấp đứng lâu nên trình duyệt báo preload CSS chung của Next dev chưa dùng (dev đồng thời tải CSS module riêng); test chỉ cho phép đúng resource hint `src_features_ui_*.css` trên localhost khi `E2E_DEV=1`. Không áp ngoại lệ CSS cho production hoặc lỗi JS/mạng. Log Node có cảnh báo môi trường `NO_COLOR`/`FORCE_COLOR`, không phải console của trang.
- `npm audit --omit=dev --json` exit 0, **0 cảnh báo production**: [09-audit-production.json](E2-BO-MAY-MAN-CHOI.artifacts/09-audit-production.json). Npm audit toàn bộ báo **10 moderate** trong nhánh công cụ ESLint/minimatch đã có; phiên bản nhánh này không đổi. Xem [07-audit.json](E2-BO-MAY-MAN-CHOI.artifacts/07-audit.json); không tự nâng công cụ ngoài epic.
- Sandbox không cho mở cổng 3100 (`listen EPERM`); các lượt trình duyệt cuối chạy với quyền máy chủ local. Lượt đầu kiểm ví dụ còn lỗi TypeScript cấu hình, đã sửa rồi chạy lại; không tính các lượt lỗi là đạt.

Lệnh chạy lại: [reproduce.sh](E2-BO-MAY-MAN-CHOI.artifacts/reproduce.sh); [mã thoát](E2-BO-MAY-MAN-CHOI.artifacts/exit-codes.txt); [SHA-256 mã bàn giao](E2-BO-MAY-MAN-CHOI.artifacts/files.sha256).

## Giới hạn và trạng thái bàn giao

Chưa kiểm trên iPhone/Android thật, chưa xác nhận hộp thoại quyền Safari thật hoặc FPS/GPU trên máy yếu thật; permission/sensor được mô phỏng trong unit test. Chưa chạy 25 màn nội dung thật (repo vẫn chỉ có hai màn mẫu; ví dụ nằm ngoài campaign). Story có AC kiểm thiết bị, ngân sách tải từng màn hoặc 20 vòng đo heap vẫn cần bằng chứng riêng.

Đã cập nhật cả `scrum/HO_SO.md`, `BACKLOG.md`, `SPRINT.md`, `LICH_SU.md`: ghi phạm vi mới, kết quả, quyết định phiên bản, giữ **Chờ duyệt** và không cộng velocity. Không tự commit hoặc đổi task/story baseline thành done.

Commit đề xuất: `feat(engine): add reusable level framework`.
