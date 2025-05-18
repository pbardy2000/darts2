import { createActionGroup, props } from '@ngrx/store';
import type { Orderable, Player } from '@types';
import { SELECTED_PLAYERS_KEY } from './selected-players.key';

export const { selectPlayer, setAllSelectedPlayers, deselectPlayer } =
  createActionGroup({
    source: SELECTED_PLAYERS_KEY,
    events: {
      selectPlayer: props<{ player: Player }>(),
      setAllSelectedPlayers: props<{ players: Orderable<Player>[] }>(),
      deselectPlayer: props<{ player: Player }>(),
    },
  });
