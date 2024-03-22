import { AbstractControl, FormArray, FormGroup, ValidatorFn } from '@angular/forms';

import { isBlank, isPresent } from '../utils/utils';

export class UniqueByValidator {

    //https://stackoverflow.com/questions/43577894/angular-uniqueness-validator-in-formarray
    public static create = (field: string, caseSensitive: boolean = false): ValidatorFn => {
        return (formArray: FormArray): { [key: string]: boolean } => {
            const controls: AbstractControl[] = formArray.controls.filter((formGroup: FormGroup) => {
                return isPresent(formGroup.get(field).value);
            });
            const uniqueObj: any = { uniqueBy: true };
            let foundDuplicate: boolean = false;

            controls.map(formGroup => formGroup.get(field)).forEach(x => {
                if (x.errors) {
                    delete x.errors['uniqueBy'];
                    if (isBlank(x.errors)) {
                        x.setErrors(null);
                    }
                }
            });

            if (controls.length > 1) {
                for (let i: number = 0; i < controls.length; i++) {
                    const formGroup: FormGroup = controls[i] as FormGroup;
                    const mainControl: AbstractControl = formGroup.get(field);
                    const val: string = mainControl.value;

                    const mainValue: string = caseSensitive ? val : val.toLowerCase();
                    controls.forEach((group: FormGroup, index: number) => {
                        if (i === index) {
                            return;
                        }

                        const currControl: any = group.get(field);
                        const tempValue: string = currControl.value;
                        const currValue: string = caseSensitive ? tempValue : tempValue.toLowerCase();
                        let newErrors: any;

                        if (mainValue === currValue) {
                            if (isBlank(currControl.errors)) {
                                newErrors = uniqueObj;
                            } else {
                                newErrors = Object.assign(currControl.errors, uniqueObj);
                            }
                            currControl.setErrors(newErrors);
                            foundDuplicate = true;
                        }
                    });
                }
                //console.log(controls.map(x => x.get(field)).map(x => x.errors && JSON.stringify(x.errors)));

                if (foundDuplicate) {
                    return uniqueObj;
                }
            }

            return null;
        };
    }
}