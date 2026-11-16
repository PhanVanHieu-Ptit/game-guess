# Thêm một màn chơi

Chỉ cần **`src/levels/<id>/meta.ts` + `scene.tsx`**. Không sửa route, sổ màn hoặc khung chơi. Hai ví dụ tự chứa có sẵn: [chạm chữ](../examples/levels/2d-word/) và [góc nhìn 3D](../examples/levels/3d-view/). Đây là ví dụ kỹ thuật, chưa thuộc 25 màn sản phẩm.

## 1. Khai báo `meta.ts`

```ts
import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-cua', // Trùng tên thư mục; chỉ chữ thường, số và gạch ngang.
  ordinal: 3, // Số tiếp theo trong danh sách, liên tục từ 1.
  kind: '2d', // Hoặc '3d', khớp tiền tố id.
  title: 'Càng to càng nhỏ',
  prompt: 'Con gì có càng to, càng nhỏ?',
  thinking: 'wordplay',
  input: 'type',
  difficulty: 1, // 1–5.
  hints: ['Chữ càng là một bộ phận.', 'Con vật này thường đi ngang.', 'Đáp án: con cua.'],
  explanation: 'Con cua có càng to, càng nhỏ. Chữ càng ở đây là tên bộ phận.',
  source: 'folk',
} as const satisfies LevelMeta;
```

Đề/gợi ý tối đa 120 ký tự, giải thích 140, phản hồi sai 60; luôn có đúng ba gợi ý. Màn cảm biến khai báo thêm `sensors.shake.touchFallback` hoặc `sensors.tilt.touchFallback`. Khai báo sai sẽ làm kiểm thử/build thất bại với mã màn và tên trường.

## 2. Viết `scene.tsx`

```tsx
'use client';
import type { SceneProps } from '@/engine/scene';
import { TypedAnswer } from '@/engine/stage2d/scenes/typed-answer';

export default function Scene(props: SceneProps) {
  return <TypedAnswer {...props} accepted={['cua', 'con cua', 'cua biển']} />;
}
```

Cảnh tự vẽ bằng SVG/JSX hoặc hình khối R3F. Gọi `onSolved()` khi giải đúng, `onWrong(code?)` khi sai, `onProgress()` khi có tiến triển. Khung tự đo thời gian lúc tab hiện, đếm gợi ý, lưu kết quả và phát `level_start`, `hint_used`, `level_complete`, `level_abandon`. Chơi lại sẽ dựng mới toàn bộ trạng thái cảnh.

Kiểu `Level` ở `engine/scene.ts` ghép `LevelMeta` với `component: () => Promise<{ default: LevelScene }>`. Bộ nạp tự tạo đối tượng này ở trình duyệt; metadata ở server không nhập cảnh.

## 3. Dùng cơ chế chung

| Nhu cầu | API |
|---|---|
| Chạm chữ trong đề | `word('chữ', 'id')` đánh dấu một chữ; `tappableWords('cả câu')` đánh dấu mọi từ, tự đặt mã riêng cho từ lặp. `usePromptWordTap(({ id, text, index }) => …)` trong cảnh nhận thao tác. |
| Nhập đáp án | `useAnswerInput({ accepted, onSolved, onWrong, onProgress })` trả `inputProps`, `submit`, `verdict`, `message`; hoặc dùng sẵn `TypedAnswer`. Không phân biệt hoa/thường, dấu tiếng Việt, NFC/NFD và khoảng trắng. Rỗng/quá 64 ký tự không tính sai. |
| Lắc | `useShake(onShake, { threshold: 12, cooldownMs: 800 })`. Ngưỡng gia tốc m/s², có chống lặp và loại trọng lực đứng yên. |
| Nghiêng | `useTilt(onTilt, { deadZone: 3, fallback: { x: 30, y: 0 } })`. Góc theo độ, tương đối với tư thế đầu tiên; chọn `fallback` phù hợp với cách giải. |
| Kéo SVG | `useDrag({ svgRef, initialPosition, target, onDrop, onMiss, onProgress })`. Trả `position`, `selected`, `placed`, `dragProps`, `targetProps`; tọa độ theo viewBox, đích là hình chữ nhật. |
| 3D | `Scene3D` từ `engine/stage3d/scene-3d`; truyền `preset` nếu cần đổi giới hạn camera, `onViewChange(view)` để kiểm tra hướng. |

