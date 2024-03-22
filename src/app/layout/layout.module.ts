import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../core/angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutContainerComponent } from './layout-container/layout-container.component';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';

@NgModule({
    declarations: [
        LayoutContainerComponent,

        MainLayoutComponent,
        EmptyLayoutComponent
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        RouterModule,

        SharedModule,
    ],
    exports: [
        LayoutContainerComponent,
    ]
})
export class LayoutModule { }
