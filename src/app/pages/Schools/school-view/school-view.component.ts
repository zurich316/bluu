import { Component, OnInit } from '@angular/core';
import { SchoolsService, School} from '../../../services/schools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms'



@Component({
  selector: 'app-school-view',
  templateUrl: './school-view.component.html',
  styleUrls: ['./school-view.component.css']
})
export class SchoolViewComponent implements OnInit {

  categoryName:string="";
  schoolID:string="";

  school:School;
  
  reveiwForma:FormGroup;
  loading:boolean=true;

  emailValidator:string="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  constructor(public _schoolService:SchoolsService,
              private route: ActivatedRoute,
              private router:Router) {
            
    this.startReviewForm();
  }
  ngOnInit() {

    this.categoryName = this.route.snapshot.params['name']
    this.schoolID = this.route.snapshot.params['id']
    this.getSchoolDetail();


  }

  getSchoolDetail(){
    this._schoolService.getSchool(this.categoryName,this.schoolID).subscribe((data:School)=>{
          
      this.school = data;
      
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
    
    if(this.school.reviews==null){
      this.school.reviews = [];
    }

    newReview.dia = today.getDate()+'-'+(today.getMonth()+1)+'-'+ today.getFullYear();
    newReview.hora = today.getHours() + ":" + today.getMinutes();
    
    this.school.reviews.push(newReview);
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
}
