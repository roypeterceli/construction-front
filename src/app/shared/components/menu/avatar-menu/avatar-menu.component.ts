import { Component, inject } from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatRipple } from "@angular/material/core";
import { AuthService } from '@wow/core/services';

import Keycloak, { KeycloakProfile } from 'keycloak-js';
// import { CEX_COLLECTION } from '@wow/core/interfaces';


@Component({
  selector: 'wow-avatar-menu',
  imports: [
    MatMenu,
    MatMenuItem,
    MatRipple,
    MatMenuTrigger,
  ],
  templateUrl: './avatar-menu.component.html'
})
export class WowAvatarMenu {
  private authService = inject(AuthService);
  profile: KeycloakProfile | null = null;
  private keycloak = inject(Keycloak);
  private userProfile: KeycloakProfile | null = null;
  logout(): void {
    this.keycloak.logout().then();
  }

  // getProfile(): void {
  //   this.keycloak.loadUserProfile()
  //     .then(profile => {
  //       this.profile = profile;
  //       console.log(this.profile)
  //     })
  //     .catch(err => {
  //       console.error('Error loading user profile:', err);
  //     });
  // }

  // get userName(): string{
  //   const user = this.authService.getProfile();
  //   return `${user.profile?.firstName} ${user.profile?.lastName}`;
  // }

  // getEmail(): string | undefined {
  //   return this.keycloakService.getKeycloakInstance().tokenParsed?.email;
  // }

  // getFullName(): string | undefined {
  //   return this.keycloak?.tokenParsed?.session_state;
  // }

    private loadUserProfile(): Promise<void> {
      return this.keycloak.loadUserProfile().then((profile) => {
        this.userProfile = profile;
      });
    }
    
    getUserProfile(): KeycloakProfile | null {
      return this.userProfile;
    }

    getUsername(): string | undefined {
        return this.userProfile?.username;
      }

    getEmail(): string | undefined {
      return this.userProfile?.email;
    }

}


