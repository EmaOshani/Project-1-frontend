import { Component } from '@angular/core';
import { Crispy } from './crispy-modal';
import { CrispyService } from './crispy-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-crispy-list',
  templateUrl: './admin-crispy-list.component.html',
  styleUrls: ['./admin-crispy-list.component.css']
})
export class AdminCrispyListComponent {

  crispy: Crispy[];
  crispyWasSelected: any;

  
  constructor (private crispyService: CrispyService,
   
    private router: Router) { }

  ngOnInit(): void { 
  this.getCrispy();
  } 
 
  private getCrispy(){
    this.crispyService.getCrispyList().subscribe(data=>{
      this.crispy = data.filter(crispy => crispy.item === "Crispy Chicken");
    });
  }

  detailsCrispy(id: number){
    this.router.navigate(['admin/crispy-details', id]);
  }
  
  updateCrispy(id: number){
    this.router.navigate(['admin/update-crispy', id]);

  }


 createCrispy(){
  this.router.navigate(['admin/create-crispy'])
 }


  deleteCrispy(id:number)
  {
    this.crispyService.deleteCrispy(id).subscribe( data =>{
      console.log(data);
      this.getCrispy();
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
    
          this.deleteCrispy(id)
    
    
        
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


  oncrispySelected( crispy : Crispy){
    this.crispyWasSelected.emit(crispy);
  }
  
}
