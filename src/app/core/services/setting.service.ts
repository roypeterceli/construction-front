import { inject, Injectable, signal } from '@angular/core';
// import { IDENTITY_DOCUMENT_TYPES, ISSUE_TYPES, Module, SOLICITUDE_TYPES, CEX_COLLECTION } from '@wow/core/interfaces';
import {STATE_CONSTRUCTION} from '@wow/core/interfaces';
import { Module } from '@wow/core/interfaces';
import { HttpClient } from '@angular/common/http';
// import { ApiResponse } from '@wow/shared/interfaces';
// import { environment } from '@wow/env/environment.development';
// import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  modules = signal<Module[]>([]);
  // documentTypes = signal(IDENTITY_DOCUMENT_TYPES);
  // processTypes = signal<{ id: number; name: string }[]>([]);
  stateConstruction = signal<{ id: number; name: string }[]>(STATE_CONSTRUCTION);
  // departments = signal<{ id: number; name: string }[]>([]);
  // issueTypes = signal<{ id: number; name: string }[]>(ISSUE_TYPES);
  
  // province = signal<{ province_code: string; province_name: string }[]>([]);

  // private http = inject(HttpClient);

  constructor() {
    this.getModules();
  }

  private getModules() {
    this.modules.set([
      {
        id: 1,
        name: 'Construcción',
        path: ['zonas'],
       
        // children: [
        //   {
        //     id: 1,
        //     name: 'Zonas',
        //     icon: 'view_list',
        //     path: ['/zonas']
        //   },
        //   {
        //     id: 2,
        //     name: 'Troncales',
        //     icon: 'inbox',
        //     path: ['/troncales']
        //   },
        //   {
        //     id: 3,
        //     name: 'Nodos',
        //     icon: 'view_module',
        //     path: ['/nodos']
        //   }
        // ]
      },
      {
        id: 2,
        name: 'Reportes',
        path: ['reportes'],
      },
      {
        id: 3,
        name: 'Notificaciones',
        path: ['notificaciones'],
      },
      {
        id: 4,
        name: 'Documentación',
        path: ['documentacion'],
      }
    ])
  }

  getSubModules(moduleId: number) {
    return this.modules().find(module => module.id === moduleId);
  }

  

}
