import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { orderService } from './order-page-service';
import { Customer, Product } from './order-page-model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailService } from './mailService';
import { cartCount } from '../user-cart/cart-count';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

formGroup! : FormGroup;
items : any[]
orderId: string


constructor(private router: Router,
            private orderService : orderService,
            private FormBuilder : FormBuilder,
            private mailService : MailService,
         
            
           )
            {}
  ngOnInit(): void {

     // validations 
     this.formGroup = this.FormBuilder.group({
      name: ['', [Validators.required, this.validateName]],
       road: ['', [Validators.required, this.validateRoad]],
       email: ['', [Validators.required, Validators.email, this.validateEmail]],
       address: ['', [Validators.required, this.validateAddress]],
       phoneNumber: ['', [Validators.required, this.validatePhoneNumber]]
    });

      const customer = JSON.parse(localStorage.getItem('customer') || '{}');
            }
   products: Product[] = [];
  formData = { name: '', road : '' , email: '' , phoneNumber:'' , address:'' }; // Variable to store form data

  onSubmit(){

    // Store form data in sessionStorage
    sessionStorage.setItem('formData', JSON.stringify(this.formData));

    
    // Retrieve form data from localStorage and assign it to a variable
    const storedFormData = sessionStorage.getItem('formData');
    if (storedFormData) {
      this.formData = JSON.parse(storedFormData);
      this.conformation()

     
      
    }

  }

  removeItem(): void {
    sessionStorage.removeItem('localCart');
  }
 
  placeOrder(): void {
    // Retrieve form data from sessionStorage and assign it to a variable
    const storedFormData = sessionStorage.getItem('formData');
    let formData: Customer = { id: '' , name: '', email: '', road :'', address: '', phoneNumber: '', products: [] };
    if (storedFormData) {
      formData = JSON.parse(storedFormData);
    }

    
    // Retrieve items array from sessionStorage
    const storedItems = sessionStorage.getItem('localCart');
    let items: Product[] = [];
    if (storedItems) {
      items = JSON.parse(storedItems);
    }

   // Add items array to formData object
   formData.products = items;

    // Send formData to API
    this.orderService.placeOrder(formData).subscribe({
      next : (response) =>  { console.log(response);
      this.sendBillEmail(response); },
      
      error :(error) => {console.log(error);
      }
    });
  }

  onNavigate(){
    this.router.navigate(['user-menu/pizzas'])
  
   }
  
   conformation(){
    Swal.fire({
      title : "<h2 style='color:White'>" +'Are you sure Submit you order'+ 'If you submit the order, you will receive the order within an HOUR'+ '<br><br>' +"<h5 style='color: red'>"+'If You want cancle this order,you can CANCEL the order by phone call within 15 MINIUTS.'+   "</h2>",
      showCancelButton : true,
      confirmButtonText : 'Yes',
      cancelButtonText : 'No',
      background : '#643539'
    }).then((result) =>{ 
      if (result.isConfirmed){

      this.placeOrder();

      this.removeItem();


     // send email

      Swal.fire({
        title: "<h2 style='color:White'>" +'Bill is sent your email?'+ "</h2>",
        icon: 'success',
        background : '#643539',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes'

      

    }).then((result) => {
      if (result.isConfirmed) {

      

      }
   
   
    })
  }
    
    this.onNavigate()
  })

    

   }



sendBillEmail(responseData: any): void {


  const filteredProducts = responseData.products.map((product: any) => ({
    quantity: product.quantity, 
    price: product.price,
    name: product.name,
  }));

  const productsString = filteredProducts.map((product: any) => `Name: ${product.name},  Price: ${product.price},  Quantity: ${product.quantity}`).join('\n')

  const totalPrice = filteredProducts.reduce(
    (total: number, product: any) =>
      total + product.quantity * product.price,
    0
  );

  const emailData = {
    to: responseData.email,
    subject: 'Order Confirmation Invoice Alert',
    message: `Order details :\n\n INVOICE NUMBER : ${responseData.id}\n Customer Name: ${responseData.name}\n Address : ${responseData.address} , ${responseData.road}\n Phone number : ${responseData.phoneNumber} \n\nProducts\n\n ${productsString}\nTotalPrice:\n ${totalPrice} `,
  };

  this.mailService.sendEmail(emailData).subscribe({
    next: (response: any) => {
      console.log('Email sent successfully', response);
      // TODO: Show success message to the user
    },
    error: (response: any) => {
      console.log('sending email', response);
      // TODO: Show error message to the user
    },
  });
}






validateName(control: AbstractControl): { [key: string]: boolean } | null {
  const namePattern = /^[A-Za-z\s]+$/; // Regular expression to allow only alphabets and spaces

  if (!namePattern.test(control.value)) {
    return { invalidName: true };
  }
  const words = control.value.split(' ');
  if (words.length < 2) {
    return { insufficientWords: true };
  }

  return null;
}


validateRoad(control: AbstractControl): { [key: string]: boolean } | null {
  const address = control.value;

  // Regular expression to match a valid Sri Lankan address
  const addressPattern = /^[A-Za-z\s]+$/;

  if (!addressPattern.test(address)) {
    return { invalidAddress: true };
  }

  return null;
}


validateAddress(control: AbstractControl): { [key: string]: boolean } | null {
  const address = control.value;

  // Regular expression to match a valid Sri Lankan address
  const addressPattern = /^[A-Za-z0-9\s,-/]+$/;

  if (!addressPattern.test(address)) {
    return { invalidAddress: true };
  }

  return null;
}

validateEmail(control: AbstractControl): { [key: string]: boolean } | null {
  const email = control.value;

  // Check if email is empty
  if (!email) {
    return { required: true };
  }

  // Check for @ symbol
  if (email.indexOf('@') === -1) {
    return { invalidEmail: true };
  }

  // Split email into local part and domain part
  const parts = email.split('@');
  const localPart = parts[0];
  const domainPart = parts[1];

  // Check if domain part is one of the allowed domains
  const allowedDomains = ['gmail.com'];
  if (allowedDomains.indexOf(domainPart) === -1) {
    return { invalidDomain: true };
  }

  // Check if local part contains any invalid characters
  const invalidCharacters = /[,]/;
  if (invalidCharacters.test(localPart)) {
    return { invalidLocalPart: true };
  }

  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // Regular expression for email format

  if (!emailPattern.test(control.value)) {
    return { email: true };
  }

  if (/[^\w.]/.test(localPart)) {
    return { invalidLocalPart: true };
  }                                                                                             

  return null;
}

validatePhoneNumber(control: AbstractControl): { [key: string]: boolean } | null {
  const mobileNumber = control.value;
   // Check if mobile number is empty
if (!mobileNumber) {
  return { required: true };
}

  // Regular expression to match a valid Sri Lankan mobile phone number
  const mobileNumberPattern = /^(?:\+?94|0)(?:7[0-9]{8})$/;

  if (!mobileNumberPattern.test(mobileNumber)) {
    return { invalidMobileNumber: true };
  }

  return null;
}


}
