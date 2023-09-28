import { Component, OnInit } from '@angular/core';
import { Dessert } from '../dessert-list/dessert-modal';
import { DessertService } from '../dessert-list/dessertService';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-dessert',
  templateUrl: './update-dessert.component.html',
  styleUrls: ['./update-dessert.component.css']
})
export class UpdateDessertComponent implements OnInit {

  itemForm: FormGroup;
  id: number;
  desserts : Dessert = new Dessert();

 constructor(private dessertService: DessertService,
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
   this.dessertService.getDessertById(this.id).subscribe({
     next: data => {
       this.desserts = data;
       this.itemForm.patchValue({
        name: this.desserts.name,
        price: this.desserts.price,
        details: this.desserts.details,
        imageUrl: this.desserts.imageURL
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

 this.dessertService.updateDessert(this.id, this.desserts).subscribe({ next : data => {
   this.goToDessertList();
 }, 
 error : error => console.log(error)});
 Swal.fire({
  icon : 'success',
  iconColor : '#fd0808',
  title :"<h2 style='color:White'>" +'Updated'+"</h2>",
  background : '#643539'
})
 
}

goToDessertList(){
 this.router.navigate(['admin/desserts']);
 }

} 
{

}
