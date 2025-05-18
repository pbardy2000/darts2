import { combineReducers } from '@ngrx/store';
import { MATCH_LIST_KEY } from './list/match-list.key';
import {
  type MatchListState,
  initialMatchListState,
  matchListReducer,
} from './list/match-list.reducer';
import { ROUND_KEY } from './round/round.key';
import {
  type RoundState,
  initialRoundState,
  roundReducer,
} from './round/round.reducer';

export type MatchState = {
  [MATCH_LIST_KEY]: MatchListState;
  [ROUND_KEY]: RoundState;
};

export const intialMatchState: MatchState = {
  [MATCH_LIST_KEY]: initialMatchListState,
  [ROUND_KEY]: initialRoundState,
};

export const matchReducer = combineReducers({
  [MATCH_LIST_KEY]: matchListReducer,
  [ROUND_KEY]: roundReducer,
});
