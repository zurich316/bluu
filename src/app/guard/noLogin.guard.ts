import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class NoLoginAuthGuard implements CanActivate {
  constructor(private _auth: AuthService,
              private router:Router  ){}

    

    canActivate(route: ActivatedRouteSnapshot):boolean {


      let user:UserModel=this._auth.userFb;


     
      if (this._auth.isUserLoggedIn()==false) {
       return true;
      } else {
        // console.log("Login in")
        // if(user.roles.admin){
        //   this.router.navigateByUrl('/admin');
        // }if (user.roles.profesor) {
        //   this.router.navigateByUrl('/admin');
        // } else {
        //   this.router.navigateByUrl('/escuelas');
        // }

        this.router.navigateByUrl('/admin');
        return false;
      }
    }
}
