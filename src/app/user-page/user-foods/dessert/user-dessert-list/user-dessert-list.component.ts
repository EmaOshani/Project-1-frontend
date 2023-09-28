import { Component } from '@angular/core';
import { Dessert } from './dessert-list-modal';
import { DessertService } from './dessert-list-service';
import { Router } from '@angular/router';
import { cartCount } from 'src/app/user-page/user-cart/cart-count';

@Component({
  selector: 'app-user-dessert-list',
  templateUrl: './user-dessert-list.component.html',
  styleUrls: ['./user-dessert-list.component.css']
})
export class UserDessertListComponent {


  desserts: Dessert[];



  constructor (private dessertService: DessertService,
                private cartcount : cartCount,
                private router: Router) { }

  ngOnInit() { 
  this.getDesserts();
  } 
  
private getDesserts(){
  this.dessertService.getDessertList().subscribe({ next :data=>{
    this.desserts = data.filter(dessert => dessert.item === "Desserts");
  },
  error : error => console.log(error)});
  
  
}
  
  
   detailsDessert(id: number){
    this.router.navigate(['dessert-details',id]);
  }

  inc(desserts : Dessert){
    if(desserts.quantity != 5){
      desserts.quantity += 1;
    }
  }

  dec(desserts : Dessert){
    if(desserts.quantity != 1){
      desserts.quantity -= 1;
    }
}



itemsCart:any = [];
addToCart(category) {
  let cartDataNull = sessionStorage.getItem('localCart');

  const cartItem = {
    id: category.id,
    name: category.name,
    details: category.details,
    quantity: category.quantity,
    imageURL : category.imageURL,
    price : category.price,
    size : category.size
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
