import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Pages } from '@models/pages';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import {
  addPlayer,
  deletePlayer,
  editPlayer,
} from './list/player-list.actions';

@Injectable()
export class PlayerEffects {
  router = inject(Router);
  actions = inject(Actions);

  onCompleteAction = createEffect(
    () =>
      this.actions.pipe(
        ofType(addPlayer, editPlayer, deletePlayer),
        tap(() => this.router.navigate(['/', Pages.MANAGE_PLAYERS])),
      ),
    { dispatch: false },
  );
}
