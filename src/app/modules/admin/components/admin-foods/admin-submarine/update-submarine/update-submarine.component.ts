import { Component, OnInit } from '@angular/core';
import { Submarine } from '../admin-submarine-list/admin-submarine-modal';
import { SubmarineService } from '../admin-submarine-list/admin-submarine-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-submarine',
  templateUrl: './update-submarine.component.html',
  styleUrls: ['./update-submarine.component.css']
})
export class UpdateSubmarineComponent implements OnInit {

  itemForm: FormGroup;
  id: number;
  submarines : Submarine = new Submarine();

 constructor(private submarineService: SubmarineService,
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
   this.submarineService.getSubmarineById(this.id).subscribe({
     next: data => {
       this.submarines = data;
       this.itemForm.patchValue({
        name: this.submarines.name,
        price: this.submarines.price,
        details: this.submarines.details,
        imageUrl: this.submarines.imageURL
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


 this.submarineService.updateSubmarine(this.id, this.submarines).subscribe({ next : data => {
   this.goToSubmarineList();
 }, 
 error : error => console.log(error)});
 Swal.fire({
  icon : 'success',
  iconColor : '#fd0808',
  title :"<h2 style='color:White'>" +'Updated'+"</h2>",
  background : '#643539'
})
 
}

goToSubmarineList(){
 this.router.navigate(['admin/submarines']);
 }


}
