import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {RouteGuardService} from "./route-guard.service";
import {DashboardTesiComponent} from "./dashboard-tesi/dashboard-tesi.component";
import {MapTesiComponent} from "./map-tesi/map-tesi.component";
import {SearchTesiComponent} from './search-tesi/search-tesi.component';

const routes: Routes = [
  { path: '',               redirectTo: 'dashboard',    pathMatch: 'full' },
  { path: 'dashboard',      component: DashboardTesiComponent },
  { path: 'map',            component: MapTesiComponent,    canActivate: [ RouteGuardService ]},
  { path: 'search',         component: SearchTesiComponent, canActivate: [ RouteGuardService ]},
  ];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
