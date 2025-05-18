import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Pages } from '@models/pages';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { selectPlayer } from './selected-players.actions';

@Injectable()
export class SelectedPlayerEffects {
  readonly actions = inject(Actions);
  readonly router = inject(Router);

  onCompleteAction = createEffect(
    () =>
      this.actions.pipe(
        ofType(selectPlayer),
        tap(() => this.router.navigate(['/', Pages.NEW_MATCH])),
      ),
    { dispatch: false },
  );
}
