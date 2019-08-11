import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-accounts-index',
  templateUrl: './accounts-index.component.html',
  styles: []
})
export class AccountsIndexComponent implements OnInit {

  accontsList:User[]=[]
  constructor(private _account:AccountService) { }

  ngOnInit() {
    this.getAccounts()
  }

  getAccounts(){
    this._account.getLisAcconts().subscribe((data:User[])=>{
      this.accontsList = data;   
      console.log(this.accontsList)
    })
  }


}
