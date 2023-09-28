import { Component } from '@angular/core';
import { Burger } from '../admin-burger-list/admin-burger-list';
import { BurgerService } from '../admin-burger-list/admin-burger-list-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-burger',
  templateUrl: './create-burger.component.html',
  styleUrls: ['./create-burger.component.css']
})
export class CreateBurgerComponent {

  burgers : Burger = new Burger()
  itemForm : FormGroup;

  constructor(private burgerService: BurgerService,
    private router: Router, private formBuilder : FormBuilder){

      this.itemForm = this.formBuilder.group({
      item : ['', Validators.required],
        name: ['', Validators.required],
        price: ['', Validators.required],
        details: ['', Validators.required],
        imageUrl: ['', Validators.required],
      });
     }
  
  ngOnInit(): void {
    
  }
  
  saveBurger(){
    this.burgerService.createBurger(this.burgers).subscribe({next : data =>{
      console.log(data);
      this.goToBurgerList();
    },
   error : error => console.log(error)});
    
    
  }
  //
  goToBurgerList(){
  this.router.navigate(['admin/burgers']);
  }
  
  onSubmit(){
    console.log(this.burgers);
    this.saveBurger();
    Swal.fire({
      title: "<h2 style='color:White'>"+ 'Add New item is Success!' + "</h2>",
      icon: 'success',
      confirmButtonColor: '#c61e1e',
      confirmButtonText: 'Yes',
      background : '#643539'
    })
  }
  }

