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


      let user:UserModel=this._auth.getUser();


     
      if (this._auth.isUserLoggedIn()==false) {
       return true;
      } else {
        console.log("Login in");
        console.log(user);
        
        if(user.roles.admin){
          console.log("admi");
          this.router.navigateByUrl('/admin');
        }else if (user.roles.profesor) {
          console.log("pro");
          this.router.navigateByUrl('/admin');
        } else {
          console.log("est");
          this.router.navigateByUrl('/escuelas');
        }
        return false;
      }
    }
}
