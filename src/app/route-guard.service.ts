import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ReportsService} from "./services/reports.service";

@Injectable({
    providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private reportsService: ReportsService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const isServiceReady = this.reportsService.getServiceReady();
    if ( isServiceReady ){
      return true;
    }
    else if ( state.url.toString() !== '/dashboard' ){
      this.router.navigate(['/dashboard']);
      alert('I dati non sono ancora pronti.')
      return false;
    }

  }
}
