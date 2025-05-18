import { createActionGroup, props } from '@ngrx/store';
import type { MatchOptions } from '@types';
import { MATCH_OPTIONS_KEY } from './match-options.key';

export const { setMatchOptions } = createActionGroup({
  source: MATCH_OPTIONS_KEY,
  events: {
    setMatchOptions: props<{ matchOptions: MatchOptions }>(),
  },
});
