import { Component, model, output } from '@angular/core';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  imports: [IonIcon, IonRow, IonGrid, IonButton, IonCol],
})
export class Keyboard {
  value = model<number>(0);
  enter = output<number>();
  return = output();

  onPress(key: string) {
    let buffer = this.value().toString();
    buffer += key;

    this.value.set(Number.parseInt(buffer));
  }

  onEnter() {
    const value = this.value();
    this.enter.emit(value);
    this.value.set(0);
  }

  onReturn() {
    let buffer = this.value().toString();
    buffer = buffer.length === 1 ? '0' : buffer.substring(0, buffer.length - 1);

    this.value.set(Number.parseInt(buffer));
  }
}
