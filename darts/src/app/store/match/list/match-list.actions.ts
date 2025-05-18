import { createActionGroup, props } from '@ngrx/store';
import type { Match } from '@types';
import { MATCH_LIST_KEY } from './match-list.key';

export const { addMatch, deleteMatch } = createActionGroup({
  source: MATCH_LIST_KEY,
  events: {
    addMatch: props<{ match: Match }>(),
    deleteMatch: props<{ match: Match }>(),
  },
});
