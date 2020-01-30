import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolsService, SchoolID } from 'src/app/services/schools.service';

@Component({
  selector: 'app-school-subcategory',
  templateUrl: './school-subcategory.component.html',
  styleUrls: ['./school-subcategory.component.css']
})
export class SchoolSubcategoryComponent implements OnInit {
  category = '';
  subCategory = '';
  schoolList: SchoolID[] = [];
  constructor(private route: ActivatedRoute, public _schoolService: SchoolsService) {

  }

  ngOnInit() {
    this.route.params
              .subscribe(params => {
            this.category = params['category'];
            this.subCategory = params['subcategory'];
            this.getSchools();
    });
  }

  getSchools() {
    this._schoolService.getSchoolsBySbuCategory(this.category, this.subCategory)
                       .then((resp: any) => {
                         this.schoolList = resp;
                         console.log(this.schoolList);
                       });
  }

}
