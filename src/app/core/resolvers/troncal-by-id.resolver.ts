// import { ResolveFn } from '@angular/router';
// import { Troncal } from '@wow/core/interfaces';
// import { inject } from '@angular/core';
// import { ZoneService } from '@wow/core/services';
// import { map } from 'rxjs';

// export const troncalByIdResolver: ResolveFn<Troncal> = (route, state) => {
//   const troncalSupportService = inject(ZoneService);
//   const id = route.paramMap.get('troncal_id');
//   if (!id) {
//     throw new Error('Troncal id not found in url');
//   }

//   return troncalSupportService.getById(Number(id)).pipe(
//     map(res => new Zone(res.data!))
//   );
// };
