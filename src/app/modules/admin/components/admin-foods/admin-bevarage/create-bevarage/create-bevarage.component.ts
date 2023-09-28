import { Component } from '@angular/core';
import { Bevarage } from '../admin-bevarage-list/bevarage-modal';
import { Router } from '@angular/router';
import { BevarageService } from '../admin-bevarage-list/bevarage-service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-bevarage',
  templateUrl: './create-bevarage.component.html',
  styleUrls: ['./create-bevarage.component.css']
})
export class CreateBevarageComponent {

  bevarages : Bevarage = new Bevarage();
  itemForm: FormGroup;

  constructor(private bevarageService: BevarageService,
    private router: Router,
    private formBuilder: FormBuilder){ 

      
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
  
  saveBevarage(){
    this.bevarageService.createBevarage(this.bevarages).subscribe({next : data =>{
      console.log(data);
      this.goToBevarageList();
    },
   error : error => console.log(error)});
    
    
  }
  //
  goToBevarageList(){
  this.router.navigate(['admin/bevarages']);
  }
  
  onSubmit(){
    console.log(this.bevarages);
    this.saveBevarage();
    Swal.fire({
      title: "<h2 style='color:White'>"+ 'Add New item is Success!' + "</h2>",
      icon: 'success',
      confirmButtonColor: '#c61e1e',
      confirmButtonText: 'Yes',
      background : '#643539'
    })
  }
}

