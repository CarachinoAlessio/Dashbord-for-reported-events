import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MapComponent } from '../../map/map.component';
import {RouteGuardService} from "../../route-guard.service";
import {SearchComponent} from "../../search/search.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'map',            component: MapComponent,    canActivate: [ RouteGuardService ]},
    { path: 'search',         component: SearchComponent, canActivate: [ RouteGuardService ]},
];
