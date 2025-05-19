import { MatchOptionsEffects } from './match-options/match-options.effects';
import { MATCH_OPTIONS_KEY } from './match-options/match-options.key';
import {
  type MatchOptionsState,
  matchOptionsReducer,
} from './match-options/match-options.reducer';
import { MatchEffects } from './match/match.effects';
import { MATCH_KEY } from './match/match.key';
import { matchReducer } from './match/match.reducer';
import { PlayerEffects } from './player/player.effects';
import { PLAYER_FEATURE_KEY } from './player/player.key';
import { type PlayerState, playerReducer } from './player/player.reducer';
import { SelectedPlayerEffects } from './player/selected/selected-player.effects';

export interface AppState {
  [PLAYER_FEATURE_KEY]: PlayerState;
  [MATCH_OPTIONS_KEY]: MatchOptionsState;
}

export const reducers = {
  [PLAYER_FEATURE_KEY]: playerReducer,
  [MATCH_KEY]: matchReducer,
  [MATCH_OPTIONS_KEY]: matchOptionsReducer,
};

export const metaReducers = [];

export const effects = [
  PlayerEffects,
  SelectedPlayerEffects,
  MatchEffects,
  MatchOptionsEffects,
];
