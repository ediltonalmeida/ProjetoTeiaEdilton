import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { tryParseJSON } from '../utils/utils';

import { ErrorMessageIdentifierService } from './error-message-identifier.service';

import { SignalRError } from './models/signalr-error.model';
import { DotNetException } from './models/dot-net-exception.model';
import { DotNetCoreException } from './models/dot-net-core-exception.model';
import { DotNet5Exception } from './models/dot-net-5-exception.model';

@Injectable({
    providedIn: 'root'
})
export class ErrorParserService {

    constructor(
        private errorMessageIdentifierService: ErrorMessageIdentifierService,
    ) { }

    getErrorMessage(err: any): string {
        if (err instanceof Error) {

            if (this.errorMessageIdentifierService.isSignalRError(err)) {
                const responseText = this.getResponseTextForSignalR(err);

                return `Ocorreu um erro ao tentar estabelecer uma conexão SignalR.\n\n${err.source.status} - ${err.source.statusText}\nMensagem: ${err.message}\n\nResponse:\n${responseText}`;
            }

            // A client-side or network error occurred. Handle it accordingly.
            return `Ocorreu um erro no aplicativo (client side).\n\nMensagem: ${err.message}`;
        }
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            return `Ocorreu um erro no aplicativo (client side).\n\nMensagem: ${err.error.message}`;
        }

        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        let errorMessage: string;

        if (err.body != null && err.body.error != null) {
            errorMessage = `${err.status} - ${err.statusText}\n\nError: ${err.body.error}`;
        } else if (this.errorMessageIdentifierService.isDotNetException(err.error)) {
            errorMessage = this.getDotNetExceptionMessage(err.error);
        } else if (this.errorMessageIdentifierService.isDotNetCoreException(err.error)) {
            errorMessage = this.getDotNetCoreExceptionMessage(err.error);
        } else if (this.errorMessageIdentifierService.isDotNet5Exception(err.error)) {
            errorMessage = this.getDotNet5ExceptionMessage(err.error);
        } else if (err instanceof HttpErrorResponse) {

            if (this.errorMessageIdentifierService.isMessageDetailError(err.error)) {
                errorMessage = `${err.status} - ${err.statusText}\n\nMensagem: ${err.message}\n\nMessage: ${err.error.message}\nMessageDetail: ${err.error.messageDetail}`;
            } else {
                errorMessage = `${err.status} - ${err.statusText}\n\nMensagem: ${err.message}`;
            }

        } else {
            errorMessage = JSON.stringify(err);
        }

        return `Ocorreu um erro no servidor.\n\n${errorMessage}`;
    }

    private getResponseTextForSignalR(err: Error & SignalRError) {

        const responseTextObj = tryParseJSON(err.source.responseText);

        if (responseTextObj && this.errorMessageIdentifierService.isDotNetException(responseTextObj)) {
            return this.getDotNetExceptionMessage(responseTextObj);
        }

        if (responseTextObj && this.errorMessageIdentifierService.isDotNetCoreException(responseTextObj)) {
            return this.getDotNetCoreExceptionMessage(responseTextObj);
        }

        return err.source.responseText;
    }

    private getDotNetExceptionMessage(error: DotNetException) {
        let allExceptionMessages = this.getAllMessages(error).join("\n\n");

        return `Mensagem: ${error.message}\n\nStack trace:\n${error.stackTrace}\n\n${allExceptionMessages}`;
    }

    private getDotNetCoreExceptionMessage(error: DotNetCoreException) {
        let allExceptionMessages = this.getAllDotNetCoreMessages(error).join("\n\n");

        return `${allExceptionMessages}`;
    }

    private getDotNet5ExceptionMessage(error: DotNet5Exception) {
        let allExceptionMessages = this.getAllDotNet5Messages(error).join("\n\n");

        return `${allExceptionMessages}`;
    }

    private getAllMessages(error: DotNetException): string[] {
        let messages: string[] = [];

        if (error.exceptionMessage != undefined) {

            messages.push(this.getExceptionAsString(error));

            let inner = error.innerException;

            while (inner != undefined) {
                messages.push(this.getExceptionAsString(inner));
                inner = inner.innerException;
            }
        }

        return messages;
    }

    private getAllDotNetCoreMessages(error: DotNetCoreException): string[] {
        let messages: string[] = [];

        if (error.Message != undefined) {

            messages.push(this.getDotNetCoreExceptionAsString(error));

            let inner = error.InnerException;

            while (inner != undefined) {
                messages.push(this.getDotNetCoreExceptionAsString(inner));
                inner = inner.InnerException;
            }
        }

        return messages;
    }

    private getAllDotNet5Messages(error: DotNet5Exception): string[] {
        let messages: string[] = [];

        if (error.message != undefined) {

            messages.push(this.getDotNet5ExceptionAsString(error));

            let inner = error.innerException;

            while (inner != undefined) {
                messages.push(this.getDotNet5ExceptionAsString(inner));
                inner = inner.innerException;
            }
        }

        return messages;
    }

    private getExceptionAsString(error: DotNetException): string {
        return error.exceptionType + ": " + error.exceptionMessage + "\n\nStack trace:\n" + error.stackTrace;
    }

    private getDotNetCoreExceptionAsString(error: DotNetCoreException): string {
        return error.ClassName + ": " + error.Message + "\n\nStack trace:\n" + error.StackTraceString;
    }

    private getDotNet5ExceptionAsString(error: DotNet5Exception): string {
        return error.source + ": " + error.message + "\n\nStack trace:\n" + error.stackTrace;
    }

}
