import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Pages } from '@models/pages';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { setMatchOptions } from './match-options.actions';

@Injectable()
export class MatchOptionsEffects {
  router = inject(Router);
  actions = inject(Actions);

  onCompleteAction = createEffect(
    () =>
      this.actions.pipe(
        ofType(setMatchOptions),
        tap(() => this.router.navigate(['/', Pages.NEW_MATCH])),
      ),
    { dispatch: false },
  );
}
