import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { WowDynamicTable } from '@wow/shared/components/table';
import { Zone } from '@wow/core/interfaces';
import { columns } from './zone-support.config';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingService, ZoneService } from '@wow/core/services';
import { Subject, merge, takeUntil, finalize, map, shareReplay } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UbigeoService } from '@wow/core/services/ubigeo.service';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
// import { AsyncPipe } from '@angular/common';
import { SaveZoneSupportDlgComponent } from '../components/save-zone-support-dlg/save-zone-support-dlg.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const TAILWIND_BREAKPOINTS = {
  sm: '(max-width: 639px)',
  md: '(min-width: 640px) and (max-width: 1023px)',
  lg: '(min-width: 1024px) and (max-width: 1279px)',
  xl: '(min-width: 1280px)',
};

@Component({
  selector: 'wow-zone-support-page',
  imports: [
    MatCardModule,
    WowDynamicTable,
    MatMenuModule,
    MatIconModule,
    MatFormField,
    MatLabel,
    MatSidenavModule,
    MatSelect, MatSelectModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatButtonModule
  ],
  templateUrl: './zone-support.page.html',
})
export class ZoneSupportPage implements OnInit, OnDestroy {

  readonly data = signal<Zone[]>([]);
  readonly loading = signal<boolean>(false);
  readonly columns = columns;

  ubigeoService = inject(UbigeoService);
  settingService = inject(SettingService);

  private readonly zoneSupportService = inject(ZoneService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroy$ = new Subject<void>();

  private breakpointObserver = inject(BreakpointObserver);

  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    merge(
      this.route.queryParams,
      this.zoneSupportService.zoneCreated$
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getZones());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToDetail(zone: Zone): void {
    this.router.navigate(['../', zone.zoneId, 'detalles'], { relativeTo: this.route }).then();
  }

  edit(zone: Zone): void {
    console.log(zone);
  }

  private getZones(): void {
    // const state = this.route.snapshot.queryParams['state'];
    this.loading.set(true);

    this.zoneSupportService.getAll()
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntil(this.destroy$)
      )
      .subscribe(zones => this.data.set(zones));
  }


  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([TAILWIND_BREAKPOINTS.sm, TAILWIND_BREAKPOINTS.md])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  openSaveZoneDlg(): void {
    this.dialog.open(SaveZoneSupportDlgComponent, {
      role: 'dialog',
      // panelClass: ['dialog-panel-fullscreen', 'dialog-panel-position-end', 'md:w-1/2', 'lg:w-1/3', 'w-full']
    });
  }


  filter(): void {
    return console.log('filtros');
    
  }

  clean(): void {
    return console.log('limpiar'); 
  }
}
