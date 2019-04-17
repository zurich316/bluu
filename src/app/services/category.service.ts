import { Injectable } from '@angular/core';
import { AngularFirestore,  AngularFirestoreCollection  } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryCollection: AngularFirestoreCollection<Category>;

  constructor(private _angularFire:AngularFirestore) { 
    this.categoryCollection = _angularFire.collection<Category>('/categorias');
  }

}

export interface Category { id:string|number, titulo: string; url: string; }

