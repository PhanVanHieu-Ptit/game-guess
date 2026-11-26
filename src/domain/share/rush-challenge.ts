import { dailySeed } from '@/domain/rush/puzzles';

/** Keep v1 links stable if the puzzle generator changes in a future version. */
export interface RushChallenge {
  version: 1;
  seed: number;
  score: number;
  day?: string;
}

export const MAX_RUSH_SCORE = 14_400;

function validDay(day: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(day) &&
    !Number.isNaN(Date.parse(`${day}T00:00:00Z`)) &&
    new Date(`${day}T00:00:00Z`).toISOString().slice(0, 10) === day
  );
}

export function parseRushChallenge(
  search: string,
  daily: boolean,
): RushChallenge | null {
  const params = new URLSearchParams(search);
  if (
    ['v', 'seed', 'score', 'day'].some((key) => params.getAll(key).length > 1)
  )
    return null;
  if (params.get('v') !== '1') return null;
  const seedText = params.get('seed') ?? '';
  const scoreText = params.get('score') ?? '';
  if (!/^\d{1,10}$/.test(seedText) || !/^\d{1,5}$/.test(scoreText)) return null;
  const seed = Number(seedText);
  const score = Number(scoreText);
  if (seed > 0xffff_ffff || score > MAX_RUSH_SCORE) return null;
  const day = params.get('day');
  if (daily) {
    if (!day || !validDay(day) || dailySeed(day) !== seed) return null;
    return { version: 1, seed, score, day };
  }
  if (day !== null) return null;
  return { version: 1, seed, score };
}

export function hasChallengeParams(search: string): boolean {
  const params = new URLSearchParams(search);
  return ['v', 'seed', 'score', 'day'].some((key) => params.has(key));
}

export function rushChallengeUrl(origin: string, challenge: RushChallenge) {
  const url = new URL(challenge.day ? '/daily' : '/rush', origin);
  url.searchParams.set('v', String(challenge.version));
  url.searchParams.set('seed', String(challenge.seed));
  url.searchParams.set('score', String(challenge.score));
  if (challenge.day) url.searchParams.set('day', challenge.day);
  url.searchParams.set('src', 'friend');
  return url.toString();
}
