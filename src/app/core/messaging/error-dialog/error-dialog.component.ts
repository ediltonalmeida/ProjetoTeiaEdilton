import { Component, Inject } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.component.html',
    styleUrls: ['./error-dialog.component.scss'],
    animations: [
        trigger('curtainAnimation', [
            state('hidden', style({
                width: "100%",
            })),
            transition('hidden => show', [
                animate("3s", keyframes([
                    style({ width: "0%", offset: 0.08 }),
                    style({ width: "0%", offset: 0.99 }),
                    style({ width: "100%", offset: 1 }),
                ]))
            ]),
        ]),
        trigger('iconAnimation', [
            state('hidden', style({
                opacity: 0,
            })),
            transition('hidden => show', [
                animate("3s", keyframes([
                    style({ opacity: 1, offset: 0.08 }),
                    style({ opacity: 1, offset: 0.9 }),
                    style({ opacity: 0, offset: 1 }),
                ]))
            ]),
        ]),
    ],
})
export class ErrorDialogComponent {

    mostrarIcone = false;

    constructor(
        public dialogRef: MatDialogRef<ErrorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    acionarIcone() {
        this.mostrarIcone = false;

        setTimeout(() => this.mostrarIcone = true, 1);
    };
}
