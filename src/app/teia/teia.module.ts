import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { TabelaDadosComponent } from "./tabela-dados/tabela-dados.component";
import { TeiaRoutingModule } from "./teia-routing.module";
import { MatTableModule } from "@angular/material/table";
import { SharedModule } from "../shared/shared.module";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from "@angular/material/card";
import { NgxPaginationModule } from "ngx-pagination";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TabelaDadosTabelaComponent } from './tabela-dados-tabela/tabela-dados-tabela.component';
import { ProgressBarColor } from "./configuracoes/config-barra-progresso";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { DetalharComponent } from './detalhar/detalhar.component';
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        TabelaDadosComponent,
        TabelaDadosTabelaComponent,
        ProgressBarColor,
        DetalharComponent,
    ],
    imports: [
        SharedModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserModule,
        MatCardModule,
        MatButtonModule,
        NgxPaginationModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatSortModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        TeiaRoutingModule,
    ],
    exports: [
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ],
})
export class TeiaModule {}