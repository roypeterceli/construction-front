import { Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
// import { KeycloakService } from '@wow/core/services';
// import { inject } from '@angular/core';
// import { RegisterPage } from './register/register.page';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,    
    // canActivate: [() => {
    //   const keycloak = inject(KeycloakService);
    //   return keycloak.isLoggedIn();
    // }]
  },
  // {
  //   path: 'register',
  //   component: RegisterPage
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];
