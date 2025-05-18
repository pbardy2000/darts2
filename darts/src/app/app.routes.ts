import type { Routes } from '@angular/router';
import { Pages } from '@models/pages';

export const routes: Routes = [
  {
    path: Pages.HOME,
    title: 'Home',
    loadComponent: () =>
      import('@pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: Pages.NEW_MATCH,
    title: 'New match',
    loadComponent: () =>
      import('@pages/new-match/new-match.page').then((m) => m.NewMatchPage),
  },
  {
    path: Pages.RESUME_MATCH,
    title: 'Resume match',
    loadComponent: () =>
      import('@pages/resume-match/resume-match.page').then(
        (m) => m.ResumeMatchPage,
      ),
  },
  {
    path: Pages.MANAGE_PLAYERS,
    title: 'Manage players',
    loadComponent: () =>
      import('@pages/manage-players/manage-players.page').then(
        (m) => m.ManagePlayersPage,
      ),
  },
  {
    path: Pages.MANAGE_TEAMS,
    title: 'Manage teams',
    loadComponent: () =>
      import('@pages/manage-teams/manage-teams.page').then(
        (m) => m.ManageTeamsPage,
      ),
  },
  {
    path: Pages.STATISTICS,
    title: 'Statistics',
    loadComponent: () =>
      import('@pages/statistics/statistics.page').then((m) => m.StatisticsPage),
  },
  {
    path: Pages.NEW_PLAYER,
    title: 'New player',
    loadComponent: () =>
      import('@pages/new-player/new-player.page').then((m) => m.NewPlayerPage),
  },
  {
    path: Pages.EDIT_PLAYER,
    title: 'Edit player',
    loadComponent: () =>
      import('@pages/edit-player/edit-player.page').then(
        (m) => m.EditPlayerPage,
      ),
  },
  {
    path: Pages.INFORMATION,
    title: 'Information',
    loadComponent: () =>
      import('@pages/information/information.page').then(
        (m) => m.InformationPage,
      ),
  },
  {
    path: Pages.PRIVACY_POLICY,
    title: 'Privacy policy',
    loadComponent: () =>
      import('@pages/privacy-policy/privacy-policy.page').then(
        (m) => m.PrivacyPolicyPage,
      ),
  },
  {
    path: Pages.AD_CONSENT,
    title: 'Ad consent',
    loadComponent: () =>
      import('@pages/ad-consent/ad-consent.page').then((m) => m.AdConsentPage),
  },
  {
    path: Pages.HELP,
    title: 'Help',
    loadComponent: () =>
      import('@pages/help/help.page').then((m) => m.HelpPage),
  },
  {
    path: Pages.MATCH_OPTIONS,
    title: 'Match options',
    loadComponent: () =>
      import('@pages/match-options/match-options.page').then(
        (m) => m.MatchOptionsPage,
      ),
  },
  {
    path: Pages.SELECT_PLAYERS,
    title: 'Select players',
    loadComponent: () =>
      import('@pages/select-players/select-players.page').then(
        (m) => m.SelectPlayersPage,
      ),
  },
  {
    path: Pages.MATCH,
    title: 'Match',
    loadComponent: () =>
      import('@pages/match/match.page').then((m) => m.MatchPage),
  },
  { path: '', redirectTo: Pages.HOME, pathMatch: 'full' },
];
