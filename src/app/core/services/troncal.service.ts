import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@wow/env/environment.development';
import { Troncal, Zone } from '@wow/core/interfaces';
import { ApiResponse } from '@wow/shared/interfaces';
import { map, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TroncalService {

  private http = inject(HttpClient);

  private troncalCreatedSource = new Subject<void>();
  troncalCreated$ = this.troncalCreatedSource.asObservable();

  zone = signal<Zone | null>(null);

  departmentCode = '05';
  // departmentCode = signal<Zone | null>(null);
  provinceCode = '0503';
  // provinceCode = signal<Zone | null>(null);

  districtsList = signal<{ code: string; name: string }[]>([]);

  loadDistricts(department_code: string, province_code: string): void{
    
  }
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

  notifyTroncalCreated(): void {
    this.troncalCreatedSource.next();
  }


  getById(id: number) {
    return this.http.get<ApiResponse<Zone>>(`${environment.api.construction}/troncals/${id}`);
  }

}

