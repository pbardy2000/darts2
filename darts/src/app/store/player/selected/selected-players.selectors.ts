import { createSelector } from '@ngrx/store';
import { selectPlayerState } from '../player.selectors';
import { SELECTED_PLAYERS_KEY } from './selected-players.key';
import { selectedAdapter } from './selected-players.reducer';

const { selectAll, selectEntities } = selectedAdapter.getSelectors();

export const selectSelectedPlayersState = createSelector(
  selectPlayerState,
  (state) => state[SELECTED_PLAYERS_KEY],
);

export const selectSelectedPlayers = createSelector(
  selectSelectedPlayersState,
  selectAll,
);

export const selectSelectedPlayerEntities = createSelector(
  selectSelectedPlayersState,
  selectEntities,
);
