import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { WowDynamicTable } from '@wow/shared/components/table';
import { ZoneSupport } from '@wow/core/interfaces';
import { columns } from './zone-support.config';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneService } from '@wow/core/services';
import { Subject, merge, takeUntil, finalize } from 'rxjs';

@Component({
  selector: 'wow-zone-support-page',
  imports: [
    MatCardModule,
    WowDynamicTable
  ],
  templateUrl: './zone-support.page.html',
})
export class ZoneSupportPage implements OnInit, OnDestroy {

  readonly data = signal<ZoneSupport[]>([]);
  readonly loading = signal<boolean>(false);
  readonly columns = columns;

  private readonly zoneSupportService = inject(ZoneService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroy$ = new Subject<void>();

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

  goToDetail(zone: ZoneSupport): void {
    this.router.navigate(['../', zone.zone_id, 'detalles'], { relativeTo: this.route }).then();
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

}
