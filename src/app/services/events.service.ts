import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventCollection: AngularFirestoreCollection<Event>;
  eventList:Observable<EventID[]>;
  
  private eventDoc: AngularFirestoreDocument<any>;
  event: Observable<any>;

  constructor(private _angularFire:AngularFirestore) {

   }

  getListEvent(){
    return this.eventList =this._angularFire.collection<Event>(`/eventos`)
    .snapshotChanges()
    .pipe( map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      return { id, ...data };
      })
    ));

}
}

export interface Event { 
  titulo: string; 
  contenido: [string]; 
  dia: {any}; 
  estado: [string]; 
}

export interface EventID extends Event { id: string; }

