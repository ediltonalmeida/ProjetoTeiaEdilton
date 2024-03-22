import { FormControl, ValidatorFn, Validators, AbstractControl, FormGroup } from '@angular/forms';

export class RequiredIfValidator {

    // https://medium.com/ngx/3-ways-to-implement-conditional-validation-of-reactive-forms-c59ed6fc3325
    public static create = (predicate: () => boolean): ValidatorFn => {
        return (formControl: FormControl): { [key: string]: boolean } => {
            if (!formControl.parent) {
                return null;
            }

            if (predicate()) {
                return Validators.required(formControl);
            }

            return null;
        };
    }

}