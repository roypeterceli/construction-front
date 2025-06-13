// import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
// import { catchError, throwError } from 'rxjs';
// import { inject } from '@angular/core';
// import { environment } from '@wow/env/environment';
// import { AlertDialogService } from '@wow/shared/components/alert';

// export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
//   const alertService = inject(AlertDialogService);

//   return next(req).pipe(
//     catchError((error: HttpErrorResponse) => {
//       let errorRes = getErrorMessageForUrl(req.url, error);

//       alertService.error({
//         title: errorRes.title || 'Algo salió mal',
//         message: errorRes.message,
//         confirmButton: { text: 'Cerrar' }
//       });

//       return throwError(() => new Error(errorRes.message));
//     })
//   );
// };

// function getErrorMessageForUrl(url: string, error: HttpErrorResponse): { title?: string, message: string } {
//   if (url === `${ environment.keycloak.config.url }/auth/login`) {
//     if (error.status === 406) {
//       const { sCodigo, sMessage } = error.error;
//       const title = sCodigo ? '¡Usuario bloqueado!' : 'Información';
//       return { title, message: sMessage };
//     }
//   }

//   return getGenericErrorMessage(error);
// }

// function getGenericErrorMessage(error: HttpErrorResponse): { title?: string, message: string } {
//   const errorMessages: Record<number, string> = {
//     0: 'No podemos conectar al servidor en este momento. Intenta más tarde.',
//     400: 'Tu solicitud tiene algunos errores. Por favor, corrígelos y prueba de nuevo.',
//     401: 'Acceso restringido. Asegúrate de estar autenticado y con permisos.',
//     403: 'Acceso denegado. No tienes los permisos necesarios.',
//     404: 'Lo sentimos, no pudimos encontrar el recurso solicitado.',
//     500: 'Ups, algo salió mal. Estamos trabajando para solucionarlo.'
//   };

//   const message = errorMessages[error.status] || `Error desconocido: ${ error.statusText }`;
//   return { message };
// }

import { HttpInterceptorFn } from '@angular/common/http';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
