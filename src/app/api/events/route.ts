import { isAnalyticsEvent } from '@/services/analytics/validate';

const MAX_BYTES = 4096;

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin)
    return new Response(null, { status: 403 });
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return new Response(null, { status: 415 });
  if (!request.body) return new Response(null, { status: 400 });

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let text = '';
  let bytes = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > MAX_BYTES) {
        await reader.cancel();
        return new Response(null, { status: 413 });
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
    const event: unknown = JSON.parse(text);
    if (!isAnalyticsEvent(event)) return new Response(null, { status: 400 });
    // Structured server logs work with a host's existing log retention/export.
    // No raw request, URL, headers, IP or invalid payload is logged.
    console.info(`[analytics] ${JSON.stringify(event)}`);
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  } finally {
    reader.releaseLock();
  }
}
