export class School {

  titulo: string; 
  categoria: [string]; 
  contactos: {any};
  social:{
    facebook:string;
    twitter:string;
    instagram:string;
  };
  Responsable:{
    nombre:string;
    apllido:string;
    correo:string;
  }; 
  descripciones: [string]; 
  direcciones: {any};
  entrenadores:[any]; 
  frases: [string]; 
  horarios: {any}; 
  imageURL: string;
  instructor: string;
  precios: {any};
  schoolCategory:any;
  reviews:any;

    constructor(file:File){
    
    }
}


