import { Component, Input } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-error-message-display',
    templateUrl: './error-message-display.component.html',
    styleUrls: ['./error-message-display.component.scss'],
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
export class ErrorMessageDisplayComponent {
    @Input() errorMessage: string;

    mostrarIcone = false;

    acionarIcone() {
        this.mostrarIcone = false;

        setTimeout(() => this.mostrarIcone = true, 1);
    };
}
