import { NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Node, Troncal, TroncalSupport} from '@wow/core/interfaces';
import { NodeService, SettingService } from '@wow/core/services';
import { AlertDialogService } from '@wow/shared/components/alert';
import { ScreenLoaderService } from '@wow/shared/components/loader';
import { finalize } from 'rxjs';

@Component({
  selector: 'wow-save-node-support-dlg',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule, NgIf
  ],
  templateUrl: './save-node-support-dlg.component.html'
})

export class SaveNodeSupportDlgComponent implements OnInit {

  nodeI = '';
  nodeForm = new FormGroup<any>({});
  private readonly dialogRef = inject(MatDialogRef<SaveNodeSupportDlgComponent>);
  troncal = signal<TroncalSupport | null>(null);
  private screenLoaderService = inject(ScreenLoaderService)

  private router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private alertService = inject(AlertDialogService);

  settingService = inject(SettingService);
  // constructor(
  //   @Inject(MAT_DIALOG_DATA) public data: { troncal: TroncalSupport },
  //   public nodeService: NodeService
  // ) {}

  data = inject(MAT_DIALOG_DATA);
  nodeService = inject(NodeService);

  constructor() {
    // Ya no necesitas parámetros en el constructor
  }

  ngOnInit(): void {
    this.troncal.set(this.data);
    this.initNodeForm();
  }


  createNode(): void {
    if (this.nodeForm.invalid) {
      this.nodeForm.markAllAsTouched();
      return;
    }

    this.screenLoaderService.show();
    console.log('Payload a enviar:', this.nodeForm.value);
    this.nodeService.create(this.nodeForm.value)
      .pipe(
        finalize(() => this.screenLoaderService.hide())
      )
      .subscribe(res => {
        if (res && res.data) {
          this.closeDlg(res.data);
          this.successMessage(res.data);
          this.nodeService.notifyNodeCreated();
        }
      })
  }


  // getParams(node: Node): void {
  //   node.nodeId,
  //   node.nodeCorrelative,
  //   node.nodeSufix,
  //   node.napsCount
  // }

  // troncal(troncal: Troncal): void {
  //   console.log(troncal);
  // }


  closeDlg(data?: any): void {
    this.dialogRef.close(data);
  }

  private successMessage(node: Node): void {
    const alertRef = this.alertService.success({
      title: `Nodo creado: ${node}`,
      message: 'El Nodo ha sido creado',
      actionButtonsAlign: 'end',
      confirmButton: { text: 'Ver nodo', style: 'flat' },
      cancelButton: { text: 'Cerrar' }
    });

    alertRef.afterClosed().subscribe(res => {
      if (res && res.isConfirmed) {
        this.router.navigate(['/construccion', node.nodeId, 'detalles']).then();
      }
    });
  }

  private initNodeForm(): void {
    this.nodeForm = this.fb.group({
      correlative: [null, [Validators.required]],
      sufix: [null, [Validators.required]],
      stateNode: [null, [Validators.required]],
      stateSale: [null, [Validators.required]],
    });

  }
}
