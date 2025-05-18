import { getRouterSelectors } from '@ngrx/router-store';
import { createSelector } from '@ngrx/store';
import type { Player } from '@types';
import { selectPlayerState } from '../player.selectors';
import { PLAYER_LIST_KEY } from './player-list.key';
import { listAdapter } from './player-list.reducer';

const { selectAll, selectEntities } = listAdapter.getSelectors();
const { selectRouteParam } = getRouterSelectors();

export const selectPlayerListState = createSelector(
  selectPlayerState,
  (state) => state[PLAYER_LIST_KEY],
);

export const selectPlayers = createSelector(selectPlayerListState, selectAll);

export const selectPlayerEntities = createSelector(
  selectPlayerListState,
  selectEntities,
);

export const selectPlayerFromRoute = createSelector(
  selectRouteParam('playerId'),
  selectPlayerEntities,
  (uuid, players) => players[uuid as Player['uuid']] as Player,
);
