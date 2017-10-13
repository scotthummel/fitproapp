import { FormControl } from '@angular/forms';

export class FatValidator {

  static isValid(control: FormControl): any {

    if(isNaN(control.value)){
      return {
        "error_text": "Please enter a number"
      };
    }

    if(control.value % 1 !== 0){
      return {
        "error_text": "Please enter a whole number"
      };
    }

    // if(control.value < 18){
    //   return {
    //     "too young": true
    //   };
    // }

    if (control.value > 2000){
      return {
        "error_text": "Please enter a number less than 2,000"
      };
    }

    return null;
  }

}
