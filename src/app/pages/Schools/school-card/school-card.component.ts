import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-school-card',
  templateUrl: './school-card.component.html',
  styleUrls: ['./school-card.component.css']
})
export class SchoolCardComponent implements OnInit {
  @Input () schoolList:any=[];
  @Output() schoolSelected:EventEmitter<number> = new EventEmitter();
  constructor() { 

    this.schoolSelected = new EventEmitter();

  }

  ngOnInit() {
  }

  getSchool(id:number){
    console.log(id);
    this.schoolSelected.emit(id);
  }

}
