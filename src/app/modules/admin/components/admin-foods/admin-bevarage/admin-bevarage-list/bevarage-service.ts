import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Bevarage } from "./bevarage-modal";

@Injectable({
    providedIn: 'root'
})

export class BevarageService{

    private baseURL = "http://localhost:8080/api/v1/category";
  cartSubject: any;

    constructor(private httpClient : HttpClient){}

    getBevarageList(): Observable<Bevarage[]>{
        return this.httpClient.get<Bevarage[]>(`${this.baseURL}`);

    }

    createBevarage(bevarage : Bevarage):Observable<object>{
        return this.httpClient.post(`${this.baseURL}`, bevarage);
    }

    getBevarageById(id: number): Observable<Bevarage>{
        return this.httpClient.get<Bevarage>(`${this.baseURL}/${id}`);
    }

    updateBevarage(id : number, bevarage: Bevarage):Observable<Object>{
        return this.httpClient.put(`${this.baseURL}/${id}`,bevarage);
    }

    deleteBevarage(id:number):Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

    addToCart(id : number){
        return this.httpClient.get<Bevarage>(`${this.baseURL}/${id}`);
    }
    }