import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelaDadosComponent } from './tabela-dados/tabela-dados.component';
import { TabelaDadosTabelaComponent } from './tabela-dados-tabela/tabela-dados-tabela.component';

const routes: Routes = [
     { path: 'Grade', component: TabelaDadosComponent },
     { path: 'Tabela', component: TabelaDadosTabelaComponent },
        
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeiaRoutingModule {}

