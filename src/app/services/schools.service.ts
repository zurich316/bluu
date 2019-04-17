import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  private schoolCollection: AngularFirestoreCollection<School>;
  schoolList:Observable<SchoolID[]>;
  
  private schoolDoc: AngularFirestoreDocument<any>;
  school: Observable<any>;

  constructor(private _angularFire:AngularFirestore) { 
  }

  getListShool(word){
      return this.schoolList =this._angularFire.collection<School>(`/categorias/${word}/escuelas`)
      .snapshotChanges()
      .pipe( map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
        })
      ));

  }

  getSchool(categoryName:string, schoolID:string){
    this.schoolDoc =  this._angularFire.doc<School>(`categorias/${categoryName}/escuelas/${schoolID}`);
    return this.school = this.schoolDoc.snapshotChanges()
                                       .pipe(map(actions=>{
                                         if (!actions.payload.exists) {
                                           return null;
                                         } else {
                                           let data = actions.payload.data() as any;
                                           data.id = actions.payload.id;
                                           console.log(data);
                                           return data;
                                         }
                                       }))
  }


  createSchool(newSchool:any,category:any){
    console.log(newSchool);
    this._angularFire.collection(`categorias/${category}/escuelas/`)
                     .add(newSchool);
  }

  updateSchool(school:any){
    this.schoolDoc.update(school);
  }

  submitReview(category:string,schoolID:string|number,review:any){
    let id = new Date().valueOf().toString();
    let dateCreate = new Date().toLocaleString();


  }


}


export interface School { 
  titulo: string; 
  categoria: [string]; 
  contactos: {any}; 
  descripciones: [string]; 
  direcciones: {any}; 
  frases: [string]; 
  horarios: {any}; 
  imageURL: string;
  instructor: string;
  precios: {any},
  descuento: number;
   


}

export interface SchoolID extends School { id: string; }

