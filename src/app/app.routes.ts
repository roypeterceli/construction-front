import { Routes } from '@angular/router';
import { AuthLayout } from '@wow/layout/auth';
import { ShellLayout } from '@wow/layout/shell';
// import { authGuard } from '@wow/core/guards';
// import { canActivateAuthRole } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.routes)
  },
  {
    path: '',
    component: ShellLayout,
    // canActivate: [canActivateAuthRole],
    data: { role: 'admin' },
    children: [
      {
        path: 'construccion',
        loadChildren: () => import('./pages/support/support.routes').then(m => m.routes)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'construccion'
      }
    ]
  }
];
