import { bootstrapApplication } from '@angular/platform-browser';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { provideEffects } from '@ngrx/effects';
import {
  DEFAULT_ROUTER_FEATURENAME,
  provideRouterStore,
  routerReducer,
} from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { effects, metaReducers, reducers } from '@store/index';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideStore(
      { [DEFAULT_ROUTER_FEATURENAME]: routerReducer, ...reducers },
      { metaReducers },
    ),
    provideEffects(effects),
    provideRouterStore(),
    provideStoreDevtools(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
