import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@wow/core/services';

import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private keycloak: KeycloakService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.keycloak.getToken()).pipe(
      switchMap((token) => {
        const headers = req.headers.set('Authorization', `Bearer ${token}`);
        const authReq = req.clone({ headers });
        return next.handle(authReq);
      })
    );
  }
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.token();

  if (!authToken) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${ authToken }`
    }
  });

  return next(authReq);
}