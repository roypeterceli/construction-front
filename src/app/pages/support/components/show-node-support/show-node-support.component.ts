import { Component, inject, OnInit, signal } from '@angular/core';
import { MapTroncalDetailComponent } from '../map-troncal-detail/map-troncal-detail.component';
import { NodeSupport, ZoneSupport } from '@wow/core/interfaces';
import { ActivatedRoute } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgIf } from '@angular/common';
import { PortService } from '@wow/core/services';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'wow-show-node-support',
  imports: [
    MapTroncalDetailComponent,
    MatSelect, MatSelectModule,
    MatSlideToggleModule, NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './show-node-support.component.html',
  styleUrl: './show-node-support.component.scss'
})
export class ShowNodeSupportComponent implements OnInit {

  
  private fb = inject(FormBuilder);

  readonly zone = signal<ZoneSupport | null>(null);

  readonly node = signal<NodeSupport | null>(null);
  
  private route = inject(ActivatedRoute);

  portService = inject(PortService);

  formPorts = new FormGroup<any>({});

  // form: FormGroup = this.fb.group({
  //   ports: [0, Validators.required],     // puerto seleccionado por defecto
  //   enablePort: [false]                  // toggle desactivado por defecto
  // });

  constructor(){
    this.formPorts = this.fb.group({
      ports: [0, Validators.required],     // puerto seleccionado por defecto
      enablePort: [false]  
    });
  }

  ngOnInit(): void {
    this.node.set(this.route.snapshot.data['node']);
  }
}
