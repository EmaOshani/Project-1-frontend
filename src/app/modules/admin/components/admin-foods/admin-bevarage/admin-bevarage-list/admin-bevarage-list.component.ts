import { Component } from '@angular/core';
import { Bevarage } from './bevarage-modal';
import { BevarageService } from './bevarage-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-bevarage-list',
  templateUrl: './admin-bevarage-list.component.html',
  styleUrls: ['./admin-bevarage-list.component.css']
})
export class AdminBevarageListComponent {
  bevarages: Bevarage[];
  burgersWasSelected: any;

  
  constructor (private bevarageService: BevarageService,
   
    private router: Router) { }

  ngOnInit(): void { 
  this.getBevarages();
  } 
 
  private getBevarages(){
    this.bevarageService.getBevarageList().subscribe(data=>{
      this.bevarages = data.filter(bevarage => bevarage.item === "Beverages");
    });
  }

  detailsBevarage(id: number){
    this.router.navigate(['admin/bevarage-details', id]);
  }
  
  updateBevarage(id: number){
    this.router.navigate(['admin/update-bevarage', id]);

  }


 createBevarage(){
  this.router.navigate(['admin/create-bevarage'])
 }


  deleteBevarage(id:number)
  {
    this.bevarageService.deleteBevarage(id).subscribe( data =>{
      console.log(data);
      this.getBevarages();
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
  
        this.deleteBevarage(id)
  
  
      
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
  onbevarageSelected( bevarages : Bevarage){
    this.burgersWasSelected.emit(bevarages);
  }
}
