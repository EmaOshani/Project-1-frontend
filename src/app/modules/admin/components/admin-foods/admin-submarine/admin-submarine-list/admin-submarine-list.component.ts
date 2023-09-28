import { Component } from '@angular/core';
import { Submarine } from './admin-submarine-modal';
import { SubmarineService } from './admin-submarine-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-submarine-list',
  templateUrl: './admin-submarine-list.component.html',
  styleUrls: ['./admin-submarine-list.component.css']
})
export class AdminSubmarineListComponent {

   
  submarines: Submarine[];
  submarinesWasSelected: any;

  
  constructor (private submarineService: SubmarineService, 
    private router: Router) { }

  ngOnInit(): void { 
  this.getSubmarines();
  } 
 
  private getSubmarines(){
    this.submarineService.getSubmarineList().subscribe(data=>{
      this.submarines = data.filter(submarine => submarine.item === "Submarine");
    });
  }

  detailsSubmarine(id: number){
    this.router.navigate(['admin/submarine-details', id]);
  }
  
  updateSubmarine(id: number){
    this.router.navigate(['admin/update-submarine', id]);

  }


 createSubmarine(){
  this.router.navigate(['admin/create-submarine']);
 }


  deleteSubmarine(id:number)
  {
    this.submarineService.deleteSubmarine(id).subscribe( data =>{
      console.log(data);
      this.getSubmarines();
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
  
        this.deleteSubmarine(id)
  
  
      
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

  onsubmarineSelected( submarines : Submarine){
    this.submarinesWasSelected.emit(submarines);
  }
}
