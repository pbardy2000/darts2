import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  addCircle,
  backspace,
  barChart,
  documentTextOutline,
  ellipsisVertical,
  helpOutline,
  people,
  person,
  refreshCircle,
  returnDownBack,
  shareSocialOutline,
  trashOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      ellipsisVertical,
      addCircle,
      refreshCircle,
      person,
      people,
      barChart,
      add,
      trashOutline,
      helpOutline,
      documentTextOutline,
      shareSocialOutline,
      backspace,
      returnDownBack,
    });
  }
}
