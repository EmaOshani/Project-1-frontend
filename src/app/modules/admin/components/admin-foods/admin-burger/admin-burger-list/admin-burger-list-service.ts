import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Burger } from "./admin-burger-list";


@Injectable({
    providedIn: 'root'
})

export class BurgerService{

    private baseURL = "http://localhost:8080/api/v1/category";
  cartSubject: any;

    constructor(private httpClient : HttpClient){}

    getBurgerList(): Observable<Burger[]>{
        return this.httpClient.get<Burger[]>(`${this.baseURL}`);

    }

    createBurger(burger : Burger):Observable<object>{
        return this.httpClient.post(`${this.baseURL}`, burger);
    }

    getBurgerById(id: number): Observable<Burger>{
        return this.httpClient.get<Burger>(`${this.baseURL}/${id}`);
    }

    updateBurger(id : number, burger: Burger):Observable<Object>{
        return this.httpClient.put(`${this.baseURL}/${id}`,burger);
    }

    deleteBurger(id:number):Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

    addToCart(id : number){
        return this.httpClient.get<Burger>(`${this.baseURL}/${id}`);
    }
    }