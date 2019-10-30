import { Component, OnInit } from '@angular/core';
import { SchoolsService} from '../../../services/schools.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { School } from 'src/app/model/school';
import { dayList } from 'src/app/config/school.categories';

@Component({
  selector: 'app-school-view',
  templateUrl: './school-view.component.html',
  styleUrls: ['./school-view.component.css']
})
export class SchoolViewComponent implements OnInit {

  codigo:string = Math.random().toString(36).substring(7);
  IsmodelShow:boolean=false;
  categoryName:string="";
  schoolID:string="";
  daysList:string[]=dayList;


  school:School;
  
  reveiwForma:FormGroup;
  loading:boolean=true;

  emailValidator:string="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  constructor(public _schoolService:SchoolsService,
              private route: ActivatedRoute,
              public _auth:AuthService) {
            
    this.startReviewForm();
  }
  ngOnInit() {

    this.categoryName = this.route.snapshot.params['name']
    this.schoolID = this.route.snapshot.params['id']
    console.log(this.categoryName,this.schoolID)
    this.getSchoolDetail();


  }

  generarNuevoCodigo(){
    this.codigo=Math.random().toString(36).substring(7);
  }

  getSchoolDetail(){
    this._schoolService.getSchoolInfo(this.schoolID).then((data:School)=>{
          
      this.school = data;
      console.log(this.school)
      if(this.school){
        this.loading = false; 
        //console.log(this.school)
      }
      
      
    })
  }

  startReviewForm(){
    this.reveiwForma = new FormGroup({
      'contenido':new FormControl('',Validators.required),
      'estrellas':new FormControl('',Validators.required),
      'email':new FormControl('',[Validators.required,Validators.pattern(this.emailValidator)])
    })
  }

  submitReview(){
    const today = new Date();
    
    let newReview = this.reveiwForma.value;
    this._schoolService.submitReview(this.categoryName,this.schoolID,this.reveiwForma.value)
    
    if(this.school.revs==null){
      this.school.revs = [];
    }

    newReview.dia = today.getDate()+'-'+(today.getMonth()+1)+'-'+ today.getFullYear();
    newReview.hora = today.getHours() + ":" + today.getMinutes();
    
    this.school.revs.push(newReview);
    this._schoolService.updateSchool(this.school);
    this.reveiwForma.reset();
    
  }

  cambiarHoja(id:string){

    let hojaActiva:any = document.getElementById(id);
    let selectores:any = document.getElementsByClassName('collapse');

    for(let ref of selectores){
      ref.classList.remove('show');
    }

    hojaActiva.classList.add('show');
  }

  subscribeToSchool(){
    if(!this._auth.isUserLoggedIn()){
      return;
    }

    this._schoolService.subcribe(this._auth.user.uid,this.schoolID);
  }

  cerrar(){
    //this.IsmodelShow=true;
    let modal:any = document.getElementById('inscribirseModal');
    console.log(modal)
    
  }


}
