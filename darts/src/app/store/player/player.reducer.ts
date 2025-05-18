import { combineReducers } from '@ngrx/store';
import { PLAYER_LIST_KEY } from './list/player-list.key';
import {
  type PlayerListState,
  initialPlayerListState,
  playerListReducer,
} from './list/player-list.reducer';
import { SELECTED_PLAYERS_KEY } from './selected/selected-players.key';
import {
  type SelectedPlayersState,
  initialSelectedPlayersState,
  selectedPlayersReducer,
} from './selected/selected-players.reducer';

export interface PlayerState {
  [PLAYER_LIST_KEY]: PlayerListState;
  [SELECTED_PLAYERS_KEY]: SelectedPlayersState;
}

export const initialPlayerState: PlayerState = {
  [PLAYER_LIST_KEY]: initialPlayerListState,
  [SELECTED_PLAYERS_KEY]: initialSelectedPlayersState,
};

export const playerReducer = combineReducers({
  [PLAYER_LIST_KEY]: playerListReducer,
  [SELECTED_PLAYERS_KEY]: selectedPlayersReducer,
});
