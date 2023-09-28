import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Pizza } from "./pizza";


@Injectable({
    providedIn: 'root'
})

export class PizzaService{
   
    getPizzaList() {
        return this.httpClient.get<Pizza[]>(`${this.baseURL}`);
    }

    private baseURL = "http://localhost:8080/api/v1/pizza";

    constructor(private httpClient : HttpClient){}


    getPizzaById(id: number): Observable<Pizza>{
        return this.httpClient.get<Pizza>(`${this.baseURL}/${id}`);
    }


    addToCart(id : number){
        return this.httpClient.get<Pizza>(`${this.baseURL}/${id}`);
    }
    



    // cart count
    cartSubject = new Subject<any>();
    openLoginService = new Subject<any>();
    }