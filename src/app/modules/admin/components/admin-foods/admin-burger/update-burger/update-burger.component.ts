import { Component, OnInit } from '@angular/core';
import { Burger } from '../admin-burger-list/admin-burger-list';
import { BurgerService } from '../admin-burger-list/admin-burger-list-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-burger',
  templateUrl: './update-burger.component.html',
  styleUrls: ['./update-burger.component.css']
})
export class UpdateBurgerComponent implements OnInit {

   id: number;
   burgers : Burger = new Burger();

   itemForm: FormGroup;

  constructor(private burgerService: BurgerService,
    private http : HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder){ 

      this.itemForm = this.formBuilder.group({
        name: ['', Validators.required],
        price: ['', Validators.required],
        details: ['', Validators.required],
        imageUrl: ['', Validators.required]
      });
    }
  
  ngOnInit(): void {
   
    this.id = this.route.snapshot.params['id']; // Get the id parameter from the route
    this.burgerService.getBurgerById(this.id).subscribe({
      next: data => {
        this.burgers = data;
        this.itemForm.patchValue({
          name: this.burgers.name,
          price: this.burgers.price,
          details: this.burgers.details,
          imageUrl: this.burgers.imageURL
        });
      },
      error: error => console.log(error)
    });
  }
  
 
  
 onSubmit(){

  if (this.itemForm.invalid) {
        
    // Show error message or handle invalid form submission
    return;
  }

  this.burgerService.updateBurger(this.id, this.burgers).subscribe({ next : data => {
    this.goToBurgerList();
  }, 
  error : error => console.log(error)});
  Swal.fire("Updated!")
  
 }

 goToBurgerList(){
  this.router.navigate(['admin/burgers']);
  }

} 


