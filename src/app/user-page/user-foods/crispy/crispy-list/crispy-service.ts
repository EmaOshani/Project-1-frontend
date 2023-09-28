import { Injectable } from "@angular/core";
import { Crispy } from "./crispy-modal";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";




@Injectable({
    providedIn: 'root'
})

export class CrispyService{
   
    getCrispyList() {
        return this.httpClient.get<Crispy[]>(`${this.baseURL}`);
    }

    private baseURL = "http://localhost:8080/api/v1/category";

    constructor(private httpClient : HttpClient){}


    getCrispyById(id: number): Observable<Crispy>{
        return this.httpClient.get<Crispy>(`${this.baseURL}/${id}`);
    }

    addToCart(id : number){
        return this.httpClient.get<Crispy>(`${this.baseURL}/${id}`);
    }
    



    // cart count
    cartSubject = new Subject<any>();
    openLoginService = new Subject<any>();

}