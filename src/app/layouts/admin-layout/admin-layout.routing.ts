import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { MapComponent } from '../../map/map.component';
import {RouteGuardService} from "../../route-guard.service";
import {EventComponent} from "../../event/event.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    /*{ path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },*/
    { path: 'map',            component: MapComponent,   canActivate: [ RouteGuardService ]},
    { path: 'event',          component: EventComponent, canActivate: [ RouteGuardService ]},
];
