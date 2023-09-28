import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Customer } from "./order-page-model";
import { Observable } from "rxjs";


@Injectable({
    providedIn : 'root'
})

export class orderService {
    genarateBill(formData: { name: string; road: string; email: string; phoneNumber: string; address: string; }) {
  
      
    }
    

    private baseURL = "http://localhost:8080/api/v1/placeOrder";


    constructor(private httpClient: HttpClient){}   


    placeOrder(customer: Customer): Observable<any> {
        const orderRequest = {
          customer: customer,
          products: customer.products
        };
        return this.httpClient.post(`${this.baseURL} `, orderRequest);
      }

}