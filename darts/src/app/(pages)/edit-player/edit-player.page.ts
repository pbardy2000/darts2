import { Component, inject, linkedSignal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  IonInput,
  IonItem,
  IonItemGroup,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Pages } from '@models/pages';
import { Store } from '@ngrx/store';
import {
  deletePlayer,
  editPlayer,
} from '@store/player/list/player-list.actions';
import { selectPlayerFromRoute } from '@store/player/list/player-list.selectors';
import type { Player } from '@types';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.page.html',
  imports: [
    IonBackButton,
    IonCol,
    IonRow,
    IonGrid,
    IonFooter,
    IonInput,
    IonItemGroup,
    IonModal,
    IonItem,
    IonContent,
    IonIcon,
    IonButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EditPlayerPage {
  readonly Pages = Pages;

  fb = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);

  player = this.store.selectSignal(selectPlayerFromRoute);

  form = linkedSignal(() => {
    const form = this.fb.nonNullable.group({
      uuid: [''],
      name: ['', Validators.required],
      nickname: [''],
    });
    form.patchValue(this.player());

    return form;
  });

  deletePlayer(player: Player) {
    this.store.dispatch(deletePlayer({ player }));
  }

  confirm() {
    const form = this.form();
    form.markAllAsTouched();

    if (form.invalid) {
      return;
    }

    if (form.valid) {
      const player = form.getRawValue();
      this.store.dispatch(editPlayer({ player }));
    }
  }

  cancel() {
    this.router.navigate(['/', Pages.MANAGE_PLAYERS]);
  }
}
