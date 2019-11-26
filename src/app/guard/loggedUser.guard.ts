import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserGuard implements CanActivate {
  constructor(private _auth: AuthService,
              private router:Router  ){
  } 
  canActivate():boolean {  
    if (this._auth.isUserLoggedIn()==false) {
      console.log("No logeado")
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
    
  }
}
