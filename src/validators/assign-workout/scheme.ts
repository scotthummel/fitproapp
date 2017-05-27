import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

export const SCHEME_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SchemeValidator),
  multi: true
};

@Directive({
  selector: '[validateScheme][formControlName],[validateScheme][formControl],[validateScheme][ngModel]',
  providers: [SCHEME_VALIDATOR]
})

export class SchemeValidator implements Validator {
  @Input() validateScheme: string;

  validate(control: AbstractControl): { [key: string]: any } {
      let scheme = control.root.get('rep_scheme.scheme');
      // let value = scheme.value;
      let cluster_reps = control.root.get('rep_scheme.cluster_reps');
      console.log(cluster_reps);
      let reps = cluster_reps.value
      console.log(reps);
      if (reps == undefined || reps == '') {
          return {validateScheme:false}
      }

      scheme.updateValueAndValidity();
      return null;
  }
}
