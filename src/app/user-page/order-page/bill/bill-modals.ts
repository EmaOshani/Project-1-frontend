export class Bill {
    id : number;
    name: string;
    email: string;
    road: String;
    address: string;
    phoneNumber: string;
    products: Product[];
    date : String;
    totalPrice : number;
    
  }
  
  export class Product {
    oid : number;
    id: number;
    quantity : number;
    name : string;
    price: number;
    

  }