import { AbstractControl } from '@angular/forms';
export class Validate {
  static MatchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password').value;
    let confirmPassword = abstractControl.get('ConfirmPassword').value;
     if (password != confirmPassword) {
         abstractControl.get('ConfirmPassword').setErrors({
           MatchPassword: true
         })
    } else {
      return null
    }
  }
}