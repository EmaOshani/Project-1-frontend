import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CounterService } from './counterService';
import { HttpClient } from '@angular/common/http';
import { sells } from './sells/sells-modal';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  items : any[];
  filteredItems : any[];
  filteredSells: sells[];

  PendingCount : number;
  ConfirmeCount : number;
  cancelCount : number;

  constructor( private router : Router,
               private counterService : CounterService,
               private httpclient : HttpClient){}

 
               ngOnInit(): void {

                this.httpclient.get<any[]>('http://localhost:8080/api/v1/findAllOrder').subscribe(items => {
                this.items = items;
                this.filteredItems = items.filter(item => item.states === 'pending');
                const cardCount = this.filteredItems.length;
                this.counterService.setCount(cardCount);
                this.PendingCount = cardCount;  });

                this.httpclient.get<any[]>('http://localhost:8080/api/v1/findAllOrder').subscribe(items => {
                this.items = items;
                this.filteredItems = items.filter(item => item.states === 'confirem');
                const cardCount = this.filteredItems.length;
                 this.counterService.setCount(cardCount);
                 this.ConfirmeCount= cardCount;  });

                 this.httpclient.get<any[]>('http://localhost:8080/api/v1/findAllOrder').subscribe(items => {
                this.items = items;
                this.filteredItems = items.filter(item => item.states === 'cancle');
                const cardCount = this.filteredItems.length;
                this.counterService.setCount(cardCount);
                this.cancelCount  = cardCount;  });


               }

               
  pendingOrder(){
    this.router.navigate(['admin/dashboard/pending'])
  }
  comfiremOrder(){
    this.router.navigate(['admin/dashboard/confirme'])
  }

  cancelOrder(){
    this.router.navigate(['admin/dashboard/cancel'])
  }

  onreport(){
    this.router.navigate(['admin/dashboard/report'])
  }

  calculateTotalIncome(): number {
    let totalIncome = 0;
    for (const sell of this.filteredSells) {
      totalIncome += sell.quantity * sell.price;
    }
    return totalIncome;
  }

}
