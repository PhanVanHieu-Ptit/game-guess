import { createRushDeck, type RushPuzzle } from './puzzles';

export const RUSH_DURATION_MS = 60_000;
export interface RushState {
  phase: 'ready' | 'playing' | 'feedback' | 'finished';
  deck: RushPuzzle[];
  index: number;
  selected: string[];
  score: number;
  solved: number;
  lives: number;
  combo: number;
  bestCombo: number;
  deadline: number;
  remainingMs: number;
  feedback: { correct: boolean; points: number } | null;
  previousBest: number;
  recordKey: string;
  seed: number;
}

export function initialRushState(): RushState {
  return {
    phase: 'ready',
    deck: [],
    index: 0,
    selected: [],
    score: 0,
    solved: 0,
    lives: 3,
    combo: 0,
    bestCombo: 0,
    deadline: 0,
    remainingMs: RUSH_DURATION_MS,
    feedback: null,
    previousBest: 0,
    recordKey: 'free',
    seed: 0,
  };
}

export type RushAction =
  | {
      type: 'start';
      now: number;
      seed: number;
      previousBest: number;
      recordKey: string;
    }
  | { type: 'answer'; id: string; now: number }
  | { type: 'tick'; now: number }
  | { type: 'next'; now: number };

export function rushReducer(state: RushState, action: RushAction): RushState {
  if (action.type === 'start') {
    return {
      ...initialRushState(),
      phase: 'playing',
      deck: createRushDeck(action.seed),
      deadline: action.now + RUSH_DURATION_MS,
      previousBest: action.previousBest,
      recordKey: action.recordKey,
      seed: action.seed,
    };
  }
  if (state.phase === 'ready' || state.phase === 'finished') return state;
  const remainingMs = Math.max(0, state.deadline - action.now);
  if (remainingMs === 0) return { ...state, phase: 'finished', remainingMs };
  if (action.type === 'tick') return { ...state, remainingMs };
  if (action.type === 'next') {
    if (state.phase !== 'feedback') return state;
    return {
      ...state,
      phase: 'playing',
      index: state.index + 1,
      selected: [],
      feedback: null,
      remainingMs,
    };
  }
  if (state.phase !== 'playing') return state;
  const puzzle = state.deck[state.index];
  if (
    !puzzle.options.some((option) => option.id === action.id) ||
    state.selected.includes(action.id)
  )
    return state;
  const correct = puzzle.answer[state.selected.length] === action.id;
  const selected = [...state.selected, action.id];
  if (correct && selected.length < puzzle.answer.length)
    return { ...state, selected, remainingMs };
  const combo = correct ? state.combo + 1 : 0;
  const points = correct ? 100 + Math.min(combo - 1, 4) * 25 : 0;
  const lives = state.lives - (correct ? 0 : 1);
  return {
    ...state,
    phase:
      lives === 0 || state.index === state.deck.length - 1
        ? 'finished'
        : 'feedback',
    selected,
    score: state.score + points,
    solved: state.solved + (correct ? 1 : 0),
    lives,
    combo,
    bestCombo: Math.max(state.bestCombo, combo),
    remainingMs,
    feedback: { correct, points },
  };
}
