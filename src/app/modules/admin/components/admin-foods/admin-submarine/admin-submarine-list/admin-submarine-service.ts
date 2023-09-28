import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Submarine } from "./admin-submarine-modal";


@Injectable({
    providedIn: 'root'
})

export class SubmarineService{

    private baseURL = "http://localhost:8080/api/v1/category";

    constructor(private httpClient : HttpClient){}

    getSubmarineList(): Observable<Submarine[]>{
        return this.httpClient.get<Submarine[]>(`${this.baseURL}`);

    }

    createSubmarine(submarine : Submarine):Observable<object>{
        return this.httpClient.post(`${this.baseURL}`, submarine);
    }

    getSubmarineById(id: number): Observable<Submarine>{
        return this.httpClient.get<Submarine>(`${this.baseURL}/${id}`);
    }

    updateSubmarine(id : number, submarine: Submarine):Observable<Object>{
        return this.httpClient.put(`${this.baseURL}/${id}`,submarine);
    }

    deleteSubmarine(id:number):Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

    addToCart(id : number){
        return this.httpClient.get<Submarine>(`${this.baseURL}/${id}`);
    }
    }