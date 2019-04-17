import { Component, OnInit } from '@angular/core';
import { SchoolsService } from '../../services/schools.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-school-index',
  templateUrl: './school-index.component.html',
  styles: []
})
export class SchoolIndexComponent{
  name: string;
  schoolList:[]=[];

  loading:boolean = true;

  constructor(public _schoolService:SchoolsService,
              private route: ActivatedRoute,
              private router:Router) { 
                this.route.params
                        .subscribe(params=>{
                  this.name = params['name'];
                  this.getListSchool(this.name);        
                })
              }

  

  getSchool(id){
    this.router.navigate(['/escuela',this.name,id]);
  }

  getListSchool(category:string){
    this._schoolService.getListShool(category)
                       .subscribe((data:any)=>{
                        this.schoolList=data;
                        this.loading = false;
                       });
  }

}
