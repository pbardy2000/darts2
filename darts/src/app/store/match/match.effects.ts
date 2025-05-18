import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Pages } from '@models/pages';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { selectMatchOptions } from '@store/match-options';
import { selectSelectedPlayers } from '@store/player/selected/selected-players.selectors';
import type { Match } from '@types';
import { nanoid } from 'nanoid';
import { map, tap } from 'rxjs';
import { addMatch } from './list/match-list.actions';
import { startMatch } from './match.actions';

@Injectable()
export class MatchEffects {
  readonly store = inject(Store);
  readonly actions = inject(Actions);
  readonly router = inject(Router);

  onStartMatch = createEffect(() =>
    this.actions.pipe(
      ofType(startMatch),
      concatLatestFrom(() => [
        this.store.select(selectMatchOptions),
        this.store.select(selectSelectedPlayers),
      ]),
      map(([_, options, players]) => {
        const now = new Date().toISOString();

        const match: Match = {
          uuid: nanoid(),
          options,
          players,
          completed: false,
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
        };

        return match;
      }),
      tap((match) =>
        this.router.navigate([
          '/',
          Pages.MATCH.replace(':matchId', match.uuid),
        ]),
      ),
      map((match) => addMatch({ match })),
    ),
  );
}
