import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit{
  constructor(private router : Router){}


  ngOnInit(): void {

    AOS.init();
  }

  shopbtn(){
    this.router.navigate(['user-menu/pizzas'])
  }
}
