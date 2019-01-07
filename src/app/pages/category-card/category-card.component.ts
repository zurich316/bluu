import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryID } from '../../services/category.service'


@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html'
})
export class CategoryCardComponent implements OnInit {
  @Input () Category:CategoryID

  constructor(private router:Router) { 

  }

  ngOnInit() {
  }

  getSchools(name){
    this.router.navigate(['/escuela',name])
  }

}
