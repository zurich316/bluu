import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn,FormArray} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  recordar:boolean=false;

  constructor(private toastr: ToastrService,
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

    this.authService.login(this.loginForm.value.email,this.loginForm.value.password);


    
  }

}
