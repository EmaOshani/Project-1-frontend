import { Component } from '@angular/core';
import { Pizza } from './pizza';
import { PizzaService } from './pizza-service';
import { Router } from '@angular/router';
import { cartCount } from 'src/app/user-page/user-cart/cart-count';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent {
  pizzas: Pizza[];



  constructor (private pizzaService: PizzaService,
              private cartcount : cartCount,
              private router: Router) { }

  ngOnInit() { 
  this.getPizzas();
  } 
  
private getPizzas(){
  this.pizzaService.getPizzaList().subscribe({ next :data=>{
    this.pizzas = data;
  },
  error : error => console.log(error)});
  
  
}
  
  
   detailsPizza(id: number){
    this.router.navigate(['pizza-details',id]);
  }

  

}
