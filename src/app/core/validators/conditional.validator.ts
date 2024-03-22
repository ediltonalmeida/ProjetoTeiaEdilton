import { FormControl, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export class ConditionalValidator {

    // https://medium.com/ngx/3-ways-to-implement-conditional-validation-of-reactive-forms-c59ed6fc3325
    public static create = (predicate: () => boolean, validator: (control: AbstractControl) => ValidationErrors | null): ValidatorFn => {
        return (formControl: FormControl): { [key: string]: boolean } => {
            if (!formControl.parent) {
                return null;
            }

            if (predicate()) {
                return validator(formControl);
            }

            return null;
        };
    }

}