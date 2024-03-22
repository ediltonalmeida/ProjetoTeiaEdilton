import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../../environments/environment';

// import { RotasParaCentralDePermissoesModule } from './central-de-permissoes/import/rotas-para-central-de-permissoes.module';

import { BlobErrorHttpInterceptor } from './http/blob-error-http-interceptor';
import { TimeoutInterceptor, DEFAULT_TIMEOUT } from './http/timeout-interceptor';

import { throwIfAlreadyLoaded } from './import-guard/module-import-guard';

import { AngularMaterialModule } from './angular-material/angular-material.module';

import { SlidingMessageToast } from './messaging/sliding-message-toast/sliding-message-toast.component';

import { ConfirmDialogComponent } from './messaging/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from './messaging/error-dialog/error-dialog.component';

@NgModule({
    declarations: [
        SlidingMessageToast,
        ConfirmDialogComponent,
        ErrorDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // environment.isLocal ? RotasParaCentralDePermissoesModule : [],
        BrowserModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            maxOpened: 1,
            autoDismiss: true,
            toastComponent: SlidingMessageToast,
            closeButton: true
        }),
        HttpClientModule,
    ],
    exports: [],
    providers: [
        // https://angular.io/guide/singleton-services
        // Beginning with Angular 6.0, the preferred way to create a singleton service is
        // to set providedIn to root on the service's @Injectable() decorator. This tells 
        // Angular to provide the service in the application root.
        // Os interceptors podem ser incluídos aqui.
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BlobErrorHttpInterceptor,
            multi: true
        },
        // Default and specific request timeout
        // https://stackoverflow.com/questions/45938931/default-and-specific-request-timeout
        environment.production ? { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true } : [],
        { provide: DEFAULT_TIMEOUT, useValue: 30000 },
    ]
})
export class CoreModule {
    // https://github.com/angular/angular/issues/21158#issuecomment-368638702
    // CoreModule is for things that are "providable". (Mainly services) It should be imported only once at the root AppModule.
    // SharedModule are for things that are "declarable". (Components, pipes, directives) It can be import many times.
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}