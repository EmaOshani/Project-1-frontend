export class Customer {
    id : string
    name: string;
    email: string;
    road: String;
    address: string;
    phoneNumber: string;
    products: Product[];
  }
  
  export class Product {
  
    oid : number;
    id: number;
    quantity : number;
    name : string;
    size : string
    price: string;
    

  }