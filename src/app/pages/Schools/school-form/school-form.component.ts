import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn,FormArray} from '@angular/forms'
import { MouseEvent } from '@agm/core';
import { SchoolsService } from "../../../services/schools.service";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { categories } from 'src/app/config/school.categories';
import { CustomValidators } from 'src/app/class/custom-validators';

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.css']
})
export class SchoolFormComponent implements OnInit {
  @Input () schoolForm:any={};
  @Output() sendFormSchool:EventEmitter<any> = new EventEmitter();
  
  categories:any= categories;
  forma:FormGroup;
  emailValidator:string="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  contactosTipos:string[]=['Whatsapp','Facebook','Twitter','Celular','Correo','Otro']
  diasLista:string[]=['Lunes','Martes','Miercoles','Jueves',"Viernes",'Sabado','Domingo'];  
  constructor(public _schoolService:SchoolsService,
              public router: Router) { 
   this.sendFormSchool = new EventEmitter();
   this.defineForm(); 

  }

  ngOnInit() {

   this.setValuesToForm()
  }

  enviarFormulario(){

    if(!this.forma.valid){
      console.log(this.forma);
      Swal.fire({
        type:'error',
        title:'Error',
        text: "Formulario no completo"
      });
      return;
    }

    console.log(this.forma.value);
    console.log(this.forma.controls);
    this.sendFormSchool.emit(this.forma.value);
    this.forma.reset();
    this.router.navigate(['escuelas']);
    //this._schoolService.createSchool(this.forma.value,this.forma.value.schoolCategory);
    //this.forma.reset();
    
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
    const diasLista:string[]=['Lunes','Martes','Miercoles','Jueves',"Viernes",'Sabado','Domingo']; 
    const diasSemana = diasLista.map(c => new FormControl(false));
    (<FormArray>this.forma.controls['horarios']).push(
      new FormGroup({                                    
        'horario_fin': new FormControl('',Validators.required),
        'horario_inicio': new FormControl('',Validators.required),
        'dias': new FormArray(diasSemana,CustomValidators.verifyDaysCheck())
        
      })
    )
    
  }

  agregarDireccion($event: MouseEvent) {

    let coordenadas = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      //draggable: false
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
      'horarios' : new FormArray([]),
      
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

    this.addHorario();
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
      'imageURL':'',
      'precios':[{'nota':'Lunes a viernes','precio':200}],   
      'titulo':'Titulo',
      'entrenadores':[{'apellido':'zurita','nombre':'jorge'}]
    })

    //this.forma.setValue(objeto);

  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  get titulo() {
    return this.forma.get('titulo');
  }
}
