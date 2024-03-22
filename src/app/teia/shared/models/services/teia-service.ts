import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TeiaJsonModel } from "./teia-json.model";
import { Observable } from "rxjs";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable({
    providedIn: 'root'
})
export class TeiaService {
    private apiUrl = 'https://jsonplaceholder.typicode.com/photos/'
    constructor(private http: HttpClient) {}

    carregarJsonTeia(): Observable<TeiaJsonModel[]> {
        const url = `${this.apiUrl}`;
        return this.http.get<TeiaJsonModel[]>(url);
    }

}