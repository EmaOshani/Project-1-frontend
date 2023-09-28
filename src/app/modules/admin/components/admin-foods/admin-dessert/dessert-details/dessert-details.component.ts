import { Component, OnInit } from '@angular/core';
import { Dessert } from '../dessert-list/dessert-modal';
import { ActivatedRoute } from '@angular/router';
import { DessertService } from '../dessert-list/dessertService';

@Component({
  selector: 'app-dessert-details',
  templateUrl: './dessert-details.component.html',
  styleUrls: ['./dessert-details.component.css']
})
export class DessertDetailsComponent  implements OnInit {

  id : number;
 desserts : Dessert;

  constructor( private route: ActivatedRoute, private dessertService : DessertService){

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.desserts = new Dessert();
    this.dessertService.getDessertById(this.id).subscribe( data => {
      this.desserts = data;
    });
  }

  addToCart(id : number){
    this.dessertService.addToCart(this.id).subscribe({next : data => {
      console.log(data);
    },
    error : error => console.log(error)});
  }


}
