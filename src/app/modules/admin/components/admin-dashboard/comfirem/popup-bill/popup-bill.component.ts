
import { Component , ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { bill } from './popup-modal';
import { orderService } from './popupService';
import jsPDF from 'jspdf';
import  html2Canvas from 'html2canvas';


@Component({
  selector: 'app-popup-bill',
  templateUrl: './popup-bill.component.html',
  styleUrls: ['./popup-bill.component.css']
})
export class PopupBillComponent {
  @ViewChild('popupContent', { static: true }) popupContent!: ElementRef;

  id : number;
  bill: bill;
  bills : bill[]
  item : any[];
  billContent: any;
 
 
  constructor ( private route : ActivatedRoute , private orderService  : orderService){ }

  ngOnInit(): void {
    
  this.id = this.route.snapshot.params['id'];

  this.bill = new bill();
  this.orderService.getDetailsById(this.id).subscribe(data =>{
    this.bill = data;
    this.item = data.products;
  })

  
}



calculateTotalPriceById(id: number): number {
  let totalPrice = 0;
  for (const product of this.item) {
    totalPrice += product.quantity * product.price;
  }
  return totalPrice;
}

downloadAsPDF(): void {
  const doc = new jsPDF();

  const content = this.popupContent.nativeElement;

  html2Canvas(content, {
    scrollY: -window.scrollY,
    windowHeight: content.scrollHeight
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png' , 1.0);
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    doc.setFillColor(255, 255, 255); // Set background color for the PDF
    doc.rect(10, 20, pdfWidth-10, pdfHeight- 20, 'F'); // Draw a filled rectangle with the background color
    doc.addImage(imgData, 'PNG', 10, 20, pdfWidth-10, pdfHeight-20);
    doc.save('popup_content.pdf');
  });
}


}










