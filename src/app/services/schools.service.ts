import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {
  private schoolCollection: AngularFirestoreCollection<any>;
  schoolList:Observable<any[]>;

  constructor(private _angularFire:AngularFirestore) { 
  }


  chargeSchools(word){

    this.schoolCollection = this._angularFire.collection<any>(`/categorias/${word}/escuelas`);
     this.schoolList = this.schoolCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        console.log(data);
        return { id, ...data };
      }))
    );

  }


}
