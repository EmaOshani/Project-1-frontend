import { Component, OnInit } from '@angular/core';
import { Pizza } from '../pizza-list/pizza';
import { ActivatedRoute } from '@angular/router';
import { PizzaService } from '../pizza-list/pizza-service';
import { cartCount } from 'src/app/user-page/user-cart/cart-count';

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.css']
})
export class PizzaDetailsComponent implements OnInit {


  id : number;
  pizzas: Pizza;
 

 constructor( private route: ActivatedRoute,
              private cartcaunt : cartCount, private pizzaService : PizzaService){

 }
 ngOnInit(): void {
  this.id = this.route.snapshot.params['id'];
  this.getPizzaDetails();
}

getPizzaDetails() {
  this.pizzaService.getPizzaById(this.id).subscribe({next: data => {
      this.pizzas = data;
    },
   error : error => {
      console.log(error);
    }
});
}

  inc(pizzas : Pizza){
    if(pizzas.quantity != 5){
      pizzas.quantity += 1;
    }
  }

  dec(pizzas : Pizza){
    if(pizzas.quantity != 1){
      pizzas.quantity -= 1;
    }
}



itemsCart:any = [];
addToCart(category) {
  let cartDataNull = sessionStorage.getItem('localCart');

  const cartItem = {
    id: category.id,
    size: this.selectedSize,
    price: this.selectedPrice,
    name: category.name,
    details: category.details,
    quantity: category.quantity,
    imageURL : category.imageURL
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
  this.cartcaunt.cartSubject.next(this.cartNumber);
}

selectedSize: string = '';
selectedPrice: number = 0;

  selectSize(size, price) {
    console.log(`Selected size: ${size}, Price: ${price}`);
    this.selectedSize = size;
    this.selectedPrice = price;

    this.pizzas.size = size; // Update the size property of the pizza object

    // Update the price based on the selected size
    if (size === 'large') {
      this.pizzas.largeprice = price;
    } else if (size === 'medium') {
      this.pizzas.mediumprice = price;
    } else if (size === 'small') {
      this.pizzas.smallprice = price;
    }
  }

  isSizeSelected(): boolean {
    return !!this.selectedSize;

}

}


