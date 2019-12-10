import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../model/user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NoLoginAuthGuard implements CanActivate {
  constructor(private _auth: AuthService,
              private router:Router  ){}

    

    canActivate(route: ActivatedRouteSnapshot):boolean|Promise<boolean> {


      let user:UserModel=this._auth.getUser();

      return new Promise((resolve)=>{
        if (this._auth.isUserLoggedIn()==false) {
         resolve (true);
        } else {
          if(!user.roles){
            Swal.fire({
              allowOutsideClick:false,
              type:'info',
              text:`Cargando datos`
            });
            Swal.showLoading();
            console.log(user)
            this._auth.getUserFB(user.uid).then(((resp:any)=>{
              if(resp){  
                Swal.close();
                this.changeRoute(resp);
              }else{
                Swal.fire({
                  allowOutsideClick:false,
                  type:'warning',
                  text:`Conexion lenta, intente mas tarde`
                });
              }
              resolve(false);
            }))
          }else{
            this.changeRoute(user);
            resolve(false);
          }
        }
      })
     
    }

  private changeRoute(user: UserModel) {
    if (user.roles.admin) {
      this.router.navigateByUrl('/admin');
    }
    else if (user.roles.profesor) {
      this.router.navigateByUrl('/admin');
    }
    else if (user.roles.estudiante) {
      this.router.navigateByUrl('/escuelas');
    }
    else {
      this.router.navigateByUrl('/');
    }
  }
}
