import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Keyboard } from '@components/keyboard/keyboard.component';
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
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Pages } from '@models/pages';
import { Store } from '@ngrx/store';
import { addScore } from '@store/match/match.actions';
import { selectMatchFromRoute } from '@store/match/match.selectors';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  imports: [
    IonRow,
    IonLabel,
    IonItem,
    IonCol,
    IonGrid,
    IonContent,
    IonFooter,
    IonIcon,
    IonButton,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonToolbar,
    IonHeader,
    Keyboard,
    KeyValuePipe,
  ],
})
export class MatchPage {
  readonly Pages = Pages;

  readonly store = inject(Store);
  readonly match = this.store.selectSignal(selectMatchFromRoute);

  onEnter(score: number) {
    this.store.dispatch(addScore({ score }));
  }
}
