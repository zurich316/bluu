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
  
  private schoolDoc: AngularFirestoreDocument<School>;
  school: Observable<School>;

  constructor(private _angularFire:AngularFirestore) { 
  }




  chargeAllSchools(word){

    this.schoolCollection = this._angularFire.collection<School>(`/categorias/${word}/escuelas`);
     this.schoolList = this.schoolCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as School;
        const id = a.payload.doc.id;
        console.log(data);
        return { id, ...data };
      }))
    );

  }

  chargeSingleSchool(categoryName:string, schoolID:string){ 
    
    this.schoolDoc = this._angularFire.doc<School>(`categorias/${categoryName}/escuelas/${schoolID}`);
    this.school = this.schoolDoc.valueChanges();
    this.school.subscribe((obj:any)=>{
      console.log(obj);
    });
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

