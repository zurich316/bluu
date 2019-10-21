import { ValidationErrors, ValidatorFn, AbstractControl, AsyncValidatorFn, FormArray } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { debounceTime, take, map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class CustomValidators { 

  static verifyEmail(afs: AccountService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {
      return afs.findAccount(control.value).valueChanges()
        .pipe(
        first(),
          map(user => 
             user.length ? { invalidUsername : `${control.value} already exists` } : null),
      )
      
    }
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
  
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
  
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const passwordConfirm: string = control.get('passwordConfirm').value; // get password from our passwordConfirm form control
    // compare is the password math
    if (password !== passwordConfirm) {
      // if they don't match, set an error in our passwordConfirm form control
      control.get('passwordConfirm').setErrors({ NoPassswordMatch: true });
    }
  }

  static verifyDaysCheck(min=1):ValidatorFn{
    let validatorVar: ValidatorFn = (formArray: FormArray) => {
      let totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);
  
      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };
  
    return validatorVar;
  }

}


