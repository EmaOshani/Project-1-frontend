import { Component, OnInit } from '@angular/core';
import { Bevarage } from '../admin-bevarage-list/bevarage-modal';
import { BevarageService } from '../admin-bevarage-list/bevarage-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-bevarge',
  templateUrl: './update-bevarge.component.html',
  styleUrls: ['./update-bevarge.component.css']
})
export class UpdateBevargeComponent implements OnInit {
  
  id: number;
  bevarages : Bevarage = new Bevarage();
  itemForm: FormGroup;

 constructor(private bevarageService: BevarageService,
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
   this.bevarageService.getBevarageById(this.id).subscribe({
     next: data => {
       this.bevarages = data;
       this.itemForm.patchValue({
        name: this.bevarages.name,
        price: this.bevarages.price,
        details: this.bevarages.details,
        imageUrl: this.bevarages.imageURL
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

  
 this.bevarageService.updateBevarage(this.id, this.bevarages).subscribe({ next : data => {
   this.goToBevarageList();
 }, 
 error : error => console.log(error)});
 Swal.fire({
  icon : 'success',
  iconColor : '#fd0808',
  title :"<h2 style='color:White'>" +'Updated'+"</h2>",
  background : '#643539'
})
 
}

goToBevarageList(){
 this.router.navigate(['admin/bevarages']);
 }

}
