import { type EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import type { Match } from '@types';
import { addLeg, addMatch, addRound, deleteMatch } from './match.actions';

export interface MatchState extends EntityState<Match> {}

export const matchAdapter = createEntityAdapter<Match>({
  selectId: (match) => match.uuid,
});

export const initialMatchListState: MatchState = matchAdapter.getInitialState();

export const matchReducer = createReducer(
  initialMatchListState,
  on(addMatch, (state, action) => {
    return matchAdapter.addOne(action.match, state);
  }),
  on(deleteMatch, (state, action) => {
    return matchAdapter.removeOne(action.match.uuid, state);
  }),
  on(addRound, (state, action) => {
    const match = state.entities[action.match.uuid];
    if (match) {
      const [currentSet, ...sets] = match.sets;
      const [currentLeg, ...legs] = currentSet;
      const changes = {
        ...match,
        sets: [[[action.round, ...currentLeg], ...legs], ...sets],
      };

      return matchAdapter.updateOne({ id: match.uuid, changes }, state);
    }

    return state;
  }),
  on(addLeg, (state, action) => {
    const match = state.entities[action.match.uuid];
    if (match) {
      const [currentSet, ...sets] = match.sets;
      const changes = {
        ...match,
        sets: [[action.leg, ...currentSet], ...sets],
      };

      return matchAdapter.updateOne({ id: match.uuid, changes }, state);
    }

    return state;
  }),
);
