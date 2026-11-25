import { describe, expect, it } from 'vitest';
import { createRushDeck, dailySeed, vietnamDay } from '@/domain/rush/puzzles';
import {
  initialRushState,
  rushReducer,
  type RushState,
} from '@/domain/rush/run';

const start = (seed = 42) =>
  rushReducer(initialRushState(), {
    type: 'start',
    now: 1000,
    seed,
    previousBest: 250,
    recordKey: 'free',
  });
const solve = (state: RushState) =>
  state.deck[state.index].answer.reduce(
    (s, id) => rushReducer(s, { type: 'answer', id, now: 2000 }),
    state,
  );
const next = (state: RushState) =>
  rushReducer(state, { type: 'next', now: 3000 });

describe('rush puzzle generation', () => {
  it('daily decks are deterministic, new days and seeds change the deck', () => {
    const seed = dailySeed('2026-11-25');
    expect(createRushDeck(seed)).toEqual(createRushDeck(seed));
    expect(createRushDeck(seed)).not.toEqual(
      createRushDeck(dailySeed('2026-11-26')),
    );
    expect(createRushDeck(1)).not.toEqual(createRushDeck(2));
  });

  it('changes the daily challenge at midnight in Vietnam', () => {
    expect(vietnamDay(Date.parse('2026-11-25T16:59:59.999Z'))).toBe(
      '2026-11-25',
    );
    expect(vietnamDay(Date.parse('2026-11-25T17:00:00.000Z'))).toBe(
      '2026-11-26',
    );
  });

  it('has unique options, valid answers, six mechanics every round, and no adjacent repeats', () => {
    for (let seed = 0; seed < 100; seed++) {
      const deck = createRushDeck(seed);
      expect(deck).toHaveLength(72);
      for (let i = 0; i < deck.length; i++) {
        const puzzle = deck[i];
        const ids = puzzle.options.map((option) => option.id);
        expect(new Set(ids).size).toBe(ids.length);
        expect(puzzle.answer.every((answer) => ids.includes(answer))).toBe(
          true,
        );
        if (i > 0) expect(puzzle.family).not.toBe(deck[i - 1].family);
        if (i % 6 === 0)
          expect(new Set(deck.slice(i, i + 6).map((p) => p.family)).size).toBe(
            6,
          );
        if (puzzle.family === 'count') {
          const target = puzzle.prompt.match(/\p{Extended_Pictographic}/u)![0];
          expect(
            puzzle.tokens!.filter((token) => token === target),
          ).toHaveLength(Number(puzzle.answer[0]));
        }
        if (puzzle.family === 'size') {
          const values = ids.map(Number);
          expect(Number(puzzle.answer[0])).toBe(
            puzzle.prompt.includes('lớn')
              ? Math.max(...values)
              : Math.min(...values),
          );
        }
        if (puzzle.family === 'color') {
          expect(
            puzzle.options.find((option) => option.id === puzzle.answer[0])
              ?.label,
          ).not.toBe(puzzle.answer[0]);
        }
        if (puzzle.family === 'price') {
          const prices = [...puzzle.prompt.matchAll(/(\d+)\.000đ/g)].map(
            (match) => Number(match[1]) * 1000,
          );
          expect(Number(puzzle.answer[0])).toBe((prices[0] - prices[1]) / 2);
        }
      }
    }
  });
});

describe('rush scoring and lifecycle', () => {
  it('rewards a growing combo, caps points at 200, ignores repeated submissions', () => {
    let state = start();
    for (const points of [100, 125, 150, 175, 200, 200]) {
      const before = state.score;
      state = solve(state);
      expect(state.score - before).toBe(points);
      expect(state.phase).toBe('feedback');
      expect(
        rushReducer(state, {
          type: 'answer',
          id: state.deck[state.index].answer[0],
          now: 2001,
        }),
      ).toBe(state);
      state = next(state);
    }
    expect(state.bestCombo).toBe(6);
    expect(state.score).toBe(950);
  });

  it('requires the full sequence and ignores a duplicate or unknown target', () => {
    const base = start();
    const index = base.deck.findIndex((p) => p.family === 'sequence');
    let state = { ...base, index };
    const answers = state.deck[index].answer;
    state = rushReducer(state, { type: 'answer', id: answers[0], now: 2000 });
    expect(state.phase).toBe('playing');
    expect(state.score).toBe(0);
    expect(
      rushReducer(state, { type: 'answer', id: answers[0], now: 2001 }),
    ).toBe(state);
    expect(
      rushReducer(state, { type: 'answer', id: 'unknown', now: 2001 }),
    ).toBe(state);
    for (const id of answers.slice(1))
      state = rushReducer(state, { type: 'answer', id, now: 2002 });
    expect(state.solved).toBe(1);
  });

  it('a wrong answer resets the combo and the third mistake finishes the run', () => {
    let state = next(solve(start()));
    for (let i = 0; i < 3; i++) {
      const wrong = state.deck[state.index].options.find(
        (o) => o.id !== state.deck[state.index].answer[0],
      )!.id;
      state = rushReducer(state, { type: 'answer', id: wrong, now: 4000 });
      expect(state.lives).toBe(2 - i);
      expect(state.combo).toBe(0);
      if (i < 2) state = next(state);
    }
    expect(state.phase).toBe('finished');
    expect(state.score).toBe(100);
    expect(state.bestCombo).toBe(1);
    expect(solve(state)).toEqual(state);
  });

  it('enforces the deadline on input even if browser timers were throttled', () => {
    const state = start();
    const expired = rushReducer(state, {
      type: 'answer',
      id: state.deck[0].answer[0],
      now: 61_000,
    });
    expect(expired.phase).toBe('finished');
    expect(expired.remainingMs).toBe(0);
    expect(expired.score).toBe(0);
    expect(rushReducer(start(), { type: 'tick', now: 90_000 }).phase).toBe(
      'finished',
    );
  });

  it('finishes after the last puzzle and starts a fresh run without old score or feedback', () => {
    const state = start();
    const finished = solve({ ...state, index: state.deck.length - 1 });
    expect(finished.phase).toBe('finished');
    const restarted = rushReducer(finished, {
      type: 'start',
      now: 5000,
      seed: 43,
      previousBest: 100,
      recordKey: 'daily:2026-11-25',
    });
    expect(restarted).toMatchObject({
      score: 0,
      lives: 3,
      index: 0,
      selected: [],
      feedback: null,
      previousBest: 100,
      recordKey: 'daily:2026-11-25',
    });
    expect(restarted.deck).not.toEqual(state.deck);
  });
});
