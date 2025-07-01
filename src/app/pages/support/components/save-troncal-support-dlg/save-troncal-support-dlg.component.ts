import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { AlertDialogService } from '@wow/shared/components/alert';
import { SettingService, TroncalService} from '@wow/core/services';
import { Troncal, Zone, ZoneSupport } from '@wow/core/interfaces';
import { FormValidator } from '@wow/shared/utils';
import { ScreenLoaderService } from '@wow/shared/components/loader';
import { finalize, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from '@wow/shared/interfaces';
import { environment } from '@wow/env/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'wow-save-troncal-support-dlg',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './save-troncal-support-dlg.component.html'
})
export class SaveTroncalSupportDlgComponent implements OnInit {

  // selected = 'option1';

  troncalForm = new FormGroup<any>({});
  formValidator!: FormValidator;
  // showFields = signal<boolean>(false);
  settingService = inject(SettingService);
  // zoneService = inject(ZoneService);
  private screenLoaderService = inject(ScreenLoaderService)
  // private zoneService = inject(ZoneService);
  private alertService = inject(AlertDialogService);
  // private authService = inject(AuthService);
  // troncalService = inject(TroncalService);
  private router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<SaveTroncalSupportDlgComponent>);
  // private route = inject(ActivatedRoute);

  // readonly data = inject<ZoneSupport>(MAT_DIALOG_DATA);

  public http = inject(HttpClient);
  zone = signal<ZoneSupport | null>(null);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { zone: ZoneSupport },
    public troncalService: TroncalService
  ) {}


 ngOnInit(): void {
    this.initTroncalForm();
    // this.loadDistricts('04','0404');
    // this.troncalService.districtsList('04','0404');
  }

  createTroncal(): void {

    if (this.troncalForm.invalid) {
      this.troncalForm.markAllAsTouched();
      return;
    }

    this.screenLoaderService.show();
    // const troncal = this.troncalForm.value as Troncal;
    console.log('Payload a enviar:', this.troncalForm.value);
    this.troncalService.create(this.troncalForm.value)
      .pipe(
        finalize(() => this.screenLoaderService.hide())
      )
      .subscribe(res => {
        if (res && res.data) {
          this.closeDlg(res.data);
          this.successMessage(res.data);
          this.troncalService.notifyTroncalCreated();
        }
      })
  }

  getParams(zone: Zone): void{
    zone.ubigeoDepartmentId,
    zone.ubigeoProvinceId,
    zone.zoneCode
  }

  zona(zone: Zone): void {
    console.log(zone);
  }


  closeDlg(data?: any): void {
    this.dialogRef.close(data);
  }

  private successMessage(troncal: Troncal): void {
    const alertRef = this.alertService.success({
      title: `Troncal creada: ${ troncal.idTroncal }`,
      message: 'La Troncal ha sido creada',
      actionButtonsAlign: 'end',
      confirmButton: { text: 'Ver troncal', style: 'flat' },
      cancelButton: { text: 'Cerrar' }
    });

    alertRef.afterClosed().subscribe(res => {
      if (res && res.isConfirmed) {
        this.router.navigate(['/construccion', troncal.idTroncal, 'detalles']).then();
      }
    });
  }

  
  private initTroncalForm(): void {
    this.troncalForm = this.fb.group({
      ubigeoDistrictId: [null, [Validators.required]],
      troncalCode: [null, [Validators.required]],
      prefix: [null, [Validators.required]],
      nodeStart: [null, [Validators.required]],
      nodeEnd: [null, [Validators.required]]
    });

  }




}
