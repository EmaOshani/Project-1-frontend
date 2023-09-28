import { Component } from '@angular/core';
import { Submarine } from '../admin-submarine-list/admin-submarine-modal';
import { SubmarineService } from '../admin-submarine-list/admin-submarine-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-submaine',
  templateUrl: './create-submaine.component.html',
  styleUrls: ['./create-submaine.component.css']
})
export class CreateSubmaineComponent {

  itemForm : FormGroup;

  submarines : Submarine = new Submarine()

  constructor(private submarineService: SubmarineService,
    private router: Router,
    private formBuilder : FormBuilder){

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
  
  saveSubmarine(){
    this.submarineService.createSubmarine(this.submarines).subscribe({next : data =>{
      console.log(data);
      this.goToSubmarineList();
    },
   error : error => console.log(error)});
    
    
  }
  //
  goToSubmarineList(){
  this.router.navigate(['admin/submarines']);
  }
  
  onSubmit(){
    console.log(this.submarines);
    this.saveSubmarine();
    Swal.fire({
      title: "<h2 style='color:White'>"+ 'Add New item is Success!' + "</h2>",
      icon: 'success',
      confirmButtonColor: '#c61e1e',
      confirmButtonText: 'Yes',
      background : '#643539'
    })
  }
}
