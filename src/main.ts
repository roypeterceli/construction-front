import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// import { KeycloakService } from './app/core/services/keycloak.service';

// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { authInterceptor } from '@wow/core/interceptors';

// const keycloakService = new KeycloakService();

// keycloakService.init()
//   .then(() => {
//     bootstrapApplication(AppComponent, {
//       providers: [{ provide: KeycloakService, useValue: keycloakService }]
//     });
//   })
//   .catch(err => {
//     console.error('Error initializing Keycloak', err);
//   });

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
