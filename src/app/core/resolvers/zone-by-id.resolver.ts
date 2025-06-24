import { ResolveFn } from '@angular/router';
import { Zone } from '@wow/core/interfaces';
import { inject } from '@angular/core';
import { ZoneService } from '@wow/core/services';
import { map } from 'rxjs';

export const zoneByIdResolver: ResolveFn<Zone> = (route, state) => {
  const zoneSupportService = inject(ZoneService);
  const id = route.paramMap.get('zoneId');
  if (!id) {
    throw new Error('Zone id not found in url');
  }

  return zoneSupportService.getById(Number(id)).pipe(
    map(res => new Zone(res.data!))
  );
};
