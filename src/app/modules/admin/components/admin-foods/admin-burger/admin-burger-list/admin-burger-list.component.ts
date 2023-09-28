import { Component } from '@angular/core';
import { Burger } from './admin-burger-list';
import { BurgerService } from './admin-burger-list-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-burger-list',
  templateUrl: './admin-burger-list.component.html',
  styleUrls: ['./admin-burger-list.component.css']
})
export class AdminBurgerListComponent {

  burgers: Burger[];
  burgersWasSelected: any;

  
  constructor (private burgerService: BurgerService,
   
    private router: Router) { }

  ngOnInit(): void { 
  this.getBurgers();
  } 
 
  private getBurgers(){
    this.burgerService.getBurgerList().subscribe(data=>{
      this.burgers = data.filter(burger => burger.item === "Burger");
    });
  }

  detailsBurger(id: number){
    this.router.navigate(['admin/burger-details', id]);
  }
  
  updateBurger(id: number){
    this.router.navigate(['admin/update-burger', id]);

  }


 createBurger(){
  this.router.navigate(['admin/create-burger'])
 }


  deleteBurger(id:number)
  {
    this.burgerService.deleteBurger(id).subscribe( data =>{
      console.log(data);
      this.getBurgers();
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
  
        this.deleteBurger(id)
  
  
      
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
  onburgerSelected( burgers : Burger){
    this.burgersWasSelected.emit(burgers);
  }
  
}



