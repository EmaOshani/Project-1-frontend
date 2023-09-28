import { Component, OnInit } from '@angular/core';
import { Pizza } from '../apizza-list/apizza';
import { ActivatedRoute } from '@angular/router';
import { PizzaService } from '../apizza-list/apizza-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apizza-details',
  templateUrl: './apizza-details.component.html',
  styleUrls: ['./apizza-details.component.css']
})
export class ApizzaDetailsComponent implements OnInit {

  id : number;
  pizzas : Pizza;

  constructor( private route: ActivatedRoute, private pizzaService : PizzaService){

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


  updatePizzaDetails() {
    this.pizzaService.updatePizza(this.id, this.pizzas).subscribe({next :
      data => {
        console.log(data);
        Swal.fire('Pizza details updated!');
      },
    error :  error => {
        console.log(error);
      }
  });
}
}


