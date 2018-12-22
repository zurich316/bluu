import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(public _info:CategoryService) { }

  ngOnInit() {
  }

}
