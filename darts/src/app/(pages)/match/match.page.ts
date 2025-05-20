import { KeyValuePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Keyboard } from "@components/keyboard/keyboard.component";
import {
	AlertController,
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
} from "@ionic/angular/standalone";
import { Pages } from "@models/pages";
import { Store } from "@ngrx/store";
import { addScore } from "@store/match/match.actions";
import { selectMatchFromRoute } from "@store/match/match.selectors";
import { MatchService } from "@store/match/match.service";

@Component({
	selector: "app-match",
	templateUrl: "./match.page.html",
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
	readonly alertCtrl = inject(AlertController);
	readonly matchService = inject(MatchService);
	readonly match = this.store.selectSignal(selectMatchFromRoute);

	async onEnter(score: number) {
		const match = this.match();

		// Score is invalid
		if (!this.matchService.getIsValidScore(match, score)) {
			return await this.showInvalidScoreAlert();
		}

		this.store.dispatch(addScore({ score }));
	}

	async showInvalidScoreAlert() {
		const alert = await this.alertCtrl.create({
			header: "Invalid Score",
			message: "The score you entered is invalid.",
			buttons: [
				{
					text: "OK",
					role: "cancel",
					cssClass: "secondary",
				},
			],
		});

		await alert.present();
	}
}
