import { Component, OnInit } from '@angular/core';
import { Crispy } from '../admin-crispy-list/crispy-modal';
import { CrispyService } from '../admin-crispy-list/crispy-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-crispy',
  templateUrl: './update-crispy.component.html',
  styleUrls: ['./update-crispy.component.css']
})
export class UpdateCrispyComponent implements OnInit {
  id: number;
  crispy : Crispy = new Crispy();
  itemForm: FormGroup;

 constructor(private crispyService: CrispyService,
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
   this.crispyService.getCrispyById(this.id).subscribe({
     next: data => {
       this.crispy = data;
       this.itemForm.patchValue({
        name: this.crispy.name,
        price: this.crispy.price,
        details: this.crispy.details,
        imageUrl: this.crispy.imageURL
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
  
 this.crispyService.updateCrispy(this.id, this.crispy).subscribe({ next : data => {
   this.goToCrispyList();
 }, 
 error : error => console.log(error)});
 Swal.fire({
  icon : 'success',
  iconColor : '#fd0808',
  title :"<h2 style='color:White'>" +'Updated'+"</h2>",
  background : '#643539'
})
 
}

goToCrispyList(){
 this.router.navigate(['admin/crispy']);
 }

}
