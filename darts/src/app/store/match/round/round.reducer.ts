import { type EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import type { Round } from '@types';
import { addRound, deleteRound } from './round.actions';

export interface RoundState extends EntityState<Round> {}

export const roundAdapter = createEntityAdapter<Round>({
  selectId: (round) => round.uuid,
});

export const initialRoundState: RoundState = roundAdapter.getInitialState();

export const roundReducer = createReducer(
  initialRoundState,
  on(addRound, (state, action) => {
    return roundAdapter.addOne(action.round, state);
  }),
  on(deleteRound, (state, action) => {
    return roundAdapter.removeOne(action.round.uuid, state);
  }),
);
