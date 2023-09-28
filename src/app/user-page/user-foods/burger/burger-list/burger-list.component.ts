import { Component } from '@angular/core';
import { Burger } from './burger';
import { BurgerService } from './burger-service';
import { Router } from '@angular/router';
import { cartCount } from 'src/app/user-page/user-cart/cart-count';

@Component({
  selector: 'app-burger-list',
  templateUrl: './burger-list.component.html',
  styleUrls: ['./burger-list.component.css']
})
export class BurgerListComponent {


  burgers: Burger[];



  constructor (private burgerService: BurgerService,
               private cartcount : cartCount,
   
    private router: Router) { }

  ngOnInit() { 
  this.getBurgers();
  } 
  
private getBurgers(){
  this.burgerService.getBurgerList().subscribe({ next :data=>{
    this.burgers = data.filter(burger => burger.item === "Burger");
  },
  error : error => console.log(error)});
  
  
}
  
  
   detailsBurger(id: number){
    this.router.navigate(['burger-details',id]);
  }

  inc(burgers : Burger){
    if(burgers.quantity != 5){
      burgers.quantity += 1;
    }
  }

  dec(burgers : Burger){
    if(burgers.quantity != 1){
      burgers.quantity -= 1;
    }
}



itemsCart:any = [];
addToCart(category) {
  let cartDataNull = sessionStorage.getItem('localCart');

  const cartItem = {
    id : category.id,
    name: category.name,
    details: category.details,
    size : category.size,
    quantity: category.quantity,
    imageURL : category.imageURL,
    price : category.price
  };

  if (cartDataNull == null) {
    let storeDataGet: any = [];
    storeDataGet.push(cartItem);
    sessionStorage.setItem('localCart', JSON.stringify(storeDataGet));
  } else {
    let index: number = -1;
    this.itemsCart = JSON.parse(sessionStorage.getItem('localCart') || '{}');

    for (let i = 0; i < this.itemsCart.length; i++) {
      if (category.id === this.itemsCart[i].id) {
        this.itemsCart[i].quantity = category.quantity;
        index = i;
        break;
      }
    }

    if (index == -1) {
      this.itemsCart.push(cartItem);
      sessionStorage.setItem('localCart', JSON.stringify(this.itemsCart));
    } else {
      sessionStorage.setItem('localCart', JSON.stringify(this.itemsCart));
    }
  }

  this.cartNumberFunc();
}

cartNumber: number = 0;

cartNumberFunc() {
  var cartValue = JSON.parse(sessionStorage.getItem('localCart') || '{}');
  this.cartNumber = cartValue.length;
  this.cartcount.cartSubject.next(this.cartNumber);
}



}
