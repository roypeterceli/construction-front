import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogConfig, AlertResponse } from './alert-dlg.config';
import { AlertDialog } from './alert-dlg.component';

@Injectable({
  providedIn: 'root'
})
export class AlertDialogService {

  private dialog = inject(MatDialog);

  success(config: Omit<AlertDialogConfig, 'type'>) {
    return this.show({
      type: 'success',
      title: 'Éxito',
      confirmButton: {
        text: 'Aceptar'
      },
      ...config
    })
  }

  warning(config: Omit<AlertDialogConfig, 'type'>) {
    return this.show({
      type: 'warning',
      title: 'Advertencia',
      confirmButton: {
        text: 'Aceptar'
      },
      ...config
    })
  }

  info(config: Omit<AlertDialogConfig, 'type'>) {
    return this.show({
      type: 'info',
      title: 'Información',
      confirmButton: {
        text: 'Aceptar'
      },
      ...config
    })
  }

  error(config: Omit<AlertDialogConfig, 'type'>) {
    return this.show({
      type: 'error',
      title: 'Error',
      confirmButton: {
        text: 'Aceptar'
      },
      ...config
    })
  }

  show(config?: AlertDialogConfig): MatDialogRef<AlertDialog, AlertResponse> {
    return this.dialog.open(AlertDialog, {
      data: config,
      panelClass: ['alert-dialog-panel'],
      maxWidth: '450px',
      width: '100%',
      role: 'alertdialog',
      disableClose: true
    });
  }
}
