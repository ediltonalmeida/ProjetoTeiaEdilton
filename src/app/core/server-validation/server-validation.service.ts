import { Injectable, EventEmitter } from '@angular/core';
import { throwError } from 'rxjs';

import { RouteErrors } from './route-errors.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemDetails } from './problem-details.model';
import { DomainValidationException } from './domain-validation-exception.model';

// https://github.com/thiagospassos/Angular2-Validation
@Injectable({
    providedIn: 'root'
})
export class ServerValidationService {
    errors: RouteErrors[] = [];
    validationChanged: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    handleError(error: any) {
        this.setModelStateErrors(error);
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return throwError(errMsg);
    }

    getErrors(route: string): RouteErrors {
        let errors = this.errors.find(e => e.route == route);
        if (!errors) {
            errors = <RouteErrors>{ route: route, modelState: [] };
        }
        return errors;
    }

    clearErrors(): any {
        this.errors = [];
        this.validationChanged.emit();
    }

    private setModelStateErrors(httpErrorResponse: HttpErrorResponse) {
        if (!httpErrorResponse) {
            return;
        }

        if (this.isProblemDetails(httpErrorResponse.error)) {
            this.setErrors(<RouteErrors>{
                route: location.pathname,
                errorMessage: httpErrorResponse.error.title,
                modelState: httpErrorResponse.error.errors,
            });

            return;
        }

        if (this.isDomainValidationException(httpErrorResponse.error)) {
            this.setErrors(<RouteErrors>{
                route: location.pathname,
                errorMessage: 'DomainValidationException',
                modelState: httpErrorResponse.error,
            });

            return;
        }

        this.setErrors(<RouteErrors>{
            route: location.pathname,
            errorMessage: httpErrorResponse.message,
            modelState: httpErrorResponse.error.modelState,
        });
    }

    private setErrors(handler: RouteErrors) {
        let index = this.errors.findIndex(e => e.route == handler.route);
        if (index >= 0) {
            this.errors[index] = handler;
        } else {
            this.errors.push(handler);
        }
        this.validationChanged.emit(true);
    }

    private isProblemDetails(err: any): err is ProblemDetails {
        return (
            (<ProblemDetails>err).status !== undefined &&
            (<ProblemDetails>err).title !== undefined &&
            (<ProblemDetails>err).traceId !== undefined &&
            (<ProblemDetails>err).type !== undefined
        );
    }

    private isDomainValidationException(err: any): err is DomainValidationException {
        return (
            (<DomainValidationException>err).DomainValidationException !== undefined
        );
    }
}
