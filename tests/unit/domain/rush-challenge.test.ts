import { describe, expect, it } from 'vitest';
import { createRushDeck, dailySeed } from '@/domain/rush/puzzles';
import {
  parseRushChallenge,
  rushChallengeUrl,
} from '@/domain/share/rush-challenge';

describe('versioned rush challenges', () => {
  it('recreates every question and option in a shared random run', () => {
    const url = new URL(
      rushChallengeUrl('https://latleo.example', {
        version: 1,
        seed: 0xffff_ffff,
        score: 875,
      }),
    );
    const challenge = parseRushChallenge(url.search, false)!;
    expect(url.pathname).toBe('/rush');
    expect(url.searchParams.get('src')).toBe('friend');
    expect(challenge.score).toBe(875);
    expect(createRushDeck(challenge.seed)).toEqual(createRushDeck(0xffff_ffff));
  });

  it('keeps an archived daily deck after midnight and strips unrelated query data', () => {
    const day = '2026-11-25';
    const url = new URL(
      rushChallengeUrl('https://latleo.example/?email=private', {
        version: 1,
        seed: dailySeed(day),
        score: 950,
        day,
      }),
    );
    expect(url.pathname).toBe('/daily');
    expect(url.searchParams.has('email')).toBe(false);
    expect(parseRushChallenge(url.search, true)).toEqual({
      version: 1,
      seed: dailySeed(day),
      score: 950,
      day,
    });
  });

  it.each([
    '',
    'v=2&seed=42&score=100',
    'v=1&seed=-1&score=100',
    'v=1&seed=4294967296&score=100',
    'v=1&seed=1.5&score=100',
    'v=1&seed=42&score=14401',
    'v=1&seed=42&score=NaN',
    'v=1&seed=42&score=',
    'v=1&seed=42&score=100&seed=43',
    'v=1&seed=42&score=100&day=2026-11-25',
  ])('rejects malformed or incompatible random link: %s', (search) => {
    expect(parseRushChallenge(search, false)).toBeNull();
  });

  it('rejects an impossible date or a daily seed mismatch', () => {
    for (const day of ['2026-02-30', '2026-13-01', 'invalid']) {
      expect(
        parseRushChallenge(
          `v=1&seed=${dailySeed(day)}&score=0&day=${day}`,
          true,
        ),
      ).toBeNull();
    }
    expect(
      parseRushChallenge('v=1&seed=42&score=0&day=2026-11-25', true),
    ).toBeNull();
    expect(parseRushChallenge('v=1&seed=0&score=0', false)).toEqual({
      version: 1,
      seed: 0,
      score: 0,
    });
  });
});
