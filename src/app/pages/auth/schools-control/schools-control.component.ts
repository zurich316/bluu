import { Component, OnInit } from '@angular/core';
import { SchoolsService, SchoolID } from 'src/app/services/schools.service';
//import { School } from 'src/app/model/school';

@Component({
  selector: 'app-schools-control',
  templateUrl: './schools-control.component.html',
  styleUrls: ['./schools-control.component.css']
})
export class SchoolsControlComponent implements OnInit {
  schoolList:SchoolID[] =[];
  loading:boolean = true;
  constructor(public _schoolService:SchoolsService,) { }

  ngOnInit() {
    this.getListSchool();
  }

  getListSchool(){
    this._schoolService.getListShools()
                       .subscribe((data:any)=>{
                        this.schoolList=data;
                        this.loading = false; 
                       });
  }

}
