import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogginAuthGuard implements CanActivate {
  constructor(private _auth: AuthService,
              private router:Router  ){}


    canActivate():boolean {
      if (!this._auth.isUserLoggedIn()) {
       return true;
      } else {
        this.router.navigateByUrl('/admin');
        return false;
      }
    }
}
