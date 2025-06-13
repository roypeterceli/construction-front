import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogConfig, AlertResponse } from './alert-dlg.config';

@Component({
  selector: 'wow-alert-dlg',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './alert-dlg.component.html',
  styleUrl: './alert-dlg.component.scss'
})
export class AlertDialog implements OnInit {
  data = inject<AlertDialogConfig>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<AlertDialog, AlertResponse>);

  ngOnInit(): void {
    this.setDefaultButtonsConfig();
    this.setDefaultActionButtonsAlign();
  }

  confirm(): void {
    this.dialogRef.close({isConfirmed: true});
  }

  close(): void {
    this.dialogRef.close({isConfirmed: false});
  }

  private setDefaultButtonsConfig(): void {
    if (this.data.confirmButton) {
      this.data.confirmButton.visible ??= true;
    }

    if (this.data.cancelButton) {
      this.data.cancelButton.visible ??= true;
    }
  }

  private setDefaultActionButtonsAlign(): void {
    this.data.actionButtonsAlign ||= 'center';
  }

}
