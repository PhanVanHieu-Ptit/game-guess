/**
 * Sinh một mã UUID v4. `crypto.randomUUID` chỉ có trong ngữ cảnh an toàn (HTTPS hoặc localhost), nên khi thử game
 * trên điện thoại qua địa chỉ mạng nội bộ `http://…` nó không tồn tại; khi đó dùng `getRandomValues`
 * (có ở mọi ngữ cảnh), và cuối cùng mới tới `Math.random`.
 */
export function generateId(): string {
  const cryptoApi = globalThis.crypto as Crypto | undefined;
  if (cryptoApi && typeof cryptoApi.randomUUID === 'function')
    return cryptoApi.randomUUID();

  const bytes = new Uint8Array(16);
  if (cryptoApi && typeof cryptoApi.getRandomValues === 'function') {
    cryptoApi.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1)
      bytes[i] = Math.floor(Math.random() * 256);
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // phiên bản 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // biến thể RFC 4122

  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0'));
  return [
    hex.slice(0, 4),
    hex.slice(4, 6),
    hex.slice(6, 8),
    hex.slice(8, 10),
    hex.slice(10, 16),
  ]
    .map((part) => part.join(''))
    .join('-');
}
