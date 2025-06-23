import Keycloak from 'keycloak-js';

export class KeycloakService {
  private keycloak!: Keycloak;

  init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.keycloak = new Keycloak({
        url: 'http://localhost:8080/auth',
        realm: 'construction-realm',
        clientId: 'connection-client'
      });

      this.keycloak
        .init({
          onLoad: 'login-required',
          checkLoginIframe: false,
        })
        .then((authenticated) => {
          resolve(authenticated);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getToken(): string | undefined {
    return this.keycloak?.token;
  }

  logout(): void {
    this.keycloak?.logout();
  }

  getUsername(): string | undefined {
    return this.keycloak?.tokenParsed?.session_state;
  }

  isLoggedIn(): boolean {
    return !!this.keycloak?.token;
  }
}