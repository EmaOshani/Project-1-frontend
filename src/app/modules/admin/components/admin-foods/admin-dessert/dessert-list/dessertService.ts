import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Dessert } from "./dessert-modal";




@Injectable({
    providedIn: 'root'
})

export class DessertService{

    private baseURL = "http://localhost:8080/api/v1/category";

    constructor(private httpClient : HttpClient){}

    getDessertList(): Observable<Dessert[]>{
        return this.httpClient.get<Dessert[]>(`${this.baseURL}`);

    }

    createDessert(dessert : Dessert):Observable<object>{
        return this.httpClient.post(`${this.baseURL}`, dessert);
    }

    getDessertById(id: number): Observable<Dessert>{
        return this.httpClient.get<Dessert>(`${this.baseURL}/${id}`);
    }

    updateDessert(id : number, dessert: Dessert):Observable<Object>{
        return this.httpClient.put(`${this.baseURL}/${id}`,dessert);
    }

    deleteDessert(id:number):Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

    addToCart(id : number){
        return this.httpClient.get<Dessert>(`${this.baseURL}/${id}`);
    }
    }