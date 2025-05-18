import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type { Player } from '@types';
import { PLAYER_LIST_KEY } from './player-list.key';

export const { addPlayer, editPlayer, deletePlayer, deletePlayers } =
  createActionGroup({
    source: PLAYER_LIST_KEY,
    events: {
      addPlayer: props<{ player: Player }>(),
      editPlayer: props<{ player: Player }>(),
      deletePlayer: props<{ player: Player }>(),
      deletePlayers: emptyProps(),
    },
  });
