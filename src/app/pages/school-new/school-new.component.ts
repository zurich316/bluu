import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-school-new',
  templateUrl: './school-new.component.html',
  styles: []
})
export class SchoolNewComponent implements OnInit {

  forma:FormGroup;
  emailValidator:string="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  constructor() { 
    this.forma = new FormGroup({
      'datosInstructor': new FormGroup({
          'nombre' : new FormControl('',[
                                          Validators.required,
                                          Validators.minLength(3)
                                        ]),
          'apellido' : new FormControl('',[
                                              Validators.required,
                                              this.noHerrera
                                            ]),
          'email' : new FormControl('',[
                                          Validators.required, 
                                          Validators.pattern(this.emailValidator)
                                        ]),                                                                
          
      }),
      
      'titulo' : new FormControl('',
                                      Validators.required,
                                      //Validators.minLength(3),
                                      this.verifySchool
                                    ),                                                                                                                                                  
      'categoria' : new FormArray([
                                    new FormControl('',Validators.required)
                                  ]),
      'contactos' : new FormArray([
        new FormGroup({
          'tipo': new FormControl('Whatsapp',[]),
          'numero': new FormControl('123456',[])
        }),
        new FormGroup({
          'tipo': new FormControl('Facebook',[]),
          'numero': new FormControl('8888',[])
        })
      ]),
      'descuento' : new FormControl(),
      'direcciones' : new FormControl(),
      'descripciones' : new FormArray([
                                        new FormControl('',Validators.required)
                                      ]),
      'frases' : new FormControl(),
      'horarios' : new FormControl(),
      'imageURL' : new FormControl(),
      'tituprecioslo' : new FormControl(),

      'password1' : new FormControl('', Validators.required),
      'password2' : new FormControl(),


    });

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIguales.bind(this.forma)
    ]);
    

  }

  ngOnInit() {
  }

  newSchool(){
    console.log(this.forma);
    console.log(this.forma.controls);
    //this.forma.reset();
  }


  // CATEGORIA----------------------------

  addCategoria(){
    (<FormArray>this.forma.controls['categoria']).push(
      new FormControl('',Validators.required)
    )
    
  }

  removeCategoria(index){
    (<FormArray>this.forma.controls['categoria']).removeAt(index);
  }


// DESCRIPCIONES----------------------------

  addDescripcion(){
    (<FormArray>this.forma.controls['descripciones']).push(
      new FormControl('',Validators.required)
    )
    
  }

  removeDescripcion(index){
    (<FormArray>this.forma.controls['descripciones']).removeAt(index);
  }

  // Contactos----------------------------

  addContactos(){
    (<FormArray>this.forma.controls['contactos']).push(
      new FormGroup({
        
      })
    )
    
  }

  removeContactos(index){
    (<FormArray>this.forma.controls['contactos']).removeAt(index);
  }




// VALIDACIONES-----------------------------


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
    console.log(this)
    if(control.value !==forma.controls['password1'].value){
      return {
        noIguales:true
      }
    }
    return null;
  }

}
