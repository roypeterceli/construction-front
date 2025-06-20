import { computed, inject, Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { environment } from '@wow/env/environment';
import { map } from 'rxjs';
import { User } from '@wow/core/interfaces';

export const USER_LOCAL_STORAGE_KEY = 'user';
export const TOKEN_LOCAL_STORAGE_KEY = 'token';
export const ALLOWED_ID_ROLES = [4, 11, 25,  42, 43, 98];

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = computed(() => this.getUser());
  token = computed(() => this.getToken());
  userLoggedIn = computed(() => !!this.token());

  // private http = inject(HttpClient);

  // login(email: string, password: string) {
    // const request = { email, password };
    // return this.http.post(`${ environment.keycloak.config.url }/auth/login`, request).pipe(
    //   map((res: any) => {
    //     const user: User = res.aUsuario;
    //     if (user.aRol && ALLOWED_ID_ROLES.includes(user.aRol.nIdRol)) {
    //       this.setUserData(user, res.stoken);
    //       return { status: true, data: res };
    //     } else {
    //       return {status: false, data: null};
    //     }
    //   })
    // );
  // }

  // register(email: string, password: string) {
  //   const request = { email, password };
  //   return this.http.post(`${ environment.keycloak.config.url }/auth/register`, request).pipe(
  //     map((res: any) => {
  //       const user: User = res.aUsuario;
  //       if (user.aRol && ALLOWED_ID_ROLES.includes(user.aRol.nIdRol)) {
  //         this.setUserData(user, res.stoken);
  //         return { status: true, data: res };
  //       } else {
  //         return {status: false, data: null};
  //       }
  //     })
  //   );
  // }

  // logout(): void {
    // localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    // localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
  //   const request = { email, password };
  //   return this.http.post(`${ environment.keycloak.config.url }/auth/logout`, request).pipe(
  //     map((res: any) => {
  //       const user: User = res.aUsuario;
  //       if (user.aRol && ALLOWED_ID_ROLES.includes(user.aRol.nIdRol)) {
  //         this.setUserData(user, res.stoken);
  //         return { status: true, data: res };
  //       } else {
  //         return {status: false, data: null};
  //       }
  //     })
  //   );
  // }

  logout(): void {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
  }
  
  getUserLogged() {
    const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  }

  isTokenExpired(token: string): boolean {
    const exp = this.getTokenExpiration(token);
    return exp ? Date.now() > exp : true;
  }

  private getTokenExpiration(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? payload.exp * 1000 : null;
    } catch (e) {
      return null;
    }
  }

  private setUserData(user: any, token: string) {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
  }

  private getUser(): User | null | undefined {
    const json = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    return json ? JSON.parse(json) : null;
  }

  private getToken(): string | null {
    return localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  }

}
