import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  recordar = false;

  constructor(private toastr: ToastrService,
              public  router:  Router,
              private titleService: Title,
              private _authService: AuthService) {
                this.titleService.setTitle('Login');
   }

  ngOnInit() {
    this.initLoginForm();
    const recordar = localStorage.getItem('recordar');
    if (recordar) {
      this.loginForm.patchValue({email: recordar});
      this.recordar = true;
    }
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required]),
      'password' : new FormControl(null, [Validators.required])
    });
  }

  login() {
    if (!this.loginForm.valid) {
      this.toastr.error('Error: completar campos');
      return;
    }
    this._authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  saveEmail() {
    if (this.recordar) {
      console.log('recordar');
      localStorage.setItem('recordar', this.loginForm.value.email);
    } else {
      localStorage.removeItem('recordar');
    }
  }

  signGoogle() {
    this._authService.loginWithGoogle();
  }

  signFacebook() {
    this._authService.loginWitFacebook();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
