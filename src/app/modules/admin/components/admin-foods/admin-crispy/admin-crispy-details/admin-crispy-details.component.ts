import { Component, OnInit } from '@angular/core';
import { Crispy } from '../admin-crispy-list/crispy-modal';
import { ActivatedRoute } from '@angular/router';
import { CrispyService } from '../admin-crispy-list/crispy-service';

@Component({
  selector: 'app-admin-crispy-details',
  templateUrl: './admin-crispy-details.component.html',
  styleUrls: ['./admin-crispy-details.component.css']
})
export class AdminCrispyDetailsComponent implements OnInit {

  id : number;
 crispy : Crispy;

  constructor( private route: ActivatedRoute, private crispyService : CrispyService){

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.crispy = new Crispy();
    this.crispyService.getCrispyById(this.id).subscribe( data => {
      this.crispy = data;
    });
  }

  addToCart(id : number){
    this.crispyService.addToCart(this.id).subscribe({next : data => {
      console.log(data);
    },
    error : error => console.log(error)});
  }


}
