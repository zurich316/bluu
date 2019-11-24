import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/model/user';

@Component({
  selector: 'app-accounts-index',
  templateUrl: './accounts-index.component.html',
  styles: []
})
export class AccountsIndexComponent implements OnInit {

  accontsList:UserModel[]=[]
  constructor(private _account:AccountService) { }

  ngOnInit() {
    this.getAccounts()
  }

  getAccounts(){
    this._account.getLisAcconts().subscribe((data:any)=>{
      this.accontsList = data;   
      console.log(this.accontsList)
    })
  }


}
