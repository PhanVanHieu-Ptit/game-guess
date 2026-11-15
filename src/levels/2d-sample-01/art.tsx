// Hình vẽ của màn mẫu: ba quả táo trên bàn (toạ độ logic 360×240).

const APPLES = [
  { x: 100, y: 128 },
  { x: 180, y: 128 },
  { x: 260, y: 128 },
] as const;

export function Art() {
  return (
    <>
      <rect x="0" y="0" width="360" height="240" fill="#fff1d0" />
      <rect x="40" y="166" width="280" height="22" rx="7" fill="#b8793a" />
      <rect x="62" y="188" width="16" height="44" rx="4" fill="#8f5a24" />
      <rect x="282" y="188" width="16" height="44" rx="4" fill="#8f5a24" />
      {APPLES.map(({ x, y }) => (
        <g key={x}>
          <circle
            cx={x}
            cy={y}
            r="36"
            fill="#c62f3b"
            stroke="#231f3f"
            strokeWidth="4"
          />
          <path
            d={`M${x} ${y - 34} q2 -14 11 -20`}
            fill="none"
            stroke="#231f3f"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <ellipse
            cx={x + 15}
            cy={y - 45}
            rx="13"
            ry="6.5"
            transform={`rotate(-25 ${x + 15} ${y - 45})`}
            fill="#2f9e5b"
            stroke="#231f3f"
            strokeWidth="3"
          />
          <ellipse
            cx={x - 13}
            cy={y - 10}
            rx="7"
            ry="12"
            transform={`rotate(20 ${x - 13} ${y - 10})`}
            fill="#ffffff"
            opacity="0.35"
          />
        </g>
      ))}
    </>
  );
}
