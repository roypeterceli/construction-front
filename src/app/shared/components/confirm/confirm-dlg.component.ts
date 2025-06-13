import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmResponse } from './confirm-dlg.config';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EndZoneRequest } from '@wow/core/interfaces';


@Component({
  selector: 'wow-confirm-dlg',
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './confirm-dlg.component.html',
  styleUrl: './confirm-dlg.component.scss'
})
export class ConfirmDialog implements OnInit {
  confirmForm: FormGroup = new FormGroup({});
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<ConfirmDialog, ConfirmResponse & EndZoneRequest>);

  ngOnInit(): void {
    this.initForm();
  }

  endZoneSupport(): void {
    const { codeAtention, zendeskZone, zendeskUrl } = this.confirmForm.value;
    console.log('codeAtentionControl', codeAtention);
    console.log('zendeskZoneControl', zendeskZone);
    this.dialogRef.close({
      isConfirmed: true,
      codeAtention: codeAtention,
      zendeskZone: zendeskZone,
      zendeskUrl: zendeskUrl
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.confirmForm.get(controlName);

    if (!control || !control.touched) return '';

    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }

    if (control.hasError('maxlength')) {
      return `Máximo ${ control.errors?.['maxlength'].requiredLength } caracteres`;
    }

    if (control.hasError('pattern')) {
      return this.patternMessages[controlName] || 'Formato inválido';
    }

    return '';
  }

  private patternMessages: Record<string, string> = {
    codeAtention: 'Debe contener solo letras y números.',
    zendeskZone: 'Debe contener solo números.',
    zendeskUrl: 'Debe ser una URL válida de https://wowtel.zendesk.com/agent/zones/',
  };


  private initForm(): void {
    this.confirmForm = this.fb.group({
      codeAtention: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9]+$')]],
      zendeskZone: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[0-9]+$')]],
      zendeskUrl: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('^https://wowtel\\.zendesk\\.com/agent/zones/.*$')]],
    })
  }

}
