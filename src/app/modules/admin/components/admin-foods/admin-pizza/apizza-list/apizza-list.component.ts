import { Component } from '@angular/core';
import { Pizza } from './apizza';
import { Router } from '@angular/router';
import { PizzaService } from './apizza-service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-apizza-list',
  templateUrl: './apizza-list.component.html',
  styleUrls: ['./apizza-list.component.css']
})
export class ApizzaListComponent {
  pizzas: Pizza[];
  pizzasWasSelected: any;

  
  constructor (private pizzaService: PizzaService,
   
    private router: Router) { }

  ngOnInit(): void { 
  this.getPizzas();
  } 
 
  private getPizzas(){
    this.pizzaService.getPizzaList().subscribe(data=>{
      this.pizzas = data;
    });
  }

  detailsPizza(id: number){
    this.router.navigate(['admin/pizza-details', id]);
  }
  
  updatePizza(id: number){
    this.router.navigate(['admin/update-pizza', id]);

  }


 createPizza(){
  this.router.navigate(['admin/create-pizza'])
 }


  deletePizza(id:number)
  {
    this.pizzaService.deletePizza(id).subscribe( data =>{
      console.log(data);
      this.getPizzas();
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
  
        this.deletePizza(id)
  
  
      
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

  onpizzaSelected( pizzas : Pizza){
    this.pizzasWasSelected.emit(pizzas);
  }
  
}


