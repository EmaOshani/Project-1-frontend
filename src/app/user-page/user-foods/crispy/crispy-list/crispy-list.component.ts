import { Component } from '@angular/core';
import { Crispy } from './crispy-modal';
import { CrispyService } from './crispy-service';
import { Router } from '@angular/router';
import { cartCount } from 'src/app/user-page/user-cart/cart-count';

@Component({
  selector: 'app-crispy-list',
  templateUrl: './crispy-list.component.html',
  styleUrls: ['./crispy-list.component.css']
})
export class CrispyListComponent {

  crispy: Crispy[];



  constructor (private crispyService: CrispyService,
                private cartcount : cartCount,
               private router: Router) { }

  ngOnInit() { 
  this.getCrispy();
  } 
  
private getCrispy(){
  this.crispyService.getCrispyList().subscribe({ next :data=>{
    this.crispy = data.filter(crispy => crispy.item === "Crispy Chicken");
  },
  error : error => console.log(error)});
  
  
}
  
  
   detailsCrispy(id: number){
    this.router.navigate(['crispy-details',id]);
  }

  inc(crispy : Crispy){
    if(crispy.quantity != 5){
      crispy.quantity += 1;
    }
  }

  dec(crispy : Crispy){
    if(crispy.quantity != 1){
      crispy.quantity -= 1;
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
