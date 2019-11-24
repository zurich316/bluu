import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-remember-password',
  templateUrl: './remember-password.component.html',
  styleUrls:['./login.component.css']
})
export class RememberPasswordComponent implements OnInit {
  email:string="";
  constructor(public _auth:AuthService,  private titleService:Title,) {
    this.titleService.setTitle("Recuperar contraseña");
   }

  ngOnInit() {
  }

  sendEmail(){
    this.showMessage();
    this._auth.sendPasswordResetEmail(this.email)
              .then((resp)=>{
                Swal.fire({
                  type:'success',
                  title:'Exito',
                  text: "Solicitud enviada, verifique su buzon de correo"
                });
              })
              .catch(err=>{
                Swal.fire({
                  type:'error',
                  title:'Error',
                  text: "Verifique su correo electronico"
                });
              })
    this.email=""
  }
  


  private showMessage() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: "Enviando peticion"
    });
    Swal.showLoading();
  }
}
