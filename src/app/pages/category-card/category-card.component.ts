import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html'
})
export class CategoryCardComponent implements OnInit {


  constructor(private router:Router) { 

  }

  ngOnInit() {
  }

  getSchools(name){
    this.router.navigate(['/escuela',name])
  }

}
