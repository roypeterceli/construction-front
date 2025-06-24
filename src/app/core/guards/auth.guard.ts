// import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
// import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { inject } from '@angular/core';

// const isAccessAllowed = async (
//   route: ActivatedRouteSnapshot,
//   __: RouterStateSnapshot,
//   authData: AuthGuardData
// ): Promise<boolean | UrlTree> => {
//   const { authenticated, grantedRoles } = authData;

//   const requiredRole = route.data['role'];
//   if (!requiredRole) {
//     return false;
//   }

//   const hasRequiredRole = (role: string): boolean =>
//     Object.values(grantedRoles.resourceRoles).some((roles) => roles.includes(role));

//   if (authenticated && hasRequiredRole(requiredRole)) {
//     return true;
//   }

//   const router = inject(Router);
//   // return router.parseUrl('/auth/login');
// };

// export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);

// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  __: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;

  const requiredRole = route.data['role'];
  if (!requiredRole) {
    return false;
  }

  const hasRequiredRole = (role: string): boolean =>
    Object.values(grantedRoles.resourceRoles).some((roles) => roles.includes(role));

  if (authenticated && hasRequiredRole(requiredRole)) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/unauthorized');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
 