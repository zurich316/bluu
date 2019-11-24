import { Component } from '@angular/core';
import { SchoolsService } from '../../../services/schools.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-school-index',
  templateUrl: './school-index.component.html',
  styleUrls: ['./school-index.component.css']
})
export class SchoolIndexComponent{
  disciplina: string;
  schoolList:any =[];
  newList:any=[];
  loading:boolean = true;

  constructor(public _schoolService:SchoolsService,
              private route: ActivatedRoute,
              private router:Router) { 
                this.route.params
                        .subscribe(params=>{
                  this.disciplina = params['name'];
                  this.getListSchool(this.disciplina);
                        
                })
              }

  

  getSchool(id){
    this.router.navigate(['/escuela',this.disciplina,id]);
  }

  getListSchool(category:string){

  }


  chose(disciplina:string){
    switch (disciplina) {
      // case 'artes':
        
      //   let artes = [this.schoolList[0]];
      //   let musica = [this.schoolList[1]];
      //   let danza = [this.schoolList[2]];
        
      //   this.newList = [
      //     {
      //       'tipo':"artes",
      //       lista:artes
      //     },
      //     {
      //       'tipo':"musica",
      //       lista:musica
      //     },
      //     {
      //       'tipo':"danza",
      //       lista:danza
      //     },
      //   ]

      //   console.log(this.newList);
      //   break;
      
      // case 'deportes': 
      // let otros=this.schoolList.splice(6,1)
      // this.newList = [
      //   {
      //     'tipo':"artes marciales",
      //     lista:this.schoolList
      //   },
      //   {'tipo':"otros",
      //     lista:otros
      //   }
      // ]

      // break; 
    
      default:
        this.newList = [{
          'tipo':"Todo",
           lista:this.schoolList
        }]

        console.log(this.newList);
        break;
    }
  }

}
