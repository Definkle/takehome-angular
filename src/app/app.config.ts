import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { userReducer } from './services/state/user/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore(),
    provideState({ name: 'user', reducer: userReducer }),
  ],
};
