import { createActionGroup, emptyProps } from '@ngrx/store';
import { MATCH_KEY } from './match.key';

export const { startMatch } = createActionGroup({
  source: MATCH_KEY,
  events: {
    startMatch: emptyProps(),
  },
});
