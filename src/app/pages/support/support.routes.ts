import { Routes } from '@angular/router';
import { SupportPage } from './support.page';
import { ZoneSupportPage } from './zone-support/zone-support.page';
import { ZoneDetailPage } from './zone-detail/zone-detail.page';
import { zoneByIdResolver } from '@wow/core/resolvers';
import { TroncalDetailPage } from './troncal-detail/troncal-detail.page';
// import { NodeDetailPage } from './node-detail/node-detail.page';

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
        // path: ':zonaId/troncales',
        path: ':zoneId/detalles',
        resolve: { zone: zoneByIdResolver },
        component: ZoneDetailPage
      },
      {
        path: ':zoneId/:troncalId/detalles',
        resolve: { zone: zoneByIdResolver },
        component: TroncalDetailPage
      },
      // {
      //   path: ':zoneId/:troncalId/:nodeId/detalles',
      //   resolve: { zone: zoneByIdResolver },
      //   component: NodeDetailPage
      // },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'zonas'
      }
    ]
  }
];
