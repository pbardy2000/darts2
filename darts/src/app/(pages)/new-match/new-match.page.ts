import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatchSettingsComponent } from '@components/mach-settings/match-settings.component';
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
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  type ItemReorderEventDetail,
} from '@ionic/angular/standalone';
import { Pages } from '@models/pages';
import { Store } from '@ngrx/store';
import { startMatch } from '@store/match/match.actions';
import {
  deselectPlayer,
  setAllSelectedPlayers,
} from '@store/player/selected/selected-players.actions';
import { selectSelectedPlayers } from '@store/player/selected/selected-players.selectors';
import type { Player } from '@types';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.page.html',
  imports: [
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonReorder,
    IonLabel,
    IonItem,
    IonReorderGroup,
    IonList,
    IonText,
    IonBackButton,
    IonCol,
    IonRow,
    IonGrid,
    IonFooter,
    IonContent,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonHeader,
    RouterLink,
    MatchSettingsComponent,
  ],
})
export class NewMatchPage {
  readonly Pages = Pages;
  readonly store = inject(Store);
  readonly selectedPlayers = this.store.selectSignal(selectSelectedPlayers);

  deselectPlayer(player: Player) {
    this.store.dispatch(deselectPlayer({ player }));
  }

  reorderPlayers(event: CustomEvent<ItemReorderEventDetail>) {
    const list = structuredClone(this.selectedPlayers());
    const a = list[event.detail.from];
    const b = list[event.detail.to];
    const c = { ...a, order: b.order };
    const d = { ...b, order: a.order };
    list.splice(event.detail.from, 1, c);
    list.splice(event.detail.to, 1, d);

    event.detail.complete();

    this.store.dispatch(setAllSelectedPlayers({ players: list }));
  }

  startMatch() {
    if (this.selectedPlayers().length < 2) return;
    this.store.dispatch(startMatch());
  }
}
