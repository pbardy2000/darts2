import { Component, computed, inject } from '@angular/core';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Pages } from '@models/pages';
import { Store } from '@ngrx/store';
import { selectPlayers } from '@store/player/list/player-list.selectors';
import { selectPlayer } from '@store/player/selected/selected-players.actions';
import { selectSelectedPlayerEntities } from '@store/player/selected/selected-players.selectors';
import type { Player } from '@types';

@Component({
  selector: 'app-select-players',
  templateUrl: './select-players.page.html',
  imports: [
    IonLabel,
    IonList,
    IonItem,
    IonText,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonHeader,
  ],
})
export class SelectPlayersPage {
  readonly Pages = Pages;
  readonly store = inject(Store);
  readonly players = this.store.selectSignal(selectPlayers);
  readonly selectedPlayers = this.store.selectSignal(
    selectSelectedPlayerEntities,
  );
  readonly unselectedPlayers = computed(() => {
    return this.players().filter(
      (player) => !this.selectedPlayers()[player.uuid],
    );
  });

  selectPlayer(player: Player) {
    this.store.dispatch(selectPlayer({ player }));
  }
}
