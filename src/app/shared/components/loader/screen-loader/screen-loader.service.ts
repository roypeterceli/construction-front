import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenLoaderService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _message$ = new BehaviorSubject<string>('');
  private loadingTimeout: any;
  private hideTimeout: any;

  get loading$() {
    return this._loading$.asObservable();
  }

  get message$() {
    return this._message$.asObservable();
  }

  show(message = ''): void {
    clearTimeout(this.loadingTimeout);
    clearTimeout(this.hideTimeout);

    this._message$.next(message);
    this._loading$.next(true);
  }

  hide(): void {
    if (!this.loadingTimeout) {
      this.hideTimeout = setTimeout(() => {
        this._loading$.next(false);
        this._message$.next('');
      }, 1000);
    } else {
      this._loading$.next(false);
      this._message$.next('');
    }
  }

}
