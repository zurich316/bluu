import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolsService } from "../../services/schools.service";



@Component({
  selector: 'app-school-edit',
  templateUrl: './school-edit.component.html',
  styles: []
})
export class SchoolEditComponent implements OnInit {

  schoolID:string;
  categoryName:string;

  school:any;
  constructor( private router:ActivatedRoute,
               public _schoolService:SchoolsService) { }

  ngOnInit() {
    this.categoryName = this.router.snapshot.params['name']
    this.schoolID = this.router.snapshot.params['id']
    this._schoolService.getSchool(this.categoryName,this.schoolID)
                       .subscribe((data:any)=>{
                         this.school = data;
                         console.log(this.school);
                       });
    

  }

}
