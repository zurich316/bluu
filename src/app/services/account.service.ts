import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private schoolCollection: AngularFirestoreCollection<UserModel>;
  accountList:Observable<UserID[]>;
  
  private schoolDoc: AngularFirestoreDocument<UserModel>;
  school: Observable<UserID>;

  constructor(private _angularFire:AngularFirestore) { 
  }

  getLisAcconts(){
    return this.accountList =this._angularFire.collection<UserModel>(`/users`)
               .snapshotChanges()
               .pipe( map(actions => actions.map(a => {
                const data = a.payload.doc.data() as UserID;
                const uid = a.payload.doc.id;
                return { uid, ...data };
                  })
                ));

  }

  findAccount(email:string){
    return this._angularFire.collection<UserModel>('users',ref => ref.where('email', '==', email))
  }

  getAccoundByID(id:any){
    return this._angularFire.doc<UserModel>(`users/${id}`);
  }

  createAccount(id:string, account:any){
    return this._angularFire.collection('users')
                            .doc(id)
                            .set(account);
  }

  updateAccount(id:string, account:any){
    return this._angularFire.collection('users')
                            .doc(id)
                            .update(account);
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

export interface UserID extends UserModel { id: string; }