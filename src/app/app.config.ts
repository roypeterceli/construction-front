import { ApplicationConfig,LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { KeycloakService } from './core/services';
import { authInterceptor, httpErrorInterceptor } from './core/interceptors';
import { includeBearerTokenInterceptor } from 'keycloak-angular';
import { provideKeycloakAngular, provideKeycloakTokenInterceptor } from './app.provide';



registerLocaleData(localeEs, 'es');
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimationsAsync(), 
     provideHttpClient(
      withInterceptors([includeBearerTokenInterceptor]),
    ),
    provideKeycloakAngular(),
    provideKeycloakTokenInterceptor(),
  ]
};
