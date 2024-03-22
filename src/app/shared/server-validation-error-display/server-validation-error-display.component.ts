import { Component, OnInit } from '@angular/core';
import { ServerValidationService } from '../../core/server-validation/server-validation.service';

@Component({
    selector: 'app-server-validation-error-display',
    templateUrl: './server-validation-error-display.component.html',
    styleUrls: ['./server-validation-error-display.component.scss']
})
export class ServerValidationErrorDisplayComponent implements OnInit {
    errors: string[];
    exibir = false;

    constructor(
        private serverValidationService: ServerValidationService,
    ) { }

    ngOnInit() {
        this.serverValidationService.validationChanged.subscribe(() => this.handleErrors());
    }

    handleErrors() {
        const routeErrors = this.serverValidationService.getErrors(location.pathname);
        const modelState = routeErrors.modelState;

        this.errors = [];
        Object.keys(modelState).forEach(key => this.errors.push(this.concatenar(modelState[key])));

        if (this.errors != undefined && this.errors.length > 0) {
            this.exibir = true;
            return;
        }

        this.exibir = false;
    }

    private concatenar(errors: string[]): any {
        return errors.join(". ");
    }

}
