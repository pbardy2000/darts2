import { getRouterSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import type { Match } from '@types';
import { MATCH_KEY } from './match.key';
import { type MatchState, matchAdapter } from './match.reducer';

const { selectAll, selectEntities } = matchAdapter.getSelectors();
const { selectRouteParam } = getRouterSelectors();

export const selectMatchFeature = createFeatureSelector<MatchState>(MATCH_KEY);

export const selectMatches = createSelector(selectMatchFeature, selectAll);

export const selectMatchEntities = createSelector(
  selectMatchFeature,
  selectEntities,
);

export const selectMatchById = (id: Match['uuid']) =>
  createSelector(selectMatchEntities, (matches) => matches[id] as Match);

export const selectMatchFromRoute = createSelector(
  selectRouteParam('matchId'),
  selectMatchEntities,
  (matchId, matches) => matches[matchId as Match['uuid']] as Match,
);
