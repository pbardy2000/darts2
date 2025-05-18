import { createReducer, on } from '@ngrx/store';
import type { MatchOptions } from '@types';
import { setMatchOptions } from './match-options.actions';

export interface MatchOptionsState {
  matchOptions: MatchOptions;
}

export const initialMatchOptionsState: MatchOptionsState = {
  matchOptions: {
    game: 'X01',
    dartboard: 'STANDARD',
    matchType: 'BEST_OF',
    legs: 3,
    points: 501,
    doubleIn: false,
  },
};

export const matchOptionsReducer = createReducer(
  initialMatchOptionsState,
  on(setMatchOptions, (state, action) => {
    return { ...state, matchOptions: action.matchOptions };
  }),
);
