import { inject, Injectable, signal } from '@angular/core';
// import { IDENTITY_DOCUMENT_TYPES, ISSUE_TYPES, Module, SOLICITUDE_TYPES, CEX_COLLECTION } from '@wow/core/interfaces';
import {STATE_CONSTRUCTION} from '@wow/core/interfaces';
import { Module } from '@wow/core/interfaces';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '@wow/shared/interfaces';
import { environment } from '@wow/env/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  modules = signal<Module[]>([]);
  // documentTypes = signal(IDENTITY_DOCUMENT_TYPES);
  // processTypes = signal<{ id: number; name: string }[]>([]);
  stateConstruction = signal<{ id: number; name: string }[]>(STATE_CONSTRUCTION);
  departments = signal<{ id: number; name: string }[]>([]);
  // issueTypes = signal<{ id: number; name: string }[]>(ISSUE_TYPES);
  // department = signal<{ department_code: string; department_name: string }[]>([]);
  // province = signal<{ province_code: string; province_name: string }[]>([]);

  // private http = inject(HttpClient);

  constructor() {
    this.getModules();
    // this.loadProcessTypes();
    // this.loadDepartments();
    // this.loadProvinces();
  }

  private getModules() {
    this.modules.set([
      {
        id: 1,
        name: 'Construcción',
        path: ['zonas'],
        children: [
          {
            id: 1,
            name: 'Zonas',
            icon: 'view_list',
            path: ['/zonas']
          },
          {
            id: 2,
            name: 'Troncales',
            icon: 'inbox',
            path: ['/troncales']
          },
          {
            id: 3,
            name: 'Nodos',
            icon: 'view_module',
            path: ['/nodos']
          }
        ]
      }
    ])
  }

  getSubModules(moduleId: number) {
    return this.modules().find(module => module.id === moduleId);
  }

  // private loadDepartments(): void {
  //   if (this.departments().length === 0) {
  //     this.getDepartments().subscribe();
  //   }
  // }

  // private loadProvinces(): void {
  //   if (this.province().length === 0) {
  //     this.getProvinces().subscribe();
  //   }
  // }

  // getDepartments() {
  //   return this.http.get<ApiResponse<{
  //     department_code: string; 
  //     department_name: string
  //   }[]>>(`${ environment.api.construction }/ubigeo/departments`).pipe(
  //     tap(res => this.departments.set(res.data ?? []))
  //   );
  // }

  // getProvinces() {
  //   return this.http.get<ApiResponse<{
  //     province_code: string; 
  //     province_name: string
  //   }[]>>(`${ environment.api.construction }/ubigeo/departments/${this.province}/provinces`).pipe(
  //     tap(res => this.province.set(res.data ?? []))
  //   );
  // }
}
