import { createActionGroup, props } from '@ngrx/store';
import type { Round } from '@types';
import { ROUND_KEY } from './round.key';

export const { addRound, deleteRound } = createActionGroup({
  source: ROUND_KEY,
  events: {
    addRound: props<{ round: Round }>(),
    deleteRound: props<{ round: Round }>(),
  },
});
