import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomValidators } from 'src/app/class/custom-validators';
import { AccountService } from 'src/app/services/account.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./login.component.css']
})
export class SignInComponent implements OnInit {

  siginForm: FormGroup;
  recordar = false;

  constructor(private toastr: ToastrService,
              public  router:  Router,
              private fb: FormBuilder,
              private titleService: Title,
              private _auth: AuthService,
              private _account: AccountService) {
                this.titleService.setTitle('Registrarse');
   }

  ngOnInit() {
    this.initForm();
  }

  signin() {
    const newUser = this.siginForm;

    if (!newUser.valid) {
      this.toastr.error('Error: completar campos');
      console.log(this.siginForm);
      return;
    }

    this._auth.register(newUser.value, 'estudiante');
  }


  initForm() {
    const roles = this.fb.group({
      estudiante: [true],
      profesor: [false],
      admin: [false]
    });

    this.siginForm = this.fb.group({
      email: [null, [
        Validators.email,
        Validators.required
      ], [
        CustomValidators.verifyEmail(this._account)
      ]],
      name: [null, [
        Validators.required,
      ]],
      active: true,
      roles: roles,
      password: [null, [Validators.compose([

        Validators.required,
        Validators.minLength(8),
        // CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // tslint:disable-next-line:max-line-length
        // CustomValidators.patternValidator(/[ [!@#$%^&*()_+-=[]{};':"|,.<>/?]/](<mailto:!@#$%^&*()_+-=[]{};':"|,.<>/?]/>), { hasSpecialCharacters: true }),
      ])]],
      passwordConfirm: [null, Validators.compose([Validators.required])]
    },
    {
      validator: CustomValidators.passwordMatchValidator
    });
  }

  get email() {
    return this.siginForm.get('email');
  }

  get name() {
    return this.siginForm.get('name');
  }

  get password() {
    return this.siginForm.get('password');
  }

  get passwordConfirm() {
    return this.siginForm.get('passwordConfirm');
  }

}
