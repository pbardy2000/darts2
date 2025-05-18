import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  IonLabel,
  IonList,
  IonModal,
  IonPopover,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Pages } from '@models/pages';
import { Store } from '@ngrx/store';
import { addPlayer } from '@store/player/list/player-list.actions';
import { nanoid } from 'nanoid';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.page.html',
  imports: [
    IonRow,
    IonCol,
    IonGrid,
    IonFooter,
    IonBackButton,
    IonInput,
    IonItemGroup,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonIcon,
    IonContent,
    IonLabel,
    IonItem,
    IonList,
    IonPopover,
    IonButton,
    IonModal,
    IonHeader,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class NewPlayerPage {
  readonly Pages = Pages;

  fb = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  form = this.fb.nonNullable.group({
    uuid: [''],
    name: ['', Validators.required],
    nickname: [''],
  });

  confirm() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    if (this.form.valid) {
      const player = this.form.getRawValue();
      player.uuid = nanoid();

      this.store.dispatch(addPlayer({ player }));
    }
  }

  cancel() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
}
