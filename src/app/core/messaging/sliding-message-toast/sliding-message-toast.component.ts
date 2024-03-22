import { Component } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';

@Component({
    selector: '[sliding-message-toast-component]',
    styleUrls: ['./sliding-message-toast.component.scss'],
    templateUrl: './sliding-message-toast.component.html',
    animations: [
        trigger('flyInOut', [
            state('inactive', style({
                display: 'none',
                opacity: 0
            })),
            transition('inactive => active', animate('400ms ease-out', keyframes([
                style({
                    transform: 'translate3d(100%, 0, 0)',
                    opacity: 0,
                }),
                style({
                    transform: 'none',
                    opacity: 1,
                }),
            ]))),
            transition('active => removed', animate('400ms ease-out', keyframes([
                style({
                    opacity: 1,
                }),
                style({
                    transform: 'translate3d(100%, 0, 0)',
                    opacity: 0,
                }),
            ]))),
        ]),
    ],
    preserveWhitespaces: false,
})
export class SlidingMessageToast extends Toast {
    // constructor is only necessary when not using AoT
    constructor(
        protected toastrService: ToastrService,
        public toastPackage: ToastPackage,
    ) {
        super(toastrService, toastPackage);
    }

    action(event: Event) {
        event.stopPropagation();
        this.toastPackage.triggerAction();
        return false;
    }
}