import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-maps-module',
  templateUrl: './maps-module.component.html',
  styleUrls: ['./maps-module.component.css']
})
export class MapsModuleComponent implements OnInit {
  @Input () direcctionList: any[] = [];

  marcador: any = null;

  constructor() {

  }

  ngOnInit() {
    this.marcador = this.direcctionList[0];
  }
}
