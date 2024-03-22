import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// Para pipes em português
// https://angular.io/guide/i18n
import { LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";
registerLocaleData(localePt);

import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { HomeComponent } from "./home/home.component";
import { LayoutModule } from "./layout/layout.module";
import { AngularMaterialModule } from "./core/angular-material/angular-material.module";
import { CustomDateAdapter } from "./core/angular-material/custom-date-adapter";
import { DateAdapter } from "@angular/material/core";
import { TeiaModule } from "./teia/teia.module";

@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        LayoutModule,
        AngularMaterialModule,
        TeiaModule,
        AppRoutingModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: "pt" },
        { provide: DateAdapter, useClass: CustomDateAdapter },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
