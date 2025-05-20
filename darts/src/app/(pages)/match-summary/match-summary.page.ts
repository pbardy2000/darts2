import { Component } from "@angular/core";
import {
	IonBackButton,
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonTitle,
	IonToolbar,
} from "@ionic/angular/standalone";
import { Pages } from "@models/pages";

@Component({
	selector: "app-match-summary",
	templateUrl: "./match-summary.page.html",
	imports: [
		IonContent,
		IonIcon,
		IonButtons,
		IonButton,
		IonBackButton,
		IonTitle,
		IonToolbar,
		IonHeader,
	],
})
export class MatchSummaryPage {
	readonly Pages = Pages;
}
