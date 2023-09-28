import { Injectable } from "@angular/core";
import { Bevarage } from "./bevarage-modal";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";




@Injectable({
    providedIn: 'root'
})

export class BevarageService{
   
    getBevarageList() {
        return this.httpClient.get<Bevarage[]>(`${this.baseURL}`);
    }

    private baseURL = "http://localhost:8080/api/v1/category";

    constructor(private httpClient : HttpClient){}


    getBevarageById(id: number): Observable<Bevarage>{
        return this.httpClient.get<Bevarage>(`${this.baseURL}/${id}`);
    }

    addToCart(id : number){
        return this.httpClient.get<Bevarage>(`${this.baseURL}/${id}`);
    }
    

    // cart count
    cartSubject = new Subject<any>();
    openLoginService = new Subject<any>();
}