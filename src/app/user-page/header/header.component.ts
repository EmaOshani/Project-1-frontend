import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../user-foods/pizza/pizza-list/pizza-service';
import { Router } from '@angular/router';
import { BurgerService } from '../user-foods/burger/burger-list/burger-service';
import { SubmarineService } from '../user-foods/submarine/submarine-list/submarine-service';
import { DessertService } from '../user-foods/dessert/user-dessert-list/dessert-list-service';
import { CrispyService } from '../user-foods/crispy/crispy-list/crispy-service';
import { BevarageService } from '../user-foods/bevarage/bevarage-list/bevarage-service';
import { cartCount } from '../user-cart/cart-count';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {


  constructor(private cartcount : cartCount , private router : Router) { 
 
    this.cartcount.cartSubject.subscribe((data) => { this.cartItem =data;});
  }

  ngOnInit(): void {
    this.cartItemFunc();
  }
  
  cartItem:number = 0;
  cartItemFunc(){
  if(sessionStorage.getItem('localCart') != null){
  var cartCount = JSON.parse(sessionStorage.getItem('localCart') || '{}');
  this.cartItem = cartCount.length;
  /* this.router.navigate(['user-menu/user-cart']) */
  }
  }

  onmenu(){
    this.router.navigate(['user-menu/pizzas'])
  }

  onContact(){
    this.router.navigate(['contact-page'])
  }

  onHome(){
    this.router.navigate(['user-homepage'])
  }
   
  onCart(){
    this.router.navigate(['user-menu/user-cart'])
  }

  onabout(){
    this.router.navigate(['about'])
  }
}
 


