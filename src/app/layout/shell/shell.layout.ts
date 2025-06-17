import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { WowAvatarMenu, WowMenubar } from '@wow/shared/components/menu';
import { SettingService } from '@wow/core/services';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { Module, ZoneStateType} from '@wow/core/interfaces';
import { SaveZoneSupportDlgComponent } from '@wow/pages/support/components/save-zone-support-dlg/save-zone-support-dlg.component';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { FormGroup } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';




const TAILWIND_BREAKPOINTS = {
  sm: '(max-width: 639px)',
  md: '(min-width: 640px) and (max-width: 1023px)',
  lg: '(min-width: 1024px) and (max-width: 1279px)',
  xl: '(min-width: 1280px)',
};

@Component({
  selector: 'wow-shell-layout',
  imports: [
    RouterOutlet,
    WowMenubar,
    WowAvatarMenu,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatFormField,
    MatLabel,
    MatSelect,MatSelectModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, 
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './shell.layout.html',
  styleUrl: './shell.layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellLayout implements OnInit {
  selected = 'option1';
  ubigeoForm = new FormGroup<any>({});
  subModules = signal<Module[] | null | undefined>([]);
  selectedZoneState = signal<ZoneStateType | null | undefined>(null);
  settingService = inject(SettingService);
  private breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  protected readonly zoneState = ZoneStateType;


  // departments = this.ubigeoForm.value as UbigeoServiceResponse;


  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([TAILWIND_BREAKPOINTS.sm, TAILWIND_BREAKPOINTS.md])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.getSubModules();
  }

  openSaveZoneDlg(): void {
    this.dialog.open(SaveZoneSupportDlgComponent, {
      role: 'dialog',
      // panelClass: ['dialog-panel-fullscreen', 'dialog-panel-position-end', 'md:w-1/2', 'lg:w-1/3', 'w-full']
    });
  }

  getZoneFilter(state?: ZoneStateType): void {
    this.selectedZoneState.set(state);
    this.router.navigate(['/zonas', 'zonas'], { queryParams: { state: state } }).then();
  }

  private getSubModules(): void {
    const subModule = this.settingService.getSubModules(1);
    this.subModules.set(subModule?.children);
  }

  departmentChange():void{
    
  }

  filter():void{
    
  }

  clean():void{
    
  }

}
