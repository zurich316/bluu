import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

  constructor(private _auth: AuthService,private router:Router){

  }

  canActivate(route: ActivatedRouteSnapshot): boolean{
    let role = route.data.expectedRole
    let user:UserModel = this._auth.getUser();
    if(user.roles[role]){
      return true; 
    }
    this.router.navigateByUrl('/');
    return false
    
  }
  
}
