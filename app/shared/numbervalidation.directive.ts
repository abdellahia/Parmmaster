import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';


@Directive({
    selector: '[appNumberValidation]',
    providers: [{provide: NG_VALIDATORS, useExisting: NumberValidatorDirective, multi: true}]
  })

  export class NumberValidatorDirective implements Validator {
    validate(control: AbstractControl): {[key: string]: any} | null {
      return  numberValidator(new RegExp('(^[0-9]+$|^$|^\s$)'))(control);
    }
  }

export function numberValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const valid = nameRe.test(control.value);
      return valid ? null : {invalid: {value: control.value}};
    };
  }
