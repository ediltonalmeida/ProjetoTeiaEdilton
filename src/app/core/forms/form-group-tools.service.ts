import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormGroupToolsService {

    constructor() { }

    // Reactive Forms - mark fields as touched
    // https://stackoverflow.com/questions/40529817/reactive-forms-mark-fields-as-touched#44150793
    //
    // Outra opção é implementar um ErrorStateMatcher, conforme:
    // https://stackoverflow.com/questions/46745171/angular-material-show-mat-error-on-button-click
    markEveryFormGroupAsTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: FormGroup) => {
            control.markAsTouched();

            if (control.controls) {
                this.markEveryFormGroupAsTouched(control);
            }
        });

    }
}