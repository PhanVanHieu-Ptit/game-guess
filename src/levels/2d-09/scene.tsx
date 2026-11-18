'use client';

import { useState } from 'react';
import type { SceneProps } from '@/engine/scene';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';

export default function Scene({ onSolved, onWrong }: SceneProps) {
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const [filled, setFilled] = useState<Record<number, boolean>>({});

  const handleFill = (q: number, code: string) => {
    setFilled((prev) => ({ ...prev, [q]: !prev[q] }));
    wrong(code);
  };

  const submit = () => {
    const hasFilled = Object.values(filled).some(Boolean);
    if (hasFilled) {
      setFilled({});
      wrong('redundant');
    } else {
      onSolved();
    }
  };

  return (
    <div className={styles.scene}>
      <PuzzleArt
        label="Tờ bài kiểm tra 5 phút có 7 câu hỏi"
        height={400}
        reaction={reaction}
      >
        {/* Nền bàn gỗ */}
        <path d="M0 0h360v400H0z" fill="#f0e6d2" stroke="none" />

        {/* Tờ giấy thi trắng ngà */}
        <rect
          x={15}
          y={10}
          width={330}
          height={380}
          rx={12}
          fill="#fffdf8"
          stroke="#231f3f"
          strokeWidth={3}
        />

        {/* Tiêu đề bài kiểm tra */}
        <text
          x={180}
          y={35}
          textAnchor="middle"
          fontSize={15}
          fontWeight={900}
          fill="#ef6b68"
          stroke="none"
          letterSpacing="1"
        >
          BÀI KIỂM TRA 5 PHÚT
        </text>
        <line
          x1={30}
          y1={44}
          x2={330}
          y2={44}
          stroke="#e5dec9"
          strokeWidth={1.5}
        />

        {/* Câu 1: Họ tên */}
        <text
          x={30}
          y={66}
          fontSize={12}
          fontWeight={700}
          fill="#231f3f"
          stroke="none"
        >
          1. Ghi họ và tên của bạn:
        </text>
        <ArtButton
          label="Điền họ tên"
          x={30}
          y={74}
          width={300}
          height={56}
          onPress={() => handleFill(1, 'name')}
        >
          <rect
            x={30}
            y={74}
            width={300}
            height={56}
            rx={8}
            fill={filled[1] ? '#e8f5e9' : '#f7f4ea'}
            stroke="#c8c0a7"
            strokeWidth={1.5}
          />
          <text
            x={45}
            y={108}
            fontSize={14}
            fill={filled[1] ? '#2e7d32' : '#8c8266'}
            fontWeight={600}
            stroke="none"
          >
            {filled[1] ? 'Nguyễn Văn A ✓' : '[Chạm vào đây để điền tên]'}
          </text>
        </ArtButton>

        {/* Câu 2: Tính 24 x 17 */}
        <text
          x={30}
          y={154}
          fontSize={12}
          fontWeight={700}
          fill="#231f3f"
          stroke="none"
        >
          2. Tính nhẩm: 24 × 17 =
        </text>
        <ArtButton
          label="Tính câu 2"
          x={30}
          y={162}
          width={300}
          height={56}
          onPress={() => handleFill(2, 'filled')}
        >
          <rect
            x={30}
            y={162}
            width={300}
            height={56}
            rx={8}
            fill={filled[2] ? '#e8f5e9' : '#f7f4ea'}
            stroke="#c8c0a7"
            strokeWidth={1.5}
          />
          <text
            x={45}
            y={196}
            fontSize={14}
            fill={filled[2] ? '#2e7d32' : '#8c8266'}
            fontWeight={600}
            stroke="none"
          >
            {filled[2] ? '408 ✓' : '[Chạm vào đây để tính]'}
          </text>
        </ArtButton>

        {/* Các câu 3, 4, 5, 6 in trên tờ đề */}
        <g fontSize={11} fill="#53415b" stroke="none">
          <text x={30} y={235}>
            3. Vẽ một ngôi sao năm cánh &nbsp; 4. Đếm từ 1 tới 20
          </text>
          <text x={30} y={252}>
            5. Kể tên ba con vật
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6. Khoanh
            tròn chữ A
          </text>
        </g>

        {/* Câu 7: Đọc kỹ dòng này */}
        <rect
          x={25}
          y={265}
          width={310}
          height={52}
          rx={8}
          fill="#fffae6"
          stroke="#ffda72"
          strokeWidth={2}
        />
        <text
          x={35}
          y={285}
          fontSize={11.5}
          fontWeight={800}
          fill="#b25e00"
          stroke="none"
        >
          7. Đã đọc đến đây thì bỏ qua các câu trên,
        </text>
        <text
          x={50}
          y={305}
          fontSize={11.5}
          fontWeight={800}
          fill="#b25e00"
          stroke="none"
        >
          chỉ cần chạm Nộp bài.
        </text>

        {/* Nút Nộp bài */}
        <ArtButton
          label="Nộp bài"
          x={90}
          y={326}
          width={180}
          height={56}
          onPress={submit}
        >
          <rect
            x={90}
            y={326}
            width={180}
            height={56}
            rx={14}
            fill="#73c892"
            stroke="#231f3f"
            strokeWidth={3}
          />
          <text
            x={180}
            y={360}
            textAnchor="middle"
            fontSize={16}
            fontWeight={900}
            fill="#ffffff"
            stroke="#231f3f"
            strokeWidth={1}
            letterSpacing="1"
          >
            NỘP BÀI
          </text>
        </ArtButton>
      </PuzzleArt>

      <p className={styles.note} role="status">
        Đọc thật kỹ tờ đề từ trên xuống dưới trước khi làm nhé!
      </p>
    </div>
  );
}
