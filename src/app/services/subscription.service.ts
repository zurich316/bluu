import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private _angularFire:AngularFirestore,
              private _http: HttpClient) { }


  createSubscription(usuario:any){;
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:"Enviando datos"
    });
    Swal.showLoading();
    this._angularFire.collection(`subscription/`)
                     .add(usuario)
                     .then(()=>{
                      this.crearToken();
                      Swal.fire({
                        type:'success',
                        title:'Exito',
                        text: "Sus datos fueron mandados"
                      });
                     })
                     .catch(error => {
                      Swal.fire({
                        type:'error',
                        title:'Error',
                        text: error
                      });
                      });
  }

  crearToken(){
    const dia = new Date
    dia.setSeconds(3600);
    console.log(dia);
    localStorage.setItem('expira',dia.getTime().toString());
  }

  sendEmail(body){
    console.log("http function: ",body);
    return this._http.post("http://localhost:3000/send", body);
    //return this._http.post("https://radiant-cliffs-38376.herokuapp.com/send", body);
  }
}

