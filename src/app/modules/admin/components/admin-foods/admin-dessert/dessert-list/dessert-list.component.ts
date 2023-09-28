import { Component } from '@angular/core';
import { Dessert } from './dessert-modal';
import { DessertService } from './dessertService';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dessert-list',
  templateUrl: './dessert-list.component.html',
  styleUrls: ['./dessert-list.component.css']
})
export class DessertListComponent {

  
  desserts: Dessert[];
  dessertsWasSelected: any;

  
  constructor (private dessertService: DessertService, 
    private router: Router) { }

  ngOnInit(): void { 
  this.getDesserts();
  } 
 
  private getDesserts(){
    this.dessertService.getDessertList().subscribe(data=>{
      this.desserts = data.filter(burger => burger.item === "Desserts");
    });
  }

  detailsDessert(id: number){
    this.router.navigate(['admin/dessert-details', id]);
  }
  
  updateDessert(id: number){
    this.router.navigate(['admin/update-dessert', id]);

  }


 createDessert(){
  this.router.navigate(['admin/create-dessert']);
 }


  deleteDessert(id:number)
  {
    this.dessertService.deleteDessert(id).subscribe( data =>{
      console.log(data);
      this.getDesserts();
    })
   
  }

  DeleteBox(id : number){
    Swal.fire({
      title : "<h2 style='color:White'>" +'Are you Want to Remove this ?'+"<br><br>"+"<h5 style='color:White'>"+'You will not be able to recover this details !'+   "</h2>",
      icon : 'warning',
      showCancelButton : true,
      confirmButtonText : 'Yes',
      confirmButtonColor: '#c61e1e',
      cancelButtonText : 'No',
      cancelButtonColor: '#34cbcb',
      background :'#643539'
    }).then((result) =>{ 
      if (result.value) {
  
        this.deleteDessert(id)
  
  
      
      Swal.fire({
        icon : 'success',
        iconColor : '#fd0808',
        title :"<h2 style='color:White'>" +'Deleted' +"<br><br>"+"<h5 style='color:White'>"+  'Your file has been deleted success'+"</h2>",
        background : '#643539'
      })
    }
    else if (result.dismiss === Swal.DismissReason.cancel){
  Swal.fire({
          icon : 'error',
          title: "<h2 style='color:White'>"+'Cancelled'+"<br><br>"+"<h5 style='color:White'>"+ 'Your imaginary file is safe '+"</h2>",
          background : '#643539'
        });
  }
  })
  
  
  }

  ondessertSelected( desserts : Dessert){
    this.dessertsWasSelected.emit(desserts);
  }
  
}
