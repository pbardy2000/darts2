import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';
import { Pages } from '@models/pages';
import { Store } from '@ngrx/store';
import { selectMatchById } from './match.selectors';

export const canViewMatch: CanActivateFn = (route) => {
  const store = inject(Store);
  const router = inject(Router);

  // biome-ignore lint/complexity/useLiteralKeys: <explanation>
  const match = store.selectSignal(selectMatchById(route.params['matchId']));

  if (!match()) {
    router.navigate(['/', Pages.HOME]);
    return false;
  }

  return true;
};
