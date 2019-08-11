import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private schoolCollection: AngularFirestoreCollection<User>;
  schoolList:Observable<UserID[]>;
  
  private schoolDoc: AngularFirestoreDocument<User>;
  school: Observable<UserID>;

  constructor(private _angularFire:AngularFirestore) { 
  }

  getLisAcconts(){
    return this.schoolList =this._angularFire.collection<User>(`/users`)
    .snapshotChanges()
    .pipe( map(actions => actions.map(a => {
      const data = a.payload.doc.data() as UserID;
      const uid = a.payload.doc.id;
      return { uid, ...data };
      })
    ));

}

}

export interface UserID extends User { id: string; }