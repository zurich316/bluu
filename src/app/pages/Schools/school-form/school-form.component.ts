import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn,FormArray} from '@angular/forms'
import { Observable } from 'rxjs';
import { MouseEvent } from '@agm/core';
import { SchoolsService } from "../../../services/schools.service";

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.css']
})
export class SchoolFormComponent implements OnInit {
  @Input () schoolForm:any={};
  @Output() sendFormSchool:EventEmitter<any> = new EventEmitter();
  
  selectedCategory="";
  categories:any=[
    {
      id:"deportes",
      titulo:"Deportes"
    },
    {
      id:"artes",
      titulo:"Artes"
    },
    {
      id:"apoyo-escolar",
      titulo:"Apoyo escolar"
    },
    {
      id:"otros",
      titulo:"Otros"
    },
  ]

  forma:FormGroup;
  emailValidator:string="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  contactosTipos:string[]=['Whatsapp','Facebook','Twitter','Celular','Correo','Otro'];
  diasLista:string[]=['Lunes','Martes','Miercoles','Jueves',"Viernes",'Sabado','Domingo']; 
  diasSemana = this.diasLista.map(c => new FormControl(false));
   
  
  constructor(public _schoolService:SchoolsService) { 
   this.sendFormSchool = new EventEmitter();
   this.defineForm(); 

  }

  ngOnInit() {

   this.setValuesToForm()
  }

  enviarFormulario(){

    console.log(this.forma.value);
    console.log(this.forma.controls);
    //this.sendFormSchool.emit(this.forma.value);
    //this._schoolService.createSchool(this.forma.value,this.forma.value.schoolCategory);
    //this.forma.reset();
    
  }

  salida(tiem){ 
    console.log(tiem['controls'])

  }


  // CATEGORIA----------------------------

  addCategoria(){
    (<FormArray>this.forma.controls['categoria']).push(
      new FormControl('',Validators.required)
    )
    
  }


// DESCRIPCIONES----------------------------

  addDescripcion(){
    (<FormArray>this.forma.controls['descripciones']).push(
      new FormControl('',Validators.required)
    )
    
  }

  // Contactos----------------------------

  addContactos(){
    (<FormArray>this.forma.controls['contactos']).push(
      new FormGroup({
        'tipo': new FormControl('',Validators.required),
        'numero': new FormControl('',Validators.required)
      })
    )
    
  }

  addFrases(){
    (<FormArray>this.forma.controls['frases']).push(
      new FormGroup({
        'contenido': new FormControl('',Validators.required),
        'autor': new FormControl('',Validators.required)
      })
    )
    
  }

  addPrecio(){
    (<FormArray>this.forma.controls['precios']).push(
      new FormGroup({
        'nota': new FormControl('',Validators.required),
        'precio': new FormControl('',Validators.required)
      })
    )
    
  }

  addEntrenador(){
    (<FormArray>this.forma.controls['entrenadores']).push(
      new FormGroup({
        'nombre': new FormControl('',Validators.required),
        'apellido': new FormControl('',Validators.required)
      })
    )
    
  }

  addHorario(){
    (<FormArray>this.forma.controls['horarios']).push(
      new FormGroup({                                    
        'horario_fin': new FormControl('',Validators.required),
        'horario_inicio': new FormControl('',Validators.required),
        'dias': new FormArray(this.diasSemana,this.verifyDaysCheck(1))
        
      })
    )
    
  }

  agregarDireccion($event: MouseEvent) {

    let coordenadas = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    };

    (<FormArray>this.forma.controls['direcciones']).push(
      new FormGroup({
        'coordenadas': new FormControl(coordenadas,Validators.required),
        'descripcion': new FormControl('',Validators.required)
      })
    )
  
  }


  removeContactos(index){
    (<FormArray>this.forma.controls['contactos']).removeAt(index);
  }

// VALIDACIONES-----------------------------

verifyDaysCheck(min=1):ValidatorFn{
  let validatorVar: ValidatorFn = (formArray: FormArray) => {
    let totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validatorVar;
}

  defineForm(){
    this.forma = new FormGroup({
      'titulo' : new FormControl('',[
          Validators.required,
          Validators.minLength(3)
      ]),                                                                                                                                                  
      'categoria' : new FormArray([
        new FormControl('',Validators.required)
      ]),
      'schoolCategory' : new FormControl('',Validators.required),
      'descripciones' : new FormArray([
        new FormControl('',Validators.required)
      ]),
      'contactos' : new FormArray([
        new FormGroup({
          'tipo': new FormControl('',Validators.required),
          'numero': new FormControl('',Validators.required)
        })
      ]),
      'horarios' : new FormArray([ 
        new FormGroup({                                    
          'horario_fin': new FormControl('',Validators.required),
          'horario_inicio': new FormControl('',Validators.required),
          'dias': new FormArray(this.diasSemana,this.verifyDaysCheck(1))
          
        })
      ]),
      
      'frases' : new FormArray([
        
      ]),
      'precios' : new FormArray([
        new FormGroup({
          'nota': new FormControl('',Validators.required),
          'precio': new FormControl('',Validators.required)
        })
      ]), 
      
      'direcciones' : new FormArray([],Validators.required),

      'imageURL' : new FormControl(),

      'datosInstructor': new FormGroup({
        'nombre' : new FormControl('',[
          Validators.required,
          Validators.minLength(3)
        ]),
        'apellido' : new FormControl('',[
          Validators.required
        ]),
        'email' : new FormControl('',[
          Validators.required, 
          Validators.pattern(this.emailValidator)
        ]),                                                                      
       }),

       'entrenadores':new FormArray([
          new FormGroup({
            'nombre': new FormControl('',Validators.required),
            'apellido': new FormControl('',Validators.required)
          })
        ]), 

    });
  }

  removeItem(index:any,type:string){
    (<FormArray>this.forma.controls[type]).removeAt(index);
  }

  setValuesToForm(){

    const objeto = new Object({
      'categoria':['categoria'],
      'contactos':[{'tipo':'Whatsapp','numero':'123456'}],
      'schoolCategory':[''],
      'datosInstructor':{'apellido':'zurita','email':'algo@gmail.com','nombre':'jorge'},
      'descripciones':['Descripcion de la escuela'],
      'direcciones':[{
        'coordenadas': {'lat': -17.38762194435542, 'lng': -66.14305669220113},
        'descripcion': "Papa paulo y Ruben dario"
      }],
      'frases':[{'contenido':'texto','autor':'pepito'}],
      'horarios':[{'horario_fin':'09:00','horario_inicio':'20:00','dias':[true,null,null,null,null,null,null]}],
      'imageURL':'www',
      'precios':[{'nota':'Lunes a viernes','precio':200}],   
      'titulo':'Titulo',
      'entrenadores':[{'apellido':'zurita','nombre':'jorge'}]
    })

    //this.forma.setValue(objeto);

  }




  markerDragEnd(m: any, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  
}
 /*

  noHerrera(control:FormControl):{[s:string]:boolean}{
    if(control.value ==='herrera'){
      return {
        noherrera:true
      }
    }
    return null;
  }

  verifySchool(control:FormControl):Promise<any>|Observable<any>{
    
    let promesa = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value ==='herrera'){
          resolve({exist:true})
        }else{
          resolve(null)
        }
      },3000);
    });

    return promesa;
  }

  noIguales(control:FormControl):{[s:string]:boolean}{
    
    let forma:any=this;
    //console.log(this)
    if(control.value !==forma.controls['password1'].value){
      return {
        noIguales:true
      }
    }
    return null;
  }

  */