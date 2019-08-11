import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  user:  User;

  constructor(public  afAuth:  AngularFireAuth, 
              public  router:  Router,
              private toastr: ToastrService) { 
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })

    this.afAuth.auth.signInWithPopup
  }

  async register(email: string, password: string) {
    var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    this.sendEmailVerification();
  }

  async login(email: string, password: string) {
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:"Iniciando loggin"
    });
    Swal.showLoading();
    
    var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password).then(value => {
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
    //
  }
  
  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification()
    this.router.navigate(['admin/verify-email']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout(){
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  } 

  async  loginWithGoogle(){
    await  this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    this.router.navigate(['admin/list']);
  }
}
