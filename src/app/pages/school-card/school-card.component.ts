import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-school-card',
  templateUrl: './school-card.component.html',
  styles: []
})
export class SchoolCardComponent implements OnInit {
  @Input () school:any={};
  @Output() schoolSelected:EventEmitter<number> = new EventEmitter();
  constructor() { 

    this.schoolSelected = new EventEmitter();

  }

  ngOnInit() {
  }

  getSchool(){
    this.schoolSelected.emit(this.school.id);
  }

}
