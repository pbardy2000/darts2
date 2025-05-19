import { type EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import type { Orderable, Player } from '@types';
import { mockPlayers } from 'src/app/mocks/player.mock';
import {
  deselectPlayer,
  selectPlayer,
  setAllSelectedPlayers,
} from './selected-players.actions';

export interface SelectedPlayersState extends EntityState<Orderable<Player>> {}

export const selectedAdapter = createEntityAdapter<Orderable<Player>>({
  selectId: (player) => player.uuid,
  sortComparer: (a, b) => a.order - b.order,
});

export const initialSelectedPlayersState: SelectedPlayersState =
  selectedAdapter.addMany(
    mockPlayers.map((player, order) => ({ ...player, order })),
    selectedAdapter.getInitialState(),
  );

export const selectedPlayersReducer = createReducer(
  initialSelectedPlayersState,
  on(selectPlayer, (state, action) => {
    const order = state.ids.length + 1;
    return selectedAdapter.addOne({ ...action.player, order }, state);
  }),
  on(setAllSelectedPlayers, (state, action) => {
    return selectedAdapter.setAll(action.players, state);
  }),
  on(deselectPlayer, (state, action) => {
    return selectedAdapter.removeOne(action.player.uuid, state);
  }),
);
