import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CounterService } from '../counterService';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent {

items : any[];
filteredItems : any[];

constructor(private httpclient : HttpClient,
            private counterService : CounterService,
           ){}

            ngOnInit(): void {
            
              this.httpclient.get<any[]>('http://localhost:8080/api/v1/findAllOrder').subscribe(items => {
               this.items = items;
               this.filteredItems = items.filter(item => item.states === 'cancle');
               const cardCount = this.filteredItems.length;
               console.log('Number of cards displayed:', cardCount);
               this.counterService.setCount(cardCount);
           
             });

            }


            calculateTotalPriceById(orderId: string): number {
              let totalPrice = 0;
              for (const item of this.items) {
                if (item.id === orderId) {
                  for (const product of item.products) {
                    totalPrice += product.quantity * product.price;
                  }
                  break; // Break the loop if the ID is found
                }
              }
              return totalPrice;
            }
            

            getCancelDetails:any=[];
            CancelDetails(){
          if(localStorage.getItem('localCart')){
          this.getCancelDetails = JSON.parse(localStorage.getItem('localCart') || '{}');
            }
            
            }
      
}
