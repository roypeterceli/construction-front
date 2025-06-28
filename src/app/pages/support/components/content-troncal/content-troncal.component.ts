import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { columns } from '../../zone-detail/zone-detail.config';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormField, MatLabel, MatSelect, MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Troncal } from '@wow/core/interfaces';
import { SettingService, TroncalService } from '@wow/core/services';
import { UbigeoService } from '@wow/core/services/ubigeo.service';
import { WowDynamicTable } from '@wow/shared/components/table';
import { finalize, merge, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'wow-content-troncal',
  imports: [    
    MatCardModule,
    WowDynamicTable,
    MatMenuModule,
    MatIconModule,
    MatFormField,
    MatLabel,
    MatSelect, MatSelectModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatButtonModule],
  templateUrl: './content-troncal.component.html',
  styleUrl: './content-troncal.component.scss'
})
export class ContentTroncalComponent implements OnInit{

  readonly data = signal<Troncal[]>([]);
  readonly loading = signal<boolean>(false);
  readonly columns = columns;
  ubigeoService = inject(UbigeoService);
  settingService = inject(SettingService);
  
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroy$ = new Subject<void>();
  
  private readonly troncalSupportService = inject(TroncalService);

  ngOnInit(): void {
    merge(
      this.route.queryParams,
      this.troncalSupportService.troncalCreated$
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getTroncal());
  }

  private getTroncal(): void {
    this.loading.set(true);

    this.troncalSupportService.getAll()
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntil(this.destroy$)
      )
      .subscribe(troncal => this.data.set(troncal));
  }

  goToDetail(troncal: Troncal): void {
    this.router.navigate(['../', troncal.idTroncal, 'detalles'], { relativeTo: this.route }).then();
  }

  
  edit(troncal: Troncal): void {
    console.log(troncal);
  }

  filter(): void {

  }

  clean(): void {

  }
}
