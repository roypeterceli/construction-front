import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GmapComponent } from './gmap.component';
import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';

import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { UbigeoModule } from '../ubigeo/ubigeo.module';

import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';

// Google Maps
import { AgmCoreModule } from '@agm/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { GeocodeService } from './gmap-geocoder.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [GmapComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    IconModule,
    MatIconModule,
    UbigeoModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBVlaW5kb4oDzjEcZYkJcgUBRV51gUBCz0',
      libraries: ['geometry', 'places']
    })
  ],
  exports: [
    GmapComponent
  ],providers: [
    // GeocodeService
  ]
})

export class GmapModule { }
