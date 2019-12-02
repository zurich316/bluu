import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { categories, sub_categories } from "../../../config/school.categories";

@Component({
  selector: 'app-school-category',
  templateUrl: './school-category.component.html',
  styleUrls: ['./school-category.component.css']
})
export class SchoolCategoryComponent{
  category: string;

  listCategories:string[] = categories; 
  listSubCategories:[] = []
  
  constructor(private route: ActivatedRoute) { 
                this.route.params
                    .subscribe(params=>{
                  this.category = params['category'];
                  this.listSubCategories = sub_categories[this.category];      
                })
              }



}
