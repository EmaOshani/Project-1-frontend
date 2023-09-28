import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BurgerService } from '../admin-burger-list/admin-burger-list-service';
import { Burger } from '../admin-burger-list/admin-burger-list';

@Component({
  selector: 'app-admin-burger-details',
  templateUrl: './admin-burger-details.component.html',
  styleUrls: ['./admin-burger-details.component.css']
})
export class AdminBurgerDetailsComponent implements OnInit {

  id : number;
 burgers : Burger;

  constructor( private route: ActivatedRoute, private burgerService : BurgerService){

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.burgers = new Burger();
    this.burgerService.getBurgerById(this.id).subscribe( data => {
      this.burgers = data;
    });
  }

  addToCart(id : number){
    this.burgerService.addToCart(this.id).subscribe({next : data => {
      console.log(data);
    },
    error : error => console.log(error)});
  }

}

