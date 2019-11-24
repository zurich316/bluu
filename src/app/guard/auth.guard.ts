import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService,
              private router:Router  ){

  }
  
  canActivate(route: ActivatedRouteSnapshot):boolean {
    let expectedRole = route.data.expectedRole;

    let userInfo = this._auth.getUser();
    console.log(expectedRole)
    
    console.log(userInfo.roles[expectedRole])
    if (!this._auth.isUserLoggedIn() || !userInfo.roles[expectedRole]) {
      console.log("no")
      this.router.navigateByUrl('/');
      return false;
    }
    console.log("si")
    return true;
    
  }
}
