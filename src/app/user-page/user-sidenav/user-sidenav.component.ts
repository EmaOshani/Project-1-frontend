import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.css']
})
export class UserSidenavComponent {
 

  constructor(private router : Router){}

  
  onpizza(){
    this.router.navigate(['user-menu/pizzas'])
  }
  onburger(){
    this.router.navigate(['user-menu/burgers'])
  }

  ondessert(){
    this.router.navigate(['user-menu/desserts'])
  }

  onsub(){
    this.router.navigate(['user-menu/submarine'])
  }

  oncrispy(){
    this.router.navigate(['user-menu/crispy'])
  }

  
  onbevarage(){
    this.router.navigate(['user-menu/bevarage'])
  }
}
