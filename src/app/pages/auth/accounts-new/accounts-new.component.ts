import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, FormControl } from '@angular/forms';
import { CustomValidators } from 'src/app/class/custom-validators';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-accounts-new',
  templateUrl: './accounts-new.component.html',
  styleUrls: ['./accounts-new.component.css']
})
export class AccountsNewComponent implements OnInit {

  userForm: FormGroup; 
  success=false;
  favoriteSeason: string;
  
  roles:string[]=['estudiante','profesor','admin']
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  constructor(private fb: FormBuilder,
              private _account:AccountService,
              private _auth:AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  createUser(){
    if(this.userForm.invalid){return}
    let newUser = this.userForm.value;
    console.log(newUser)
    // const secondAurh = firebase.initializeApp(firebaseConfig,'secondary')
    // secondAurh.auth().createUserWithEmailAndPassword(newUser.name,newUser.password).then()
    //this._account.createAccount(newUser);
  }

  initForm() {
    const roles = this.fb.group({ 
      estudiante: [false],
      profesor: [false],
      admin: [true]
    })

    this.userForm = this.fb.group({
      email: [null, [
        Validators.email
      ],[
        CustomValidators.verifyEmail(this._account)
      ]],
      name: [null, [
        Validators.required,
      ]],
      active:true,
      roles: roles,
      password: [null,[Validators.compose([
        
        Validators.required,
        Validators.minLength(8),
        // CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        //CustomValidators.patternValidator(/[ [!@#$%^&*()_+-=[]{};':"|,.<>/?]/](<mailto:!@#$%^&*()_+-=[]{};':"|,.<>/?]/>), { hasSpecialCharacters: true }),
      ])]],
      passwordConfirm: [null, Validators.compose([Validators.required])]
    },
    {
      validator: CustomValidators.passwordMatchValidator
    })
  }

  get name(){
    return this.userForm.get('name')
  }

  get email(){
    return this.userForm.get('email')
  }

  get password(){
    return this.userForm.get('password')
  }
  
  get passwordConfirm(){
    return this.userForm.get('passwordConfirm')
  }

}
