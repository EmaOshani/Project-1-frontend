import { Component, OnInit } from '@angular/core';
import { Submarine } from '../admin-submarine-list/admin-submarine-modal';
import { ActivatedRoute } from '@angular/router';
import { SubmarineService } from '../admin-submarine-list/admin-submarine-service';

@Component({
  selector: 'app-admin-submarine-details',
  templateUrl: './admin-submarine-details.component.html',
  styleUrls: ['./admin-submarine-details.component.css']
})
export class AdminSubmarineDetailsComponent implements OnInit {

  id : number;
 submarines : Submarine;

  constructor( private route: ActivatedRoute, private submarineService : SubmarineService){

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.submarines = new Submarine();
    this.submarineService.getSubmarineById(this.id).subscribe( data => {
      this.submarines = data;
    });
  }

  addToCart(id : number){
    this.submarineService.addToCart(this.id).subscribe({next : data => {
      console.log(data);
    },
    error : error => console.log(error)});
  }


}
