import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarTesiComponent } from './navbar-tesi/navbar-tesi.component';
import { SidebarTesiComponent } from './sidebar-tesi/sidebar-tesi.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    NavbarTesiComponent,
    SidebarTesiComponent
  ],
  exports: [
    NavbarTesiComponent,
    SidebarTesiComponent
  ]
})
export class ComponentsModule { }
