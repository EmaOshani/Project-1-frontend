import { Component } from '@angular/core';
import { Pizza } from '../user-foods/pizza/pizza-list/pizza';
import { ActivatedRoute, Router } from '@angular/router';
import { PizzaService } from '../user-foods/pizza/pizza-list/pizza-service';
import { FormGroup,  } from '@angular/forms';
import { cartCount } from './cart-count';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent {

  selectedSize: string;
  selectedPrice : number;

  pizzas : Pizza [] ;
  pizzaService : PizzaService
  formGroup! : FormGroup;
  
  selectedItem: string;
  id : number;
  size : string;
  price: number;
  quantity : number;

 

  constructor ( private router: Router,
    private cartcount : cartCount) { }

  ngOnInit(): void {
    this.CartDetails();
   this.loadCart();
   this.updateSessionStorage(this.id ,this.size);


   
  }
  
  getCartDetails:any=[];
  CartDetails(){
if(sessionStorage.getItem('localCart')){
this.getCartDetails = JSON.parse(sessionStorage.getItem('localCart') || '{}');
  }
  
  }

  incQnt(id, quantity){
    for(let i=0; i<this.getCartDetails.length;i++){
    if(this.getCartDetails[i].id  === id){
    if(quantity != 5)
    this.getCartDetails[i].quantity = parseInt(quantity) + 1;
    }
    }
    sessionStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.loadCart();
    }

    decQnt(id, quantity){
      for(let i=0; i<this.getCartDetails.length;i++){
      if(this.getCartDetails[i].id  === id){
      if(quantity != 1)
      this.getCartDetails[i].quantity = parseInt(quantity) -+ 1;
      }
      }
      sessionStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
      this.loadCart();
      }


      
total:number = 0;
loadCart(){
if(sessionStorage.getItem('localCart')){
this.getCartDetails = JSON.parse(sessionStorage.getItem('localCart')|| '{}');
this.total = this.getCartDetails.reduce(function(acc, val){
return acc + (val.price * val.quantity);

}, 0);
}
}

removeall(){
sessionStorage.removeItem('localCart');
this.getCartDetails = [];
this.total = 0;
this.cartNumber = 0;
this.cartcount.cartSubject.next (this.cartNumber);
/* if(this.isCartEmpty()) {
  this.router.navigate(['/user-menu']);
} */
}

singleDelete(getCartDetail){
console.log(getCartDetail);
if(sessionStorage.getItem ('localCart')){
this.getCartDetails = JSON.parse(sessionStorage.getItem('localCart')|| '{}');
for(let i=0; i<this.getCartDetails.length; i++){
if(this.getCartDetails[i].id === getCartDetail){
this.getCartDetails.splice(i, 1);
sessionStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
this.loadCart();
this.cartNumberFunc();
}
}
/* if (this.isCartEmpty()) {
  // Reload the menu component by navigating to the same route
  this.router.navigate(['/user-menu']); 
} */
}
}

cartNumber:number = 0;
cartNumberFunc(){
var cartValue = JSON.parse(sessionStorage.getItem('localCart') || '{}');
this.cartNumber = cartValue.length;
/* sessionStorage.removeItem('localCart'); // Clear the cart items from session storage
this.cartNumber = 0; */
this.cartcount.cartSubject.next(this.cartNumber);
}

onItemSelected() {
  console.log(this.selectedItem);
}

updateSessionStorage(id, size) {

  const cartDetails = JSON.parse(sessionStorage.getItem('localCart') || '{}');
  const getCartDetails = this.getCartDetails.find(item => item.name === 'selected item name');
 
  sessionStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
 
}
placeorder(){

  this.router.navigate(['order-page']);
 
}

isCartEmpty(): boolean {
  return this.getCartDetails.length === 0;
}

shopbtn(){
  this.router.navigate(['user-menu/pizzas'])
}

refreshPage(): void {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  const currentUrl = this.router.url + '?';
  this.router.navigateByUrl(currentUrl).then(() => {
    this.router.navigated = false;
    this.router.navigate([this.router.url]);
  });

 
}

}
