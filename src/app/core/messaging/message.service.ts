import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ErrorParserService } from '../error-message-parser/error-message-parser.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    // Utiliza ngx-toastr
    // https://github.com/scttcper/ngx-toastr

    matDialogRef: MatDialogRef<ConfirmDialogComponent, any>;

    constructor(
        private toastr: ToastrService,
        private errorParserService: ErrorParserService,
        private matDialog: MatDialog,
    ) {
    }

    success(message: string) {
        this.toastr.success(message);
    }

    confirm(title: string, message: string, options: string[]): Observable<string> {
        const config = {
            position: {
                top: '10%',
            },
            data: {
                title: title,
                message: message,
                options: options,
            },
            disableClose: true,
        };
        this.matDialogRef = this.matDialog.open(ConfirmDialogComponent, config);

        return this.matDialogRef.afterClosed();
    }

    error(message: string | any) {
        if (typeof message !== "string") {
            message = this.errorParserService.getErrorMessage(message);
        }

        const config = {
            position: {
                top: '5%',
            },
            data: {
                title: "Erro",
                message: message,
                options: ["Ok"],
            }
        };
        this.matDialogRef = this.matDialog.open(ErrorDialogComponent, config);

        return this.matDialogRef.afterClosed();
    }

}
