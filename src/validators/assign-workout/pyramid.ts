import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

export const PYRAMID_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PyramidValidator),
  multi: true
};

@Directive({
  selector: '[validatePyramid][formControlName],[validatePyramid][formControl],[validatePyramid][ngModel]',
  providers: [PYRAMID_VALIDATOR]
})

export class PyramidValidator implements Validator {
  @Input() validatePyramid: string;

  validate(control: AbstractControl): { [key: string]: any } {
      let value = control.value

      if (value == undefined || value == '') {
          return {validatePyramid:false}
      }
      return null;
  }
}
