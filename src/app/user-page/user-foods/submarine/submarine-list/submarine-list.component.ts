import { Component } from '@angular/core';
import { Submarine } from './submarine-modal';
import { SubmarineService } from './submarine-service';
import { Router } from '@angular/router';
import { cartCount } from 'src/app/user-page/user-cart/cart-count';

@Component({
  selector: 'app-submarine-list',
  templateUrl: './submarine-list.component.html',
  styleUrls: ['./submarine-list.component.css']
})
export class SubmarineListComponent {

  submarine: Submarine[];



  constructor (private submarineService: SubmarineService,
                private cartcount : cartCount,
                private router: Router) { }

  ngOnInit() { 
  this.getSubmarine();
  } 
  
private getSubmarine(){
  this.submarineService.getSubmarineList().subscribe({ next :data=>{
    this.submarine = data.filter(submarine => submarine.item === "Submarine");
  },
  error : error => console.log(error)});
  
  
}
  
  
   detailsSubmarine(id: number){
    this.router.navigate(['submarine-details',id]);
  }

  inc(submarine : Submarine){
    if(submarine.quantity != 5){
      submarine.quantity += 1;
    }
  }

  dec(submarine : Submarine){
    if(submarine.quantity != 1){
      submarine.quantity -= 1;
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
