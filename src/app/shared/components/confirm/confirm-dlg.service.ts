import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogConfig, ConfirmResponse } from './confirm-dlg.config';
import { ConfirmDialog } from './confirm-dlg.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  private dialog = inject(MatDialog);

  success(config: Omit<ConfirmDialogConfig, 'type'>) {
    return this.show({
      type: 'success',
      title: 'Éxito',
      confirmButton: {
        text: 'Aceptar'
      },
      ...config
    })
  }

  warning(config: Omit<ConfirmDialogConfig, 'type'>) {
    return this.show({
      type: 'warning',
      title: 'Advertencia',
      confirmButton: {
        text: 'Aceptar'
      },
      ...config
    })
  }

  info(config: Omit<ConfirmDialogConfig, 'type'>) {
    return this.show({
      type: 'info',
      title: 'Información',
      confirmButton: {
        text: 'Aceptar'
      },
      ...config
    })
  }

  error(config: Omit<ConfirmDialogConfig, 'type'>) {
    return this.show({
      type: 'error',
      title: 'Error',
      confirmButton: {
        text: 'Aceptar'
      },
      ...config
    })
  }

  show(config?: ConfirmDialogConfig): MatDialogRef<ConfirmDialog, ConfirmResponse> {
    return this.dialog.open(ConfirmDialog, {
      data: config,
      width: 'w-[30rem]',
    //   role: 'confirmdialog',
    //   disableClose: true
    });
  }
}
