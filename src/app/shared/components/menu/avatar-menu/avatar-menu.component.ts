import { Component, inject } from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatRipple } from "@angular/material/core";
// import { AuthService } from '@wow/core/services';
import { Router } from '@angular/router';
import Keycloak from 'keycloak-js';
// import { CEX_COLLECTION } from '@wow/core/interfaces';


@Component({
  selector: 'wow-avatar-menu',
  imports: [
    MatMenu,
    MatMenuItem,
    MatRipple,
    MatMenuTrigger
  ],
  templateUrl: './avatar-menu.component.html'
})
export class WowAvatarMenu {
  // private authService = inject(AuthService);
  private keycloak = inject(Keycloak);

  logout(): void {
    this.keycloak.logout().then();
  }

  // get userName(): string {
  //   const user = this.authService.getUserLogged();
  //   return `${ user.sNombres } ${ user.sApePaterno } ${ user.sApeMaterno }`;
  // }

  // get userRole(): string {
  //   const user = this.authService.getUserLogged();
  //   return user.aRol.sDescription
  // }

  // get cexName(): string {
  //   const cexId = this.authService.getCexSelected();
  //   const cexType = CEX_COLLECTION.find(cex => cex.id === cexId);
  //   return cexType ? cexType.name : 'Desconocido';
  // }

}


