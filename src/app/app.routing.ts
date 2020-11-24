import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {RouteGuardService} from "./route-guard.service";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MapComponent} from "./map/map.component";
import {SearchComponent} from "./search/search.component";

const routes: Routes = [
  { path: '',               redirectTo: 'dashboard',    pathMatch: 'full' },
  { path: 'dashboard',      component: DashboardComponent },
  { path: 'map',            component: MapComponent,    canActivate: [ RouteGuardService ]},
  { path: 'search',         component: SearchComponent, canActivate: [ RouteGuardService ]},
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
