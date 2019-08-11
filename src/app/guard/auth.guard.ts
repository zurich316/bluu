import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService,
              private router:Router  ){}


    canActivate():boolean {
      if (this._auth.isLoggedIn) {
        console.log("AUTH")
       return true;
      } else {
        this.router.navigateByUrl('/login');
        console.log("NO AUTH")
        return false;
      }
    }
}
