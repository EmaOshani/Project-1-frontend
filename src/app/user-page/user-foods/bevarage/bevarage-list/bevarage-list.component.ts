import { Component } from '@angular/core';
import { Bevarage } from './bevarage-modal';
import { BevarageService } from './bevarage-service';
import { Router } from '@angular/router';
import { cartCount } from 'src/app/user-page/user-cart/cart-count';

@Component({
  selector: 'app-bevarage-list',
  templateUrl: './bevarage-list.component.html',
  styleUrls: ['./bevarage-list.component.css']
})
export class BevarageListComponent {

  
  bevarage: Bevarage[];



  constructor (private bevarageService: BevarageService,
                private cartcount : cartCount,
    private router: Router) { }

  ngOnInit() { 
  this.getBevarage();
  } 
  
private getBevarage(){
  this.bevarageService.getBevarageList().subscribe({ next :data=>{
    this.bevarage = data.filter(bevarage => bevarage.item === "Beverages");
  },
  error : error => console.log(error)});
  
  
}
  
  
   detailsBurger(id: number){
    this.router.navigate(['bevarage-details',id]);
  }

  inc(bevarage : Bevarage){
    if(bevarage.quantity != 5){
      bevarage.quantity += 1;
    }
  }

  dec(bevarage : Bevarage){
    if(bevarage.quantity != 1){
      bevarage.quantity -= 1;
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
