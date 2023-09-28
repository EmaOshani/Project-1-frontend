import { Injectable } from "@angular/core";
import { Dessert } from "./dessert-list-modal";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";





@Injectable({
    providedIn: 'root'
})

export class DessertService{
   
    getDessertList() {
        return this.httpClient.get<Dessert[]>(`${this.baseURL}`);
    }

    private baseURL = "http://localhost:8080/api/v1/category";

    constructor(private httpClient : HttpClient){}


    getDessertById(id: number): Observable<Dessert>{
        return this.httpClient.get<Dessert>(`${this.baseURL}/${id}`);
    }

    addToCart(id : number){
        return this.httpClient.get<Dessert>(`${this.baseURL}/${id}`);
    }
    



    // cart count
    cartSubject = new Subject<any>();
    openLoginService = new Subject<any>();
}