Cảm biến phải được ghép với điều khiển có lời giải thích và nút chạm:

```tsx
const shake = useShake(onSolved);
return <SensorControls sensor={shake} label="Lắc" />;
```

Import từ `@/engine/input/use-shake` và `@/engine/input/sensor-controls`. Quyền chỉ được xin khi chạm **Bật cảm biến**; Safari cần HTTPS (localhost dùng để phát triển). Từ chối, API thiếu, lỗi xin quyền hoặc không có dữ liệu sau 2,5 giây đều có thông báo dùng chạm. Nút thay thế luôn sẵn kể cả khi cảm biến hoạt động. Với nghiêng, thay bằng `useTilt` và nhãn “Nghiêng”; có thể thêm nút gọi `tilt({ x, y })` cho nhiều hướng.

Với kéo, gắn ref lên SVG và hai bộ props lên vật/vùng đích; điểm `position` là tâm vật:

```tsx
const svgRef = useRef<SVGSVGElement>(null);
const drag = useDrag({ svgRef, initialPosition: { x: 30, y: 50 },
  target: { x: 130, y: 20, width: 60, height: 60 }, onDrop: onSolved });
return <svg ref={svgRef} viewBox="0 0 240 120" style={{ width: '100%' }}>
  <rect {...drag.targetProps} aria-label="Đích" x={130} y={20} width={60} height={60} fill="#e3f4f2" />
  <circle {...drag.dragProps} aria-label="Vật cần kéo" cx={drag.position.x} cy={drag.position.y} r={25} fill="#c62f3b" />
</svg>;
```

Người chơi có thể **chạm vật rồi chạm đích** thay cho kéo; Enter/Space cũng dùng được. Đặt vật/vùng đích đủ lớn để hình chiếu đạt 44×44 px ở 360 px; thêm hình báo đang chọn bằng `selected`. Pointer cancel/mất capture trả vật về vị trí đầu.

`Scene3D` có ánh sáng, nút về góc ban đầu, nút xoay/thu phóng bằng chạm và giới hạn góc/khoảng cách. Canvas tải lười với `ssr: false`, `frameloop="demand"`; dừng vẽ khi đứng yên. Khi 20 khoảng frame đang tương tác liên tiếp trung bình dưới 30 FPS, DPR giảm từ tối đa 1,75 xuống 1 và tắt bóng; khoảng nghỉ không bị tính là frame chậm. Mesh bóng dùng `castShadow`/`receiveShadow`. Không đặt vòng `requestAnimationFrame` riêng; khi tự sửa đối tượng Three bằng ref, gọi R3F `invalidate()`.

Kiểm tra thắng bằng `isLookingAlong(view, [0, 0, -1], 6)` (hướng **camera nhìn tới**, sai số độ) hoặc `isOrbitNear(view, { azimuthDeg: 40, polarDeg: 75 }, { azimuthDeg: 5, polarDeg: 4 })`. Camera trùng đích, hướng rỗng, tọa độ hoặc cấu hình sai không được coi là đúng. Xem [ví dụ 3D](../examples/levels/3d-view/scene.tsx).

## 4. Chạy và kiểm tra

- `npm run dev` tự sinh catalog trước khi chạy. Nếu vừa tạo thư mục màn khi dev đang chạy, khởi động lại dev để nhận màn; sửa hai file đã có dùng HMR bình thường.
- `npm run build`, `npm run typecheck`, `npm run test` cũng tự sinh catalog. Có thể chạy riêng `npm run levels:generate`. Không sửa hai file `*.generated.ts`.
- Chạy `npm run check`, `npm run test`, `npm run test:e2e`; thêm kịch bản giải tương ứng khi thêm nội dung sản phẩm. Kiểm chữ ≥16 px, vùng chạm ≥44 px, không tràn ở 360 px và giải được bằng chạm.
- `npm run test:examples` tạm lắp hai ví dụ vào catalog thật, build, kiểm chạm chữ/3D bằng Playwright rồi tự xóa bản tạm. Chạy riêng, không đồng thời với dev/build khác; nếu đã có thư mục trùng tên thì lệnh dừng và không ghi đè.

Màn không import `features/`, store hoặc analytics; dùng duy nhất các callback của `SceneProps`. Bổ sung nội dung sản phẩm vào tài liệu theo quy ước dự án; không tự sửa GDD khi chưa được duyệt.
