import { Component } from '@angular/core';
import { Dessert } from '../dessert-list/dessert-modal';
import { DessertService } from '../dessert-list/dessertService';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-dessert',
  templateUrl: './create-dessert.component.html',
  styleUrls: ['./create-dessert.component.css']
})
export class CreateDessertComponent {

  itemForm: FormGroup;
  desserts : Dessert = new Dessert()

  constructor(private dessertService: DessertService,
    private router: Router,  private formBuilder : FormBuilder){
    
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
  
  saveDessert(){
    this.dessertService.createDessert(this.desserts).subscribe({next : data =>{
      console.log(data);
      this.goToDessertList();
    },
   error : error => console.log(error)});
    
    
  }
  //
  goToDessertList(){
  this.router.navigate(['admin/desserts']);
  }
  
  onSubmit(){
    console.log(this.desserts);
    this.saveDessert();
    Swal.fire({
      title: "<h2 style='color:White'>"+ 'Add New item is Success!' + "</h2>",
      icon: 'success',
      confirmButtonColor: '#c61e1e',
      confirmButtonText: 'Yes',
      background : '#643539'
    })
  }
  }



