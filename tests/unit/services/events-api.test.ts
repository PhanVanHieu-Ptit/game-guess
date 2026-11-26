import { afterEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/events/route';
import { httpSink } from '@/services/analytics/sinks';
import { isAnalyticsEvent } from '@/services/analytics/validate';
import type { AnalyticsEvent } from '@/services/analytics/events';

const event = {
  type: 'rush_start',
  eventId: '11111111-1111-4111-8111-111111111111',
  installId: '22222222-2222-4222-8222-222222222222',
  sessionId: '33333333-3333-4333-8333-333333333333',
  ts: '2026-11-26T05:00:00.000Z',
  appVersion: '0.1.0',
  device: { kind: 'ios', w: 320, h: 568, quality: 'medium' },
  runId: '44444444-4444-4444-8444-444444444444',
  mode: 'rush',
  seed: 42,
  day: '',
  attempt: 1,
  challenged: true,
} satisfies AnalyticsEvent;

const request = (body: unknown, headers: Record<string, string> = {}) =>
  new Request('https://latleo.example/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://latleo.example',
      ...headers,
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

afterEach(() => vi.unstubAllGlobals());

describe('anonymous analytics receiver', () => {
  it('accepts an event and writes one structured server log', async () => {
    const log = vi.spyOn(console, 'info').mockImplementation(() => {});
    expect((await POST(request(event))).status).toBe(204);
    expect(log).toHaveBeenCalledExactlyOnceWith(
      `[analytics] ${JSON.stringify(event)}`,
    );
  });

  it('does not log arbitrary fields, private data, unknown types or invalid IDs', async () => {
    const log = vi.spyOn(console, 'info').mockImplementation(() => {});
    for (const body of [
      { ...event, email: 'private@example.com' },
      { ...event, device: { ...event.device, ip: '127.0.0.1' } },
      { ...event, type: 'constructor' },
      { ...event, seed: -1 },
      { ...event, installId: 'unknown' },
      '{invalid json',
    ])
      expect((await POST(request(body))).status).toBe(400);
    expect(log).not.toHaveBeenCalled();
  });

  it('rejects other origins, wrong content types and oversized bodies without content-length', async () => {
    expect(
      (await POST(request(event, { Origin: 'https://other.example' }))).status,
    ).toBe(403);
    expect(
      (await POST(request(event, { 'Content-Type': 'text/plain' }))).status,
    ).toBe(415);
    expect((await POST(request('x'.repeat(4097)))).status).toBe(413);
  });

  it('validates terminal and sharing events with bounded scores', () => {
    expect(
      isAnalyticsEvent({
        ...event,
        type: 'rush_complete',
        score: 950,
        solved: 6,
        bestCombo: 6,
        durationMs: 60000,
        reason: 'timeout',
      }),
    ).toBe(true);
    expect(
      isAnalyticsEvent({
        ...event,
        type: 'rush_share',
        score: 950,
        outcome: 'manual',
      }),
    ).toBe(true);
    expect(
      isAnalyticsEvent({
        ...event,
        type: 'rush_share',
        score: Infinity,
        outcome: 'copied',
      }),
    ).toBe(false);
  });
});

describe('analytics transport', () => {
  it('uses beacon for events that must survive navigation', () => {
    const beacon = vi.fn(() => true);
    const fetchMock = vi.fn();
    vi.stubGlobal('navigator', { sendBeacon: beacon });
    vi.stubGlobal('fetch', fetchMock);
    httpSink.send(event);
    expect(beacon).toHaveBeenCalledWith('/api/events', expect.any(Blob));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('falls back to keepalive fetch and swallows offline failures', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('offline'));
    vi.stubGlobal('navigator', { sendBeacon: () => false });
    vi.stubGlobal('fetch', fetchMock);
    expect(() => httpSink.send(event)).not.toThrow();
    await Promise.resolve();
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/events',
      expect.objectContaining({ keepalive: true, credentials: 'omit' }),
    );
  });
});
