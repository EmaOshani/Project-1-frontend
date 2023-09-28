import { Component } from '@angular/core';
import { Pizza } from '../apizza-list/apizza';
import { PizzaService } from '../apizza-list/apizza-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-pizza',
  templateUrl: './create-pizza.component.html',
  styleUrls: ['./create-pizza.component.css']
})
export class CreatePizzaComponent {

  pizzasForm: FormGroup;
  pizzas : Pizza = new Pizza()
 
  

  constructor(private pizzaService: PizzaService,
    private router: Router,
    private formBuilder: FormBuilder,){
      
      this.pizzasForm = this.formBuilder.group({
        name: ['', Validators.required],
        smallprice: ['', Validators.required],
        mediumprice: ['', Validators.required],
        largeprice: ['', Validators.required],
        imageURL: ['', Validators.required],
        details: ['', Validators.required]
      }); 
     }
  
  ngOnInit(): void {
    
    
  }
  
  savePizza(){
    this.pizzaService.createPizza(this.pizzas).subscribe({next : data =>{
      console.log(data);
      this.goToPizzaList();
    },
   error : error => console.log(error)});
    
    
  }
  //
  goToPizzaList(){
  this.router.navigate(['admin/pizzas']);
  }
  
  onSubmit(){
    console.log(this.pizzas);
    this.savePizza();

    Swal.fire({
      title: "<h2 style='color:White'>"+ 'Add New item is Success!' + "</h2>",
      icon: 'success',
      confirmButtonColor: '#c61e1e',
      confirmButtonText: 'Yes',
      background : '#643539'
    })


  }

  
}

