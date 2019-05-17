import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../../services/category.service'
import { EventsService, Event } from 'src/app/services/events.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  categoryList:Category[]=[];
  eventList:Event[]=[];

  constructor(public _info:CategoryService, public _event:EventsService) { 
   this.getAllCategories();
   this.getAllEvents();
  }

  ngOnInit() {
    
  }


  getAllCategories(){
    this._info.categoryCollection.valueChanges().subscribe((data:Category[])=>{
     this.categoryList = data;
    })
  }

  getAllEvents(){
    this._event.getListEvent().subscribe((data:Event[])=>{
      console.log(data);
      this.eventList = data.filter(event=> event.estado);

    })
  }


  

}
