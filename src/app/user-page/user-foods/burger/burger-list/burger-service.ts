import { Injectable } from "@angular/core";
import { Burger } from "./burger";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";




@Injectable({
    providedIn: 'root'
})

export class BurgerService{
   
    getBurgerList() {
        return this.httpClient.get<Burger[]>(`${this.baseURL}`);
    }

    private baseURL = "http://localhost:8080/api/v1/category";

    constructor(private httpClient : HttpClient){}


    getBurgerById(id: number): Observable<Burger>{
        return this.httpClient.get<Burger>(`${this.baseURL}/${id}`);
    }


    addToCart(id : number){
        return this.httpClient.get<Burger>(`${this.baseURL}/${id}`);
    }
    



    // cart count
    cartSubject = new Subject<any>();
    openLoginService = new Subject<any>();
    }