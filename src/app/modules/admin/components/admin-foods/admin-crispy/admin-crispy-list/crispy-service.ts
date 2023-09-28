import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Crispy } from "./crispy-modal";

@Injectable({
    providedIn: 'root'
})

export class CrispyService{

    private baseURL = "http://localhost:8080/api/v1/category";
  cartSubject: any;

    constructor(private httpClient : HttpClient){}

    getCrispyList(): Observable<Crispy[]>{
        return this.httpClient.get<Crispy[]>(`${this.baseURL}`);

    }

    createCrispy(crispy : Crispy):Observable<object>{
        return this.httpClient.post(`${this.baseURL}`, crispy);
    }

    getCrispyById(id: number): Observable<Crispy>{
        return this.httpClient.get<Crispy>(`${this.baseURL}/${id}`);
    }

    updateCrispy(id : number, crispy: Crispy):Observable<Object>{
        return this.httpClient.put(`${this.baseURL}/${id}`,crispy);
    }

    deleteCrispy(id:number):Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

    addToCart(id : number){
        return this.httpClient.get<Crispy>(`${this.baseURL}/${id}`);
    }
    }