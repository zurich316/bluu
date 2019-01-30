import { Injectable } from '@angular/core';
import { AngularFirestore,  AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryCollection: AngularFirestoreCollection<Category>;
  categoryList:Observable<CategoryID[]>;

  constructor(private _angularFire:AngularFirestore) { 
    this.categoryCollection = _angularFire.collection<Category>('/categorias');
    this.cargarFire();
  }
  cargarFire(){
    
    this.categoryList = this.categoryCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Category;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }
}

export interface Category { titulo: string; url: string; }
export interface CategoryID extends Category { id: string; }

