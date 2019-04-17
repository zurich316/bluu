import { Component, OnInit,  } from '@angular/core';
import { SchoolsService } from "../../services/schools.service";

@Component({
  selector: 'app-school-new',
  templateUrl: './school-new.component.html',
  styles: []
})
export class SchoolNewComponent implements OnInit {
  newSchool:any;
  constructor(public _schoolService:SchoolsService) { 
  }

  ngOnInit() {
  }

  formResult(form:any){
    console.log('Recivido')
    console.log(form)
    this._schoolService.createSchool(form,form.schoolCategory);
  }

}
