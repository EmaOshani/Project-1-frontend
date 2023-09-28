import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { bill } from "./popup-modal";
import { Observable } from "rxjs";



@Injectable({
    providedIn : 'root'
})

export class orderService {
    
    
    private baseURL = "http://localhost:8080/api/v1/getDetails";


    constructor(private httpClient: HttpClient){}   


    getDetailsById(id: number): Observable<any> {
        const Url = `${this.baseURL}/${id}`
        return this.httpClient.get<bill>(Url);
      }




}