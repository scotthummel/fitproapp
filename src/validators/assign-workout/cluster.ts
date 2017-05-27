import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

export const CLUSTER_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ClusterValidator),
  multi: true
};

@Directive({
  selector: '[validateCluster][formControlName],[validateCluster][formControl],[validateCluster][ngModel]',
  providers: [CLUSTER_VALIDATOR]
})

export class ClusterValidator implements Validator {
  @Input() validateCluster: string;

  validate(control: AbstractControl): { [key: string]: any } {
    //   let schemeControl = control.root.get('rep_scheme.scheme');
    //   let scheme = schemeControl.value;
    //   let field = control.root.get('rep_scheme.cluster_reps');
    //   let value = field.value
    //   console.log(scheme, value);
      //
    //   if (value == undefined || value == '') {
    //       return {validateCluster:false}
    //   }
      //
    //   schemeControl.updateValueAndValidity();
      return null;
  }
}
