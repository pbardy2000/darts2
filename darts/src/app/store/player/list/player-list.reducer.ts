import { type EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import type { Player } from '@types';
import { mockPlayers } from 'src/app/mocks/player.mock';
import { addPlayer, deletePlayer, deletePlayers } from './player-list.actions';

export interface PlayerListState extends EntityState<Player> {}

export const listAdapter = createEntityAdapter<Player>({
  selectId: (player) => player.uuid,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const initialPlayerListState: PlayerListState = listAdapter.addMany(
  mockPlayers,
  listAdapter.getInitialState(),
);

export const playerListReducer = createReducer(
  initialPlayerListState,
  on(addPlayer, (state, action) => {
    return listAdapter.addOne(action.player, state);
  }),
  on(deletePlayer, (state, action) => {
    return listAdapter.removeOne(action.player.uuid, state);
  }),
  on(deletePlayers, (state) => {
    return listAdapter.removeAll(state);
  }),
);
