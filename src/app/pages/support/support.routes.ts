import { Routes } from '@angular/router';
import { SupportPage } from './support.page';
import { ZoneSupportPage } from './zone-support/zone-support.page';
import { ZoneDetailPage } from './zone-detail/zone-detail.page';
// import { ZoneDetailPage } from './zone-detail/zone-detail.page';
// import { zoneByIdResolver } from '@wow/core/resolvers';

export const routes: Routes = [
  {
    path: '',
    component: SupportPage,
    children: [
      {
        path: 'zonas',
        component: ZoneSupportPage,
      },
      {
        path: ':zonaId/troncales',
        // resolve: { zone: zoneByIdResolver },
        component: ZoneDetailPage
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'zonas'
      }
    ]
  }
];
