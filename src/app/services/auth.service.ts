import { Injectable, NgZone } from '@angular/core';
// Firebase
import { User } from  'firebase';
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { UserModel } from '../model/user';
import { resolve } from 'url';

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
    console.log("AUTH SER");
  }

  private initAuth() {
    
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userAuth = user;
        localStorage.setItem('user', JSON.stringify(this.userAuth));
        
        this.getUserFB(user.uid).then((resp:any)=>{
          this.userFb = resp
          console.log(this.userFb);
          console.log(this.userAuth);
          if( this.userAuth.emailVerified && this.userFb.emailVerified == false || this.userFb.emailVerified == null){
            this.userFb.emailVerified = this.userAuth.emailVerified;
            this._account.updateAccount(this.userAuth.uid ,this.userFb)
          }
          localStorage.setItem('user', JSON.stringify(this.userFb));          
        });
      }
      else {
        this.userAuth = null;
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  getUserFB(id:string){
   return new Promise((resolve,reject)=>{
      this._account.getAccoundByID(id).valueChanges().subscribe((resp)=>{
        resolve(resp)
      })
    })
  }
  
  async login(email: string, password: string) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  
  async logout() {
    return await this.afAuth.auth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.userFb = null;
      this.userAuth = null;
      this.router.navigate(['login']);
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
  
  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
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
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.setUserData(result);
    }).catch((error) => {
      window.alert(error)
    })
  }

  private setUserData(result: auth.UserCredential) {
    this._account.getAccoundByID(result.user.uid).get().subscribe(resp => {
      if (resp.exists) {
        let user: UserModel = {
          name: result.user.displayName,
          active: true,
          email: result.user.email,
          uid: result.user.uid,
          roles: {
            estudiante: true,
            admin: false,
            profesor: false
          },
          emailVerified: null
        };
        this._account.createAccount(user.uid, user);
      }
    }).unsubscribe();
  }

  registerStudent(newUser:any){
    return this.register(newUser.email,newUser.password).then((resp)=>{
      let userResp:User = resp.user;
      delete newUser.password;
      delete newUser.passwordConfirm;
      return this._account.createAccount(userResp.uid,newUser);   
    })
  }

  // registerStudentGoogle(){
  //   return this.loginWithGoogle().then((resp)=>{
  //     let userResp:User = resp.user;
  //     /eturn this._account.createAccount(userResp.uid);   
  //   })
  // }
}
