import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pages } from '@models/pages';
import { Store } from '@ngrx/store';
import { selectMatchOptions } from '@store/match-options/match-options.selectors';

@Component({
  selector: 'app-match-settings',
  templateUrl: './match-settings.component.html',
  imports: [RouterLink],
})
export class MatchSettingsComponent {
  readonly Pages = Pages;

  store = inject(Store);
  matchOptions = this.store.selectSignal(selectMatchOptions);
}
