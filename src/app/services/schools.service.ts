import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { School } from "../model/school"
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  private schoolCollection: AngularFirestoreCollection<School>;
  schoolList:Observable<SchoolID[]>;
  
  private schoolDoc: AngularFirestoreDocument<any>;
  school: Observable<any>;

  constructor(public router: Router,
              private _angularFire:AngularFirestore,
              private storage: AngularFireStorage) { 
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

  getListShools(){
    return this.schoolList =this._angularFire.collection<School>(`schools`,ref=>ref.orderBy('createAt','desc'))
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
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:`Subiendo datos`
    });
    Swal.showLoading();
    this._angularFire.collection(`schools`).doc(id)
                    .set(newSchool).then(()=>{
                      Swal.fire({
                        type:'success',
                        title:'Exito',
                        text: "Escuela creada"
                      });
                      this.router.navigate([`../`]);
                     }).catch(()=>{
                      Swal.fire({
                        type:'error',
                        title:'Error',
                        text: "No se pudo guardar los datos"
                      });
                     });
  }

  getSchoolInfo(schoolID:string){
    this.schoolDoc =  this._angularFire.doc<School>(`schools/${schoolID}`);

    return new Promise((resolve,reject)=>{
      this.schoolDoc.valueChanges().subscribe((resp:School)=>{
        resolve(resp)
      })
    })
  }

  updateSchool(school:any){
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:`Subiendo datos`
    });
    Swal.showLoading();
    return this.schoolDoc.update(school).then((resp)=>{
      Swal.fire({
        type:'success',
        title:'Exito',
        text: "Datos actualizada"
      });
    }).catch(()=>{
      Swal.fire({
        type:'error',
        title:'Error',
        text: "No se pudo guardar los datos"
      });
     });
  }

  updatePhoto(file,
    data:{
      id:string,
      name:string,
      url:string
    }){
        const filePath = `${data.name}`;
        const ref = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        // observe percentage changes
        task.percentageChanges().subscribe((resp)=>{
          Swal.fire({
            allowOutsideClick:false,
            type:'info',
            text:`Subiendo foto: ${resp}%`
          });
          Swal.showLoading();
        });
        
        // get notified when the download URL is available
        return new Promise((resolve,reject)=>{
          task.snapshotChanges().pipe(
              finalize(() => ref.getDownloadURL().subscribe((resp)=>{
                  //this.schoolDoc.valueChanges
                  Swal.close();
                  Swal.fire({
                    type:'success',
                    title:'Exito',
                    text: "Foto actualizada"
                  });
                  if(data.url!=resp){
                    this.schoolDoc.update({
                      img:resp
                    });
                  }

                  resolve(resp);
                })
              )
          )
          .subscribe()
        })

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

