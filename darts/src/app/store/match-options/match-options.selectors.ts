import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATCH_OPTIONS_KEY } from './match-options.key';
import type { MatchOptionsState } from './match-options.reducer';

export const selectMatchOptionsFeature =
  createFeatureSelector<MatchOptionsState>(MATCH_OPTIONS_KEY);

export const selectMatchOptions = createSelector(
  selectMatchOptionsFeature,
  (state) => state.matchOptions,
);
