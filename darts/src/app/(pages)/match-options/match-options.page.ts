import { Component, inject, linkedSignal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Pages } from '@models/pages';
import { Store } from '@ngrx/store';
import { setMatchOptions } from '@store/match-options/match-options.actions';
import { selectMatchOptions } from '@store/match-options/match-options.selectors';
import {
  DARTBOARDS,
  type DartboardKey,
  GAME_TYPES,
  type GameTypeKey,
  LEGS,
  MATCH_TYPES,
  type MatchTypeKey,
  POINTS,
} from '@types';

@Component({
  selector: 'app-match-options',
  templateUrl: './match-options.page.html',
  imports: [
    IonBackButton,
    IonToggle,
    IonCol,
    IonRow,
    IonGrid,
    IonLabel,
    IonFooter,
    IonItem,
    IonItemGroup,
    IonSelect,
    IonSelectOption,
    IonContent,
    IonModal,
    IonButton,
    IonToolbar,
    IonHeader,
    IonButtons,
    IonTitle,
    IonIcon,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MatchOptionsPage {
  readonly Pages = Pages;
  readonly GAME_TYPES = GAME_TYPES;
  readonly DARTBOARDS = DARTBOARDS;
  readonly MATCH_TYPES = MATCH_TYPES;
  readonly LEGS = LEGS;
  readonly POINTS = POINTS;

  fb = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);
  matchOptions = this.store.selectSignal(selectMatchOptions);

  form = linkedSignal(() => {
    const form = this.fb.nonNullable.group({
      game: this.fb.nonNullable.control<GameTypeKey>('X01'),
      dartboard: this.fb.nonNullable.control<DartboardKey>('STANDARD'),
      matchType: this.fb.nonNullable.control<MatchTypeKey>('BEST_OF'),
      legs: this.fb.nonNullable.control<number>(3),
      points: this.fb.nonNullable.control<number>(501),
      doubleIn: this.fb.nonNullable.control<boolean>(false),
    });
    form.patchValue(this.matchOptions());

    return form;
  });

  cancel() {
    this.router.navigate(['/', Pages.NEW_MATCH]);
  }

  confirm() {
    const form = this.form();
    form.markAllAsTouched();

    if (form.invalid) {
      return;
    }

    if (form.valid) {
      const matchOptions = form.getRawValue();
      this.store.dispatch(setMatchOptions({ matchOptions }));
    }
  }
}
