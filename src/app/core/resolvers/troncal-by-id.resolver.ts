import { ResolveFn } from '@angular/router';
import { Troncal } from '@wow/core/interfaces';
import { inject } from '@angular/core';
import { TroncalService } from '@wow/core/services';
import { map } from 'rxjs';

export const troncalByIdResolver: ResolveFn<Troncal> = (route, state) => {
  const troncalSupportService = inject(TroncalService);
  const id = route.paramMap.get('troncalId');
  if (!id) {
    throw new Error('Troncal id not found in url');
  }

  return troncalSupportService.getById(Number(id)).pipe(
    map(res => new Troncal(res.data!))
  );
};
