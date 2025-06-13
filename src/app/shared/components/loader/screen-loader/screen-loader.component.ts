import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ScreenLoaderService } from './screen-loader.service';

@Component({
  selector: 'wow-screen-loader',
  imports: [AsyncPipe],
  templateUrl: './screen-loader.component.html'
})
export class WowScreenLoader {
  loadingService = inject(ScreenLoaderService);
}
