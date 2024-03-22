import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { PaginaNaoEncontradaComponent } from "./shared/pagina-nao-encontrada/pagina-nao-encontrada.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        pathMatch: "full",
    },
    { path: "**", component: PaginaNaoEncontradaComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
    ],
    exports: [RouterModule],
})

export class AppRoutingModule {
    
    constructor() {
    }
}
