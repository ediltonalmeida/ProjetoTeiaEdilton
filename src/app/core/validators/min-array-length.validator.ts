import { FormArray, ValidatorFn } from '@angular/forms';

export class MinArrayLengthValidator {

    //https://stackoverflow.com/questions/43577894/angular-uniqueness-validator-in-formarray
    public static create = (min: number): ValidatorFn => {
        return (formArray: FormArray): { [key: string]: boolean } => {
            if (formArray.value.length < min) {
                return { 'minArrayLength': true };
            }

            return null;
        };
    }
}