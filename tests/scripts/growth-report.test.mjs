import { test } from 'node:test';
import assert from 'node:assert/strict';
import { growthReport, readEvents } from '../../scripts/growth-report.mjs';

let sequence = 0;
const event = (type, player, day, data = {}) => ({
  type,
  eventId: String(++sequence),
  installId: player,
  sessionId: `${player}:${day}`,
  ts: `${day}T05:00:00.000Z`,
  ...data,
});

test('deduplicates server events and reads host JSON logs', () => {
  const one = event('rush_start', 'one', '2026-11-25', { runId: 'r1' });
  const two = event('rush_complete', 'one', '2026-11-25', { runId: 'r1' });
  const log = `startup\n[analytics] ${JSON.stringify(one)}\n${JSON.stringify(one)}\n${JSON.stringify({ message: `[analytics] ${JSON.stringify(two)}` })}`;
  assert.equal(readEvents(log).length, 2);
});

test('excludes unfinished retention cohorts and counts playing rather than visiting', () => {
  const events = [
    event('rush_start', 'one', '2026-11-25', { runId: 'r1' }),
    event('rush_start', 'one', '2026-11-26', { runId: 'r2' }),
    event('rush_start', 'two', '2026-11-26', { runId: 'r3' }),
    event('rush_start', 'three', '2026-11-25', { runId: 'r4' }),
    event('page_view', 'three', '2026-11-26', { source: 'direct' }),
  ];
  const report = growthReport(events, { through: '2026-11-26' });
  assert.deepEqual(report.d1, { eligible: 2, returned: 1, rate: 0.5 });
  assert.deepEqual(report.d7, { eligible: 0, returned: 0, rate: null });
});

test('matches completed runs, distinguishes replay from next-day return and excludes playtest traffic', () => {
  const events = [
    event('page_view', 'one', '2026-11-25', { source: 'community' }),
    event('rush_start', 'one', '2026-11-25', { runId: 'r1' }),
    event('rush_complete', 'one', '2026-11-25', { runId: 'r1' }),
    event('rush_start', 'one', '2026-11-25', { runId: 'r2' }),
    event('rush_share', 'one', '2026-11-25', { outcome: 'cancelled' }),
    event('rush_start', 'two', '2026-11-25', { runId: 'r3' }),
    event('rush_complete', 'two', '2026-11-25', { runId: 'r3' }),
    event('rush_start', 'two', '2026-11-26', { runId: 'r4' }),
    event('page_view', 'tester', '2026-11-25', { source: 'playtest' }),
    event('rush_start', 'tester', '2026-11-25', { runId: 'test1' }),
  ];
  const report = growthReport(events, {
    through: '2026-11-26',
    excludeSource: 'playtest',
  });
  assert.equal(report.visitors, 2);
  assert.equal(report.replayedPlayers, 1);
  assert.equal(report.shareIntentPlayers, 0);
  assert.deepEqual(report.bySource.community, { visitors: 1, players: 1 });
});

test('uses Vietnam midnight for D1 and D7', () => {
  const events = [
    event('rush_start', 'one', '2026-11-25', {
      runId: 'r1',
      ts: '2026-11-25T16:59:59.000Z',
    }),
    event('rush_start', 'one', '2026-11-25', {
      runId: 'r2',
      ts: '2026-11-25T17:00:00.000Z',
    }),
    event('rush_start', 'one', '2026-12-02', { runId: 'r3' }),
  ];
  const report = growthReport(events, { through: '2026-12-02' });
  assert.deepEqual(report.d1, { eligible: 1, returned: 1, rate: 1 });
  assert.deepEqual(report.d7, { eligible: 1, returned: 1, rate: 1 });
});
