import { Component, inject, signal, OnInit } from '@angular/core';
import { SaveNodeSupportDlgComponent } from '../components/save-node-support-dlg/save-node-support-dlg.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NodeSupport, TroncalSupport, ZoneSupport } from '@wow/core/interfaces';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WowTitle } from '@wow/shared/components/title';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'wow-troncal-detail',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    WowTitle,
    MatTabsModule,
  ],
  templateUrl: './troncal-detail.page.html',
  styleUrl: './troncal-detail.page.scss'
})
export class TroncalDetailPage implements OnInit {
  zone = signal<ZoneSupport | null>(null);
  troncal = signal<TroncalSupport | null>(null);
  node = signal<NodeSupport | null>(null);

  private route = inject(ActivatedRoute);

  private readonly dialog = inject(MatDialog);

  readonly department = signal('');
  readonly province = signal('');
  readonly district = signal('');

  ngOnInit(): void {
    this.troncal.set(this.route.snapshot.data['troncal']);
  }

  openSaveNodeDlg(){
    this.dialog.open(SaveNodeSupportDlgComponent, {
      role: 'dialog',
      data: {
        department: this.department(),
        province: this.province(),
        district: this.district(),
      }
    });
  }

  
}
