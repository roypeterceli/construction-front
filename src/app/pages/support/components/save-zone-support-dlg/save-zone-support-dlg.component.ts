import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { AlertDialogService } from '@wow/shared/components/alert';
import { AuthService} from '@wow/core/services';
import { ZoneSupport } from '@wow/core/interfaces';
import { FormValidator } from '@wow/shared/utils';
import { ScreenLoaderService } from '@wow/shared/components/loader';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';


const FORM_ERROR_MESSAGES = {
  name: { pattern: 'Solo se permite letras' },
  last_name: { pattern: 'Solo se permite letras' },
  phone: { pattern: 'El celular debe empezar con 9' }
};

const FORM_CONTROL_DYNAMIC = ['solicitude_type', 'issue_type_id', 'comment', 'is_preference'];

@Component({
  selector: 'wow-save-zone-support-dlg',
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
  templateUrl: './save-zone-support-dlg.component.html'
})
export class SaveZoneSupportDlgComponent implements OnInit {

  selected = 'option1';

  zoneForm = new FormGroup<any>({});
  formValidator!: FormValidator;
  showFields = signal<boolean>(false);
  isCustomer = signal<boolean>(false);
  isSearching = signal<boolean>(false);
  // settingService = inject(SettingService);
  private screenLoaderService = inject(ScreenLoaderService)
  // private zoneService = inject(ZoneService);
  private alertService = inject(AlertDialogService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<SaveZoneSupportDlgComponent>);

  documentNumAttrs = {
    minlength: 0,
    maxlength: 100,
    pattern: ''
  };

  ngOnInit(): void {
    this.initZoneForm();
  }

  createZone(): void {
    if (this.zoneForm.invalid) {
      this.zoneForm.markAllAsTouched();
      return;
    }

    this.screenLoaderService.show();
    const zone = this.zoneForm.value as ZoneSupport;
    // zone.created_by = this.authService.currentUser()!.nIdUsuario;

    // this.zoneSupportService.create(zone)
    //   .pipe(
    //     finalize(() => this.screenLoaderService.hide())
    //   )
    //   .subscribe(res => {
    //     if (res && res.data) {
    //       this.closeDlg(res.data);
    //       this.successMessage(res.data);
    //       this.zoneSupportService.notifyZoneCreated();
    //     }
    //   })
  }

  // searchCustomer(event: any): void {
  //   event.preventDefault();

  //   const { document_type, document_num } = this.zoneForm.value;

  //   if (!document_num) return;

  //   this.isSearching.set(true);
  //   this.customerService.getByDocument(document_type, document_num)
  //     .pipe(finalize(() => this.isSearching.set(false)))
  //     .subscribe(res => {
  //       if (res) {
  //         this.alertService.success({
  //           title: 'Cliente WOW',
  //           message: 'Proceda a registrar la atención.'
  //         })

  //         // this.setCustomerData(res);
  //       } else {
  //         this.alertService.info({
  //           title: 'Visitante',
  //           message: 'Complete los datos básicos del visitante para registrar su atención.'
  //         })

  //         this.setGuestData();
  //       }

  //       this.formValidator.enableControls(FORM_CONTROL_DYNAMIC);
  //       this.showFields.set(true);
  //     });
  // }


  closeDlg(data?: any): void {
    this.dialogRef.close(data);
  }

  issueTypeChange(): void {
    if (!this.isTramiteSelected) {
      this.zoneForm.controls['process_type_id'].setValue(null);
    }
  }

  // departmentChange(): void {
  //   if (!this) {
  //     this.zoneForm.controls['department'].setValue(null);
  //   }
  // }

  // provinceChange(): void {
  //   if (!this.isDeparmentSelected) {
  //     this.zoneForm.controls['province'].setValue(null);
  //   }
  // }

  private successMessage(zone: ZoneSupport): void {
    const alertRef = this.alertService.success({
      title: `Zona creada: ${ zone.zone_code }`,
      message: 'La Zona ha sido creada',
      actionButtonsAlign: 'end',
      confirmButton: { text: 'Ver zona', style: 'flat' },
      cancelButton: { text: 'Cerrar' }
    });

    alertRef.afterClosed().subscribe(res => {
      if (res && res.isConfirmed) {
        this.router.navigate(['/zones', zone.zone_id, 'detalles']).then();
      }
    });
  }

  private setGuestData(): void {
    this.zoneForm.patchValue({ name: '', last_name: '', email: '', phone: '' });
    this.isCustomer.set(false);
  }


  private initZoneForm(): void {
    this.zoneForm = this.fb.group({
      document_type: [3, [Validators.required]],
      document_num: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      last_name: [null, [Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      phone: [null, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('^9\\d{8}$')
      ]],
      email: [null, [Validators.email]],
      solicitude_type: [null, [Validators.required]],
      issue_type_id: [null, [Validators.required]],
      process_type_id: [null],
      comment: [null],
      is_preference: [false]
    });

    this.formValidator = new FormValidator(this.zoneForm, FORM_ERROR_MESSAGES);
    this.formValidator.disableControls(FORM_CONTROL_DYNAMIC);
  }

  get isTramiteSelected(): boolean {
    const tramiteTypeId = 2;
    return this.zoneForm.controls['solicitude_type'].value === tramiteTypeId;
  }

  get isDepartmentSelected(): boolean {
    const tramiteTypeId = 2;
    return this.zoneForm.controls['department'].value === tramiteTypeId;
  }

  get isProvinceSelected(): boolean {
    const tramiteTypeId = 2;
    return this.zoneForm.controls['deparment'].value === tramiteTypeId;
  }

}
