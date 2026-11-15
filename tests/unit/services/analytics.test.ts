import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { detectDeviceKind } from '@/services/analytics/device';
import type { AnalyticsEvent } from '@/services/analytics/events';
import { generateId } from '@/services/analytics/ids';
import {
  consoleSink,
  noopSink,
  type AnalyticsSink,
} from '@/services/analytics/sinks';
import { setContextProvider, setSink, track } from '@/services/analytics/track';
import { setClock } from '@/services/clock/clock';

const UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

function recordingSink(): { sink: AnalyticsSink; events: AnalyticsEvent[] } {
  const events: AnalyticsEvent[] = [];
  return { sink: { send: (event) => void events.push(event) }, events };
}

describe('track', () => {
  beforeEach(() => {
    setClock(() => Date.parse('2026-11-14T03:04:05.000Z'));
    setContextProvider(() => ({
      installId: 'may-cua-toi-0001',
      quality: 'low',
    }));
  });
  afterEach(() => {
    setSink(null);
    setClock(null);
  });

  it('điền đủ trường chung và giữ nguyên dữ liệu riêng của sự kiện', () => {
    const { sink, events } = recordingSink();
    setSink(sink);

    track('level_start', {
      levelId: '2d-02',
      mode: 'campaign',
      attemptNo: 3,
      restart: true,
    });

    expect(events).toHaveLength(1);
    const event = events[0];
    expect(event).toMatchObject({
      type: 'level_start',
      levelId: '2d-02',
      mode: 'campaign',
      attemptNo: 3,
      restart: true,
      installId: 'may-cua-toi-0001',
      ts: '2026-11-14T03:04:05.000Z',
      appVersion: expect.any(String),
    });
    expect(event.eventId).toMatch(UUID_V4);
    expect(event.sessionId).toMatch(UUID_V4);
    expect(event.device).toMatchObject({
      quality: 'low',
      kind: expect.any(String),
      w: expect.any(Number),
    });
  });

  it('mỗi sự kiện một eventId khác nhau, cùng một sessionId trong một lần mở trang', () => {
    const { sink, events } = recordingSink();
    setSink(sink);
    track('hint_used', {
      levelId: '2d-02',
      mode: 'campaign',
      tier: 1,
      elapsedMs: 5000,
    });
    track('hint_used', {
      levelId: '2d-02',
      mode: 'campaign',
      tier: 2,
      elapsedMs: 9000,
    });
    expect(events[0].eventId).not.toBe(events[1].eventId);
    expect(events[0].sessionId).toBe(events[1].sessionId);
  });

  it('không ghi trường định danh nào ngoài mã ẩn danh', () => {
    const { sink, events } = recordingSink();
    setSink(sink);
    track('level_complete', {
      levelId: '2d-01',
      mode: 'campaign',
      durationMs: 1000,
      hintsUsed: 0,
      result: 'solved',
      wrongCount: 0,
    });
    const keys = Object.keys(events[0]).sort();
    expect(keys).toEqual(
      [
        'appVersion',
        'device',
        'durationMs',
        'eventId',
        'hintsUsed',
        'installId',
        'levelId',
        'mode',
        'result',
        'sessionId',
        'ts',
        'type',
        'wrongCount',
      ].sort(),
    );
  });

  it('sink ném lỗi: track nuốt lỗi, không ném ra ngoài', () => {
    setSink({
      send() {
        throw new Error('dịch vụ đo lường sập');
      },
    });
    expect(() =>
      track('level_abandon', {
        levelId: '2d-01',
        mode: 'campaign',
        durationMs: 1,
        hintsUsed: 0,
        wrongCount: 0,
      }),
    ).not.toThrow();
  });

  it('nhà cung cấp ngữ cảnh ném lỗi: track vẫn không ném lỗi', () => {
    const { sink, events } = recordingSink();
    setSink(sink);
    setContextProvider(() => {
      throw new Error('store chưa sẵn sàng');
    });
    expect(() =>
      track('level_abandon', {
        levelId: '2d-01',
        mode: 'campaign',
        durationMs: 1,
        hintsUsed: 0,
        wrongCount: 0,
      }),
    ).not.toThrow();
    expect(events).toHaveLength(0);
  });

  it('thay được sink bằng dịch vụ khác mà mã gọi track không đổi', () => {
    const first = recordingSink();
    const second = recordingSink();
    setSink(first.sink);
    track('hint_used', {
      levelId: '2d-01',
      mode: 'daily',
      tier: 3,
      elapsedMs: 1,
    });
    setSink(second.sink);
    track('hint_used', {
      levelId: '2d-01',
      mode: 'daily',
      tier: 3,
      elapsedMs: 1,
    });
    expect(first.events).toHaveLength(1);
    expect(second.events).toHaveLength(1);
  });
});

describe('consoleSink / noopSink', () => {
  it('consoleSink in một dòng JSON có tiền tố [track] bằng console.info (không phải console.error)', () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleSink.send({
      type: 'hint_used',
      tier: 1,
    } as unknown as AnalyticsEvent);
    expect(info).toHaveBeenCalledTimes(1);
    expect(info.mock.calls[0][0]).toBe('[track] {"type":"hint_used","tier":1}');
    expect(error).not.toHaveBeenCalled();
  });

  it('noopSink không in gì', () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    noopSink.send({ type: 'hint_used' } as unknown as AnalyticsEvent);
    expect(info).not.toHaveBeenCalled();
  });
});

describe('generateId', () => {
  it('trả về UUID v4 hợp lệ và không trùng', () => {
    const ids = new Set(Array.from({ length: 50 }, () => generateId()));
    expect(ids.size).toBe(50);
    ids.forEach((id) => expect(id).toMatch(UUID_V4));
  });

  it('vẫn sinh được mã khi không có crypto.randomUUID (điện thoại mở qua http, không phải HTTPS)', () => {
    vi.stubGlobal('crypto', {
      getRandomValues: (bytes: Uint8Array) => bytes.fill(171),
    });
    expect(generateId()).toMatch(UUID_V4);
    vi.unstubAllGlobals();
  });

  it('vẫn sinh được mã khi không có crypto', () => {
    vi.stubGlobal('crypto', undefined);
    expect(generateId()).toMatch(UUID_V4);
    vi.unstubAllGlobals();
  });
});

describe('detectDeviceKind', () => {
  it.each([
    ['Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 0, 'ios'],
    ['Mozilla/5.0 (Linux; Android 14; Pixel 7) Chrome/120', 5, 'android'],
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120', 0, 'desktop'],
    [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605',
      0,
      'desktop',
    ],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605', 5, 'ios'], // iPadOS xưng là Mac
    ['Mozilla/5.0 (X11; Linux x86_64) Firefox/120', 0, 'desktop'],
    ['trình duyệt lạ', 0, 'other'],
  ])('%s (điểm chạm %i) → %s', (userAgent, touchPoints, expected) => {
    expect(detectDeviceKind(userAgent, touchPoints)).toBe(expected);
  });
});
