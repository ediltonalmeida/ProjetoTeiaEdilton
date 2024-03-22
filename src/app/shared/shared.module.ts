import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../core/angular-material/angular-material.module';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ServerValidationErrorDisplayComponent } from './server-validation-error-display/server-validation-error-display.component';
import { ErrorMessageDisplayComponent } from './error-message-display/error-message-display.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
    declarations: [
        PaginaNaoEncontradaComponent,
        ServerValidationErrorDisplayComponent,
        ErrorMessageDisplayComponent,
        SafeHtmlPipe,
    ],
    imports: [
        CommonModule,

        AngularMaterialModule,
    ],
    exports: [
        ServerValidationErrorDisplayComponent,
        ErrorMessageDisplayComponent,
        SafeHtmlPipe,
    ],
})
export class SharedModule {

}