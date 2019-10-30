import { Injectable, NgZone } from '@angular/core';
// Firebase
import { User } from  'firebase';
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:  User;

  constructor(public  afAuth:AngularFireAuth,
              public _angularFire:AngularFirestore,
              public router: Router,
              public ngZone: NgZone) { 
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        
      } else {
        this.user = null;
        localStorage.setItem('user', null);
      }
    })
  }
  async login(email: string, password: string) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
 
  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  }
 
  async sendEmailVerification() {
    return await this.afAuth.auth.currentUser.sendEmailVerification();
  }
 
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }
 
  async logout() {
    return await this.afAuth.auth.signOut().then(()=>{
      this.router.navigate(['login']);
    });
  }
 
 
  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }
 
  async  loginWithGoogle() {
    return await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
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


}
