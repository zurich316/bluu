import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { School } from "../model/school"
@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  private schoolCollection: AngularFirestoreCollection<School>;
  schoolList:Observable<SchoolID[]>;
  
  private schoolDoc: AngularFirestoreDocument<any>;
  school: Observable<any>;

  constructor(public router: Router,private _angularFire:AngularFirestore) { 
  }

  getListShool(word){
      return this.schoolList =this._angularFire.collection<School>(`/categorias/${word}/escuelas`)
      .snapshotChanges()
      .pipe( map(actions => actions.map(a => {
        const data = a.payload.doc.data() as SchoolID;
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
                                           let data = actions.payload.data() as SchoolID;
                                           data.id = actions.payload.id;
                                           return data;
                                         }
                                       }))
  }


  createSchool(newSchool:any){
    console.log('create')
    let id = this._angularFire.createId()
    this._angularFire.collection(`schools`).doc(id)
                    .set(newSchool).then(()=>{
                      this.router.navigate([`escuelas/${id}`]);
                     });
  }

  // updateSchool(newSchool:any){
  //   console.log('create')
  //   let id = this._angularFire.createId()
  //   this._angularFire.collection(`schools`).doc(id)
  //                   .set(newSchool).then(()=>{
  //                     this.router.navigate([`escuelas/${id}`]);
  //                    });
  // }

  getSchoolInfo(schoolID:string){
    this.schoolDoc =  this._angularFire.doc<School>(`schools/${schoolID}`);

    return new Promise((resolve,reject)=>{
      this.schoolDoc.valueChanges().subscribe((resp:School)=>{
        resolve(resp)
      })
    })

    // return this.school = this.schoolDoc.valueChanges()
                                      //  .pipe(map(actions=>{
                                      //    console.log(actions)
                                      //    if (!actions.payload.exists) {
                                      //      return null;
                                      //    } else {
                                      //      let data = actions.payload.data() as SchoolID;
                                      //      data.id = actions.payload.id;
                                      //      return data;
                                      //    }
                                      //   })
                                      //  )
  }

  updateSchool(school:any){
    return this.schoolDoc.update(school);
  }

  submitReview(category:string,schoolID:string|number,review:any){
    let id = new Date().valueOf().toString();
    let dateCreate = new Date().toLocaleString();

  }

  subcribe(studentID,schoolID){
    console.log(studentID)
    console.log(schoolID)
    
    this._angularFire.collection('schoolSubscribe')
                     .doc(`${studentID}${schoolID}`)
                     .set({
                       studentID:studentID,
                       schoolID:schoolID
                     })
  }


}


export interface SchoolID extends School { id: string; }

