import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomValidators } from 'src/app/class/custom-validators';
import { AccountService } from 'src/app/services/account.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./login.component.css']
})
export class SignInComponent implements OnInit {

  siginForm:FormGroup;
  recordar:boolean=false;

  constructor(private toastr: ToastrService,
              public  router:  Router,
              private fb: FormBuilder,
              private titleService:Title,
              private _auth:AuthService,
              private _account:AccountService) {
                this.titleService.setTitle("Registrarse");
   }

  ngOnInit() {
    this.initForm();
  }

  signin(){

    if(!this.siginForm.valid){
      this.toastr.error("Error: completar campos");
      console.log(this.siginForm);
      return;
    }

    let newUser = this.siginForm.value;

    this.ShowLoading();

    this.CreateUser(newUser);   
  }

  private CreateUser(newUser: any) {
    this._auth.registerStudent(newUser)
      .then((resp) => {
        Swal.close();
      }).catch(err => {
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: err.message
        });
      });
  }

  private ShowLoading() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: "Creando cuenta"
    });
    Swal.showLoading();
  }

  initForm() {
    const roles = this.fb.group({ 
      estudiante: [true],
      profesor: [false],
      admin: [false]
    })

    this.siginForm = this.fb.group({
      email: [null, [
        Validators.email
      ],[
        CustomValidators.verifyEmail(this._account)
      ]],
      name: [null, [
        Validators.required,
      ]],
      active:true,
      roles: roles,
      password: [null,[Validators.compose([
        
        Validators.required,
        Validators.minLength(8),
        // CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        //CustomValidators.patternValidator(/[ [!@#$%^&*()_+-=[]{};':"|,.<>/?]/](<mailto:!@#$%^&*()_+-=[]{};':"|,.<>/?]/>), { hasSpecialCharacters: true }),
      ])]],
      passwordConfirm: [null, Validators.compose([Validators.required])]
    },
    {
      validator: CustomValidators.passwordMatchValidator
    })
  }
}
