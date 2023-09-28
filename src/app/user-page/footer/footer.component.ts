import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  
  constructor(private router : Router){}

  onabout(){
    this.router.navigate(['about'])
  }

  oncontact(){
    this.router.navigate(['contact-page'])
  }

  onpizza(){
    this.router.navigate(['user-menu/pizzas'])
  }

  onburger(){
    this.router.navigate(['user-menu/burgers'])
  }
  onsub(){
    this.router.navigate(['user-menu/submarine'])
  }

  onbev(){
    this.router.navigate(['user-menu/bevarage'])
  }

  oncrispy(){
    this.router.navigate(['user-menu/crispy'])
  }

  ondessert(){
    this.router.navigate(['user-menu/desserts'])
  }
}
