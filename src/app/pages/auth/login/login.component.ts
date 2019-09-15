import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn,FormArray} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  recordar:boolean=false;

  constructor(private toastr: ToastrService,
              public  router:  Router,
              private authService: AuthService) {
    
    this.loginForm = new FormGroup({
      'email' : new FormControl('',[Validators.required]),
      'password' : new FormControl('',[Validators.required])
    })
   }

  ngOnInit() {
  }

  login(){
    if(!this.loginForm.valid){
      this.toastr.error("Error: completar campos");
      return;
    }

    Swal.fire({
          allowOutsideClick:false,
          type:'info',
          text:"Iniciando session"
        });
        Swal.showLoading();
    
        this.authService.login(this.loginForm.value.email,this.loginForm.value.password).then(value => {
          console.log(value);
          Swal.close();
          console.log('Nice, it worked!');
          this.router.navigate(['/escuelas']);
        })
        .catch(err => {
          Swal.fire({
            type:'error',
            title:'Error',
            text: err.message
          });
          console.log('Something went wrong:',err.message);
        });

    
  }

}
