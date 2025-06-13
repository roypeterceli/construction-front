import { Component, NgModule, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { WowScreenLoader } from '@wow/shared/components/loader';

import { BrowserModule } from '@angular/platform-browser';
import { AlertDialogService } from './shared/components/alert';
@Component({
  selector: 'wow-root',
  imports: [RouterOutlet, WowScreenLoader],

  template: `
    <router-outlet/>
    <wow-screen-loader/>
  `
})
export class AppComponent{
  router = inject(Router);
  alertDialog = inject(AlertDialogService);

  // @NgModule({
  //   declarations: [AppComponent],
  //   imports: [
  //     BrowserModule
  //   ],
  //   providers: [],
  //   bootstrap: [AppComponent]
  // })

  constructor() {}
}
