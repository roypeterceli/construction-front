import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { WowDynamicTable } from '@wow/shared/components/table';
import { StateType, Zone } from '@wow/core/interfaces';
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
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

const TAILWIND_BREAKPOINTS = {
  sm: '(max-width: 639px)',
  md: '(min-width: 640px) and (max-width: 1023px)',
  lg: '(min-width: 1024px) and (max-width: 1279px)',
  xl: '(min-width: 1280px)',
};

@Component({
  selector: 'wow-zone-support-page',
  standalone: true,
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
    MatButtonModule, ReactiveFormsModule
  ],
  templateUrl: './zone-support.page.html',
})
export class ZoneSupportPage implements OnInit, OnDestroy {

  selectedZoneState = signal<StateType | null | undefined>(null);

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

    const filters = this.formFilter.value;

    this.zoneSupportService.getZones(filters)
    .pipe(
      finalize(() => this.loading.set(false)),
      takeUntil(this.destroy$)
    )
    .subscribe(zones => this.data.set(zones));

    // this.zoneSupportService.getAll()
    //   .pipe(
    //     finalize(() => this.loading.set(false)),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe(zones => this.data.set(zones));

  }


  formFilter: FormGroup;
  private fb = inject(FormBuilder);
  private zoneService = inject(ZoneService);

  constructor() {
    this.formFilter = this.fb.group({
      ubigeoDepartmentId: [''],
      state_construction: [''],
      creation_date: ['']
    });
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


  filter() {
    const filters = this.formFilter.value;
    this.loading.set(true);
    // this.zoneService.getZones(filters).subscribe((response) => {
    //   console.log('Zonas filtradas:', response);
    // });
    this.zoneService.getZones(filters)
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe((response) => {
      this.data.set(response); // ✅ Mostrar en la tabla
    });
  }

  clean() {
    this.formFilter.reset();
    this.getZones();
  }

  getZoneFilter(state?: StateType): void {
    this.selectedZoneState.set(state);
    this.router.navigate(['/zones', 'zone'], {
      queryParams: { state: state },
      queryParamsHandling: 'merge',
      replaceUrl: true
    }).then();
  }

  private getZoneStateFromParam(): void {
    const param = this.route.snapshot.queryParams['state'];
    const state = Number(param);
    this.selectedZoneState.set(!isNaN(state) ? state : null);
  }
}
