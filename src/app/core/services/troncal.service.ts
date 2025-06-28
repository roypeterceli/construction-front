import { inject, Injectable } from '@angular/core';
import { environment } from '@wow/env/environment.development';
import { Troncal } from '@wow/core/interfaces';
import { ApiResponse } from '@wow/shared/interfaces';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TroncalService {

  private http = inject(HttpClient);

  private troncalCreatedSource = new Subject<void>();
  troncalCreated$ = this.troncalCreatedSource.asObservable();

  getAll() {
    return this.http.get<ApiResponse<Troncal[]>>(`${ environment.api.construction }/troncals`).pipe(
      map(res => {
        if (res && res.data) {
          return res.data.map(item => new Troncal(item));
        }
        return [];
      })
    );
  }

  create(request: Troncal) {
    return this.http.post<ApiResponse<Troncal>>(`${ environment.api.construction }/troncals`, request);
  }

  notifyTicketCreated(): void {
    this.troncalCreatedSource.next();
  }

}

