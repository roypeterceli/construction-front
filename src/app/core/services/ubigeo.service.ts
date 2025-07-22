// import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { DEP_COLLECTION } from '../interfaces/ubigeo';
// import { FormGroup } from '@angular/forms';
// import { environment } from '@wow/env/environment.development';
// import { ApiResponse } from '@wow/shared/interfaces';
// import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {
  departments = signal<{ department_code: string; department_name: string }[]>(DEP_COLLECTION);
  // zoneForm = new FormGroup<any>({});

  
  // private http = inject(HttpClient);
  
  // constructor() { 
  //   this.loadDepartments();
    
  // }

  // private loadDepartments(): void {
  //   if (this.departments().length === 0) {
  //     this.getDepartments().subscribe();
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



  // departmentChange():void {
  //   const departmentCode = this.zoneForm.controls['ubigeo_department'].value;
  //   const ubigeo_department = this.zoneForm.departments().find(t => t.department_code === departmentCode);
  // }
}

