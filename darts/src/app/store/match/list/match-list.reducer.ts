import { type EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import type { Match } from '@types';
import { addMatch, deleteMatch } from './match-list.actions';

export interface MatchListState extends EntityState<Match> {}

export const matchListAdapter = createEntityAdapter<Match>({
  selectId: (match) => match.uuid,
});

export const initialMatchListState: MatchListState =
  matchListAdapter.getInitialState();

export const matchListReducer = createReducer(
  initialMatchListState,
  on(addMatch, (state, action) => {
    return matchListAdapter.addOne(action.match, state);
  }),
  on(deleteMatch, (state, action) => {
    return matchListAdapter.removeOne(action.match.uuid, state);
  }),
);
