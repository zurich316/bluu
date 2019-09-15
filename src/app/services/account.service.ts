import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private schoolCollection: AngularFirestoreCollection<User>;
  accountList:Observable<UserID[]>;
  
  private schoolDoc: AngularFirestoreDocument<User>;
  school: Observable<UserID>;

  constructor(private _angularFire:AngularFirestore,
              private _auth:AuthService) { 
  }

  getLisAcconts(){
    return this.accountList =this._angularFire.collection<User>(`/users`)
               .snapshotChanges()
               .pipe( map(actions => actions.map(a => {
                const data = a.payload.doc.data() as UserID;
                const uid = a.payload.doc.id;
                return { uid, ...data };
                  })
                ));

  }

  findAccount(email:string){
    return this._angularFire.collection<User>('users',ref => ref.where('email', '==', email))
  }

  createAccount(account:any){
   return this._auth.register(account.email,account.password)
              .then((result:any)=>{
                account.uid = result.user.uid
                this.SetUserData(account);

    }).catch(err=>{console.log(err)})
    
  }

  SetUserData(user){
    
    const userData: any = {
      email: user.email,
      name: user.name,
      active: user.active,
      roles:user.roles
    }
    console.log(userData);
    return this._angularFire.collection(`users`)
                     .doc(user.uid)
                     .set(userData,{merge:true})
  }



}

export interface UserID extends User { id: string; }