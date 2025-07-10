import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '@wow/shared/interfaces';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@wow/env/environment.development';
import { Node } from '../interfaces';
@Injectable({
  providedIn: 'root'
})
export class NodeService {

  private http = inject(HttpClient);

  private nodeCreatedSource = new Subject<void>();
  nodeCreated$ = this.nodeCreatedSource.asObservable();

  // constructor() { }

  getAllNodes() {
    // return this.http.get<ApiResponse<{ code: string; name: string }[]>>(
    //   `${environment.api.construction}/ubigeo/departments`
    // ).pipe(
    //   tap(res => this.departmentsList.set(res.data ?? []))
    // );
  }

  getNodesByTroncal() {
    // return this.http.get<ApiResponse<{ code: string; name: string }[]>>(
    //   `${environment.api.construction}/ubigeo/departments/${department_code}/provinces`
    // ).pipe(
    //   tap(res => this.provincesList.set(res.data ?? []))
    // );
  }

  //fill table nodes
  getAll() {
    return this.http.get<ApiResponse<Node[]>>(`${environment.api.construction}/nodes`).pipe(
      map(res => {
        if (res && res.data) {
          return res.data.map(item => new Node(item));
        }
        return [];
      })
    );
  }

  create(request: Node) {
    return this.http.post<ApiResponse<Node>>(`${environment.api.construction}/nodes`, request);
  }

  notifyNodeCreated(): void {
    this.nodeCreatedSource.next();
  }

  getById(id: number) {
    return this.http.get<ApiResponse<Node>>(`${environment.api.construction}/nodes/${id}`);
  }
}

