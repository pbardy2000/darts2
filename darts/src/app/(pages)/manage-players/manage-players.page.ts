import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPopover,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Pages } from '@models/pages';
import { Store } from '@ngrx/store';
import { deletePlayers } from '@store/player/list/player-list.actions';
import { selectPlayers } from '@store/player/list/player-list.selectors';

@Component({
  selector: 'app-manage-players',
  templateUrl: './manage-players.page.html',
  imports: [
    IonBackButton,
    IonModal,
    IonItem,
    IonToolbar,
    IonLabel,
    IonList,
    IonTitle,
    IonButtons,
    IonButton,
    IonHeader,
    IonPopover,
    IonContent,
    IonIcon,
    IonFab,
    IonFabButton,
    RouterLink,
  ],
})
export class ManagePlayersPage {
  readonly Pages = Pages;

  store = inject(Store);
  players = this.store.selectSignal(selectPlayers);

  deletePlayers() {
    this.store.dispatch(deletePlayers());
  }
}
