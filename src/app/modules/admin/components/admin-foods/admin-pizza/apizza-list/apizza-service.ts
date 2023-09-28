import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pizza } from "./apizza";


@Injectable({
    providedIn: 'root'
})

export class PizzaService{

    private baseURL = "http://localhost:8080/api/v1/pizza";

    constructor(private httpClient : HttpClient){}

    getPizzaList(): Observable<Pizza[]>{
        return this.httpClient.get<Pizza[]>(`${this.baseURL}`);

    }

    createPizza(pizza: Pizza):Observable<object>{
        return this.httpClient.post(`${this.baseURL}`, pizza);
    }

    getPizzaById(id: number): Observable<Pizza>{
        return this.httpClient.get<Pizza>(`${this.baseURL}/${id}`);
    }

    updatePizza(id : number, pizza: Pizza):Observable<Object>{
        return this.httpClient.put(`${this.baseURL}/${id}`,pizza);
    }

    deletePizza(id:number):Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

    addToCart(id : number){
        return this.httpClient.get<Pizza>(`${this.baseURL}/${id}`);
    }
    }

