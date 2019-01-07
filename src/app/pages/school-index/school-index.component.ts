import { Component, OnInit } from '@angular/core';
import { SchoolsService } from '../../services/schools.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-school-index',
  templateUrl: './school-index.component.html',
  styles: []
})
export class SchoolIndexComponent implements OnInit {
  id: string;
  constructor(public _schoolService:SchoolsService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params
              .subscribe(params=>{
        this.id = params['name'];
        this._schoolService.chargeSchools(this.id)

    })

  }

}
