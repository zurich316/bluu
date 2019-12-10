import { Injectable, NgZone } from '@angular/core';
// Firebase
import { User } from  'firebase';
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { UserModel } from '../model/user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuth:User = null;
  userFb:UserModel = null;

  constructor(public afAuth:AngularFireAuth,
              private _account:AccountService,
              public router: Router,
              public ngZone: NgZone) { 
    this.initAuth();

  }

  initAuth() {
    
    this.afAuth.authState.subscribe(user => {
      

      if (user) {

        if(user.emailVerified==false){
          this.sendEmailTo();
          return
        }
        this.userAuth = user;
        localStorage.setItem('user', JSON.stringify(this.userAuth));
        this.getUserFB(user.uid)
      }
      else {
        console.log("no hay user conectado")
        this.userAuth = null;
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  private sendEmailTo() {
    Swal.fire({
      type: 'warning',
      text: "Verifique su dirección de correo electrónico"
    });
    this.sendEmailVerification();
    this.logout();
  }

  getUserFB(id:string){
   return new Promise((resolve,reject)=>{
      this._account.getAccoundByID(id).valueChanges().subscribe((resp)=>{
        this.userFb = resp
        localStorage.setItem('user', JSON.stringify(this.userFb));    
        resolve(resp)
      })
    })
  }
  
  async login(email: string, password: string) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email, password)
                                 .then((result)=>{
                                   Swal.fire({
                                      allowOutsideClick: false,
                                      type: 'info',
                                      text: "Cargando datos"
                                   });
                                   Swal.showLoading();
                                   this._account.createAccount(result.user.uid,{emailVerified:result.user.emailVerified})
                                                .then(()=>{
                                                  this.ngZone.run(() => {  
                                                    this.router.navigate(['/']);
                                                    Swal.close();
                                                  })
                                                }).catch(err=>console.error(err))

    });
  }
  
  async logout() {
    return await this.afAuth.auth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.userFb = null;
      this.userAuth = null;
      this.router.navigate(['/login']);
    });
  }
  
  isUserLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  async sendEmailVerification() {
    return await this.afAuth.auth.currentUser.sendEmailVerification();
  }
  
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }
  
  studentControl(user: User): boolean {
    const allowed = ['admin', 'estudiante', 'profesor']
    return this.checkAuthorization(user, allowed)
  }
  profesorControl(user: User): boolean {
    const allowed = ['admin', 'profesor']
    return this.checkAuthorization(user, allowed)
  }
  adminControl(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }
  
  private checkAuthorization(user: any, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true
      }
    }
    return false
  
  }
  
  getUser(){
    return JSON.parse(localStorage.getItem('user'));
  }
  
  register(newUser:any,role:string) {
    console.log(newUser)
    return this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
                            .then((result) => {
                              result.user.updateProfile({
                                displayName:newUser.name
                              }).then(()=>{
                                //this.sendEmailVerification();
                                this.setUserData(result,role).then((resp)=>{
                                  this.ngZone.run(() => {  
                                    this.router.navigate(['/']);
                                    Swal.close();
                                  })
                                });
                              })
                            }).catch((error) => {
                              window.alert(error.message)
                            })
  }

  async  loginWithGoogle() {
    return await this.AuthLogin(new auth.GoogleAuthProvider())
  }

  async  loginWitFacebook() {
    return await this.AuthLogin(new auth.FacebookAuthProvider())
  }

  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
                            .then((result) => {
                              Swal.fire({
                                allowOutsideClick: false,
                                type: 'info',
                                text: "Cargando datos"
                              });
                              Swal.showLoading();
                              this.setUserData(result,'estudiante').then((resp)=>{
                                this.ngZone.run(() => {  
                                  this.router.navigate(['/']);
                                  Swal.close();
                                })
                              });
                            }).catch((error) => {
                              window.alert(error)
                              Swal.close();
                            })
  }

  private setUserData(result: auth.UserCredential,role:string) {
    
    let userInfo: any = {
      name: result.user.displayName,
      active: true,
      email: result.user.email,
      roles: {
        estudiante: false,
        admin: false,
        profesor: false
      },
      emailVerified: result.user.emailVerified
    };

    userInfo.roles[role] = true 
    return this._account.createAccount(result.user.uid,userInfo)
  }

}
