import { Component } from '@angular/core';
import { Crispy } from '../admin-crispy-list/crispy-modal';
import { CrispyService } from '../admin-crispy-list/crispy-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-crispy',
  templateUrl: './create-crispy.component.html',
  styleUrls: ['./create-crispy.component.css']
})
export class CreateCrispyComponent {

  itemForm : FormGroup;
  crispy : Crispy = new Crispy()

  constructor(private crispyService: CrispyService,
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
  
  saveCrispy(){
    this.crispyService.createCrispy(this.crispy).subscribe({next : data =>{
      console.log(data);
      this.goToCrispyList();
    },
   error : error => console.log(error)});
    
    
  }
  //
  goToCrispyList(){
  this.router.navigate(['admin/crispy']);
  }
  
  onSubmit(){
    console.log(this.crispy);
    this.saveCrispy();
    Swal.fire({
      title: "<h2 style='color:White'>"+ 'Add New item is Success!' + "</h2>",
      icon: 'success',
      confirmButtonColor: '#c61e1e',
      confirmButtonText: 'Yes',
      background : '#643539'
    })
  }
}
