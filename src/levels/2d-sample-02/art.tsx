// Hình vẽ của màn mẫu: tờ lịch ghi số 28 (toạ độ logic 360×240).

export function Art() {
  return (
    <>
      <rect x="0" y="0" width="360" height="240" fill="#e3f4f2" />
      <rect
        x="110"
        y="22"
        width="140"
        height="196"
        rx="18"
        fill="#ffffff"
        stroke="#231f3f"
        strokeWidth="5"
      />
      <path
        d="M110 40a18 18 0 0 1 18 -18h104a18 18 0 0 1 18 18v38H110z"
        fill="#c62f3b"
        stroke="#231f3f"
        strokeWidth="5"
      />
      <circle
        cx="146"
        cy="22"
        r="8"
        fill="#ffffff"
        stroke="#231f3f"
        strokeWidth="4"
      />
      <circle
        cx="214"
        cy="22"
        r="8"
        fill="#ffffff"
        stroke="#231f3f"
        strokeWidth="4"
      />
      <text
        x="180"
        y="176"
        textAnchor="middle"
        fontSize="78"
        fontWeight="800"
        fill="#231f3f"
        fontFamily="system-ui, sans-serif"
      >
        28
      </text>
    </>
  );
}
