import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../../services/category.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  
  categoryList:Category[]=[];

  constructor(public _info:CategoryService) { 
   this.getAllCategories();
  }

  ngOnInit() {
    
  }


  getAllCategories(){
    this._info.categoryCollection.valueChanges().subscribe((data:Category[])=>{
     this.categoryList = data;
    })
  }

  

}
