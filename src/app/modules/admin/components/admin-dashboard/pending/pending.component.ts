import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmailService } from './email-service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

items : any[];
filteredItems : any[];

constructor(private httpclient : HttpClient,
  private router : Router,
  private emailService : EmailService){}


  ngOnInit(): void {

    this.httpclient.get<any[]>('http://localhost:8080/api/v1/findAllOrder').subscribe(items => {
      this.items = items;
      this.filteredItems = items.filter(item => item.states === 'pending');

      this.filteredItems.sort((a, b) => {
        const invoiceNumberA = parseInt(a.id);
        const invoiceNumberB = parseInt(b.id);
        return invoiceNumberB - invoiceNumberA;
      });

      const counterService = this.filteredItems.length;
      console.log('Number of cards displayed:', counterService);
    
     
  
    });
  
  
  }

  calculateTotalPriceById(orderId: string): number {
    let totalPrice = 0;
    for (const item of this.items) {
      if (item.id === orderId) {
        for (const product of item.products) {
          totalPrice += product.quantity * product.price;
        }
        break; // Break the loop if the ID is found
      }
    }
    return totalPrice;
  }

  confirmedOrder(orderId: string) {
    const endpoint = `http://localhost:8080/api/v1/updateOrderState/${orderId}`;
    const updatedState = 'confirem';
  
    this.httpclient.put(endpoint, { states: updatedState }).subscribe({
      next :response => {
        console.log('Order confirmed successfully');
        const order = this.items.find(item => item.id === orderId);
        if (order) {
          order.states = updatedState;
        }
      },
      error : error => {
        console.error('Error confirming order', error);
      }
  });
  }

  cancelOrder(orderId: string) {
    const endpoint = `http://localhost:8080/api/v1/updateOrderState/${orderId}`;
    const updatedState = 'cancle';
  
    this.httpclient.put(endpoint, { states: updatedState }).subscribe({
      next :response => {
        console.log('Order cancle successfully');
        const order = this.items.find(item => item.id === orderId);
        if (order) {
          order.states = updatedState;
        }
      },
      error : error => {
        console.error('Error confirming order', error);
      }
  });
  }

// confirm notification alert

confirmNotify(orderId: string ){
  Swal.fire({
    title : "<h2 style='color:White'>" +'Are you Sure This Confirmation ?'+"<br><br>"+"<h5 style='color:White'>"+'If you accept this then be ready to place the order'+   "</h2>",
    
    showCancelButton : true,
    confirmButtonText : 'Yes',
    confirmButtonColor : '#2cd54c',
    cancelButtonText : 'No',
    cancelButtonColor : '#c61e1e',
    background : 'rgb(155, 69, 69)'
  }).then((result) =>{ 
    if (result.value) {

      this.confirmedOrder(orderId);

      const order = this.items.find(item => item.id === orderId);
      if (order && order.products) {
        this.sendConfirmationEmail( order.id , order.name , order.address , order.road , order.phoneNumber,  order.email, order.products);
      }else {
        console.error('Order or items not found');
        // TODO: Show error message to the user
      }
      this.refreshPage();

      Swal.fire({
        icon : 'success',
        iconColor : '#2cd54c',
        title :"<h2 style='color:White'>" +'Confirmation Success ! ' +"<br><br>"+"<h5 style='color:White'>"+  'Your can print a bill and place the order'+"</h2>",
        background : 'rgb(155, 69, 69)'
      })
   
  }
  else if (result.dismiss === Swal.DismissReason.cancel){
Swal.fire({
        icon : 'error',
        title: "<h2 style='color:White'>"+'Cancelled'+"<br><br>"+"<h5 style='color:White'>"+ 'Order not confirm yet  '+"</h2>",
        background : 'rgb(155, 69, 69)'
      });
}      
 }) 


}

sendConfirmationEmail(id: string , name : string , address : string , road: string , phoneNumber: string , email: string, items: any[]) {
  const orderedItems = items.map (item => `product name -${item.name}      Price : ${item.price}       Quantity: ${item.quantity}  Size: ${item.size} `);
  const orderDetails =` Invoice Number :${ id }\n customer name :${ name }\n customer address :${address }\n customer road :${ road }\n  phoneNumber:${phoneNumber}\n\n\n\n Ordered Items \n${orderedItems.join('\n')}`;
  
  const emailData = {
    to: email,
    subject: 'Order Confirmation',
    message: `Thank you for your order! Your order has been confirmed.\n\n${orderDetails}\n\n Your order is delivered within one hour`
  };

  this.emailService.sendEmail(emailData).subscribe({
   next : response => {
      console.log('Email sent successfully' , response);
      // TODO: Show success message to the user
    },
    error :error => {
      console.log('Email sent successfully' );
      /* console.error('Error sending email', error); */
      // TODO: Show error message to the user
    }
  });
}
  
cancelNotify(orderId: string ){
  Swal.fire({
    title : "<h2 style='color:white'>" +'Are You Sure This Order Is Cancle ?'+"<br><br>"+"<h5 style='color:White'>" + "</h2>",
    iconColor : '#c61e1e',
    showCancelButton : true,
    confirmButtonText : 'Yes',
    confirmButtonColor : '#c61e1e',
    cancelButtonText : 'No',
    cancelButtonColor : '#34cbcb',
    background : 'rgb(155, 69, 69)'
  }).then((result) =>{ 
    if (result.value) {

      this.cancelOrder(orderId);

      const order = this.items.find(item => item.id === orderId);
      if (order && order.products) {
        this.sendCancleEmail( order.id , order.name , order.address , order.රොඅඩ් , order.phoneNumber,  order.email, order.products);
      }else {
        console.error('Order or items not found');
        // TODO: Show error message to the user
      }
      this.refreshPage();

    Swal.fire({
      icon : 'success',
      iconColor : '#c61e1e',
      title :"<h2 style='color:White'>" +' Order is cancle' +"<br><br>"+"<h5 style='color:White'>"+"</h2>",
      background : 'rgb(155, 69, 69)'
    })
     

    
  }
  else if (result.dismiss === Swal.DismissReason.cancel){
Swal.fire({
       
        iconColor : '#c61e1e',
        title: "<h2 style='color:White'>"+'Cancelled'+"<br><br>"+"<h5 style='color:White'>"+ 'Not cancle yet  '+"</h2>",
        background : 'rgb(155, 69, 69)'
      });
}      
 }) 


}

sendCancleEmail(id: string , name : string , address : string , road: string , phoneNumber: string , email: string, items: any[]) {
  const orderedItems = items.map (item => `product name -${item.name}      Price : ${item.price}       Quantity: ${item.quantity}  `);
  const orderDetails =` Invoice Number :${ id }\n customer name :${ name }\n customer address :${address }\n customer road :${ road }\n  phoneNo:${phoneNumber}\n\n\n\n Ordered Items \n${orderedItems.join('\n')}`;
  
  const emailData = {
    to: email,
    subject: 'Order is Cancle',
    message: `Your order is cancle now !! .\n\n${orderDetails}\n\n Thank you Come Again!. `
  };

  this.emailService.sendEmail(emailData).subscribe(
    response => {
      console.log('Email sent successfully');
      // TODO: Show success message to the user
    },
    error => {
      console.log('Email sent successfully' );
      /* console.error('Error sending email', error); 
      // TODO: Show error message to the user*/
     }
  );
} 

refreshPage(): void {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  const currentUrl = this.router.url + '?';
  this.router.navigateByUrl(currentUrl).then(() => {
    this.router.navigated = false;
    this.router.navigate([this.router.url]);
  });
}







}
