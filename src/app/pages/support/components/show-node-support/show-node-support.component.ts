import { Component, inject, OnInit, signal } from '@angular/core';
import { MapTroncalDetailComponent } from '../map-troncal-detail/map-troncal-detail.component';
import { NodeSupport } from '@wow/core/interfaces';
import { ActivatedRoute } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@Component({
  selector: 'wow-show-node-support',
  imports: [
    MapTroncalDetailComponent,
    MatSlideToggleModule
  ],
  templateUrl: './show-node-support.component.html',
  styleUrl: './show-node-support.component.scss'
})
export class ShowNodeSupportComponent implements OnInit {

  node = signal<NodeSupport | null>(null);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.node.set(this.route.snapshot.data['node']);
  }
}
