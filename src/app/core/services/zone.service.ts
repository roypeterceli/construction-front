import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private ticketCreatedSource = new Subject<void>();
  ticketCreated$ = this.ticketCreatedSource.asObservable();

  constructor() { }
}

