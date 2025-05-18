import { createFeatureSelector } from '@ngrx/store';
import { PLAYER_FEATURE_KEY } from './player.key';
import type { PlayerState } from './player.reducer';

export const selectPlayerState =
  createFeatureSelector<PlayerState>(PLAYER_FEATURE_KEY);
