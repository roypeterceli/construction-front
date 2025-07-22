import { Injectable, signal } from '@angular/core';
import {PORT} from '@wow/core/interfaces';
@Injectable({
  providedIn: 'root'
})
export class PortService {

  ports = signal<{ id: number; value: string }[]>(PORT);

  constructor() { }


}
