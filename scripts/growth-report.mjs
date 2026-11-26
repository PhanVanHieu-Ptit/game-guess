import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { pathToFileURL } from 'node:url';

const vietnamDay = (time) =>
  new Date(time + 7 * 60 * 60 * 1000).toISOString().slice(0, 10);
const plusDays = (day, days) =>
  new Date(Date.parse(`${day}T00:00:00Z`) + days * 86_400_000)
    .toISOString()
    .slice(0, 10);
const uniquePlayers = (events) => new Set(events.map((e) => e.installId)).size;

/** Accept raw events, app log lines, or a host's JSON line with a message field. */
export function readEvents(log) {
  const events = new Map();
  for (const line of log.split('\n')) {
    try {
      let value;
      const marker = line.indexOf('[analytics] ');
      if (marker >= 0 && !line.trimStart().startsWith('{'))
        value = JSON.parse(line.slice(marker + '[analytics] '.length));
      else {
        value = JSON.parse(line);
        if (typeof value.message === 'string') {
          const at = value.message.indexOf('[analytics] ');
          if (at < 0) continue;
          value = JSON.parse(value.message.slice(at + '[analytics] '.length));
        }
      }
      if (
        typeof value?.type === 'string' &&
        typeof value.eventId === 'string' &&
        typeof value.installId === 'string' &&
        value.installId !== 'unknown' &&
        Number.isFinite(Date.parse(value.ts))
      )
        events.set(value.eventId, value);
    } catch {
      // Host startup logs and malformed lines are not events.
    }
  }
  return [...events.values()].sort(
    (a, b) => Date.parse(a.ts) - Date.parse(b.ts),
  );
}

export function growthReport(input, { through, excludeSource } = {}) {
  through ??= vietnamDay(Date.now() - 86_400_000);
  let events = input.filter((e) => vietnamDay(Date.parse(e.ts)) <= through);
  const excluded = new Set(
    events
      .filter((e) => e.type === 'page_view' && e.source === excludeSource)
      .map((e) => e.installId),
  );
  events = events.filter((e) => !excluded.has(e.installId));
  const firstSource = new Map();
  for (const event of events) {
    if (event.type === 'page_view' && !firstSource.has(event.installId))
      firstSource.set(event.installId, event.source);
  }
  const starts = events.filter((e) => e.type === 'rush_start');
  const completed = events.filter((e) => e.type === 'rush_complete');
  const startIds = new Set(starts.map((e) => e.runId));
  const matchedCompleted = completed.filter((e) => startIds.has(e.runId));
  const replayed = starts.filter((start) =>
    matchedCompleted.some(
      (end) =>
        end.installId === start.installId &&
        end.sessionId === start.sessionId &&
        end.runId !== start.runId &&
        Date.parse(end.ts) <= Date.parse(start.ts),
    ),
  );
  const firstDay = new Map();
  const daysPlayed = new Map();
  for (const start of starts) {
    const day = vietnamDay(Date.parse(start.ts));
    if (!firstDay.has(start.installId)) firstDay.set(start.installId, day);
    if (!daysPlayed.has(start.installId))
      daysPlayed.set(start.installId, new Set());
    daysPlayed.get(start.installId).add(day);
  }
  const retention = (offset) => {
    let eligible = 0;
    let returned = 0;
    for (const [id, day] of firstDay) {
      const target = plusDays(day, offset);
      if (target > through) continue;
      eligible++;
      if (daysPlayed.get(id).has(target)) returned++;
    }
    return { eligible, returned, rate: eligible ? returned / eligible : null };
  };
  const bySource = {};
  for (const source of [
    'direct',
    'friend',
    'community',
    'short_video',
    'playtest',
    'unknown',
  ]) {
    const sourceEvents = events.filter(
      (e) => (firstSource.get(e.installId) ?? 'unknown') === source,
    );
    if (!sourceEvents.length) continue;
    bySource[source] = {
      visitors: uniquePlayers(sourceEvents),
      players: uniquePlayers(
        sourceEvents.filter((e) => e.type === 'rush_start'),
      ),
    };
  }
  return {
    through,
    events: events.length,
    visitors: uniquePlayers(events),
    players: uniquePlayers(starts),
    completedPlayers: uniquePlayers(matchedCompleted),
    replayedPlayers: uniquePlayers(replayed),
    runsStarted: startIds.size,
    runsCompleted: new Set(matchedCompleted.map((e) => e.runId)).size,
    runsAbandoned: new Set(
      events.filter((e) => e.type === 'rush_abandon').map((e) => e.runId),
    ).size,
    shareIntentPlayers: uniquePlayers(
      events.filter(
        (e) =>
          e.type === 'rush_share' && ['copied', 'shared'].includes(e.outcome),
      ),
    ),
    manualCopyPlayers: uniquePlayers(
      events.filter((e) => e.type === 'rush_share' && e.outcome === 'manual'),
    ),
    challengedPlayers: uniquePlayers(starts.filter((e) => e.challenged)),
    d1: retention(1),
    d7: retention(7),
    bySource,
  };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      through: { type: 'string' },
      'exclude-source': { type: 'string' },
    },
  });
  if (
    positionals.length !== 1 ||
    (values.through &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(values.through) ||
        Number.isNaN(Date.parse(`${values.through}T00:00:00Z`)) ||
        plusDays(values.through, 0) !== values.through))
  ) {
    process.stderr.write(
      'Usage: npm run growth:report -- events.log [--through YYYY-MM-DD] [--exclude-source playtest]\n',
    );
    process.exitCode = 1;
  } else {
    const report = growthReport(
      readEvents(readFileSync(positionals[0], 'utf8')),
      {
        through: values.through,
        excludeSource: values['exclude-source'],
      },
    );
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  }
}
