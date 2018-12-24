import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  escuelas:any[]=[];
  constructor(private _angularFire:AngularFirestore) { 
    this.cargarFire();
  }
  cargarFire(){
    console.log("escuelas");
    this._angularFire.collection('/categorias')
                     .valueChanges()
                    .subscribe((escuelas:any)=>{
                      this.escuelas=escuelas;
                      console.log(this.escuelas);
                    });
  }
}


