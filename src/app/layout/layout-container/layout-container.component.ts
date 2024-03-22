import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized, Data } from '@angular/router';

@Component({
    selector: 'app-layout-container',
    templateUrl: './layout-container.component.html',
    styleUrls: ['./layout-container.component.scss']
})
export class LayoutContainerComponent implements OnInit {
    private routeData: Data;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
        this.router.events.subscribe((data) => {
            if (data instanceof RoutesRecognized) {
                this.routeData = data.state.root.firstChild.data;
            }
        });
    }

    get useMainLayout(): boolean {
        return this.layout == "main" || this.layout == "";
    }

    get useEmptyLayout(): boolean {
        return this.layout == "empty";
    }

    private get layout(): string {
        return this.routeData != undefined && this.routeData.layout != undefined
            ? this.routeData.layout
            : "";
    }

}
