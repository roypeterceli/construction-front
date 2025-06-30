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
import { SettingService, TroncalService} from '@wow/core/services';
import { Troncal, ZoneSupport } from '@wow/core/interfaces';
import { FormValidator } from '@wow/shared/utils';
import { ScreenLoaderService } from '@wow/shared/components/loader';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';



const FORM_ERROR_MESSAGES = {
  // zone_code: { pattern: 'Solo letras y números' }
  // name: { pattern: 'Solo se permite letras' },
  // last_name: { pattern: 'Solo se permite letras' },
  // phone: { pattern: 'El celular debe empezar con 9' }
};

// const FORM_CONTROL_DYNAMIC = ['zone_code'];
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
  private troncalSupportService = inject(TroncalService);
  private router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<SaveTroncalSupportDlgComponent>);

  troncals = signal<ZoneSupport | null>(null);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.initTroncalForm();
  }

  // // form: FormGroup;
  // constructor(
  //   // private fb: FormBuilder,
  //   public troncalService: TroncalService // importante que sea público para usarlo en el HTML
  //   ) {
  // }

  createTroncal(): void {

    if (this.troncalForm.invalid) {
      this.troncalForm.markAllAsTouched();
      return;
    }

    this.screenLoaderService.show();
    const troncal = this.troncalForm.value as Troncal;

    this.troncalSupportService.create(this.troncalForm.value)
      .pipe(
        finalize(() => this.screenLoaderService.hide())
      )
      .subscribe(res => {
        if (res && res.data) {
          this.closeDlg(res.data);
          this.successMessage(res.data);
          this.troncalSupportService.notifyTroncalCreated();
        }
      })
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

  // issueTypeChange(): void {
  //   if (!this.isDepartmentSelected) {
  //     this.zoneForm.controls['process_type_id'].setValue(null);
  //   }
  // }

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

  // private setGuestData(): void {
  //   this.zoneForm.patchValue({ name: '', last_name: '', email: '', phone: '' });
  //   this.isCustomer.set(false);
  // }


  // zone_code = this.zoneForm.controls['zone_code'].value;

  
  private initTroncalForm(): void {
    // this.zoneForm.patchValue({ zone_code: ''});

    this.troncals.set(this.route.snapshot.data['zone']);
    this.troncalForm = this.fb.group({
      ubigeoDistrictId: [null, [Validators.required]],
      troncalCode: [null, [Validators.required]],
      prefix: [null, [Validators.required]],
      nodeStart: [null, [Validators.required]],
      nodeEnd: [null, [Validators.required]]
    });

    this.formValidator = new FormValidator(this.troncalForm, FORM_ERROR_MESSAGES);
    // this.formValidator.disableControls(FORM_CONTROL_DYNAMIC);
  }


  // get isDepartmentSelected(): boolean {
  //   return this.zoneForm.controls['department_code'].value;
  // }

  // get isProvinceSelected(): boolean {
  //   return this.zoneForm.controls['province_code'].enabled;
  // }


}
