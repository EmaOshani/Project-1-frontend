import { Component, OnInit } from '@angular/core';
import { Bevarage } from '../admin-bevarage-list/bevarage-modal';
import { ActivatedRoute } from '@angular/router';
import { BevarageService } from '../admin-bevarage-list/bevarage-service';

@Component({
  selector: 'app-admin-bevarage-details',
  templateUrl: './admin-bevarage-details.component.html',
  styleUrls: ['./admin-bevarage-details.component.css']
})
export class AdminBevarageDetailsComponent implements OnInit {

  id : number;
 bevarages : Bevarage;

  constructor( private route: ActivatedRoute, private bevarageService : BevarageService){

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.bevarages = new Bevarage();
    this.bevarageService.getBevarageById(this.id).subscribe( data => {
      this.bevarages = data;
    });
  }

  addToCart(id : number){
    this.bevarageService.addToCart(this.id).subscribe({next : data => {
      console.log(data);
    },
    error : error => console.log(error)});
  }


}
