import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { MapComponent } from './map/map.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {ReportsService} from "./services/reports.service";
import {RouteGuardService} from "./route-guard.service";
import {ToInitialize} from "./classes/ToInitialize";
import {MatTabsModule} from "@angular/material/tabs";
import { EventComponent } from './event/event.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  providers: [ReportsService, RouteGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
