import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatRippleModule } from "@angular/material/core";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'wow-menubar',
  imports: [
    RouterLink,
    MatIconModule,
    MatMenuModule,
    MatRippleModule
  ],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class WowMenubar implements OnInit {
  modules = input.required<any[]>();
  selectedModule = signal<any>({});

  private router = inject(Router);

  ngOnInit(): void {
    this.setActiveModule();
  }

  setActiveModule(): void {
    const currentPath = this.router.url;
    const module = this.modules().find(m => currentPath.includes(m.path));
    if (module) {
      this.selectedModule.set(module);
    }
  }

}
