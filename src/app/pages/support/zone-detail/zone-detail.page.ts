import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ZoneSupport } from '@wow/core/interfaces';
import { WowTitle } from '@wow/shared/components/title';
import { MatTabsModule} from '@angular/material/tabs';
import { ContentTroncalComponent } from '../components/content-troncal/content-troncal.component';

import { MatDialog } from '@angular/material/dialog';
import { SaveTroncalSupportDlgComponent } from '../components/save-troncal-support-dlg/save-troncal-support-dlg.component';
import { MapTroncalComponent } from '../components/map-troncal/map-troncal.component';


@Component({
  selector: 'wow-zone-detail',
  imports: [    
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    WowTitle,
    MatTabsModule,
    ContentTroncalComponent, MapTroncalComponent
    ],
  templateUrl: './zone-detail.page.html',
  styleUrl: './zone-detail.page.scss'
})
export class ZoneDetailPage implements OnInit{
  zone = signal<ZoneSupport | null>(null);
  private route = inject(ActivatedRoute);
  
  readonly department = signal('');
  readonly province = signal('');
  readonly zoneCode = signal('');
  private readonly dialog = inject(MatDialog);
  
  ngOnInit(): void {
    this.zone.set(this.route.snapshot.data['zone']);
  }


  openSaveTroncalDlg(){
    this.dialog.open(SaveTroncalSupportDlgComponent, {
      role: 'dialog',
      data: {
        department: this.department(),
        province: this.province(),
        zoneCode: this.zoneCode(),
      }
    });
  }


}
