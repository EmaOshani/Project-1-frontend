import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.css']
})
export class AdminSidenavComponent {

  constructor(private route : Router){}

  onpizza(){
    this.route.navigate(['admin/pizzas'])
  }

  onburger(){
    this.route.navigate(['admin/burgers'])
  }

  ondessert(){
    this.route.navigate(['admin/desserts'])
  }

  onsubmarine(){
    this.route.navigate(['admin/submarines'])
  }

  oncrispy(){
    this.route.navigate(['admin/crispy'])
  }

  onbevarage(){
    this.route.navigate(['admin/bevarages'])
  }
}
