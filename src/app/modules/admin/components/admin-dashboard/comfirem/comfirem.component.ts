import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-comfirem',
  templateUrl: './comfirem.component.html',
  styleUrls: ['./comfirem.component.css']
})
export class ComfiremComponent {
  items: any[];
  filteredItems: any[] = [];
  selectedDate: string;
  invoiceNumber: string;

  showPopupBill: boolean = false;

  constructor(private httpclient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.httpclient.get<any[]>('http://localhost:8080/api/v1/findAllOrder').subscribe(items => {
      this.items = items;
      this.filteredItems = items.filter(item => item.states === 'confirem' && (!this.selectedDate || item.createdDate === this.selectedDate));

      this.filteredItems.sort((a, b) => {
        const invoiceNumberA = parseInt(a.id);
        const invoiceNumberB = parseInt(b.id);
        return invoiceNumberB - invoiceNumberA;
      });

      const cardCount = this.filteredItems.length;
      console.log('Number of cards displayed:', cardCount);

      this.selectedDate = this.getCurrentDate();

      this.applyInvoiceFilter();
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

  cancleNotify(orderId: string) {
    Swal.fire({
      title: "<h2 style='color:white'>" + 'Are You Sure This Order Is Cancle ?' + "<br><br> </h2>",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#c61e1e',
      cancelButtonText: 'No',
      cancelButtonColor: '#34cbcb',
      background: '#303A42'
    }).then((result) => {
      if (result.value) {
        this.refreshPage();
        Swal.fire({
          icon: 'success',
          iconColor: '#c61e1e',
          title: "<h2 style='color:White'>" + ' Order is cancle <i class="fa fa-frown-o" aria-hidden="true"></i> !' + "</h2>",
          background: '#303A42'
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: 'error',
          iconColor: '#c61e1e',
          title: "<h2 style='color:White'>" + 'Cancelled' + "<br><br>" + "<h5 style='color:White'>" + 'Order not cancle yet  ' + "</h2>",
          background: '#303A42'
        });
      }
    });
  }

  applyDateFilter(): void {
    this.filteredItems = this.items.filter(item => item.states === 'confirem' && (!this.selectedDate || item.createdDate.startsWith(this.selectedDate)));
  }

  applyInvoiceFilter() {
    if (this.invoiceNumber) {
      this.filteredItems = this.items.filter(item =>
        item.states === 'confirem' && item.id.toString().includes(this.invoiceNumber)
      );
    } else {
      this.filteredItems = this.items.filter(item => item.states === 'confirem');
    }

    this.filteredItems.sort((a, b) => {
      const invoiceNumberA = parseInt(a.id);
      const invoiceNumberB = parseInt(b.id);
      return invoiceNumberB - invoiceNumberA;
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Adding leading zero if needed
    const day = ("0" + currentDate.getDate()).slice(-2); // Adding leading zero if needed
    return `${year}-${month}-${day}`;
  }

  refreshPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const currentUrl = this.router.url + '?';
    this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });
  }

  genarateBill(id: number) {
    this.router.navigate(['admin/dashboard/confirme/popupbill/', id]);
  }
}


