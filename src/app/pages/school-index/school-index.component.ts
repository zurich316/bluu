import { Component, OnInit } from '@angular/core';
import { SchoolsService } from '../../services/schools.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-school-index',
  templateUrl: './school-index.component.html',
  styles: []
})
export class SchoolIndexComponent implements OnInit {
  name: string;
  constructor(public _schoolService:SchoolsService,
              private route: ActivatedRoute,
              private router:Router) { }

  ngOnInit() {

    this.route.params
              .subscribe(params=>{
        this.name = params['name'];
        this._schoolService.chargeAllSchools(this.name)

    })

  }

  getSchool(id){

    this.router.navigate(['/escuela',this.name,id]);
  }

}
