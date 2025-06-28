import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@wow/env/environment.development';
import { ApiResponse } from '@wow/shared/interfaces';
import { map, Subject, tap } from 'rxjs';
import { Zone } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private http = inject(HttpClient);
  
  departmentsList = signal<{ code: string; name: string }[]>([]);
  provincesList = signal<{ code: string; name: string }[]>([]);

  private zoneCreatedSource = new Subject<void>();
  // private troncalCreatedSource = new Subject<void>();
  // private nodeCreatedSource = new Subject<void>();
  zoneCreated$ = this.zoneCreatedSource.asObservable();
  // troncalCreated$ = this.troncalCreatedSource.asObservable();
  // nodeCreated$ = this.nodeCreatedSource.asObservable();


  constructor() {
    this.loadDepartments();
    this.loadProvinces('01');
  }

  private loadDepartments(): void {
    if (this.departmentsList().length === 0) {
      this.getAllDepartments().subscribe();
    }
  }

  private loadProvinces(code: string): void {
    if (this.provincesList().length === 0) {
      this.getProvinceByDepartment(code).subscribe();
    }
  }

  getAllDepartments() {
    return this.http.get<ApiResponse<{ code: string; name: string }[]>>(
      `${environment.api.construction}/ubigeo/departments`
    ).pipe(
      tap(res => this.departmentsList.set(res.data ?? []))
    );
  }

  getProvinceByDepartment(department_code: string) {
    return this.http.get<ApiResponse<{ code: string; name: string }[]>>(
      `${environment.api.construction}/ubigeo/departments/${department_code}/provinces`
    ).pipe(
      tap(res => this.provincesList.set(res.data ?? []))
    );
  }

  getById(id: number) {
    return this.http.get<ApiResponse<Zone>>(`${environment.api.construction}/zones/${id}`);
  }

  create(request: Zone) {
    return this.http.post<ApiResponse<Zone>>(`${environment.api.construction}/zones`, request);
  }

  update(id: number, data: Partial<Zone>) {
    return this.http.put<ApiResponse<Zone>>(`${environment.api.construction}/zones/${id}`, data);
  }

  // delete(zoneId: number) {
  //   return this.http.delete<ApiResponse<Zone>>(`${environment.api.construction}/zones/${zoneId}`);
  // }

  notifyZoneCreated(): void {
    this.zoneCreatedSource.next();
  }

  //fill table
  getAll() {
    return this.http.get<ApiResponse<Zone[]>>(`${ environment.api.construction }/zones`).pipe(
      map(res => {
        if (res && res.data) {
          return res.data.map(item => new Zone(item));
        }
        return [];
      })
    );
  }
}
