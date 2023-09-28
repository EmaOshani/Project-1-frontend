import { Component, ElementRef, ViewChild } from '@angular/core';
import { Bill } from './bill-modals';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import  html2Canvas from 'html2canvas';
import { orderService } from './bill-service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {

  @ViewChild('popupContent', { static: true }) popupContent!: ElementRef;

  id : number;
  bill: Bill;
  bills : Bill[]
  item : any[];
  billContent: any;
  modalService: any;
  
  
 
 
  constructor ( private route : ActivatedRoute , private orderService  : orderService,
     private modalRef: BsModalRef){ }

  ngOnInit(): void {
    
  this.id = this.route.snapshot.params['id'];

  this.bill = new Bill();
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

openModal() {
  this.modalRef = this.modalService.show(this.popupContent, { class: 'modal-dialog-centered' });
}



}

