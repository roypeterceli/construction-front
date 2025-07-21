import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { SaveNodeSupportDlgComponent } from '../components/save-node-support-dlg/save-node-support-dlg.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeSupport, TroncalSupport, ZoneSupport } from '@wow/core/interfaces';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WowDynamicTable } from '@wow/shared/components/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Node } from '@wow/core/interfaces';
import { WowTitle } from '@wow/shared/components/title';
import { NodeService } from '@wow/core/services';
import { finalize, merge, Subject, takeUntil } from 'rxjs';
import { columns } from './troncal-detail.config';
import { ShowNodeSupportComponent } from '../components/show-node-support/show-node-support.component';
import { NgIf } from '@angular/common';



@Component({
  selector: 'wow-troncal-detail',
  imports: [
    WowTitle,
    MatCardModule,
    WowDynamicTable,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule, MatSelectModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatButtonModule,
    ShowNodeSupportComponent, NgIf
  ],
  templateUrl: './troncal-detail.page.html',
  styleUrl: './troncal-detail.page.scss'
})
export class TroncalDetailPage implements OnInit, OnDestroy {

  readonly data = signal<Node[]>([]);
  readonly loading = signal<boolean>(false);

  readonly zone = signal<ZoneSupport | null>(null);
  readonly troncal = signal<TroncalSupport | null>(null);
  readonly node = signal<NodeSupport | null>(null);

  private readonly nodeSupportService = inject(NodeService);

  private route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  readonly columns = columns;
  private readonly destroy$ = new Subject<void>();

  readonly department = signal('');
  readonly province = signal('');
  readonly district = signal('');

  ngOnInit(): void {
    // this.troncal.set(this.route.snapshot.data['troncal']);
    const zoneData = this.route.snapshot.data['zone'] as ZoneSupport;
    if (zoneData) {
      this.zone.set(zoneData);
    }
    merge(
      this.route.queryParams,
      this.nodeSupportService.nodeCreated$
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getNodes());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openSaveNodeDlg() {
    this.dialog.open(SaveNodeSupportDlgComponent, {
      role: 'dialog',
      data: {
        department: this.department(),
        province: this.province(),
        district: this.district(),
      }
    });
  }

  goToDetail(node: Node): void {
    this.router.navigate(['../', node.nodeId, 'detalles'], { relativeTo: this.route }).then();
  }


  edit(node: Node): void {
    console.log(node);
  }


  private getNodes(): void {
    // const state = this.route.snapshot.queryParams['state'];
    // this.loading.set(true);
    const troncalId = Number(this.route.snapshot.paramMap.get('troncalId')); // ← aquí se toma el ID dinámicamente

    if (!troncalId) return;

    this.loading.set(true);

    this.nodeSupportService.getAllByTroncal(troncalId)
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntil(this.destroy$)
      )
      .subscribe(nodes => this.data.set(nodes));
  }
}
