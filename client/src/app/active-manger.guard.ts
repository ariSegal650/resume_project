import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { BackEndService } from './services/back-end.service';
import { IdentificationService } from './services/identification.service';

@Injectable({
  providedIn: 'root',
})
export class ActiveMangerGuard implements CanActivate {
  admin:boolean=false;
  constructor(private login: IdentificationService, private _route: Router) {

  this.login.getAdmin().subscribe((value) => {
  console.log( this.login.admin.getValue());
  this.admin=value
  })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {


        if (this.admin) {
          console.log(true);
          return true;
        } else {
          console.log(false);
          this._route.navigateByUrl('login');
        }
        return false;


  }
}
