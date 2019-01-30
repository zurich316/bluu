import { Component, OnInit } from '@angular/core';
import { SchoolsService } from '../../services/schools.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-school-view',
  templateUrl: './school-view.component.html',
  styles: []
})
export class SchoolViewComponent implements OnInit {

  categoryName:string="";
  schoolID:string=""
;
  constructor(public _schoolService:SchoolsService,
              private route: ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.route.params
              .subscribe(params=>{
                  this.categoryName = params['name'];
                  this.schoolID = params['id'];
                  this._schoolService.chargeSingleSchool(this.categoryName,this.schoolID)
              })

  }

}
