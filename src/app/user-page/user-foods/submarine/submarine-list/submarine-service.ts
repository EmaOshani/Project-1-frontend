import { Injectable } from "@angular/core";
import { Submarine } from "./submarine-modal";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";



@Injectable({
    providedIn: 'root'
})

export class SubmarineService{
   
    getSubmarineList() {
        return this.httpClient.get<Submarine[]>(`${this.baseURL}`);
    }

    private baseURL = "http://localhost:8080/api/v1/category";

    constructor(private httpClient : HttpClient){}


    getSubmarineById(id: number): Observable<Submarine>{
        return this.httpClient.get<Submarine>(`${this.baseURL}/${id}`);
 
 
    }

    addToCart(id : number){
        return this.httpClient.get<Submarine>(`${this.baseURL}/${id}`);
    }
    



    // cart count
    cartSubject = new Subject<any>();
    openLoginService = new Subject<any>();
}